import mapboxgl, {
  CircleLayerSpecification,
  FillLayerSpecification,
  LineLayerSpecification,
  SymbolLayerSpecification,
} from "mapbox-gl";
import { MapRef } from "react-map-gl/mapbox";
import tinycolor from "tinycolor2";

const defaultColor = "#555";
const sourceName = "geojson";

// Helper function to clean up existing layers
function removeExistingLayers(map: MapRef, layerIds: string[]) {
  layerIds.forEach((layerId) => {
    if (map.getMap().getLayer(layerId)) {
      map.getMap().removeLayer(layerId);
    }
  });
}

// Helper function to validate layer specifications
function validateLayerSpec(layer: mapboxgl.LayerSpecification): boolean {
  return !!(layer.id && layer.type && layer.source);
}

function createLayerDefinitions(
  legendValue?: string,
): mapboxgl.LayerSpecification[] {
  const prefix = legendValue ? `${legendValue}-` : "";
  const legendFilter = legendValue
    ? ["==", ["get", "legend"], legendValue]
    : ["!", ["has", "legend"]];

  const polygonFill: FillLayerSpecification = {
    id: `${prefix}${sourceName}-fill`,
    type: "fill",
    source: sourceName,
    paint: {
      "fill-color": ["coalesce", ["get", "fill"], defaultColor],
      "fill-opacity": ["coalesce", ["get", "fill-opacity"], 0.3],
    },
    filter: ["all", legendFilter, ["==", ["geometry-type"], "Polygon"]],
  };

  const polygonOutlineFill: LineLayerSpecification = {
    id: `${prefix}${sourceName}-fill-outline`,
    type: "line",
    source: sourceName,
    paint: {
      "line-color": ["coalesce", ["get", "stroke"], defaultColor],
      "line-width": ["coalesce", ["get", "stroke-width"], 2],
      "line-opacity": ["coalesce", ["get", "stroke-opacity"], 1],
    },
    filter: ["all", legendFilter, ["==", ["geometry-type"], "Polygon"]],
  };

  const circle: CircleLayerSpecification = {
    id: `${prefix}${sourceName}-marker`,
    type: "circle",
    source: sourceName,
    paint: {
      "circle-radius": [
        "match",
        ["get", "marker-size"],
        "small",
        4,
        "medium",
        8,
        "large",
        12,
        8,
      ],
      "circle-color": [
        "coalesce",
        ["get", "marker-color"],
        defaultColor,
      ],
      "circle-stroke-width": 1,
      "circle-stroke-color": "#333",
    },
    filter: ["all", legendFilter, ["==", ["geometry-type"], "Point"], ["!", [
      "has",
      "marker-symbol",
    ]]],
  };

  const text: SymbolLayerSpecification = {
    id: `${prefix}${sourceName}-marker-text`,
    type: "symbol",
    source: sourceName,
    layout: {
      "text-field": ["get", "title"],
      "text-offset": [0, 2],
      "text-anchor": "top",
      "text-optional": true,
    },
    paint: {
      "text-halo-color": [
        "coalesce",
        ["get", "marker-color"],
        defaultColor,
      ],
      "text-color": "#333",
      "text-halo-width": 1,
    },
    filter: ["all", legendFilter, ["==", ["geometry-type"], "Point"], ["!", [
      "has",
      "marker-symbol",
    ]]],
  };

  const symbol: SymbolLayerSpecification = {
    id: `${prefix}${sourceName}-marker-icon`,
    type: "symbol",
    source: sourceName,
    layout: {
      "text-field": ["get", "title"],
      "text-offset": [0, 2],
      "text-anchor": "top",
      "text-optional": true,
      "icon-image": ["get", "marker-symbol"],
      "icon-size": [
        "match",
        ["get", "marker-size"],
        "small",
        1,
        "large",
        2,
        1.5,
      ],
      "icon-allow-overlap": false,
      "icon-optional": true,
    },
    paint: {
      "text-halo-color": [
        "coalesce",
        ["get", "marker-color"],
        defaultColor,
      ],
      "text-color": "#333",
      "text-halo-width": 1,
    },
    filter: ["all", legendFilter, ["==", ["geometry-type"], "Point"], [
      "has",
      "marker-symbol",
    ]],
  };

  const line: LineLayerSpecification = {
    id: `${prefix}${sourceName}-line`,
    type: "line",
    source: sourceName,
    paint: {
      "line-color": ["coalesce", ["get", "stroke"], defaultColor],
      "line-width": ["coalesce", ["get", "stroke-width"], 2],
      "line-opacity": ["coalesce", ["get", "stroke-opacity"], 1],
    },
    filter: ["all", legendFilter, ["==", ["geometry-type"], "LineString"]],
  };

  const layers = [circle, line, polygonFill, polygonOutlineFill, text, symbol];

  // Validate all layers before returning
  return layers.filter(validateLayerSpec);
}

