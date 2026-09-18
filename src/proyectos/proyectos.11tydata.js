module.exports = {
  layout: "case-study.njk",
  tags: "proyectos",
  permalink: (data) => `/proyectos/${data.page.fileSlug}/`,
  eleventyComputed: {
    pageTitle: (data) => `${data.title} — Caso de éxito — CodeCraft`,
    description: (data) => data.summary,
    canonicalPath: (data) => `/proyectos/${data.page.fileSlug}/`,
    schema: (data) =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: data.title,
        about: data.summary,
        creator: { "@type": "Organization", name: "CodeCraft" },
      }),
  },
};
