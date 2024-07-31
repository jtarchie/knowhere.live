import { manifest as demo } from "./demo";
import { manifest as nearby } from "./nearby";
import { Manifest } from "./type";

interface Schema {
  [key: string]: Manifest;
}

const manifests: Schema = { demo, nearby };

export default manifests;
export type { Manifest };
