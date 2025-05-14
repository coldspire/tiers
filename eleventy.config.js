import { inspect } from "node:util";
import { EleventyRenderPlugin } from "@11ty/eleventy";
import pluginWebC from "@11ty/eleventy-plugin-webc";

export default async function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(pluginWebC);

  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("fonts");

  eleventyConfig.addFilter("inspect", (obj) =>
    inspect(obj, { sorted: true, depth: null }),
  );

  return {
    dir: {
      data: "../_data",
      includes: "../_includes",
      input: "src",
      output: "dist",
    },
  };
};
