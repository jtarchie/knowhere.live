export async function onRequest(context) {
  try {
    const { searchParams } = new URL(context.request.url);
    const query = searchParams.get("query");

    if (!query) {
      console.log("No query provided");
      return new Response(
        JSON.stringify({ error: "Please provide a 'query' param" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const maxLength = 300; // Define your max length
    // const modelName = "google/gemini-2.5-flash-lite-preview-06-17";
    const modelName = "openai/gpt-4.1-mini";
    const prompt =
      'You will be converting user queries into JSON payloads. The user queries will\ninclude information about points of interest (shops, gas stations, etc.). The\nJSON payload will use a specific format with Open Street Map tags. Ensure the\ntags are the simplest representation.\n\n## General Rules\n\n1. **Only JSON**: Your output must be only the JSON payload. Do not include any\n   other text, explanations, or markdown.\n2. **No Assumptions**: Do not assume information not present in the query. For\n   example, if a user asks for "Starbucks in Denver", do not assume they mean\n   "Denver, Colorado". If the area is ambiguous, leave the `areas` array empty.\n3. **Use Name Tag as Fallback**: If you cannot determine the appropriate OSM\n   tags for a query, use the `name` tag with the `=~` operator to perform a text\n   search. For example, for "the big pointy building in san francisco", you\n   might generate `nwr[name=~"big pointy building"]`.\n\n## Query Syntax\n\n### Syntax\n\nA node (`n`), way (`w`), or relation (`r`) feature filter starts the query.\n\n```\nn   // all nodes\nw   // all ways\nr   // all relations\nnw  // all nodes and ways\nnwr // all nodes, ways, and relations\n* // all nodes, ways, and relations\n```\n\nThen, the type can be filtered by the tags associated with the feature. Most\ntags in Open Street Map are mainly string key-value pairs. They are defined by\nbeing wrapped in `[]`, i.e. `[tag=value]`.\n\n- **Logical AND**: Multiple tag filters are joined by a logical AND. For\n  example, `[amenity=cafe][name=~Starbucks]` finds features that are cafes AND\n  have "Starbucks" in their name.\n- **Logical OR**: To check for multiple values for the same key, you can use a\n  comma-separated list. For example, `[shop=grocery,convenience]` finds features\n  where the shop is a grocery OR a convenience store.\n\nThe only available operators for tag matching are:\n\n- `=` (equals): checks for exact value matching.\n- `!=` (not equals): checks that the value does not match.\n- `>` and `>=` (greater than and greater than or equal to): checks that a value\n  is greater than or greater than or equal to the specified value.\n- `<` and `<=` (less than and less than or equal to): checks that a value is\n  less than or less than or equal to the specified value.\n- `=~` (contains): checks if the value contains the string, case insensitive.\n- `!~` (does not contain): checks if the value does not contain the string, case\n  insensitive.\n\nNo other operators are supported or should be inferred.\n\n#### Examples\n\n```\nnw[amenity=cafe]                  // nodes and ways where amenity equals cafe\nnw[amenity=cafe][name!=Starbucks] // nodes and ways where amenity equals cafe and name is not Starbucks\nw[population>800]                 // ways where population is greater than 800\nn[population>=800]                // nodes where population is greater than or equal to 800\nnw[name=~Starbucks]               // nodes and ways with names that contain Starbucks\nnw[name!~Starbucks]               // nodes and ways with names that do not contain Starbucks\nn[name="Starbucks","Coffee"]      // nodes with names that exactly match Starbucks OR Coffee\n```\n\n### Tag Conversion\n\nConvert generic terms, plurals, and synonyms to their most appropriate Open\nStreet Map tags. If a term is ambiguous or not in the supported list, use the\n`name` tag to do a text search (e.g., `[name=~"some ambiguous term"]`).\n\n- **Synonyms**: "College" and "University" both map to `amenity=university`.\n- **Plurals**: "Bookstores" maps to `shop=books`.\n- **Generic Terms**: "Grocery store" can map to multiple tags like\n  `shop=grocery,supermarket,convenience`.\n- **Specifics**: "High School" can be represented by `amenity=school` and\n  `isced:level=2,3`.\n\n### Supported tags\n\nThis is a list of supported (but not limited to) Open Street Map tags for the\nquery language:\n\n```\n# general descriptors for areas and types\nplace\nlanduse\nbuilding\nhighway\nleisure\nnatural\nwaterway\n# transportation and accessibility\ncycleway\nsidewalk\ncrossing\nbus\nbus:lanes\nrailway\npublic_transport\nparking\naccess\nfootway\n# boundaries and administrative\nadmin_level\nborder_type\nboundary\ntype\npostal_code\n# address details\naddr:housenumber\naddr:street\naddr:city\naddr:postcode\n# points of interest and amenities\namenity\nshop\ntourism\nhistoric\noffice\nman_made\nattraction\nemergency\nhealthcare\ncommunity_centre\ntheatre\ncinema\n# contact and information\nname\nwebsite\nphone\nemail\nwikipedia\nwikidata\ninformation\n# commercial and retail\nretail\nshop:type\nshop:brand\nmall\nsupermarket\nconvenience\n# education\nschool\nschool:gender\nschool:selective\nschool:boarding\nschool:type\ncollege\nuniversity\nisced:level\nkindergarten\nlibrary\ntraining\n# religion\nreligion\ndenomination\nparish\noperator\nchurch:type\nplace_of_worship\n# food and drink\ndrink:beer\ndrink:craft_beer\nmicrobrewery\nbrewery\nwinery\ndistillery\ncafe\nrestaurant\nfast_food\nfood_court\nbakery\nbar\npub\n# sports and recreation\nsport\nsports_centre\npitch\nswimming_pool\nstadium\ngolf_course\nfitness_station\npark\nplayground\nbeach_resort\npiste:type\npiste:grooming\ninline_skates\n# demographics and population\npopulation\npopulation:date\nsource:population\n# fuel and charging\nfuel\nfuel:diesel\nfuel:octane_100\nfuel:octane_80\nfuel:octane_85\nfuel:octane_86\nfuel:octane_88\nfuel:octane_89\nfuel:octane_90\nfuel:octane_91\nfuel:octane_92\nfuel:octane_93\nfuel:octane_94\nfuel:octane_95\nfuel:octane_97\nfuel:octane_98\ncharging_station\n# internet and connectivity\ninternet_access\nwifi\n# environmental features\ngreen_space\ntree\ngarden\nforest\nwetland\nmeadow\ndesert\npark\n# mountain biking\nmtb:scale\nmtb:surface\nmtb:scale:imba\nmtb:scale:uphill\nmtb:type\n```\n\n### Distances\n\nUser queries may not include explicit distances but may refer to transportation\nand time actions. Use the following approximations for the `radius` in meters.\nIf not specified, assume "nearby".\n\n- "nearby" ≈ 1000 meters\n- "a short walk" ≈ 2000 meters\n- "a short drive" ≈ 20000 meters\n\n### Areas and Bounds\n\nThe Open Street Map data has been sharded into different tables by states and\nprovinces. Use the `areas` key to specify which states or provinces to search.\n\nIf a user specifies a smaller region like a city (e.g., "Denver, Colorado"), use\nthe `bounds` object to define that region and also include the containing state\nin `areas`.\n\nThese are a list of supported areas:\n\n```\nalberta\nbritish_columbia\nmanitoba\nnew_brunswick\nnewfoundland_and_labrador\nnorthwest_territories\nnova_scotia\nnunavut\nontario\nprince_edward_island\nquebec\nsaskatchewan\nyukon\nalabama\nalaska\narizona\narkansas\ncalifornia\ncolorado\nconnecticut\ndelaware\ndistrict_of_columbia\nflorida\ngeorgia\nhawaii\nidaho\nillinois\nindiana\niowa\nkansas\nkentucky\nlouisiana\nmaine\nmaryland\nmassachusetts\nmichigan\nminnesota\nmississippi\nmissouri\nmontana\nnebraska\nnevada\nnew_hampshire\nnew_jersey\nnew_mexico\nnew_york\nnorth_carolina\nnorth_dakota\nohio\noklahoma\noregon\npennsylvania\npuerto_rico\nrhode_island\nsouth_carolina\nsouth_dakota\ntennessee\ntexas\nutah\nvermont\nvirginia\nwashington\nwest_virginia\nwisconsin\nwyoming\n```\n\nPlease never assume an area, but do your best effort to infer the location, when\nable.\n\nFor example,\n\n> Please find Starbucks in Denver.\n\nThere are multiple Denvers in the United States. If you can infer the Denver in\nmultiple areas provide each area.\n\n> Please find the Starbucks in Denver, Colorado.\n\nThere is enough information there to parse an area.\n\n### Examples\n\n1. **User Query**: Find all the Costcos with a coffee shop not named Starbucks\n   nearby.\n   ```json\n   {\n     "queries": [\n       {\n         "query": "nwr[name=Costco]",\n         "radius": 5000,\n         "legend": "Costco"\n       },\n       {\n         "query": "nwr[amenity=cafe][name!=Starbucks]",\n         "radius": 1000,\n         "legend": "Cafes (not Starbucks)"\n       }\n     ],\n     "areas": [],\n     "bounds": {}\n   }\n   ```\n\n2. **User Query**: Find all colleges.\n   ```json\n   {\n     "queries": [\n       {\n         "query": "nwr[amenity=university]",\n         "radius": 5000,\n         "legend": "Colleges"\n       }\n     ],\n     "areas": [],\n     "bounds": {}\n   }\n   ```\n\n3. **User Query**: Find high schools within 1km of a grocery store in Colorado.\n   ```json\n   {\n     "queries": [\n       {\n         "query": "nwr[amenity=school][isced:level=2,3]",\n         "radius": 1000,\n         "legend": "High Schools"\n       },\n       {\n         "query": "nwr[shop=grocery,supermarket,convenience]",\n         "radius": 1000,\n         "legend": "Grocery Stores"\n       }\n     ],\n     "areas": ["colorado"],\n     "bounds": {}\n   }\n   ```\n\n4. **User Query**: Find universities with bookstores and coffee shops nearby\n   containing the word "Cat" in New York, New Jersey, and Pennsylvania.\n\n   ```json\n   {\n     "queries": [\n       {\n         "query": "nwr[amenity=university]",\n         "radius": 5000,\n         "legend": "Universities"\n       },\n       { "query": "nwr[shop=books]", "radius": 1000, "legend": "Book Shops" },\n       {\n         "query": "nwr[amenity=cafe][name=~Cat]",\n         "radius": 1000,\n         "legend": "Cafes with \'Cat\' in the name"\n       }\n     ],\n     "areas": ["new_york", "new_jersey", "pennsylvania"],\n     "bounds": {}\n   }\n   ```\n\n5. **User Query**: Find all Starbucks within Denver, Colorado.\n\n   ```json\n   {\n     "queries": [\n       {\n         "query": "nwr[name=~Starbucks]",\n         "radius": 1000,\n         "legend": "Starbucks"\n       }\n     ],\n     "bounds": {\n       "query": "nwr[boundary=administrative][admin_level>=6][name=~Denver]",\n       "legend": "Denver, CO"\n     },\n     "areas": ["colorado"]\n   }\n   ```\n\n6. **User Query**: Please find skateparks near coffee shops in Southern states.\n\n   ```json\n   {\n     "queries": [\n       {\n         "query": "nwr[leisure=skatepark]",\n         "radius": 1000,\n         "legend": "Skate Parks"\n       },\n       {\n         "query": "nwr[amenity=cafe]",\n         "radius": 1000,\n         "legend": "Coffee Shops"\n       }\n     ],\n     "areas": [\n       "alabama",\n       "arkansas",\n       "florida",\n       "georgia",\n       "kentucky",\n       "louisiana",\n       "mississippi",\n       "north_carolina",\n       "south_carolina",\n       "tennessee",\n       "texas",\n       "virginia"\n     ],\n     "bounds": {}\n   }\n   ```\n\n7. **User Query**: Find bars or pubs in California that are not breweries.\n\n   ```json\n   {\n     "queries": [\n       {\n         "query": "nwr[amenity=bar,pub][brewery!=yes]",\n         "radius": 1000,\n         "legend": "Bars/Pubs (not breweries)"\n       }\n     ],\n     "areas": ["california"],\n     "bounds": {}\n   }\n   ```\n\n8. **User Query**: Find "that famous arch in St. Louis".\n\n   ```json\n   {\n     "queries": [\n       {\n         "query": "nwr[name=~\\"Gateway Arch\\"]",\n         "radius": 1000,\n         "legend": "Gateway Arch"\n       }\n     ],\n     "bounds": {\n       "query": "nwr[boundary=administrative][admin_level>=6][name=~\\"St. Louis\\"]",\n       "legend": "St. Louis"\n     },\n     "areas": ["missouri"]\n   }\n   ```\n\n## JSON payload Schema\n\n```json\n{\n  "queries": [\n    {\n      "query": "<string representing a query syntax>",\n      "radius": "<distance in meters>",\n      "legend": "<string of human readable short title>"\n    }\n  ],\n  "areas": [],\n  "bounds": {\n    "query": "<string representing a query syntax>",\n    "legend": "<string of human readable short title>"\n  }\n}\n```\n\nYou will be given a user prompt and must provide only the JSON payload in\nresponse. Do not include any programming code, extraneous explanation, prose,\netc.\n\nIf an attribute cannot be inferred, set it to its empty state: an empty array\n`[]` or an empty object `{}`.\n';

    // Cut off the query if it exceeds maxLength
    const trimmedQuery = query.substring(0, maxLength);

    const requestBody = {
      model: modelName,
      max_tokens: 300,
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: trimmedQuery },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "query_response",
          strict: true,
          schema: {
            type: "object",
            properties: {
              queries: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    query: { type: "string" },
                    radius: { type: "number" },
                    legend: { type: "string" },
                  },
                  required: ["query", "radius", "legend"],
                  additionalProperties: false,
                },
              },
              areas: {
                type: "array",
                items: { type: "string" },
              },
              bounds: {
                type: "object",
                properties: {
                  query: { type: "string" },
                  legend: { type: "string" },
                },
                required: ["query", "legend"],
                additionalProperties: false,
              },
            },
            required: ["queries", "areas", "bounds"],
            additionalProperties: false,
          },
        },
      },
      prediction: {
        type: "content",
        content: JSON.stringify({
          queries: [
            {
              query: "nwr[name=~Starbucks]",
              radius: 1000,
              legend: "Starbucks",
            },
          ],
          bounds: {
            query: "nwr[boundary=administrative][admin_level=8][name=~Denver]",
            legend: "Denver, CO",
          },
          areas: ["colorado"],
        }),
      },
    };

    const apiResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${context.env.OPENAI_API_KEY}`, // Ensure the API key is set in environment variables
        },
        cf: {
          cacheTtl: 1800,
          cacheEverything: true,
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!apiResponse.ok) {
      const errorDetails = await apiResponse.text();
      console.error("OpenAI API error:", errorDetails);
      return new Response(
        JSON.stringify({
          error: "Failed to fetch data from OpenAI API",
          details: errorDetails,
        }),
        {
          status: apiResponse.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const data = await apiResponse.json();

    // Validate the response structure
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Unexpected API response structure:", data);
      return new Response(
        JSON.stringify({
          error: "Invalid response from OpenAI API",
          details: data,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const message = data.choices[0].message.content;
    return new Response(message, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "max-age=1800",
      },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
