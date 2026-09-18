module.exports = function (eleventyConfig) {
  // ---- Passthrough: assets, admin (Decap CMS), robots, .nojekyll -------
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/admin/config.yml": "admin/config.yml" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/_nojekyll": ".nojekyll" });

  // ---- Filtros -----------------------------------------------------
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const d = new Date(dateObj);
    return d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
  });
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    const d = new Date(dateObj);
    return d.toISOString().slice(0, 10);
  });
  eleventyConfig.addFilter("dump", (obj) => JSON.stringify(obj));

  // ---- Colecciones (orden explícito donde importa) -------------------
  eleventyConfig.addCollection("proyectos", (api) =>
    api.getFilteredByGlob("src/proyectos/*.md").sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
  );
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/blog/posts/*.md").sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addCollection("testimonios", (api) =>
    api.getFilteredByGlob("src/testimonios/*.md").sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    pathPrefix: process.env.ELEVENTY_PATH_PREFIX || "/Code-Craft/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
