import Map, {
  Layer,
  LayerProps,
  MapRef,
  NavigationControl,
  Source,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import "../index.css";
import { BottomNav } from "../components/bottom-nav";
import { setupMapWithGeoJSON, sourceName } from "../render/layers";
import { useEffect, useRef, useState } from "preact/hooks";
import { Manager } from "../render/manager";
import { LngLatBoundsLike } from "mapbox-gl";
import { fitBounds } from "../render/bounds";
import { RefCallback } from "preact";
import { Legend } from "../components/legend";
import { Dialog } from "../components/dialog";
import manifests from "../manifests";

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
  const [geoJSON, setGeoJSON] = useState<GeoJSON.FeatureCollection>(
    emptyFeatureCollection,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [layers, setLayers] = useState<mapboxgl.Layer[]>([]);

  useEffect(() => {
    if (manifestName) {
      const prettyName = manifests[manifestName]?.about || manifestName;
      document.title = `Knowhere / ${prettyName} / Map`;
    } else {
      document.title = "Knowhere / Map";
    }
  }, [manifestName]);

  useEffect(() => {
    const manager = new Manager();
    const { manifest, values } = manager.load(manifestName);
    const params = Object.assign(
      {},
      Object.fromEntries(
        manifest.form.map((entry) => [entry.name, entry.defaultValue]),
      ),
      values,
    );

    const fullSourceCode = `const params = ${
      JSON.stringify(params)
    }; ${manifest.source}`;

    setIsLoading(true);
    fetch(
      `/proxy/api/runtime?${
        new URLSearchParams({ source: fullSourceCode }).toString()
      }`,
    )
      .then((response) => response.json())
      .then((payload) => {
        if (payload.error) {
          console.error(`Could not run script: ${payload.error}`);
          payload = emptyFeatureCollection;
        }

        setupMapWithGeoJSON(
          mapRef.current as MapRef,
          payload as GeoJSON.FeatureCollection,
          setGeoJSON,
          setLayers,
        );
        mapRef.current?.once(
          "idle",
          () =>
            fitBounds(
              mapRef.current as MapRef,
              defaultBounds,
              payload.features,
            ),
        );
      })
      .catch((err) => {
        console.error("Could not load data", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div class="h-screen flex flex-col">
        <div class="flex-1 relative">
          <Map
            ref={mapRef as unknown as RefCallback<MapRef>}
            style={{ width: "100%", height: "100%" }}
            mapboxAccessToken={mapboxgl.accessToken as string}
            initialViewState={{
              bounds: defaultBounds,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
          >
            <NavigationControl position="top-right" />
            <Source id={sourceName} type="geojson" data={geoJSON}>
              {layers.map((layer, index) => {
                return (
                  <Layer key={`layer-${index}`} {...layer as LayerProps} />
                );
              })}
            </Source>
          </Map>
          <div class="absolute top-4 left-4 z-10">
            <Legend
              geoJSON={geoJSON}
              onLegendChange={(legendState) => {
                Object.entries(legendState).forEach(([prefix, checked]) => {
                  layers.forEach((layer) => {
                    if (layer.id.startsWith(prefix)) {
                      mapRef.current?.getMap().setLayoutProperty(
                        layer.id,
                        "visibility",
                        checked ? "visible" : "none",
                      );
                    }
                  });
                });
              }}
            />
          </div>
        </div>
        <BottomNav manifestName={manifestName} />
      </div>
      <Dialog
        title="No results found!"
        show={!isLoading && geoJSON.features.length === 0}
      >
        <p class="py-4">
          The search did not return any results. Please refine your&nbsp;
          <a class="link link-primary" href={`/beta/${manifestName}/search`}>
            search criteria
          </a>.
        </p>
      </Dialog>
    </>
  );
}

export { MapPage };
