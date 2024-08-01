import { Manifest } from "./type";

const source = `
const entries = [geo.asPoint(params.address_lat || 34.327737, params.address_lon || -118.722684)]

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
    type: "address",
    label: "Address",
    name: "address",
    placeholder: "742 Evergreen Terrace, Springfield ",
    defaultValue: "",
    hint: "Full address of location",
  }],
  about: "Given an address see what is near by in entertainment, schools, etc.",
  filterValues: {},
};

export { manifest };
