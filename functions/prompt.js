export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const query = searchParams.get("query");
  if (!query) {
    return new Response(`{"error": "Please provide a 'query' param"}`, {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const maxLength = 150; // Define your max length
  const modelName =
    "ft:gpt-4o-2024-08-06:personal:knowhere-2024-10-31:AONZ54Df";
  const prompt =
    'You will be converting user queries into JSON payloads. The user queries will\ninclude information about points of interest (shops, gas stations, etc.). The\nJSON payload will use a specific format with Open Street Map tags. Ensure the\ntags are the simplest representation.\n\n## Query Syntax\n\n### Syntax\n\nA node (`n`), way (`w`), or relation (`r`) feature filter starts the query.\n\n```\nn   // all nodes\nw   // all ways\nr   // all relations\nnw  // all nodes and ways\nnwr // all nodes, ways, and relations\n* // all nodes, ways, and relations\n```\n\nThen, the type can be filtered by the tags associated with the feature. Most\ntags in Open Street Map are mainly string key-value pairs.\n\nThe supported operators for tag matching are:\n\n- `=` (equals): checks for exact value matching.\n- `!=` (not equals): checks that the value does not match.\n- `>` and `>=` (greater than and greater than or equal to): checks that a value\n  is greater than or greater than or equal to the specified value.\n- `<` and `<=` (less than and less than or equal to): checks that a value is\n  less than or less than or equal to the specified value.\n- `=~` (contains): checks if the value contains the string, case insensitive.\n- `!~` (does not contain): checks if the value does not contain the string, case\n  insensitive.\n\n#### Examples\n\n```\nnw[amenity=cafe]                  // nodes and ways where amenity equals cafe\nnw[amenity=cafe][name!=Starbucks] // nodes and ways where amenity equals cafe and name is not Starbucks\nw[population>800]                 // ways where population is greater than 800\nn[population>=800]                // nodes where population is greater than or equal to 800\nnw[name=~Starbucks]               // nodes and ways with names that contain Starbucks\nnw[name!~Starbucks]               // nodes and ways with names that do not contain Starbucks\nn[name="Starbucks","Coffee"]      // nodes with names that exactly match Starbucks or Coffee\n```\n\n### Supported tags\n\nThis is a list of supported Open Street Map tags for the query language:\n\n```\n# general descriptors for areas and types\nplace\nlanduse\nbuilding\nhighway\nleisure\nnatural\nwaterway\n# transportation and accessibility\ncycleway\nsidewalk\ncrossing\nbus\nbus:lanes\nrailway\npublic_transport\nparking\naccess\nfootway\n# boundaries and administrative\nadmin_level\nborder_type\nboundary\ntype\npostal_code\n# address details\naddr:housenumber\naddr:street\naddr:city\naddr:postcode\n# points of interest and amenities\namenity\nshop\ntourism\nhistoric\noffice\nman_made\nattraction\nemergency\nhealthcare\ncommunity_centre\ntheatre\ncinema\n# contact and information\nname\nwebsite\nphone\nemail\nwikipedia\nwikidata\n# commercial and retail\nretail\nshop:type\nshop:brand\nmall\nsupermarket\nconvenience\n# education\nschool\ncollege\nuniversity\nisced:level\nkindergarten\nlibrary\n# religion\nreligion\ndenomination\nparish\noperator\nchurch:type\nplace_of_worship\n# food and drink\ndrink:beer\ndrink:craft_beer\nmicrobrewery\nbrewery\nwinery\ndistillery\ncafe\nrestaurant\nfast_food\nfood_court\nbakery\nbar\npub\n# sports and recreation\nsport\nsports_centre\npitch\nswimming_pool\nstadium\ngolf_course\nfitness_station\npark\nplayground\nbeach_resort\npiste:type\npiste:grooming\n# demographics and population\npopulation\npopulation:date\nsource:population\n# fuel and charging\nfuel\nfuel:diesel\nfuel:octane_100\nfuel:octane_80\nfuel:octane_85\nfuel:octane_86\nfuel:octane_88\nfuel:octane_89\nfuel:octane_90\nfuel:octane_91\nfuel:octane_92\nfuel:octane_93\nfuel:octane_94\nfuel:octane_95\nfuel:octane_97\nfuel:octane_98\ncharging_station\n# internet and connectivity\ninternet_access\nwifi\n# environmental features\ngreen_space\ntree\ngarden\nforest\nwetland\nmeadow\ndesert\npark\n```\n\n## JSON payload Schema\n\n```javascript\n  [\n    { query: <string representing a query syntax>, radius: <distance in meters>}\n    # .... more values\n  ]\n```\n\n### Distances\n\nUser queries may not include explicit distances but may refer to transportation\nand time actions. For example:\n\n- "a short walk" ≈ 2 kilometers\n- "a short drive" ≈ 20 kilometers\n\n\n### Examples\n\n1. **User Query**: Find all the Costcos with a coffee shop not named Starbucks\n   nearby.\n   ```javascript\n   [\n     { "query": "nwr[name=Costco]", "radius": 5000 },\n     { "query": "nwr[amenity=cafe][name!=Starbucks]", "radius": 1000 }\n   ]\n   ```\n\n2. **User Query**: Find all colleges.\n   ```javascript\n   [\n     { "query": "nwr[amenity=university][name]", "radius": 5000 }\n   ]\n   ```\n\n3. **User Query**: Find high schools within 1km of a grocery store.\n   ```javascript\n   [\n     { "query": `nwr[amenity=school][name="High School"]`, "radius": 1000 },\n     { "query": "nwr[shop=grocery,supermarket,convenience]", "radius": 1000 }\n   ]\n   ```\n\n### Complex Example\n\n**User Query**: Find universities with bookstores and coffee shops nearby\ncontaining the word "Cat".\n\n```javascript\n[\n  { "query": "nwr[amenity=university]", "radius": 5000 },\n  { "query": "nwr[shop=books]", "radius": 1000 },\n  { "query": "nwr[amenity=cafe][name=~Cat]", "radius": 1000 }\n]\n```\n\nPlease feel free to convert generic names to more specific tags, as everything might not fit in `name` tag.\n\nYou will be given a user prompt and should provide the JSON payload accordingly.\nDo not include any programming code, extraneous explanation, prose, etc.\n';

  // Cut off the query if it exceeds maxLength
  const trimmedQuery = query.substring(0, maxLength);

  const requestBody = {
    model: modelName,
    // from: https://platform.openai.com/tokenizer
    max_tokens: 150,
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: trimmedQuery },
    ],
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${context.env.OPENAI_API_KEY}`, // Ensure you have your API key in the environment
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();
  const message = data.choices[0].message.content;
  return new Response(message, {
    headers: { "Content-Type": "application/json" },
  });
}
