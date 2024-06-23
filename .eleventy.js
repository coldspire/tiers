const { EleventyRenderPlugin } = require("@11ty/eleventy");
const pluginWebC = require("@11ty/eleventy-plugin-webc");
const markdownIt = require("markdown-it"); // Included as part of 11ty installation
const markdownItFootnote = require("markdown-it-footnote");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(pluginWebC);

  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("fonts");

  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true, // Enable HTML tags in source
      breaks: true, // Convert '\n' in paragraphs into <br>
      linkify: true, // Autoconvert URL-like text to links,
      typographer: true, // Enable some language-neutral replacement + quotes beautification
    }).use(markdownItFootnote),
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
