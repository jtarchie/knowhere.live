import mapboxgl, {
  CircleLayerSpecification,
  FillLayerSpecification,
  LineLayerSpecification,
  SymbolLayerSpecification,
} from "mapbox-gl";
import { MapRef } from "react-map-gl";
import tinycolor from "tinycolor2";

const defaultColor = "#555";
const sourceName = "geojson";

function createLayerDefinitions(legendValue?: string) {
  const prefix = legendValue ? `${legendValue}-` : "";
  const legendFilter = legendValue
    ? ["==", ["get", "legend"], legendValue]
    : ["!", ["has", "legend"]];

  const polygonFill: FillLayerSpecification = {
    id: `${prefix}-${sourceName}-fill`,
    type: "fill",
    source: sourceName,
    paint: {
      "fill-color": ["coalesce", ["get", "fill"], defaultColor],
      "fill-opacity": ["coalesce", ["get", "fill-opacity"], 0.3],
    },
    filter: ["all", legendFilter, ["==", ["geometry-type"], "Polygon"]],
  };

  const polygonOutlineFill: LineLayerSpecification = {
    id: `${prefix}-${sourceName}-fill-outline`,
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
    id: `${prefix}-${sourceName}-marker`,
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
    id: `${prefix}-${sourceName}-marker-text`,
    type: "symbol",
    source: sourceName,
    layout: {
      "text-field": ["get", "title"],
      "text-offset": [0, 2],
    },
    "paint": {
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
    id: `${prefix}-${sourceName}-marker-icon`,
    type: "symbol",
    source: sourceName,
    layout: {
      "text-field": ["get", "title"],
      "text-offset": [0, 2],
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
    },
    "paint": {
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
    id: `${prefix}-${sourceName}-line`,
    type: "line",
    source: sourceName,
    paint: {
      "line-color": ["coalesce", ["get", "stroke"], defaultColor],
      "line-width": ["coalesce", ["get", "stroke-width"], 2],
      "line-opacity": ["coalesce", ["get", "stroke-opacity"], 1],
    },
    filter: ["all", legendFilter, ["==", ["geometry-type"], "LineString"]],
  };

  return [circle, line, polygonFill, polygonOutlineFill, text, symbol];
}

function setupLayersAndEvents(
  map: MapRef,
  geoJSON: GeoJSON.FeatureCollection,
): mapboxgl.Layer[] {
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

  map.on("click", layerIDs, (event) => {
    if (!event) return;

    const features = event?.features as mapboxgl.MapboxGeoJSONFeature[];

    if (features && features.length > 0) {
      const feature = features[0];
      const url = feature.properties?.url; // Assuming your property is named 'url'
      if (url) {
        globalThis.open(url, "_blank");
      }
    }
  });

  map.on("mouseover", layerIDs, (event) => {
    if (!event) return;

    const features = event?.features as mapboxgl.MapboxGeoJSONFeature[];

    if (features && features.length > 0) {
      const feature = features[0];
      const url = feature.properties?.url; // Assuming your property is named 'url'
      if (url) {
        map.getCanvas().style.cursor = "pointer";
      }
    }
  });

  map.on("mousemove", layerIDs, (event) => {
    if (!event) return;

    const features = event?.features as mapboxgl.MapboxGeoJSONFeature[];

    if (features && features.length > 0) {
      const feature = features[0];
      const description = feature.properties?.description;

      if (description) {
        popup
          .setLngLat(event.lngLat)
          .setHTML(description)
          .addTo(map.getMap());
      }
    }
  });

  map.on("mouseleave", layerIDs, (_) => {
    map.getCanvas().style.cursor = "default";
    popup.remove();
  });

  return layers;
}

function applyTransformations(
  geoJSON: GeoJSON.FeatureCollection,
  setter: (features: GeoJSON.FeatureCollection) => void,
) {
  geoJSON.features?.forEach((feature) => {
    const properties = feature.properties || {};
    if (properties.isochrone) {
      const color = properties["marker-color"] || defaultColor;
      const colors = generateLighterColors(color, 3);

      const point = (feature.geometry as GeoJSON.Point).coordinates;
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
      url.searchParams.append("access_token", mapboxgl.accessToken as string);

      fetch(url.toString()).then(async (response) => {
        const featureCollection = await response
          .json() as GeoJSON.FeatureCollection;
        geoJSON.features = geoJSON.features.concat(
          featureCollection.features.flatMap((feature, index) => {
            const coordinates =
              (feature.geometry as GeoJSON.Polygon).coordinates;
            let southernmostPoint = coordinates[0];

            // Iterate through the coordinates to find the point with the smallest latitude
            coordinates.forEach((point) => {
              if (point[1] < southernmostPoint[1]) {
                southernmostPoint = point;
              }
            });
            const point: GeoJSON.Feature = {
              type: "Feature",
              geometry: {
                "type": "Point",
                coordinates: southernmostPoint[0], // lon, lat
              },
              properties: {
                title: `${
                  contourMinutes[contourMinutes.length - index - 1]
                }m drive`,
                "marker-color": feature.properties?.fill,
              },
            };
            return [feature, point];
          }),
        );
        setter(geoJSON);
      });
    }
  });

  return geoJSON;
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
) {
  setGeoJSON(geoJSON);

  const layers = setupLayersAndEvents(map, geoJSON);
  setLayers(layers);

  applyTransformations(geoJSON, setGeoJSON);
}

export { setupMapWithGeoJSON, sourceName };
