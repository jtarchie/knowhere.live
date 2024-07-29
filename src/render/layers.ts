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

const polygonFill: FillLayerSpecification = {
  id: `${sourceName}-fill`,
  type: "fill",
  source: sourceName,
  paint: {
    "fill-color": ["coalesce", ["get", "fill"], defaultColor],
    "fill-opacity": ["coalesce", ["get", "fill-opacity"], 0.3],
  },
  filter: ["==", ["geometry-type"], "Polygon"],
};

const polygonOutlineFill: LineLayerSpecification = {
  id: `${sourceName}-fill-outline`,
  type: "line",
  source: sourceName,
  paint: {
    "line-color": ["coalesce", ["get", "stroke"], defaultColor],
    "line-width": ["coalesce", ["get", "stroke-width"], 2],
    "line-opacity": ["coalesce", ["get", "stroke-opacity"], 1],
  },
  filter: ["==", ["geometry-type"], "Polygon"],
};

const circle: CircleLayerSpecification = {
  id: `${sourceName}-marker`,
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
    "circle-stroke-width": 2,
    "circle-stroke-color": "#ffffff",
  },
  filter: ["==", ["geometry-type"], "Point"],
};

const symbol: SymbolLayerSpecification = {
  id: `${sourceName}-marker-text`,
  type: "symbol",
  source: sourceName,
  layout: {
    "text-field": ["get", "title"],
    "text-offset": [0, 1.5],
  },
  "paint": {
    "text-color": "#202",
    "text-halo-color": "#fff",
    "text-halo-width": 2,
  },
  filter: ["==", ["geometry-type"], "Point"],
};

const line: LineLayerSpecification = {
  id: `${sourceName}-line`,
  type: "line",
  source: sourceName,
  paint: {
    "line-color": ["coalesce", ["get", "stroke"], defaultColor],
    "line-width": ["coalesce", ["get", "stroke-width"], 2],
    "line-opacity": ["coalesce", ["get", "stroke-opacity"], 1],
  },
  filter: ["==", ["geometry-type"], "LineString"],
};

function setupEvents(map: MapRef) {
  const urlLayers = [
    `${sourceName}-fill`,
    `${sourceName}-fill-outline`,
    `${sourceName}-marker`,
    `${sourceName}-marker-text`,
    `${sourceName}-line`,
  ];

  map.on("click", urlLayers, (event) => {
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

  map.on("mouseover", urlLayers, (event) => {
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

  map.on("mouseleave", urlLayers, (_) => {
    map.getCanvas().style.cursor = "default";
  });
}

const layers = [circle, line, polygonFill, polygonOutlineFill, symbol];

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
      url.searchParams.append("access_token", mapboxgl.accessToken);

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

export { applyTransformations, layers, setupEvents, sourceName };