// Store event listeners for cleanup
const eventListeners = new Map<
  string,
  Array<
    { type: string; listener: (event: mapboxgl.MapMouseEvent) => void }
  >
>();

function setupLayersAndEvents(
  map: MapRef,
  geoJSON: GeoJSON.FeatureCollection,
): { layers: mapboxgl.Layer[]; cleanup: () => void } {
  const legendValues = [
    null,
    ...new Set(
      geoJSON.features.map((f) => f.properties?.legend).filter(Boolean),
    ),
  ];
  const layers = legendValues.flatMap((legendValue) =>
    createLayerDefinitions(legendValue)
  );
  const layerIDs = layers.map((layer) => layer.id);

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  // Store references to event handlers for cleanup
  const mapId = map.getMap().getContainer().id;
  const listeners: Array<
    { type: string; listener: (event: mapboxgl.MapMouseEvent) => void }
  > = [];

  const clickHandler = (event: mapboxgl.MapMouseEvent) => {
    if (!event?.features?.length) return;

    const feature = event.features[0] as mapboxgl.GeoJSONFeature;
    const url = feature.properties?.url;

    if (url && typeof url === "string") {
      try {
        // Validate URL before opening
        new URL(url);
        globalThis.open(url, "_blank", "noopener,noreferrer");
      } catch (_error) {
        console.warn("Invalid URL:", url);
      }
    }
  };

  const mouseenterHandler = (event: mapboxgl.MapMouseEvent) => {
    if (!event?.features?.length) return;

    const feature = event.features[0] as mapboxgl.GeoJSONFeature;
    const hasUrl = feature.properties?.url;

    if (hasUrl) {
      map.getCanvas().style.cursor = "pointer";
    }
  };

  const mousemoveHandler = (event: mapboxgl.MapMouseEvent) => {
    if (!event?.features?.length) return;

    const feature = event.features[0] as mapboxgl.GeoJSONFeature;
    const description = feature.properties?.description;

    if (description && typeof description === "string") {
      popup
        .setLngLat(event.lngLat)
        .setHTML(description)
        .addTo(map.getMap());
    }
  };

  const mouseleaveHandler = () => {
    map.getCanvas().style.cursor = "default";
    popup.remove();
  };

  // Add event listeners
  map.on("click", layerIDs, clickHandler);
  map.on("mouseenter", layerIDs, mouseenterHandler);
  map.on("mousemove", layerIDs, mousemoveHandler);
  map.on("mouseleave", layerIDs, mouseleaveHandler);

  // Store listener references
  listeners.push(
    { type: "click", listener: clickHandler },
    { type: "mouseenter", listener: mouseenterHandler },
    { type: "mousemove", listener: mousemoveHandler },
    { type: "mouseleave", listener: mouseleaveHandler },
  );
  eventListeners.set(mapId, listeners);

  const cleanup = () => {
    // Remove event listeners
    map.off("click", layerIDs, clickHandler);
    map.off("mouseenter", layerIDs, mouseenterHandler);
    map.off("mousemove", layerIDs, mousemoveHandler);
    map.off("mouseleave", layerIDs, mouseleaveHandler);

    // Remove popup
    popup.remove();

    // Clear stored listeners
    eventListeners.delete(mapId);
  };

  return { layers, cleanup };
}

