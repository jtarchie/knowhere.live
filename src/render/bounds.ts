import { LngLatBoundsLike, Map } from "mapbox-gl";
import { sourceName } from "./layers";
import * as turf from "@turf/bbox";
import { MapRef } from "react-map-gl";

function fitBounds(map: Map | MapRef, defaultBounds: LngLatBoundsLike) {
  const bbox = turf.bbox({
    type: "FeatureCollection",
    features: map.querySourceFeatures(sourceName),
  });

  if (bbox.some((e) => !Number.isFinite(e))) {
    map.fitBounds(defaultBounds);
  } else {
    map.fitBounds(bbox as mapboxgl.LngLatBoundsLike, { padding: 40 });
  }
}

export { fitBounds };
