import { manifest as demo } from "./demo";
import { Manifest } from "./type";

interface Schema {
  [key: string]: Manifest;
}

const manifests: Schema = { demo };

export default manifests;
export type { Manifest };