function applyTransformations(
  geoJSON: GeoJSON.FeatureCollection,
  setter: (features: GeoJSON.FeatureCollection) => void,
) {
  // Create a copy to avoid mutating the original
  const transformedGeoJSON = JSON.parse(
    JSON.stringify(geoJSON),
  ) as GeoJSON.FeatureCollection;

  const isochronePromises: Promise<void>[] = [];

  transformedGeoJSON.features?.forEach((feature) => {
    const properties = feature.properties || {};
    if (properties.isochrone && feature.geometry.type === "Point") {
      const color = properties["marker-color"] || defaultColor;
      const colors = generateLighterColors(color, 3);

      const point = feature.geometry.coordinates;

      // Validate coordinates
      if (
        !Array.isArray(point) || point.length < 2 ||
        typeof point[0] !== "number" || typeof point[1] !== "number"
      ) {
        console.warn("Invalid coordinates for isochrone feature:", point);
        return;
      }

      const url = new URL(
        `https://api.mapbox.com/isochrone/v1/mapbox/driving-traffic/${
          point[0]
        }%2C${point[1]}`,
      );
      const contourMinutes = [15, 30, 45, 60];
      url.searchParams.append("contours_minutes", contourMinutes.join(","));
      url.searchParams.append(
        "contours_colors",
        colors.map((color) => color.slice(1)).join(","),
      );
      url.searchParams.append("polygons", "true");
      url.searchParams.append("denoise", "1");

      // Check if access token is available
      if (!mapboxgl.accessToken) {
        console.warn("Mapbox access token not available for isochrone request");
        return;
      }
      url.searchParams.append("access_token", mapboxgl.accessToken);

      const isochronePromise = fetch(url.toString())
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(
              `Isochrone API request failed: ${response.status} ${response.statusText}`,
            );
          }

          const featureCollection = await response
            .json() as GeoJSON.FeatureCollection;

          // Validate response structure
          if (
            !featureCollection.features ||
            !Array.isArray(featureCollection.features)
          ) {
            throw new Error("Invalid isochrone API response structure");
          }

          const newFeatures = featureCollection.features.flatMap(
            (feature, index) => {
              if (feature.geometry.type !== "Polygon") {
                console.warn(
                  "Unexpected geometry type in isochrone response:",
                  feature.geometry.type,
                );
                return [];
              }

              const coordinates = feature.geometry.coordinates;
              if (!coordinates.length || !coordinates[0].length) {
                console.warn(
                  "Invalid polygon coordinates in isochrone response",
                );
                return [];
              }

              let southernmostPoint = coordinates[0][0];

              // Find the southernmost point (smallest latitude)
              coordinates[0].forEach((coord) => {
                if (
                  Array.isArray(coord) && coord.length >= 2 &&
                  coord[1] < southernmostPoint[1]
                ) {
                  southernmostPoint = coord;
                }
              });

              const labelPoint: GeoJSON.Feature = {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: southernmostPoint,
                },
                properties: {
                  title: `${
                    contourMinutes[contourMinutes.length - index - 1]
                  }m drive`,
                  "marker-color": feature.properties?.fill,
                },
              };
              return [feature, labelPoint];
            },
          );

          transformedGeoJSON.features = transformedGeoJSON.features.concat(
            newFeatures,
          );
        })
        .catch((error) => {
          console.error("Error fetching isochrone data:", error);
        });

      isochronePromises.push(isochronePromise);
    }
  });

  // If there are isochrone requests, wait for them to complete
  if (isochronePromises.length > 0) {
    Promise.allSettled(isochronePromises).then(() => {
      setter(transformedGeoJSON);
    });
  }

  return transformedGeoJSON;
}

function generateLighterColors(hex: string, steps: number) {
  const colors: string[] = [hex];
  let color = tinycolor(hex);

  for (let i = 1; i <= steps; i++) {
    color = color.lighten(10); // Increase the lightness by 10% for each step
    colors.push(color.toHexString());
  }

  return colors;
}

function setupMapWithGeoJSON(
  map: MapRef,
  geoJSON: GeoJSON.FeatureCollection,
  setGeoJSON: (geoJSON: GeoJSON.FeatureCollection) => void,
  setLayers: (layers: mapboxgl.Layer[]) => void,
): () => void {
  setGeoJSON(geoJSON);

  const { layers, cleanup } = setupLayersAndEvents(map, geoJSON);
  setLayers(layers);

  applyTransformations(geoJSON, setGeoJSON);

  // Return cleanup function
  return cleanup;
}

export {
  eventListeners, // Export for external cleanup if needed
  removeExistingLayers,
  setupMapWithGeoJSON,
  sourceName,
};
