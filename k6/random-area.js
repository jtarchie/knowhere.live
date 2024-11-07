import { URL } from "https://jslib.k6.io/url/1.0.0/index.js";
import http from "k6/http";
import { check } from "k6";

export const options = {
  scenarios: {
    constant_load: {
      executor: "constant-vus",
      vus: 10,
      duration: "30s",
    },
    ramping_load: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "10s", target: 20 },
        { duration: "10s", target: 50 },
        { duration: "10s", target: 0 },
      ],
      gracefulRampDown: "5s",
    },
    spike_test: {
      executor: "per-vu-iterations",
      vus: 100,
      iterations: 1,
      maxDuration: "1m",
    },
    arrival_rate_test: {
      executor: "constant-arrival-rate",
      rate: 20, // number of iterations per timeUnit
      timeUnit: "1s",
      duration: "30s",
      preAllocatedVUs: 50,
      maxVUs: 100,
    },
  },
};

export default function () {
  const url = new URL("https://knowhere.fly.dev:443/api/runtime");

  // Define the source parameter as a single line
  const source = `
    const areas = query.areas();
    const area = areas[Math.floor(Math.random() * areas.length)];
    const all = query.execute(\`nwr[name=~"Starbucks"](area="\${area.name}")\`);
    const entries = all.cluster(2000); // meters
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
  `.trim();

  url.searchParams.append("source", source);

  // Send the GET request with the query string parameter 'source'
  const res = http.get(url.toString(), {
    headers: {
      "Accept": "application/msgpack",
    },
  });

  // Check that response status is 200
  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 500ms": (r) => r.timings.duration < 500,
  });

  // Check response body is JSON payload of GeoJSON format
  // const payload = JSON.parse(res.body);
  // check(payload, {
  //   "is GeoJSON": () => payload.type === "FeatureCollection",
  // });
}
