import { inspect } from "node:util";
import markdownIt from "markdown-it";
import { EleventyRenderPlugin } from "@11ty/eleventy";
import pluginWebC from "@11ty/eleventy-plugin-webc";

export default async function (eleventyConfig) {
  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      typographer: true,
    }),
  );

  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(pluginWebC);

  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("fonts");

  eleventyConfig.addFilter("keys", (obj) => Object.keys(obj).sort());
  eleventyConfig.addFilter("inspect", (obj) =>
    inspect(obj, { sorted: true, depth: null }),
  );

  eleventyConfig.addWatchTarget("./_data/**");

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
}
