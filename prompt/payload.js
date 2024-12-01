const examples = [
  {
    prompt: "Find gas stations along with fast food restaurants nearby.",
    completion: {
      queries: [
        {
          query: "nwr[amenity=fuel]",
          radius: 1000,
          legend: "Gas Stations",
        },
        {
          query: "nwr[amenity=fast_food]",
          radius: 1000,
          legend: "Fast Food Restaurants",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt: "Locate parks with rivers nearby.",
    completion: {
      queries: [
        {
          query: "nwr[leisure=park]",
          radius: 1000,
          legend: "Parks",
        },
        {
          query: "nwr[waterway=river]",
          radius: 1000,
          legend: "Rivers",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt: "Find schools close to a bus stop.",
    completion: {
      queries: [
        {
          query: "nwr[amenity=school]",
          radius: 2000,
          legend: "Schools",
        },
        {
          query: "nwr[public_transport=bus_stop]",
          radius: 500,
          legend: "Bus Stops",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt: "Search for hospitals near a cafe not named 'Starbucks'.",
    completion: {
      queries: [
        {
          query: "nwr[amenity=hospital]",
          radius: 1000,
          legend: "Hospitals",
        },
        {
          query: "nwr[amenity=cafe][name!~Starbucks]",
          radius: 1000,
          legend: "Coffee Shops not Starbucks",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt: "Find universities with bike paths nearby.",
    completion: {
      queries: [
        {
          query: "nwr[amenity=university]",
          radius: 2000,
          legend: "Universities",
        },
        {
          query: "nwr[highway=cycleway]",
          radius: 1000,
          legend: "Bike Paths",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt: "Locate supermarkets within a short drive of parks.",
    completion: {
      queries: [
        {
          query: "nwr[shop=supermarket]",
          radius: 20000,
          legend: "Supermarkets",
        },
        {
          query: "nwr[leisure=park]",
          radius: 1000,
          legend: "Parks",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt: "Search for cafes near bookstores.",
    completion: {
      queries: [
        {
          query: "nwr[amenity=cafe]",
          radius: 1000,
          legend: "Cafes",
        },
        {
          query: "nwr[shop=books]",
          radius: 1000,
          legend: "Bookstores",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt: "Find high schools near a shopping mall.",
    completion: {
      queries: [
        {
          query: "nwr[amenity=school][isced:level=2,3]",
          radius: 5000,
          legend: "High Schools",
        },
        {
          query: "nwr[shop=mall]",
          radius: 5000,
          legend: "Shopping Malls",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt: "Locate gyms with fast food restaurants nearby.",
    completion: {
      queries: [
        {
          query: "nwr[leisure=fitness_centre]",
          radius: 5000,
          legend: "Gyms",
        },
        {
          query: "nwr[amenity=fast_food]",
          radius: 1000,
          legend: "Fast Food Restaurants",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt: "Search for coffee shops that have free Wi-Fi.",
    completion: {
      queries: [
        {
          query: "nwr[amenity=cafe][internet_access=wlan]",
          radius: 1000,
          legend: "Coffee Shops with Free Wi-Fi",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt:
      "Find universities with grocery stores and gyms within walking distance.",
    completion: {
      queries: [
        {
          query: "nwr[amenity=university]",
          radius: 5000,
          legend: "Universities",
        },
        {
          query: "nwr[shop=grocery,supermarket,convenience]",
          radius: 2000,
          legend: "Grocery Stores",
        },
        {
          query: "nwr[leisure=fitness_centre]",
          radius: 2000,
          legend: "Gyms",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt: "Locate hospitals with pharmacies and parks nearby.",
    completion: {
      queries: [
        {
          query: "nwr[amenity=hospital]",
          radius: 5000,
          legend: "Hospitals",
        },
        {
          query: "nwr[amenity=pharmacy]",
          radius: 1000,
          legend: "Pharmacies",
        },
        {
          query: "nwr[leisure=park]",
          radius: 1000,
          legend: "Parks",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt: "Find train stations with bike rental services and cafes nearby.",
    completion: {
      queries: [
        {
          query: "nwr[railway=station]",
          radius: 5000,
          legend: "Train Stations",
        },
        {
          query: "nwr[amenity=bicycle_rental]",
          radius: 1000,
          legend: "Bike Rental Services",
        },
        {
          query: "nwr[amenity=cafe]",
          radius: 1000,
          legend: "Cafes",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt: "Search for high schools near libraries and bus stops.",
    completion: {
      queries: [
        {
          query: "nwr[amenity=school][isced:level=2,3]",
          radius: 2000,
          legend: "High Schools",
        },
        {
          query: "nwr[amenity=library]",
          radius: 1000,
          legend: "Libraries",
        },
        {
          query: "nwr[public_transport=bus_stop]",
          radius: 500,
          legend: "Bus Stops",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt: "Find parks with lakes and nearby fast food restaurants.",
    completion: {
      queries: [
        {
          query: "nwr[leisure=park]",
          radius: 5000,
          legend: "Parks",
        },
        {
          query: "nwr[waterway=lake]",
          radius: 2000,
          legend: "Lakes",
        },
        {
          query: "nwr[amenity=fast_food]",
          radius: 1000,
          legend: "Fast Food Restaurants",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt: "Locate shopping malls with parking lots and hotels nearby.",
    completion: {
      queries: [
        {
          query: "nwr[shop=mall]",
          radius: 5000,
          legend: "Shopping Malls",
        },
        {
          query: "nwr[amenity=parking]",
          radius: 1000,
          legend: "Parking Lots",
        },
        {
          query: "nwr[tourism=hotel]",
          radius: 1000,
          legend: "Hotels",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt: "Find gas stations with car washes and convenience stores nearby.",
    completion: {
      queries: [
        {
          query: "nwr[amenity=fuel]",
          radius: 5000,
          legend: "Gas Stations",
        },
        {
          query: "nwr[amenity=car_wash]",
          radius: 1000,
          legend: "Car Washes",
        },
        {
          query: "nwr[shop=convenience]",
          radius: 1000,
          legend: "Convenience Stores",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt: "Search for cinemas near restaurants and public transit stations.",
    completion: {
      queries: [
        {
          query: "nwr[amenity=cinema]",
          radius: 5000,
          legend: "Cinemas",
        },
        {
          query: "nwr[amenity=restaurant]",
          radius: 1000,
          legend: "Restaurants",
        },
        {
          query: "nwr[public_transport=station]",
          radius: 1000,
          legend: "Public Transit Stations",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt:
      "Locate universities with bookstores and coffee shops nearby containing the word 'Cat'.",
    completion: {
      queries: [
        {
          query: "nwr[amenity=university]",
          radius: 5000,
          legend: "Universities",
        },
        {
          query: "nwr[shop=books]",
          radius: 1000,
          legend: "Bookstores",
        },
        {
          query: "nwr[amenity=cafe][name=~Cat]",
          radius: 1000,
          legend: "Coffee Shops with 'Cat' in their name",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt: "Find tourist attractions near hotels and public transport stops.",
    completion: {
      queries: [
        {
          query: "nwr[tourism=attraction]",
          radius: 5000,
          legend: "Tourist Attractions",
        },
        {
          query: "nwr[tourism=hotel]",
          radius: 1000,
          legend: "Hotels",
        },
        {
          query: "nwr[public_transport=stop]",
          radius: 1000,
          legend: "Public Transport Stops",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt:
      "Locate business parks that are near a diesel gas station, which is adjacent to a highway exit around Pittsburgh, PA.",
    completion: {
      queries: [
        {
          query: "nwr[landuse=industrial]",
          radius: 5000,
          legend: "Business Parks",
        },
        {
          query: "nwr[amenity=fuel][fuel:diesel=yes]",
          radius: 1000,
          legend: "Diesel Gas Stations",
        },
        {
          query: "nwr[highway=motorway_junction,services]",
          radius: 500,
          legend: "Highway Exits",
        },
      ],
      areas: ["pennsylvania"],
      bounds: {
        query: "nwr[boundary=administrative][admin_level>=6][name=~Pittsburgh]",
        legend: "Pittsburgh, PA",
      },
    },
  },
  {
    prompt:
      "I want to find a neighborhood within driving distance of a Costco, which has a walkable coffee shop, that is next to a library.",
    completion: {
      queries: [
        {
          query: "nwr[shop=warehouse][name=~Costco]",
          radius: 2000,
          legend: "Costco",
        },
        {
          query: "nwr[amenity=cafe]",
          radius: 2000,
          legend: "Cafes",
        },
        {
          query: "nwr[amenity=library]",
          radius: 1000,
          legend: "Libraries",
        },
      ],
      areas: [],
      bounds: {},
    },
  },
  {
    prompt:
      "Please find me skate parks in all the states that are sunny year round.",
    // https://wiki.openstreetmap.org/wiki/Tag:sport%3Dskateboard
    completion: {
      queries: [
        {
          query: "nwr[leisure=pitch][sport=skateboard]",
          radius: 1000,
          legend: "Skateparks",
        },
      ],
      areas: [
        "arizona",
        "california",
        "florida",
        "nevada",
        "new_mexico",
        "texas",
      ],
      bounds: {},
    },
  },
  {
    prompt: "I want to be near a ski resort in Colorado or Utah.",
    // https://wiki.openstreetmap.org/wiki/Tag:landuse%3Dwinter_sports
    completion: {
      queries: [
        {
          query: "nwr[landuse=winter_sports]",
          radius: 10000,
          legend: "Ski Resorts",
        },
      ],
      areas: ["colorado", "utah"],
      bounds: {},
    },
  },
  {
    prompt:
      "I want to live in state with sunny weather all year round. I'd like to have a Costco in 10 mile driving distance, with a great trail system near by.",
    completion: {
      queries: [
        {
          query: "nwr[shop=warehouse][name=~Costco]",
          radius: 16093,
          legend: "Costco",
        },
        {
          query: "nwr[highway=path][oneway!=yes]",
          radius: 1000,
          legend: "Trail Systems",
        },
      ],
      areas: ["arizona", "california", "florida", "hawaii", "texas"],
      bounds: {},
    },
  },
];

import fs from "fs";

const payloadContent = fs.readFileSync("prompt.md", "utf8");

const writeStream = fs.createWriteStream("payload.jsonl");

examples.forEach((example) => {
  writeStream.write(
    JSON.stringify({
      messages: [
        {
          role: "system",
          content: payloadContent,
        },
        {
          role: "user",
          content: example.prompt,
        },
        {
          role: "assistant",
          content: JSON.stringify(example.completion),
        },
      ],
    }) + "\n",
  );
});
writeStream.end();
