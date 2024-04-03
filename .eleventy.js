const pluginWebC = require("@11ty/eleventy-plugin-webc");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebC);

  return {
    dir: {
      includes: "../_includes",
      input: "src",
      output: "dist",
    },
  };
};
