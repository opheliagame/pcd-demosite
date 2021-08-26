const Image = require('@11ty/eleventy-img')
const embedEverything = require('eleventy-plugin-embed-everything')
const markdownIt = require('markdown-it')
const markdownItClass = require('@toycode/markdown-it-class')

async function imageShortCode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ['avif', 'jpeg'],
    // urlPath: '/static/img',
    urlPath: '/pcd-demosite/static/img',
    outputDir: '_site/static/img'
  });
  let imageAttributes = {
    alt, 
    sizes, 
    loading: 'lazy',
    decoding: 'async'
  };
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget('src/static/css/extra.css')
  eleventyConfig.addPassthroughCopy({ 'src/static/css/extra.css': '/extra.css' })

  eleventyConfig.addPassthroughCopy("src/static/images");
  eleventyConfig.addPassthroughCopy("src/static/js");

  // image optimisation using eleventy-img
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortCode);
  eleventyConfig.addLiquidShortcode("image", imageShortCode);
  eleventyConfig.addJavaScriptFunction("image", imageShortCode);

  eleventyConfig.addShortcode('vid', (videoName) => `
  <video controls width="100%">
    <source src="${videoName}" type="video/${videoName.split('.').pop()}">
    <a href="${videoName}">${videoName}</a>
  </video>`)

  const mapping = {
    h1: ['text-xl', 'font-bold', 'self-start', 'pb-2'],
    h2: ['text-base', 'uppercase', 'self-start', 'pt-1'],
    a: ['text-blue-400', 'underline'],
    ul: ['markdown-list', 'list-inside', 'ml-2', 'self-start']
  };

  eleventyConfig.addPlugin(embedEverything, {
    twitch: {
      options: {
        parent: "opheliagame.github.io"
      }
    }
  })

  const md = markdownIt({linkify: true, html: true})
  md.use(markdownItClass, mapping)
  eleventyConfig.setLibrary('md', md)

  return {
    pathPrefix: "pcd-demosite",
    markdownTemplateEngine: "njk",
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site'
    }
  }
}
