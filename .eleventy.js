module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("styles");

  return {
    dir: {
      data: "../_data",
      includes: "../_includes",
      input: "src",
      output: "dist",
    },
  };
};
