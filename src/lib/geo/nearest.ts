interface RadiusSet {
  radius: number;
  features: GeoJSON.Feature[];
}

function groupNearest(sources: RadiusSet[]): GeoJSON.Feature[][] {
  if (sources.length == 0) {
    return [];
  }
  if (sources.length == 1) {
    return [sources[0].features];
  }

  const results: GeoJSON.Feature[][] = [];

  for (let i = 0; i < sources[0].features.length; i++) {
    const originFeature = sources[0].features[i];
    const originBbox = bboxFromRadius(originFeature, sources[0].radius);
    const possibles = [originFeature];

    for (let j = 1; j < sources.length; j++) {
      const source = sources[j];

      for (let k = 0; k < source.features.length; k++) {
        const bbox = bboxFromRadius(source.features[k], source.radius);
        if (bboxOverlap(originBbox, bbox)) {
          possibles.push(source.features[k]);
          break;
        }
      }

      if (possibles.length !== j) {
        break;
      }
    }

    if (possibles.length === sources.length) {
      results.push(possibles);
    }
  }

  return results;
}

function bboxFromRadius(
  feature: GeoJSON.Feature,
  radiusInMiles: number,
): GeoJSON.BBox {
  const [lng, lat] = (feature.geometry as GeoJSON.Point).coordinates;
  const mileInDegreesLat = 1 / 69; // Roughly 1 degree of latitude equals 69 miles
  const avgLat = Math.cos(lat * Math.PI / 180);
  const mileInDegreesLng = mileInDegreesLat / avgLat;

  const deltaLat = radiusInMiles * mileInDegreesLat;
  const deltaLng = radiusInMiles * mileInDegreesLng;

  const minLat = lat - deltaLat;
  const maxLat = lat + deltaLat;
  const minLng = lng - deltaLng;
  const maxLng = lng + deltaLng;

  return [minLng, minLat, maxLng, maxLat]; // GeoJSON.BBox format
}

function bboxOverlap(box1: GeoJSON.BBox, box2: GeoJSON.BBox): boolean {
  // Destructure the bounding boxes to get min/max lat/lng
  const [minLng1, minLat1, maxLng1, maxLat1] = box1;
  const [minLng2, minLat2, maxLng2, maxLat2] = box2;

  return (minLat1 <= maxLat2 && maxLat1 >= minLat2) &&
    (minLng1 <= maxLng2 && maxLng1 >= minLng2);
}

export { groupNearest };
