/// <reference path="../../../docs/src/global.d.ts" />

const stateMapping = {
  "ca-ab": "alberta",
  "ca-bc": "british_columbia",
  "ca-mb": "manitoba",
  "ca-nb": "new_brunswick",
  "ca-nl": "newfoundland_and_labrador",
  "ca-nt": "northwest_territories",
  "ca-ns": "nova_scotia",
  "ca-nu": "nunavut",
  "ca-on": "ontario",
  "ca-pe": "prince_edward_island",
  "ca-qc": "quebec",
  "ca-sk": "saskatchewan",
  "ca-yt": "yukon",
  "us-al": "alabama",
  "us-ak": "alaska",
  "us-az": "arizona",
  "us-ar": "arkansas",
  "us-ca": "california",
  "us-co": "colorado",
  "us-ct": "connecticut",
  "us-de": "delaware",
  "us-dc": "district_of_columbia",
  "us-fl": "florida",
  "us-ga": "georgia",
  "us-hi": "hawaii",
  "us-id": "idaho",
  "us-il": "illinois",
  "us-in": "indiana",
  "us-ia": "iowa",
  "us-ks": "kansas",
  "us-ky": "kentucky",
  "us-la": "louisiana",
  "us-me": "maine",
  "us-md": "maryland",
  "us-ma": "massachusetts",
  "us-mi": "michigan",
  "us-mn": "minnesota",
  "us-ms": "mississippi",
  "us-mo": "missouri",
  "us-mt": "montana",
  "us-ne": "nebraska",
  "us-nv": "nevada",
  "us-nh": "new_hampshire",
  "us-nj": "new_jersey",
  "us-nm": "new_mexico",
  "us-ny": "new_york",
  "us-nc": "north_carolina",
  "us-nd": "north_dakota",
  "us-oh": "ohio",
  "us-ok": "oklahoma",
  "us-or": "oregon",
  "us-pa": "pennsylvania",
  "us-pr": "puerto_rico",
  "us-ri": "rhode_island",
  "us-sc": "south_carolina",
  "us-sd": "south_dakota",
  "us-tn": "tennessee",
  "us-tx": "texas",
  "us-ut": "utah",
  "us-vt": "vermont",
  "us-va": "virginia",
  "us-wa": "washington",
  "us-wv": "west_virginia",
  "us-wi": "wisconsin",
  "us-wy": "wyoming",
};

const walkScore = (distance, limit) => {
  // return 100 * Math.max(0, 1 - (distance / limit));
  return 100 * Math.exp(-0.5 * (distance / limit));
};

const median = (values) => {
  values.sort((a, b) => a - b);
  const mid = Math.floor(values.length / 2);

  if (values.length % 2 !== 0) {
    return values[mid];
  }

  return (values[mid - 1] + values[mid]) / 2;
};

const overallScore = (distances, limit) => {
  const values = distances.filter((distance) => distance <= limit);
  if (values.length === 0) return 0;

  const scores = values.map((distance) => walkScore(distance, limit));
  return median(scores);
};

const { full_address, latitude, longitude, address_level1: state } =
  params.address;
const center = geo.asPoint(latitude, longitude);

assert.stab(JSON.stringify(params.address));

const formattedState = state.toLowerCase().replace(/\s+/g, '_');
const area = stateMapping[`ca-${formattedState}`] || stateMapping[`us-${formattedState}`] || formattedState;
const boundary = center.asBound().extend(params.radius);
let features = [];

features.push(boundary.asFeature({
  "fill": colors.pick(0),
  "fill-opacity": 0,
  "stroke": colors.pick(0),
}));

const distances = [];

Object.keys(params).forEach((key, index) => {
  if (filters[key] && !!params[key]) {
    const asQueries = filters[key].queries.map((query) =>
      `nwr${query}(area=${area})(bb=${boundary.min()[0]},${boundary.min()[1]},${
        boundary.max()[0]
      },${boundary.max()[1]})`
    );
    const results = query.union(...asQueries);

    features = features.concat(results.map((result) => {
      distances.push(geo.distance(center.asBound(), result.bound()) / 1000);

      return result.asFeature({
        "marker-color": colors.pick(index),
        "title": result.tags.name,
        "legend": filters[key].label,
      });
    }));
  }
});

const scores = [
  ["walk", 1.6],
  ["bike", 8.0],
  ["drive", 15],
];

const score = scores.map(([type, limit]) => {
  return type + ": " + (overallScore(distances, limit) | 0) + "%";
}).join("\n");

features.push(
  center.asFeature({
    "marker-color": colors.pick(0),
    "title": full_address + "\n" + score,
  }),
);

const payload = {
  type: "FeatureCollection",
  features: features,
};

assert.geoJSON(payload);
export { payload };
