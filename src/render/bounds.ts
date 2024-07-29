import { LngLatBoundsLike, Map } from "mapbox-gl";
import { sourceName } from "./layers";
import bbox from "@turf/bbox";
import buffer from "@turf/buffer";
import { MapRef } from "react-map-gl";

function fitBounds(map: Map | MapRef, defaultBounds: LngLatBoundsLike) {
  const bounding = bbox(
    buffer(
      {
        type: "FeatureCollection",
        features: map.querySourceFeatures(sourceName),
      },
      500,
      { units: "meters" },
    ) as GeoJSON.FeatureCollection,
  );

  if (bounding && bounding.some((e) => !Number.isFinite(e))) {
    map.fitBounds(defaultBounds);
  } else {
    map.fitBounds(bounding as mapboxgl.LngLatBoundsLike, { padding: 40 });
  }
}

export { fitBounds };
