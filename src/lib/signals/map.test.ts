import { Map } from "./map";
import { describe, it } from "vitest";

describe("Map", () => {
  it("should set and get values", ({ expect }) => {
    const map = new Map();
    map.set("foo", "bar");
    expect(map.get("foo")).toBe("bar");
  });

  it("should delete values", ({ expect }) => {
    const map = new Map();
    map.set("foo", "bar");
    map.delete("foo");
    expect(map.get("foo")).toBe(undefined);
  });

  it("should return all the values", ({ expect }) => {
    const map = new Map();
    map.set("foo", "bar");
    map.set("bar", "baz");
    expect(map.values()).toEqual(["bar", "baz"]);
  });
});
