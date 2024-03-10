import mapboxgl, { MapLayerMouseEvent } from "mapbox-gl";
import { SearchQuery } from "../search_query";

class PopupManager {
  map: mapboxgl.Map;
  popup: mapboxgl.Popup;

  constructor(map: mapboxgl.Map) {
    this.map = map;
    this.popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });
  }

  state(_: string) {}

  showPopup(event: MapLayerMouseEvent) {
    this.map.getCanvas().style.cursor = "pointer";

    if (!event?.features?.length) {
      return;
    }

    const geometry = event.features[0].geometry;

    if (geometry.type !== "Point") {
      return;
    }

    const coordinates = (geometry as GeoJSON.Point).coordinates as [
      number,
      number,
    ];
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
  }

  add(searchQuery: SearchQuery) {
    this.map.on(
      "mouseenter",
      searchQuery.layerName("knn"),
      (event: MapLayerMouseEvent) => {
        // show nothing if no features present
        console.log("Event", event);
        if (!event?.features?.length) {
          return;
        }

        this.showPopup(event);
      },
    );

    this.map.on("mouseleave", searchQuery.layerName("knn"), () => {
      this.map.getCanvas().style.cursor = "";
      this.popup.remove();
    });
  }

  remove(_: SearchQuery) {}
}

export { PopupManager };
