import { Manifest } from "./type";
import * as changeCase from "change-case";
// @ts-ignore: comes as string from vite-string-plugin
import rawJavascript from "./scripts/nearby.js";

const filters: { [key: string]: { queries: string[]; markerSymbol: string } } =
  {
    "schools": {
      queries: ["[amenity=school,college,university][name]"],
      markerSymbol: "school",
    },
    "arts_and_entertainment": {
      queries: [
        "[amenity=arts_centre][name]",
        "[leisure=theatre][name]",
        "[tourism=gallery][name]",
      ],
      markerSymbol: "art-gallery",
    },
    "banking": {
      queries: ["[amenity=bank,atm][name]"],
      markerSymbol: "bank",
    },
    "fire_and_police": {
      queries: ["[amenity=fire_station,police][name]"],
      markerSymbol: "police",
    },
    "food_and_dining": {
      queries: ["[amenity=restaurant,cafe,fast_food][name]"],
      markerSymbol: "restaurant",
    },
    "gas_stations": {
      queries: ["[amenity=fuel][name]"],
      markerSymbol: "fuel",
    },
    "health_care": {
      queries: ["[amenity=hospital,clinic,doctors,dentist,pharmacy][name]"],
      markerSymbol: "hospital",
    },
    "libraries": {
      queries: ["[amenity=library][name]"],
      markerSymbol: "library",
    },
    "post_offices": {
      queries: ["[amenity=post_office][name]"],
      markerSymbol: "post",
    },
    "religious_organizations": {
      queries: ["[amenity=place_of_worship][name]"],
      markerSymbol: "place-of-worship",
    },
    "shopping": {
      queries: ["[shop][name]"],
      markerSymbol: "shop",
    },
    "sports": {
      queries: ["[leisure=sports_centre,pitch,stadium][name]"],
      markerSymbol: "stadium",
    },
    "transportation": {
      queries: [
        "[amenity=bus_station,taxi][name]",
        "[public_transport=stop_position][name]",
        "[amenity=taxi][name]",
        "[railway=station][name]",
      ],
      markerSymbol: "bus",
    },
    "fitness_and_recreation": {
      queries: [
        "[leisure=gym,fitness_centre][name]",
        "[amenity=community_centre][name]",
      ],
      markerSymbol: "gym",
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
      placeholder: "742 Evergreen Terrace, Springfield ",
      defaultValue:
        "200 E Colfax Ave, Denver, Colorado 80203|39.7401684|-104.9894902",
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

Object.keys(filters).forEach((key) => {
  manifest.form.push({
    type: "checkbox",
    label: changeCase.capitalCase(key),
    name: key,
    defaultValue: false,
  });
});

export { manifest };
