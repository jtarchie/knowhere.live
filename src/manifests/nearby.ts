// deno-lint-ignore-file

import { Manifest } from "./type";
import * as changeCase from "change-case";

/* @__PURE__ */
const filters: { [key: string]: string[] } = /* @__PURE__ */ {
  "schools": ["[amenity=school][name]"],
  "arts_and_entertainment": [
    "[amenity=arts_centre][name]",
    "[leisure=theatre][name]",
    "[tourism=gallery][name]",
  ],
  "banking": [
    "[amenity=bank,atm][name]",
  ],
  "education": [
    "[amenity=school,college,university][name]",
  ],
  "fire_and_police": [
    "[amenity=fire_station,police][name]",
  ],
  "food_and_dining": [
    "[amenity=restaurant,cafe,fast_food][name]",
  ],
  "gas_stations": [
    "[amenity=fuel][name]",
  ],
  "health_care": [
    "[amenity=hospital,clinic,doctors,dentist,pharmacy][name]",
  ],
  "libraries": [
    "[amenity=library][name]",
  ],
  "post_offices": [
    "[amenity=post_office][name]",
  ],
  "religious_organizations": [
    "[amenity=place_of_worship][name]",
  ],
  "shopping": [
    "[shop][name]",
  ],
  "sports": [
    "[leisure=sports_centre,pitch,stadium][name]",
  ],
  "transportation": [
    "[amenity=bus_station,taxi][name]",
    "[public_transport=stop_position][name]",
    "[amenity=taxi][name]",
    "[railway=station][name]",
  ],
};

/* @__PURE__ */
const source = `
  const filters = ${JSON.stringify(filters)};
  const center = geo.asPoint(params.address_lat || 39.7401684, params.address_lon || -104.9894902);
  const [parsedAddress, found] = address.parse(params.address_full_address);
  if (!found) {
    throw new Error("could not parse address for state")
  }
  let features = [
    center.asFeature({
      "marker-color": colors.pick(0),
      "title": params.address_full_address,
    }),
  ];
  const prefix = parsedAddress.state.toLowerCase();
  
  const boundary = center.asBound().extend(10000); //meters
  features.push(boundary.asFeature({
    "fill": colors.pick(0),
    "fill-opacity": 0,
    "stroke": colors.pick(0),
  }))

  Object.keys(params).forEach((key, index) => {
    if (filters[key] && params[key] == "1") {
      const asQueries = filters[key].map((query) =>
        \`nwr\${query}(prefix=\${prefix})(bb=\${boundary.min[0]},\${boundary.min[1]},\${boundary.max[0]},\${boundary.max[1]})\`
      );
      const results = query.union(...asQueries);
      // assert.eq(results.length > 0, asQueries.join(","))
      // const tree = results.asTree(0);
      // const nearby = tree.search(boundary, 500);
      // assert.eq(nearby.length > 0, asQueries.join(","))

      features = features.concat(results.map((result) => {
        return result.asFeature({
          "marker-color": colors.pick(index),
          "title": result.name,
        });
      }));
    }
  });

  const payload = {
    type: "FeatureCollection",
    features: features,
  };

  assert.geoJSON(payload);
  return payload;
`.trim();

const manifest: Manifest = {
  source: source,
  filter: [
    {
      type: "address",
      label: "Address",
      name: "address",
      placeholder: "742 Evergreen Terrace, Springfield ",
      defaultValue: "",
      hint: "Full address of location",
    },
  ],
  about: "Given an address see what is near by in entertainment, schools, etc.",
  filterValues: {},
};

Object.keys(filters).forEach((key) => {
  manifest.filter.push({
    type: "checkbox",
    label: changeCase.capitalCase(key),
    name: key,
  });
});

export { manifest };
