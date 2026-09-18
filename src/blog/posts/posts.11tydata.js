module.exports = {
  layout: "post.njk",
  tags: "posts",
  permalink: (data) => `/blog/${data.page.fileSlug}/`,
  eleventyComputed: {
    pageTitle: (data) => `${data.title} — CodeCraft`,
    canonicalPath: (data) => `/blog/${data.page.fileSlug}/`,
    schema: (data) =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: data.title,
        description: data.description,
        datePublished: data.date,
        dateModified: data.date,
        author: { "@type": "Organization", name: "CodeCraft" },
        publisher: { "@type": "Organization", name: "CodeCraft" },
      }),
  },
};
