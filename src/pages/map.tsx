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
import {
  Dispatch,
  StateUpdater,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import { Manager } from "../render/manager";
import { LngLatBoundsLike, MapEvent } from "mapbox-gl";
import { fitBounds } from "../render/bounds";
import { RefCallback } from "preact";
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";

const defaultBounds: LngLatBoundsLike = [
  [-124.7844079, 24.396308],
  [-66.9513812, 49.384358],
];

function MapPage({}: { path?: string }) {
  const mapRef = useRef<MapRef>();
  const [allData, setAllData] = useState<GeoJSON.FeatureCollection>();
  const geoJSON = useMemo(() => {
    return allData;
  }, [allData]);

  useEffect(() => {
    const manager = new Manager();
    const sourceCode = manager.fromParams();

    fetch(`/proxy/api/runtime`, {
      method: "PUT",
      body: sourceCode,
    })
      .then((response) => response.json())
      .then((payload) => {
        if (payload.error) {
          console.error(`Could not run script: ${payload.error}`);
          payload = { features: [], type: "FeatureCollection" };
        }

        setAllData(payload as GeoJSON.FeatureCollection);
        setupEvents(mapRef.current as MapRef);
        applyTransformations(
          payload,
          setAllData as Dispatch<
            StateUpdater<FeatureCollection<Geometry, GeoJsonProperties>>
          >,
        );
      }).catch((err) => {
        console.error("Could not load data", err);
      });
  }, []);

  const onLoadData = (event: MapEvent) =>
    fitBounds(event.target, defaultBounds);

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
          onLoad={onLoadData}
        >
          <NavigationControl position="top-right" />
          <Source id={sourceName} type="geojson" data={geoJSON}>
            {layers.map((layer) => {
              return <Layer {...layer} />;
            })}
          </Source>
        </Map>
      </div>
      <BottomNav />
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
