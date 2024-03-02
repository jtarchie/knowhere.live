import { LayerManager } from "./layer_manager";
import { describe, it, vi } from "vitest";
import { SearchQuery } from "../search_query";
import { Map as MockMap } from "../mocks/map";

describe("LayerManager", () => {
  it("should add a layer", ({ expect }) => {
    const map = MockMap();
    vi.spyOn(map, "addLayer");

    const layerManager = new LayerManager(map);
    layerManager.add(new SearchQuery("test"));
    expect(map.addLayer).toHaveBeenCalledWith({
      id: "test-layer",
      type: "circle",
      source: "test",
      paint: {
        "circle-radius": 6,
        "circle-color": "#E69F00",
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
      },
    });
  });

  it("should remove a layer", ({ expect }) => {
    const map = MockMap();

    const layerManager = new LayerManager(map);
    layerManager.remove(new SearchQuery("test"));
    expect(map.removeLayer).toHaveBeenCalledWith("test-layer");
  });
});
