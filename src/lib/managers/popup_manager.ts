import mapboxgl, { MapEventType, MapMouseEvent } from "mapbox-gl";
import { SearchQuery } from "../search_query";
import { features } from "process";

class PopupManager {
  map: mapboxgl.Map;
  popup: mapboxgl.Popup;

  constructor(map: mapboxgl.Map) {
    this.map = map;
    this.popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });
  }

  state(_: string) { }

  add(searchQuery: SearchQuery) {
    this.map.on("mouseenter", searchQuery.layerName("layer"), (event: MapLayerMouseEvent) => {
      this.map.getCanvas().style.cursor = 'pointer';

      if (event.features.length == 0) {
        return
      }

      const coordinates = event.features[0]?.geometry?.coordinates;
      const name = event.features[0]?.properties?.name;

      if (!name || !coordinates) {
        return;
      }

      while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Set the popup's content and location and add it to the map
      this.popup.setLngLat(coordinates)
        .setHTML(name) // Set the name as the popup content
        .addTo(this.map);
    });

    this.map.on('mouseleave', searchQuery.layerName("layer"), () => {
      this.map.getCanvas().style.cursor = '';
      this.popup.remove();
    });
  }

  remove(searchQuery: SearchQuery) {
    this.map.removeLayer(searchQuery.layerName("layer"));
  }
}

export { PopupManager };
