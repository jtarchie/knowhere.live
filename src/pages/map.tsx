import Map, { Layer, MapRef, NavigationControl, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../index.css";
import { BottomNav } from "../components/bottom-nav";
import {
  applyTransformations,
  layers,
  setupEvents,
  sourceName,
} from "../render/layers";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { Manager } from "../render/manager";
import { LngLatBoundsLike } from "mapbox-gl";
import { fitBounds } from "../render/bounds";
import { RefCallback } from "preact";

const defaultBounds: LngLatBoundsLike = [
  [-124.7844079, 24.396308],
  [-66.9513812, 49.384358],
];

const emptyFeatureCollection: GeoJSON.FeatureCollection = {
  features: [],
  type: "FeatureCollection",
};

function MapPage(
  { manifestName }: { path?: string; manifestName?: string },
) {
  const mapRef = useRef<MapRef>();
  const [allData, setAllData] = useState<GeoJSON.FeatureCollection>(
    emptyFeatureCollection,
  );
  const geoJSON = useMemo(() => {
    return allData;
  }, [allData]);

  const resizeMap = () => fitBounds(mapRef.current as MapRef, defaultBounds);

  useEffect(() => {
    const manager = new Manager();
    const { source, filterValues, filter } = manager.load(manifestName);
    const params = Object.fromEntries(
      filter.map((
        field,
      ) => [field.name, filterValues[field.name] || field.defaultValue]),
    );

    const fullSourceCode = `const params = ${
      JSON.stringify(params)
    }; ${source}`;

    fetch(`/proxy/api/runtime`, {
      method: "PUT",
      body: fullSourceCode,
    })
      .then((response) => response.json())
      .then((payload) => {
        if (payload.error) {
          console.error(`Could not run script: ${payload.error}`);
          payload = emptyFeatureCollection;
        }

        setAllData(payload as GeoJSON.FeatureCollection);
        mapRef.current?.once("idle", () => resizeMap());

        setupEvents(mapRef.current as MapRef);
        applyTransformations(
          payload,
          (features: GeoJSON.FeatureCollection) => {
            setAllData(features);
          },
        );
      }).catch((err) => {
        console.error("Could not load data", err);
      });
  }, []);

  return (
    <div class="h-screen flex flex-col">
      <div class="flex-1">
        <Map
          ref={mapRef as unknown as RefCallback<MapRef>}
          style={{ width: "100%", height: "100%" }}
          mapboxAccessToken="pk.eyJ1IjoianRhcmNoaSIsImEiOiJjbHBobmx0YWQwOG01MmlxeDAydGxlN2c5In0.o3yTh6k7uo_e3CBi_32R9Q"
          initialViewState={{
            bounds: defaultBounds,
          }}
          mapStyle={getMapStyle()}
        >
          <NavigationControl position="top-right" />
          <Source id={sourceName} type="geojson" data={geoJSON}>
            {layers.map((layer) => {
              return <Layer {...layer} />;
            })}
          </Source>
        </Map>
      </div>
      <BottomNav manifestName={manifestName} />
    </div>
  );
}

function getMapStyle() {
  if (
    globalThis.matchMedia &&
    globalThis.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "mapbox://styles/mapbox/dark-v11";
  } else {
    return "mapbox://styles/mapbox/streets-v12";
  }
}

export { MapPage };
