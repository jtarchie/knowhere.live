import { Manifest } from "./type";
import * as changeCase from "change-case";

const filters: { [key: string]: string[] } = {
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
  const [fullAddress, lat, lon] = params.address.split("|");
  const center = geo.asPoint(lat || 39.7401684, lon || -104.9894902);
  const [parsedAddress, found] = address.parse(fullAddress);
  if (!found) {
    throw new Error("could not parse address for state")
  }
  let features = [
    center.asFeature({
      "marker-color": colors.pick(0),
      "title": fullAddress,
    }),
  ];
  const prefix = parsedAddress.state.toLowerCase();
  
  const boundary = center.asBound().extend(params.radius); //meters
  features.push(boundary.asFeature({
    "fill": colors.pick(0),
    "fill-opacity": 0,
    "stroke": colors.pick(0),
  }))

  Object.keys(params).forEach((key, index) => {
    if (filters[key] && params[key] == "1") {
      const asQueries = filters[key].map((query) =>
        \`nwr\${query}(prefix=\${prefix})(bb=\${boundary.min()[0]},\${boundary.min()[1]},\${boundary.max()[0]},\${boundary.max()[1]})\`
      );
      const results = query.union(...asQueries);

      features = features.concat(results.map((result) => {
        return result.asFeature({
          "marker-color": colors.pick(index),
          "title": result.tags.name,
          "legend": key,
        });
      }));
    }
  });

  const payload = {
    type: "FeatureCollection",
    features: features,
  };

  assert.geoJSON(payload);
  export { payload };
`.trim();

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
      label: "Radius",
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
    defaultValue: "0",
  });
});

export { manifest };
