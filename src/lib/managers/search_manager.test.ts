import { SearchManager } from "./search_manager";
import { describe, it } from "vitest";
import { Map as MockMap } from "../mocks/map";

/**
 * @vitest-environment jsdom
 */

describe("SearchManager", () => {
  it("can set the state", ({ expect }) => {
    const map = MockMap();

    const searchManager = new SearchManager(map);
    searchManager.state("CA");
    expect(searchManager.currentState).toEqual("CA");
    expect(map.fitBounds).toHaveBeenCalled();
  });

  describe("when adding a query", () => {
    it("adds the source", ({ expect }) => {
      const map = MockMap();

      const searchManager = new SearchManager(map);
      searchManager.add("test");
      expect(map.addSource).toHaveBeenCalled();
    });

    it.only("does not add query if it already exists", ({ expect }) => {
      const map = MockMap();

      const searchManager = new SearchManager(map);
      searchManager.add("test");
      searchManager.add("test");
      expect(map.addSource).toHaveBeenCalledTimes(2);
    });
  });
});
