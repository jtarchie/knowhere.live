import { LayerManager } from "./layer_manager";
import { describe, it, vi } from "vitest";
import { SearchQuery } from "../search_query";
import { Map as MockMap } from "../mocks/map";
import { AnyLayer } from "mapbox-gl";

describe("LayerManager", () => {
  it("should add a layer", ({ expect }) => {
    const map = MockMap();
    const on = vi.spyOn(map, "on");

    const layerManager = new LayerManager(map);
    layerManager.add(new SearchQuery("test"));

    on.mock.calls[0][1]("");

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
    vi.spyOn(map, "getLayer").mockReturnValue({} as AnyLayer);

    const layerManager = new LayerManager(map);
    layerManager.remove(new SearchQuery("test"));
    expect(map.removeLayer).toHaveBeenCalledWith("test-layer");
  });
});
