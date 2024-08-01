interface Hash {
  [key: string]: string;
}

interface Assert {
  // deno-lint-ignore-file no-explicit-any
  geoJSON(any);
  // deno-lint-ignore-file no-explicit-any
  eq(any, any, string);
}

declare const assert: Assert;

interface Colors {
  pick(number): string;
}

declare const colors: Colors;

interface Bound {
  extend(number);
  Bound;
}

interface Point {
  asFeature(Hash): GeoJSON.Feature;
  asBound(): Bound;
}

interface Prefix {
  name: string;
  fullName: string;
  minLat: number;
  minLon: number;
  maxLat: number;
  maxLon: number;
}

interface Geo {
  asPoint(number, number): Point;
}

declare const geo: Geo;

interface Result {
  asFeature(hash): GeoJSON.Feature;
  name: string;
}

interface Tree {
  nearby(Bound, number): ResultArray;
  within(Bound): ResultArray;
}

interface ResultArray extends Array<Result> {
  asTree(depth: number): Tree;
}

interface Query {
  prefixByPoint(Point): Prefix;
  union(...string): ResultArray;
}

declare const query: Query;

interface Params {
  [key: string]: string;
}

declare const params: Params;
