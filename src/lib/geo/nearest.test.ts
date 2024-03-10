import { describe, it } from "vitest";
import { groupNearest } from "./nearest";

const denverJSON = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [-104.991531, 39.742043],
  },
  properties: {},
} as GeoJSON.Feature;

const chicagoJSON = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [-87.6650, 41.8680],
  },
  properties: {},
} as GeoJSON.Feature;

const newYorkJSON = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [-74.0060, 40.7128],
  },
  properties: {},
} as GeoJSON.Feature;

describe.only("groupNearest", () => {
  it("returns nothing on empty input", ({ expect }) => {
    const results = groupNearest([]);
    expect(results).toEqual([]);
  });

  describe("when working with a single radius set", () => {
    it("returns the whole set", ({ expect }) => {
      const results = groupNearest([
        {
          radius: 100,
          features: [denverJSON],
        },
      ]);

      expect(results).toEqual([[denverJSON]]);
    });
  });

  describe("when there are two sets", () => {
    it("returns nothing if they are not overlapping", ({ expect }) => {
      const results = groupNearest([
        {
          radius: 100,
          features: [denverJSON],
        },
        {
          radius: 100,
          features: [chicagoJSON],
        },
      ]);

      expect(results).toEqual([]);
    });

    describe("when the two points in each set are close together", () => {
      it("returns the points grouped together", ({ expect }) => {
        let results = groupNearest([
          {
            radius: 1000,
            features: [denverJSON],
          },
          {
            radius: 100,
            features: [chicagoJSON],
          },
        ]);

        expect(results).toEqual([[denverJSON, chicagoJSON]]);

        results = groupNearest([
          {
            radius: 100,
            features: [denverJSON],
          },
          {
            radius: 1000,
            features: [chicagoJSON],
          },
        ]);

        expect(results).toEqual([[denverJSON, chicagoJSON]]);
      });
    });

    describe("when there are many points", () => {
      it("returns the first point with in the boundary of another", ({ expect }) => {
        let results = groupNearest([
          {
            radius: 100,
            features: [denverJSON],
          },
          {
            radius: 1000,
            features: [chicagoJSON],
          },
          {
            radius: 10,
            features: [newYorkJSON],
          },
        ]);

        expect(results).toEqual([]);

        results = groupNearest([
          {
            radius: 2000,
            features: [denverJSON],
          },
          {
            radius: 100,
            features: [chicagoJSON],
          },

          {
            radius: 10,
            features: [newYorkJSON],
          },
        ]);

        expect(results).toEqual([[denverJSON, chicagoJSON, newYorkJSON]]);
      });
    });
  });
});
