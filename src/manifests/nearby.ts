import { Manifest } from "./type";
// @ts-ignore: comes as string from vite-string-plugin
import rawJavascript from "./scripts/nearby.js";

const filters: {
  [key: string]: { queries: string[]; markerSymbol: string; label: string };
} = {
  "schools": {
    queries: ["[amenity=school,college,university][name]"],
    markerSymbol: "school",
    "label": "Schools",
  },
  "arts_and_entertainment": {
    queries: [
      "[amenity=arts_centre][name]",
      "[leisure=theatre][name]",
      "[tourism=gallery][name]",
    ],
    markerSymbol: "art-gallery",
    label: "Arts and Entertainment",
  },
  "banking": {
    queries: ["[amenity=bank,atm][name]"],
    markerSymbol: "bank",
    label: "Banking",
  },
  "fire_and_police": {
    queries: ["[amenity=fire_station,police][name]"],
    markerSymbol: "police",
    label: "Fire and Police",
  },
  "food_and_dining": {
    queries: ["[amenity=restaurant,cafe,fast_food][name]"],
    markerSymbol: "restaurant",
    label: "Food and Dining",
  },
  "gas_stations": {
    queries: ["[amenity=fuel][name]"],
    markerSymbol: "fuel",
    label: "Gas Stations",
  },
  "health_care": {
    queries: ["[amenity=hospital,clinic,doctors,dentist,pharmacy][name]"],
    markerSymbol: "hospital",
    label: "Health Care",
  },
  "libraries": {
    queries: ["[amenity=library][name]"],
    markerSymbol: "library",
    label: "Libraries",
  },
  "post_offices": {
    queries: ["[amenity=post_office][name]"],
    markerSymbol: "post",
    label: "Post Offices",
  },
  "religious_organizations": {
    queries: ["[amenity=place_of_worship][name]"],
    markerSymbol: "place-of-worship",
    label: "Religious Organizations",
  },
  "shopping": {
    queries: ["[shop][name]"],
    markerSymbol: "shop",
    label: "Shopping",
  },
  "sports": {
    queries: ["[leisure=sports_centre,pitch,stadium][name]"],
    markerSymbol: "stadium",
    label: "Sports",
  },
  "transportation": {
    queries: [
      "[amenity=bus_station,taxi][name]",
      "[public_transport=stop_position][name]",
      "[amenity=taxi][name]",
      "[railway=station][name]",
    ],
    markerSymbol: "bus",
    label: "Transportation",
  },
  "fitness_and_recreation": {
    queries: [
      "[leisure=gym,fitness_centre][name]",
      "[amenity=community_centre][name]",
    ],
    markerSymbol: "gym",
    label: "Fitness and Recreation",
  },
};

const source = `const filters = ${JSON.stringify(filters)};` + rawJavascript;

const manifest: Manifest = {
  source: source,
  form: [
    {
      type: "address",
      label: "Address",
      name: "address",
      placeholder: "742 Evergreen Terrace, Springfield, USA",
      defaultValue: {
        full_address: "200 E Colfax Ave, Denver, Colorado 80203",
        latitude: 39.7401684,
        longitude: -104.9894902,
      },
      hint: "Full address of location",
    },
    {
      type: "range",
      defaultValue: "2500",
      min: 1000,
      max: 5000,
      step: 500,
      label: "Radius (in meters)",
      name: "radius",
    },
  ],
  about: "Given an address see what is near by in entertainment, schools, etc.",
};

Object.entries(filters).forEach(([key, filter]) => {
  manifest.form.push({
    type: "checkbox",
    label: filter.label,
    name: key,
    defaultValue: false,
  });
});

export { manifest };
