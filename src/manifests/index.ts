import { manifest as demo } from "./demo";
import { manifest as nearby } from "./nearby";
import { manifest as neighborhood } from "./neighborhood";
import { Manifest } from "./type";

interface Schema {
  [key: string]: Manifest;
}

const manifests: Schema = { demo, nearby, neighborhood };

export default manifests;
export type { Manifest };
