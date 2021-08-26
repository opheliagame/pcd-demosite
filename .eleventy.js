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
  eleventyConfig.addWatchTarget('./_tmp/style.css')
  eleventyConfig.addWatchTarget('src/static/css/extra.css')
  eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './_site/extra.css' })
  eleventyConfig.addPassthroughCopy({ 'src/static/css/extra.css': '/extra.css' })

  eleventyConfig.addPassthroughCopy("src/static/images");
  eleventyConfig.addPassthroughCopy("src/static/js");

  // image optimisation using eleventy-img
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortCode);
  eleventyConfig.addLiquidShortcode("image", imageShortCode);
  eleventyConfig.addJavaScriptFunction("image", imageShortCode);

  const mapping = {
    h1: ['text-xl', 'font-bold', 'self-start'],
    h2: ['text-lg'],
    a: ['text-blue-400', 'hover:underline'],
    ul: ['markdown-list', 'list-disc', 'ml-2'],
    li: ['before:content-["・"]', 'before:block'],
    hr: ['h-2']
  };

  eleventyConfig.addPlugin(embedEverything)
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
