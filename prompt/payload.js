const examples = [
  {
    "prompt": "Find gas stations along with fast food restaurants nearby.",
    "completion": [
      {
        "query": "nwr[amenity=fuel]",
        "radius": 1000,
        "legend": "Gas Stations",
      },
      {
        "query": "nwr[amenity=fast_food]",
        "radius": 1000,
        "legend": "Fast Food Restaurants",
      },
    ],
  },
  {
    "prompt": "Locate parks with rivers nearby.",
    "completion": [
      {
        "query": "nwr[leisure=park]",
        "radius": 1000,
        "legend": "Parks",
      },
      {
        "query": "nwr[waterway=river]",
        "radius": 1000,
        "legend": "Rivers",
      },
    ],
  },
  {
    "prompt": "Find schools close to a bus stop.",
    "completion": [
      {
        "query": "nwr[amenity=school]",
        "radius": 2000,
        "legend": "Schools",
      },
      {
        "query": "nwr[public_transport=bus_stop]",
        "radius": 500,
        "legend": "Bus Stops",
      },
    ],
  },
  {
    "prompt": "Search for hospitals near a cafe not named 'Starbucks'.",
    "completion": [
      {
        "query": "nwr[amenity=hospital]",
        "radius": 1000,
        "legend": "Hospitals",
      },
      {
        "query": "nwr[amenity=cafe][name!~Starbucks]",
        "radius": 1000,
        "legend": "Coffee Shops not Starbucks",
      },
    ],
  },
  {
    "prompt": "Find universities with bike paths nearby.",
    "completion": [
      {
        "query": "nwr[amenity=university]",
        "radius": 2000,
        "legend": "Universities",
      },
      {
        "query": "nwr[highway=cycleway]",
        "radius": 1000,
        "legend": "Bike Paths",
      },
    ],
  },
  {
    "prompt": "Locate supermarkets within a short drive of parks.",
    "completion": [
      {
        "query": "nwr[shop=supermarket]",
        "radius": 20000,
        "legend": "Supermarkets",
      },
      {
        "query": "nwr[leisure=park]",
        "radius": 1000,
        "legend": "Parks",
      },
    ],
  },
  {
    "prompt": "Search for cafes near bookstores.",
    "completion": [
      {
        "query": "nwr[amenity=cafe]",
        "radius": 1000,
        "legend": "Cafes",
      },
      {
        "query": "nwr[shop=books]",
        "radius": 1000,
        "legend": "Bookstores",
      },
    ],
  },
  {
    "prompt": "Find high schools near a shopping mall.",
    "completion": [
      {
        "query": "nwr[amenity=school][isced:level=2,3]",
        "radius": 5000,
        "legend": "High Schools",
      },
      {
        "query": "nwr[shop=mall]",
        "radius": 5000,
        "legend": "Shopping Malls",
      },
    ],
  },
  {
    "prompt": "Locate gyms with fast food restaurants nearby.",
    "completion": [
      {
        "query": "nwr[leisure=fitness_centre]",
        "radius": 5000,
        "legend": "Gyms",
      },
      {
        "query": "nwr[amenity=fast_food]",
        "radius": 1000,
        "legend": "Fast Food Restaurants",
      },
    ],
  },
  {
    "prompt": "Search for coffee shops that have free Wi-Fi.",
    "completion": [
      {
        "query": "nwr[amenity=cafe][internet_access=wlan]",
        "radius": 1000,
        "legend": "Coffee Shops with Free Wi-Fi",
      },
    ],
  },
  {
    "prompt":
      "Find universities with grocery stores and gyms within walking distance.",
    "completion": [
      {
        "query": "nwr[amenity=university]",
        "radius": 5000,
        "legend": "Universities",
      },
      {
        "query": "nwr[shop=grocery,supermarket,convenience]",
        "radius": 2000,
        "legend": "Grocery Stores",
      },
      {
        "query": "nwr[leisure=fitness_centre]",
        "radius": 2000,
        "legend": "Gyms",
      },
    ],
  },
  {
    "prompt": "Locate hospitals with pharmacies and parks nearby.",
    "completion": [
      {
        "query": "nwr[amenity=hospital]",
        "radius": 5000,
        "legend": "Hospitals",
      },
      {
        "query": "nwr[amenity=pharmacy]",
        "radius": 1000,
        "legend": "Pharmacies",
      },
      {
        "query": "nwr[leisure=park]",
        "radius": 1000,
        "legend": "Parks",
      },
    ],
  },
  {
    "prompt": "Find train stations with bike rental services and cafes nearby.",
    "completion": [
      {
        "query": "nwr[railway=station]",
        "radius": 5000,
        "legend": "Train Stations",
      },
      {
        "query": "nwr[amenity=bicycle_rental]",
        "radius": 1000,
        "legend": "Bike Rental Services",
      },
      {
        "query": "nwr[amenity=cafe]",
        "radius": 1000,
        "legend": "Cafes",
      },
    ],
  },
  {
    "prompt": "Search for high schools near libraries and bus stops.",
    "completion": [
      {
        "query": "nwr[amenity=school][isced:level=2,3]",
        "radius": 2000,
        "legend": "High Schools",
      },
      {
        "query": "nwr[amenity=library]",
        "radius": 1000,
        "legend": "Libraries",
      },
      {
        "query": "nwr[public_transport=bus_stop]",
        "radius": 500,
        "legend": "Bus Stops",
      },
    ],
  },
  {
    "prompt": "Find parks with lakes and nearby fast food restaurants.",
    "completion": [
      {
        "query": "nwr[leisure=park]",
        "radius": 5000,
        "legend": "Parks",
      },
      {
        "query": "nwr[waterway=lake]",
        "radius": 2000,
        "legend": "Lakes",
      },
      {
        "query": "nwr[amenity=fast_food]",
        "radius": 1000,
        "legend": "Fast Food Restaurants",
      },
    ],
  },
  {
    "prompt": "Locate shopping malls with parking lots and hotels nearby.",
    "completion": [
      {
        "query": "nwr[shop=mall]",
        "radius": 5000,
        "legend": "Shopping Malls",
      },
      {
        "query": "nwr[amenity=parking]",
        "radius": 1000,
        "legend": "Parking Lots",
      },
      {
        "query": "nwr[tourism=hotel]",
        "radius": 1000,
        "legend": "Hotels",
      },
    ],
  },
  {
    "prompt":
      "Find gas stations with car washes and convenience stores nearby.",
    "completion": [
      {
        "query": "nwr[amenity=fuel]",
        "radius": 5000,
        "legend": "Gas Stations",
      },
      {
        "query": "nwr[amenity=car_wash]",
        "radius": 1000,
        "legend": "Car Washes",
      },
      {
        "query": "nwr[shop=convenience]",
        "radius": 1000,
        "legend": "Convenience Stores",
      },
    ],
  },
  {
    "prompt":
      "Search for cinemas near restaurants and public transit stations.",
    "completion": [
      {
        "query": "nwr[amenity=cinema]",
        "radius": 5000,
        "legend": "Cinemas",
      },
      {
        "query": "nwr[amenity=restaurant]",
        "radius": 1000,
        "legend": "Restaurants",
      },
      {
        "query": "nwr[public_transport=station]",
        "radius": 1000,
        "legend": "Public Transit Stations",
      },
    ],
  },
  {
    "prompt":
      "Locate universities with bookstores and coffee shops nearby containing the word 'Cat'.",
    "completion": [
      {
        "query": "nwr[amenity=university]",
        "radius": 5000,
        "legend": "Universities",
      },
      {
        "query": "nwr[shop=books]",
        "radius": 1000,
        "legend": "Bookstores",
      },
      {
        "query": "nwr[amenity=cafe][name=~Cat]",
        "radius": 1000,
        "legend": "Coffee Shops with 'Cat' in their name",
      },
    ],
  },
  {
    "prompt":
      "Find tourist attractions near hotels and public transport stops.",
    "completion": [
      {
        "query": "nwr[tourism=attraction]",
        "radius": 5000,
        "legend": "Tourist Attractions",
      },
      {
        "query": "nwr[tourism=hotel]",
        "radius": 1000,
        "legend": "Hotels",
      },
      {
        "query": "nwr[public_transport=stop]",
        "radius": 1000,
        "legend": "Public Transport Stops",
      },
    ],
  },
  {
    "prompt":
      "Locate business parks that are near a diesel gas station, which is adjacent to a highway exit.",
    "completion": [
      {
        "query": "nwr[landuse=industrial]",
        "radius": 5000,
        "legend": "Business Parks",
      },
      {
        "query": "nwr[amenity=fuel][fuel:diesel=yes]",
        "radius": 1000,
        "legend": "Diesel Gas Stations",
      },
      {
        "query": "nwr[highway=motorway_junction,services]",
        "radius": 500,
        "legend": "Highway Exits",
      },
    ],
  },
  {
    "prompt":
      "I want to find a neighborhood within driving distance of a Costco, which has a walkable coffee shop, that is next to a library.",
    "completion": [
      {
        "query": "nwr[shop=warehouse][name=~Costco]",
        "radius": 2000,
        "legend": "Costco",
      },
      {
        "query": "nwr[amenity=cafe]",
        "radius": 2000,
        "legend": "Cafes",
      },
      {
        "query": "nwr[amenity=library]",
        "radius": 1000,
        "legend": "Libraries",
      },
    ],
  },
  {
    "prompt": "I want to live near a skatepark.",
    // https://wiki.openstreetmap.org/wiki/Tag:sport%3Dskateboard
    "completion": [
      {
        "query": "nwr[leisure=pitch][sport=skateboard]",
        "radius": 1000,
        "legend": "Skateparks",
      },
    ],
  },
  {
    "prompt": "I want to be near a ski resort.",
    // https://wiki.openstreetmap.org/wiki/Tag:landuse%3Dwinter_sports
    "completion": [
      {
        "query": "nwr[landuse=winter_sports]",
        "radius": 10000,
        "legend": "Ski Resorts",
      },
    ],
  },
];

import fs from "fs";

const payloadContent = fs.readFileSync(
  "prompt.md",
  "utf8",
);

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
