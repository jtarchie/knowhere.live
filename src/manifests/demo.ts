import { Manifest } from "./type";
// @ts-ignore: comes as string from vite-string-plugin
import rawJavascript from "./scripts/demo.js";

const source = rawJavascript.trim();

const manifest: Manifest = {
  source: source,
  form: [
    {
      type: "string",
      label: "Name",
      name: "keyword",
      placeholder: "Costco",
      defaultValue: "Costco",
      hint: "Name of a place",
      minLength: 3,
    },
    {
      type: "area",
      label: "Area",
      name: "area",
      defaultValue: "colorado",
      hint: "Select the area to search within",
    },
  ],
  about: "This is a demo manifest. You can search all names for a keyword.",
};

export { manifest };
