import { LayerManager } from "./layer_manager";
import { describe, it, vi } from "vitest";
import { SearchQuery } from "../search_query";
import { Map as MockMap } from "../mocks/map";
import { AnyLayer, GeoJSONSource } from "mapbox-gl";

describe("LayerManager", () => {
  it("should add a layer", ({ expect }) => {
    const map = MockMap();
    const on = vi.spyOn(map, "on");

    const layerManager = new LayerManager(map);
    layerManager.add(new SearchQuery("test"));

    on.mock.calls[0][1]("");

    expect(map.addLayer).toHaveBeenCalledWith({
      id: "test-hidden",
      type: "circle",
      source: "test-original",
      paint: {
        "circle-radius": 1,
        "circle-opacity": 0,
      },
    });

    expect(map.addLayer).toHaveBeenCalledWith({
      id: "test-knn",
      type: "circle",
      source: "test-knn",
      paint: {
        "circle-radius": 6,
        "circle-color": "#E69F00",
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
      },
    });

    expect((map.getSource("") as GeoJSONSource).setData).toHaveBeenCalledWith({
      "type": "FeatureCollection",
      "features": [],
    });
  });

  it("should remove a layer", ({ expect }) => {
    const map = MockMap();
    vi.spyOn(map, "getLayer").mockReturnValue({} as AnyLayer);

    const layerManager = new LayerManager(map);
    const query = new SearchQuery("test");
    layerManager.add(query);
    layerManager.remove(query);

    expect(map.removeLayer).toHaveBeenCalledWith("test-hidden");
    expect(map.removeLayer).toHaveBeenCalledWith("test-knn");
  });
});
