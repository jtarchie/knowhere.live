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
    const originCoords = (originFeature.geometry as GeoJSON.Point).coordinates;
    const originBbox = bboxFromRadius(originFeature, sources[0].radius);
    const possibles = [originFeature];

    for (let j = 1; j < sources.length; j++) {
      const source = sources[j];
      let closestFeature: GeoJSON.Feature | null = null;
      let shortestDistance = Infinity;

      for (let k = 0; k < source.features.length; k++) {
        const feature = source.features[k];
        const bbox = bboxFromRadius(feature, source.radius);

        if (bboxOverlap(originBbox, bbox)) {
          const candidateCoords =
            (feature.geometry as GeoJSON.Point).coordinates;
          const distance = approximateDistance(
            originCoords,
            candidateCoords,
          ); // Assuming miles

          if (distance < shortestDistance) {
            shortestDistance = distance;
            closestFeature = feature;
          }
        }
      }

      if (closestFeature) {
        possibles.push(closestFeature);
      } else {
        break; // No matching feature found, no need to continue
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

function approximateDistance(
  coords1: GeoJSON.Position,
  coords2: GeoJSON.Position,
): number {
  // Convert latitude and longitude from degrees to radians
  const toRad = (degree: number) => degree * Math.PI / 180;

  const lat1 = toRad(coords1[1]);
  const lon1 = toRad(coords1[0]);
  const lat2 = toRad(coords2[1]);
  const lon2 = toRad(coords2[0]);

  // Earth's radius in kilometers (approx.)
  const R = 6371;

  // Difference in coordinates
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  // Convert to approximate distance using Pythagoras
  const distance = Math.sqrt(dLat * dLat + dLon * dLon) * R;

  // Convert to miles if necessary
  return distance;
}

export { groupNearest };
