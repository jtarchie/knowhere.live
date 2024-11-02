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

// const harmonicMean = (values) => {
//   // Calculate the sum of reciprocals (1/value) for each value in the array
//   const reciprocalSum = values.reduce((sum, value) => sum + (1 / value), 0);

//   // The harmonic mean is the number of values divided by the reciprocal sum
//   return values.length / reciprocalSum;
// };

// const average = (values) => {
//   const sum = values.reduce((sum, value) => sum + value, 0);

//   return sum / values.length;
// };

const overallScore = (distances, limit) => {
  const values = distances.filter((distance) => distance <= limit);
  if (values.length === 0) return 0;

  const scores = values.map((distance) => walkScore(distance, limit));
  return median(scores);
};

const [fullAddress, lat, lon] = params.address.split("|");
const center = geo.asPoint(lat || 39.7401684, lon || -104.9894902);
const [parsedAddress, found] = address.parse(fullAddress);
if (!found) {
  throw new Error("could not parse address for state");
}

const area = parsedAddress.state.toLowerCase();
const boundary = center.asBound().extend(params.radius);
let features = [];

features.push(boundary.asFeature({
  "fill": colors.pick(0),
  "fill-opacity": 0,
  "stroke": colors.pick(0),
}));

const distances = [];

Object.keys(params).forEach((key, index) => {
  if (filters[key] && params[key] == "1") {
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
        "legend": key,
        // HINT: adds icons instead of circles of the color
        // "marker-symbol": filters[key].markerSymbol
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
}).join("\\n");

features.push(
  center.asFeature({
    "marker-color": colors.pick(0),
    "title": fullAddress + "\\n" + score,
  }),
);

const payload = {
  type: "FeatureCollection",
  features: features,
};

assert.geoJSON(payload);
export { payload };
