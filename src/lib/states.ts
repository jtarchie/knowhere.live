import mapboxgl from "mapbox-gl";

type State = {
  bounds: mapboxgl.LngLatBoundsLike;
  name: string;
  slug?: string;
};

const states: State[] = [{
  "name": "Alabama",
  "bounds": [[-88.473227, 30.223334], [-84.88908, 35.008028]],
  "slug": "alabama",
}, {
  "name": "Alaska",
  "bounds": [[-179.148909, 51.214183], [-129.979511, 71.365162]],
  "slug": "alaska",
}, {
  "name": "Arizona",
  "bounds": [[-114.818269, 31.332177], [-109.045223, 37.00426]],
  "slug": "arizona",
}, {
  "name": "Arkansas",
  "bounds": [[-94.617919, 33.004106], [-89.644395, 36.4996]],
  "slug": "arkansas",
}, {
  "name": "California",
  "bounds": [[-124.409591, 32.534156], [-114.131211, 42.009518]],
  "slug": "california",
}, {
  "name": "Colorado",
  "bounds": [[-109.060253, 36.992426], [-102.041524, 41.003444]],
  "slug": "colorado",
}, {
  "name": "Connecticut",
  "bounds": [[-73.727775, 40.980144], [-71.786994, 42.050587]],
  "slug": "connecticut",
}, {
  "name": "Delaware",
  "bounds": [[-75.788658, 38.451013], [-75.048939, 39.839007]],
  "slug": "delaware",
}, {
  "name": "Florida",
  "bounds": [[-87.634938, 24.396308], [-80.031362, 31.000968]],
  "slug": "florida",
}, {
  "name": "Georgia",
  "bounds": [[-85.605165, 30.357851], [-80.839729, 35.000659]],
  "slug": "georgia",
}, {
  "name": "Hawaii",
  "bounds": [[-178.334698, 18.910361], [-154.806773, 28.402123]],
  "slug": "hawaii",
}, {
  "name": "Idaho",
  "bounds": [[-117.243027, 41.988057], [-111.043564, 49.001146]],
  "slug": "idaho",
}, {
  "name": "Illinois",
  "bounds": [[-91.513079, 36.970298], [-87.494756, 42.508338]],
  "slug": "illinois",
}, {
  "name": "Indiana",
  "bounds": [[-88.09776, 37.771742], [-84.784579, 41.760592]],
  "slug": "indiana",
}, {
  "name": "Iowa",
  "bounds": [[-96.639704, 40.375501], [-90.140061, 43.501196]],
  "slug": "iowa",
}, {
  "name": "Kansas",
  "bounds": [[-102.051744, 36.993076], [-94.588413, 40.003162]],
  "slug": "kansas",
}, {
  "name": "Kentucky",
  "bounds": [[-89.571509, 36.497129], [-81.964971, 39.147458]],
  "slug": "kentucky",
}, {
  "name": "Louisiana",
  "bounds": [[-94.043147, 28.928609], [-88.817017, 33.019543]],
  "slug": "louisiana",
}, {
  "name": "Maine",
  "bounds": [[-71.083924, 43.059813], [-66.949895, 47.459686]],
  "slug": "maine",
}, {
  "name": "Maryland",
  "bounds": [[-79.487651, 37.886605], [-75.048939, 39.723043]],
  "slug": "maryland",
}, {
  "name": "Massachusetts",
  "bounds": [[-73.508142, 41.237964], [-69.928393, 42.886589]],
  "slug": "massachusetts",
}, {
  "name": "Michigan",
  "bounds": [[-90.418136, 41.696118], [-82.122971, 48.238798]],
  "slug": "michigan",
}, {
  "name": "Minnesota",
  "bounds": [[-97.239209, 43.499356], [-89.491739, 49.384358]],
  "slug": "minnesota",
}, {
  "name": "Mississippi",
  "bounds": [[-91.655009, 30.173943], [-88.097889, 34.995703]],
  "slug": "mississippi",
}, {
  "name": "Missouri",
  "bounds": [[-95.774704, 35.995683], [-89.098252, 40.61364]],
  "slug": "missouri",
}, {
  "name": "Montana",
  "bounds": [[-116.050003, 44.358221], [-104.039138, 49.00139]],
  "slug": "montana",
}, {
  "name": "Nebraska",
  "bounds": [[-104.053514, 39.999998], [-95.30829, 43.001707]],
  "slug": "nebraska",
}, {
  "name": "Nevada",
  "bounds": [[-120.005746, 35.001857], [-114.039648, 42.002207]],
  "slug": "nevada",
}, {
  "name": "New Hampshire",
  "bounds": [[-72.557247, 42.697039], [-70.610621, 45.305476]],
  "slug": "new_hampshire",
}, {
  "name": "New Jersey",
  "bounds": [[-75.559614, 38.928519], [-73.893979, 41.357423]],
  "slug": "new_jersey",
}, {
  "name": "New Mexico",
  "bounds": [[-109.050173, 31.332301], [-103.001964, 37.000232]],
  "slug": "new_mexico",
}, {
  "name": "New York",
  "bounds": [[-79.762152, 40.496103], [-71.856214, 45.01585]],
  "slug": "new_york",
}, {
  "name": "North Carolina",
  "bounds": [[-84.321869, 33.842316], [-75.460621, 36.588117]],
  "slug": "north_carolina",
}, {
  "name": "North Dakota",
  "bounds": [[-104.0489, 45.935054], [-96.554507, 49.000574]],
  "slug": "north_dakota",
}, {
  "name": "Ohio",
  "bounds": [[-84.820159, 38.403202], [-80.518693, 41.977523]],
  "slug": "ohio",
}, {
  "name": "Oklahoma",
  "bounds": [[-103.002565, 33.6192], [-94.431215, 37.002206]],
  "slug": "oklahoma",
}, {
  "name": "Oregon",
  "bounds": [[-124.566244, 41.991794], [-116.463262, 46.292035]],
  "slug": "oregon",
}, {
  "name": "Pennsylvania",
  "bounds": [[-80.519891, 39.7198], [-74.689516, 42.26986]],
  "slug": "pennsylvania",
}, {
  "name": "Rhode Island",
  "bounds": [[-71.862772, 41.146339], [-71.12057, 42.018798]],
  "slug": "rhode_island",
}, {
  "name": "South Carolina",
  "bounds": [[-83.35391, 32.0346], [-78.54203, 35.215402]],
  "slug": "south_carolina",
}, {
  "name": "South Dakota",
  "bounds": [[-104.057698, 42.479635], [-96.436589, 45.94545]],
  "slug": "south_dakota",
}, {
  "name": "Tennessee",
  "bounds": [[-90.310298, 34.982972], [-81.6469, 36.678118]],
  "slug": "tennessee",
}, {
  "name": "Texas",
  "bounds": [[-106.645646, 25.837164], [-93.508292, 36.500704]],
  "slug": "texas",
}, {
  "name": "Utah",
  "bounds": [[-114.052962, 36.997966], [-109.041058, 42.001567]],
  "slug": "utah",
}, {
  "name": "Vermont",
  "bounds": [[-73.43774, 42.726853], [-71.464555, 45.016659]],
  "slug": "vermont",
}, {
  "name": "Virginia",
  "bounds": [[-83.675395, 36.540738], [-75.242266, 39.466012]],
  "slug": "virginia",
}, {
  "name": "Washington",
  "bounds": [[-124.848974, 45.543541], [-116.916504, 49.002494]],
  "slug": "washington",
}, {
  "name": "West Virginia",
  "bounds": [[-82.644739, 37.201483], [-77.719519, 40.638801]],
  "slug": "west_virginia",
}, {
  "name": "Wisconsin",
  "bounds": [[-92.888114, 42.491983], [-86.24955, 47.080621]],
  "slug": "wisconsin",
}, {
  "name": "Wyoming",
  "bounds": [[-111.056888, 40.994746], [-104.05216, 45.005904]],
  "slug": "wyoming",
}];

function findBySlug(name: string): State {
  return states.find((state) => state.slug == name) || states[0];
}

export type { State };
export { findBySlug };
