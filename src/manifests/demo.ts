import { Manifest } from "./type";

const source = `
const all = query.execute(
  \`nwr[name=~"\${params.keyword}"](prefix="\${params.prefix || "colorado"}")\`,
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
return payload;
`.trim();

const manifest: Manifest = {
  source: source,
  filter: [{
    type: "string",
    label: "Name",
    name: "keyword",
    placeholder: "Costco",
    defaultValue: "Costco",
    hint: "Name of a place",
  }],
  about: "This is a demo manifest. You can search all names for a keyword.",
  filterValues: {},
};

export { manifest };
