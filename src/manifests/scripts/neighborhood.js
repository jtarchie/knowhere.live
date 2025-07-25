/// <reference path="../../../docs/src/global.d.ts" />

function zillowURL(bounds) {
  // https://www.zillow.com/homes/for_sale/?searchQueryState={%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A{%22west%22%3A-105.91190088989258%2C%22east%22%3A-105.64513911010742%2C%22south%22%3A39.88949772255962%2C%22north%22%3A39.967295787905705}%2C%22filterState%22%3A{%22sort%22%3A{%22value%22%3A%22globalrelevanceex%22}}}

  const url = new URL("https://www.zillow.com/homes/for_sale/");
  url.searchParams.append(
    "searchQueryState",
    JSON.stringify({
      isMapVisible: true,
      mapBounds: {
        west: bounds.left(),
        east: bounds.right(),
        south: bounds.bottom(),
        north: bounds.top(),
      },
    }),
  );

  return url.toString();
}

function overlappingBounds(bbs) {
  if (bbs.length === 0) return [];
  if (bbs.length === 1) return bbs;

  // Convert BoundArray objects to Bound objects once to avoid repeated conversions
  const bounds = bbs.map((boundArray) => ({
    original: boundArray,
    bound: boundArray.asBound(),
  }));

  const merged = [];
  const used = new Set();

  for (let i = 0; i < bounds.length; i++) {
    if (used.has(i)) continue;

    const currentGroup = [bounds[i].bound]; // Use the Bound object, not BoundArray
    let currentBound = bounds[i].bound;
    used.add(i);

    // Find all bounds that intersect with current group
    let foundIntersection = true;
    while (foundIntersection) {
      foundIntersection = false;

      for (let j = 0; j < bounds.length; j++) {
        if (used.has(j)) continue;

        if (currentBound.intersects(bounds[j].bound)) {
          currentGroup.push(bounds[j].bound); // Use the Bound object, not BoundArray
          currentBound = geo.asBounds(...currentGroup).asBound();
          used.add(j);
          foundIntersection = true;
        }
      }
    }

    merged.push(geo.asBounds(...currentGroup));
  }

  return merged;
}

const areas = params.prompt_query.areas.length > 0
  ? params.prompt_query.areas.slice(0, 5)
  : ["colorado"];

let bounds = "";
if (params.prompt_query.bounds?.query) {
  const boundQuery = query.execute(
    params.prompt_query.bounds.query + `(area=${areas[0]})`,
  );
  if (boundQuery.length > 0) {
    bounds = "(bb=" + boundQuery[0].bound().asBB() + ")";
  }
}

const keywords = params.prompt_query.queries.map((match) => {
  const queries = areas.map(
    (area) => match.query + `[name](area=${area})${bounds}`,
  );
  return {
    query: match.query,
    results: query.union(...queries),
    radius: match.radius,
    legend: match.legend,
  };
});

keywords.sort((a, b) => a.results.length - b.results.length);

let entries = [];

if (keywords.length == 1) {
  entries = keywords[0].results.cluster(500).map((entry) => [entry]);
} else {
  const neighbors = new Map();
  const cluster = keywords[0].results.cluster(500);
  cluster.forEach((entry) => {
    neighbors.set(entry.id, new Map());
  });

  const expectedNeighbors = 2;

  keywords.slice(1).forEach((keyword) => {
    const grouped = cluster.overlap(
      keyword.results,
      keywords[0].radius,
      keyword.radius,
      expectedNeighbors - 1,
    );
    grouped.forEach((values) => {
      values.forEach((value) =>
        neighbors.get(values[0].id).set(value.id, value)
      );
    });
  });

  entries = [...neighbors.values()]
    .map((set) => {
      const values = [...set.values()];
      if (values.length !== keywords.length) {
        return [];
      }

      return values;
    })
    .filter((entry) => entry.length > 0);
}

const neighborhoodBounds = [];
let features = entries.flatMap((neighborhood, _) => {
  const entries = neighborhood.map((entry, index) => {
    const color = colors.pick(index);

    const feature = entry.asFeature({
      "marker-color": color,
      index: index,
      legend: keywords[index].legend,
    });

    return feature;
  });

  const entriesWithSpecifiedRadius = neighborhood.map((entry, index) =>
    entry.bound().extend(keywords[index].radius)
  );

  // create into combined bounds object
  const entriesBounds = geo.asBounds(...entriesWithSpecifiedRadius);
  neighborhoodBounds.push(entriesBounds);

  return entries;
});

let overlapping = neighborhoodBounds;

// Only run overlap consolidation if we have multiple bounds
if (neighborhoodBounds.length > 1) {
  // Single pass should be sufficient with the improved algorithm
  overlapping = overlappingBounds(neighborhoodBounds);

  // Only do a second pass if we actually merged something
  if (
    overlapping.length < neighborhoodBounds.length &&
    overlapping.length > 1
  ) {
    const secondPass = overlappingBounds(overlapping);
    if (secondPass.length < overlapping.length) {
      overlapping = secondPass;
    }
  }
}

features = overlapping
  .map((overlap, index) => {
    return overlap.asBound().asFeature({
      fill: colors.pick(index),
      "fill-opacity": 0.5,
      url: zillowURL(overlap.asBound()),
      description: "See on Zillow",
      legend: "Neighborhood",
    });
  })
  .concat(features);

const payload = {
  type: "FeatureCollection",
  features: features,
};

assert.geoJSON(payload);

export { payload };
