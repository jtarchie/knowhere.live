import { Manifest } from "./type";
import * as changeCase from "change-case";

const filters: { [key: string]: { queries: string[]; markerSymbol: string } } =
  {
    "schools": {
      queries: ["[amenity=school][name]"],
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
    "education": {
      queries: ["[amenity=school,college,university][name]"],
      markerSymbol: "college",
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
      const asQueries = filters[key].queries.map((query) =>
        \`nwr\${query}(prefix=\${prefix})(bb=\${boundary.min()[0]},\${boundary.min()[1]},\${boundary.max()[0]},\${boundary.max()[1]})\`
      );
      const results = query.union(...asQueries);

      features = features.concat(results.map((result) => {
        return result.asFeature({
          "marker-color": colors.pick(index),
          "title": result.tags.name,
          "legend": key,
          "marker-symbol": filters[key].markerSymbol
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
    defaultValue: "0",
  });
});

export { manifest };
