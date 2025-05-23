import { Manifest } from "./type";
// @ts-ignore: comes as string from vite-string-plugin
import rawJavascript from "./scripts/neighborhood.js";

const source = rawJavascript;

const manifest: Manifest = {
  source: source,
  form: [
    {
      type: "prompt",
      label: "What are you looking for in your neighborhood?",
      name: "prompt",
      placeholder: "I want to live near a park in Colorado.",
      defaultValue: "I want to live near a park in Colorado.",
      hint:
        "Describe your ideal neighborhood location. If no location is specified, the search will default to Colorado.",
    },
    // {
    //   type: "area",
    //   label: "Area",
    //   name: "area",
    //   defaultValue: "colorado",
    //   hint: "Select the state to search within",
    // },
  ],
  about: "Describe your ideal neighborhood location.",
};

export { manifest };
