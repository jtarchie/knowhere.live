const examples = [
  {
    "prompt": "Find gas stations along with fast food restaurants nearby.",
    "completion": [
      {
        "query": "nwr[amenity=fuel]",
        "radius": 1000,
      },
      {
        "query": "nwr[amenity=fast_food]",
        "radius": 1000,
      },
    ],
  },
  {
    "prompt": "Locate parks with rivers nearby.",
    "completion": [
      {
        "query": "nwr[leisure=park]",
        "radius": 1000,
      },
      {
        "query": "nwr[waterway=river]",
        "radius": 1000,
      },
    ],
  },
  {
    "prompt": "Find schools close to a bus stop.",
    "completion": [
      {
        "query": "nwr[amenity=school]",
        "radius": 2000,
      },
      {
        "query": "nwr[public_transport=bus_stop]",
        "radius": 500,
      },
    ],
  },
  {
    "prompt": "Search for hospitals near a cafe not named 'Starbucks'.",
    "completion": [
      {
        "query": "nwr[amenity=hospital]",
        "radius": 1000,
      },
      {
        "query": "nwr[amenity=cafe][name!~Starbucks]",
        "radius": 1000,
      },
    ],
  },
  {
    "prompt": "Find universities with cycleways nearby.",
    "completion": [
      {
        "query": "nwr[amenity=university]",
        "radius": 2000,
      },
      {
        "query": "nwr[highway=cycleway]",
        "radius": 1000,
      },
    ],
  },
  {
    "prompt": "Locate supermarkets within a short drive of parks.",
    "completion": [
      {
        "query": "nwr[shop=supermarket]",
        "radius": 20000,
      },
      {
        "query": "nwr[leisure=park]",
        "radius": 1000,
      },
    ],
  },
  {
    "prompt": "Search for cafes near bookstores.",
    "completion": [
      {
        "query": "nwr[amenity=cafe]",
        "radius": 1000,
      },
      {
        "query": "nwr[shop=books]",
        "radius": 1000,
      },
    ],
  },
  {
    "prompt": "Find high schools near a shopping mall.",
    "completion": [
      {
        "query": "nwr[amenity=school][isced:level=2,3]",
        "radius": 5000,
      },
      {
        "query": "nwr[shop=mall]",
        "radius": 5000,
      },
    ],
  },
  {
    "prompt": "Locate gyms with fast food restaurants nearby.",
    "completion": [
      {
        "query": "nwr[leisure=fitness_centre]",
        "radius": 5000,
      },
      {
        "query": "nwr[amenity=fast_food]",
        "radius": 1000,
      },
    ],
  },
  {
    "prompt": "Search for coffee shops that have free Wi-Fi.",
    "completion": [
      {
        "query": "nwr[amenity=cafe][internet_access=wlan]",
        "radius": 1000,
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
      },
      {
        "query": "nwr[shop=grocery,supermarket,convenience]",
        "radius": 2000,
      },
      {
        "query": "nwr[leisure=fitness_centre]",
        "radius": 2000,
      },
    ],
  },
  {
    "prompt": "Locate hospitals with pharmacies and parks nearby.",
    "completion": [
      {
        "query": "nwr[amenity=hospital]",
        "radius": 5000,
      },
      {
        "query": "nwr[amenity=pharmacy]",
        "radius": 1000,
      },
      {
        "query": "nwr[leisure=park]",
        "radius": 1000,
      },
    ],
  },
  {
    "prompt": "Find train stations with bike rental services and cafes nearby.",
    "completion": [
      {
        "query": "nwr[railway=station]",
        "radius": 5000,
      },
      {
        "query": "nwr[amenity=bicycle_rental]",
        "radius": 1000,
      },
      {
        "query": "nwr[amenity=cafe]",
        "radius": 1000,
      },
    ],
  },
  {
    "prompt": "Search for high schools near libraries and bus stops.",
    "completion": [
      {
        "query": "nwr[amenity=school][isced:level=2,3]",
        "radius": 2000,
      },
      {
        "query": "nwr[amenity=library]",
        "radius": 1000,
      },
      {
        "query": "nwr[public_transport=bus_stop]",
        "radius": 500,
      },
    ],
  },
  {
    "prompt": "Find parks with lakes and nearby fast food restaurants.",
    "completion": [
      {
        "query": "nwr[leisure=park]",
        "radius": 5000,
      },
      {
        "query": "nwr[waterway=lake]",
        "radius": 2000,
      },
      {
        "query": "nwr[amenity=fast_food]",
        "radius": 1000,
      },
    ],
  },
  {
    "prompt": "Locate shopping malls with parking lots and hotels nearby.",
    "completion": [
      {
        "query": "nwr[shop=mall]",
        "radius": 5000,
      },
      {
        "query": "nwr[amenity=parking]",
        "radius": 1000,
      },
      {
        "query": "nwr[tourism=hotel]",
        "radius": 1000,
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
      },
      {
        "query": "nwr[amenity=car_wash]",
        "radius": 1000,
      },
      {
        "query": "nwr[shop=convenience]",
        "radius": 1000,
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
      },
      {
        "query": "nwr[amenity=restaurant]",
        "radius": 1000,
      },
      {
        "query": "nwr[public_transport=station]",
        "radius": 1000,
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
      },
      {
        "query": "nwr[shop=books]",
        "radius": 1000,
      },
      {
        "query": "nwr[amenity=cafe][name=~Cat]",
        "radius": 1000,
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
      },
      {
        "query": "nwr[tourism=hotel]",
        "radius": 1000,
      },
      {
        "query": "nwr[public_transport=stop]",
        "radius": 1000,
      },
    ],
  },
  {
    "prompt": "Locate business parks that are near a diesel gas station, which is adjacent to a highway exit.",
    "completion": [
      { "query": "nwr[landuse=industrial]", "radius": 5000 },
      { "query": "nwr[amenity=fuel][fuel:diesel=yes]", "radius": 1000 },
      { "query": "nwr[highway=motorway_junction,services]", "radius": 500 }
    ]
  },
  {
    "prompt": "I want to find a neighborhood within driving distance of a Costco, which has a walkable coffee shop, that is next to a library.",
    "completion": [
      {
        "query": "nwr[shop=warehouse][name=~Costco]",
        "radius": 2000
      },
      {
        "query": "nwr[amenity=cafe]",
        "radius": 2000
      },
      {
        "query": "nwr[amenity=library]",
        "radius": 1000
      }
    ]
  }
];

import fs from "fs";

const payloadContent = fs.readFileSync(
  "prompt.md",
  "utf8",
);

const writeStream = fs.createWriteStream('payload.jsonl');

examples.forEach((example) => {
  writeStream.write(JSON.stringify({
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
  }) + "\n");
});
writeStream.end();