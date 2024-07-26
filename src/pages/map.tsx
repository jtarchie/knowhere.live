import { Map } from "../render/map";
import { Source } from "../render/source";
import { useEffect, useRef } from "preact/hooks";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "../index.css";
import { BottomNav } from "../components/bottom-nav";

mapboxgl.accessToken =
  "pk.eyJ1IjoianRhcmNoaSIsImEiOiJjbHBobmx0YWQwOG01MmlxeDAydGxlN2c5In0.o3yTh6k7uo_e3CBi_32R9Q";

function geoJSONfromSource(
  source: Source,
  map: Map,
  sourceCode: string,
) {
  return fetch(`/proxy/api/runtime`, {
    method: "PUT",
    body: sourceCode,
  }).then((response) => {
    return response.json().then((payload) => {
      if (payload.error) {
        console.error(`Could not run script: ${payload.error}`);
        payload = { features: [], type: "FeatureCollection" };
      }

      return payload.features;
    });
  }).then((features) => {
    source.toParams(sourceCode);
    map.features = features;
  });
}

function MapPage({}: { path?: string }) {
  const map = useRef<Map>(null);
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new Map(
      mapElement.current as Element,
      [
        [-124.7844079, 24.396308],
        [-66.9513812, 49.384358],
      ],
    );

    const source = new Source("source");
    const sourceCode = source.fromParams();
    map.current.onLoad(() => {
      geoJSONfromSource(source, map.current as Map, sourceCode);
    });
  });

  return (
    <div class="h-screen flex flex-col">
      <div class="flex-1">
        <div id="map" class="w-full h-full" ref={mapElement}></div>
      </div>
      <BottomNav />
    </div>
  );
}

export { MapPage };
