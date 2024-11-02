const all = query.execute(
  `nwr[name=~"${params.keyword}"](area="${params.area || "colorado"}")`,
);
const entries = all.cluster(params.closeby || 2000); //meters
assert.eq(all.length >= entries.length, "expected fewer entries");

const payload = {
  type: "FeatureCollection",
  features: entries.map((entry, index) => {
    return entry.asFeature({
      "marker-color": colors.pick(index),
    });
  }),
};

assert.geoJSON(payload);
export { payload };
