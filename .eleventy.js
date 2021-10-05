const Image = require('@11ty/eleventy-img')
const embedEverything = require('eleventy-plugin-embed-everything')
const markdownIt = require('markdown-it')
const markdownItClass = require('@toycode/markdown-it-class')
const mila = require('markdown-it-link-attributes')
require('dotenv').config()

async function imageShortCode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ['avif', 'jpeg'],
    // urlPath: '/static/img',
    urlPath: `${process.env.PATH_PREFIX}/static/img`,
    outputDir: `_site/static/img`,
  });
  let imageAttributes = {
    style: 'border-radius: 50%',
    alt, 
    sizes, 
    loading: 'lazy',
    decoding: 'async'
  };
  return Image.generateHTML(metadata, imageAttributes);
}
async function imageMdShortCode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ['avif', 'jpeg'],
    // urlPath: '/static/img',
    urlPath: `${process.env.PATH_PREFIX}/static/img`,
    outputDir: `_site/static/img`,
  });
  let imageAttributes = {
    alt, 
    sizes, 
    loading: 'lazy',
    decoding: 'async'
  };
  return Image.generateHTML(metadata, imageAttributes);
}
async function imageFillShortCode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ['avif', 'jpeg'],
    // urlPath: '/static/img',
    urlPath: `${process.env.PATH_PREFIX}/static/img`,
    outputDir: `_site/static/img`,
  });
  let imageAttributes = {
    style: 'width: 100%; height: 100%; object-fit: cover;',
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
  eleventyConfig.addPassthroughCopy("src/static/assets");

  // image optimisation using eleventy-img
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortCode);
  eleventyConfig.addLiquidShortcode("image", imageShortCode);
  eleventyConfig.addJavaScriptFunction("image", imageShortCode);

  eleventyConfig.addNunjucksAsyncShortcode("imagemd", imageMdShortCode);
  eleventyConfig.addLiquidShortcode("imagemd", imageMdShortCode);
  eleventyConfig.addJavaScriptFunction("imagemd", imageMdShortCode);

  eleventyConfig.addNunjucksAsyncShortcode("imagefill", imageFillShortCode);
  eleventyConfig.addLiquidShortcode("imagefill", imageFillShortCode);
  eleventyConfig.addJavaScriptFunction("imagefill", imageFillShortCode);

  eleventyConfig.addShortcode('vid', (videoName) => `
  <video controls width="100%">
    <source src="${videoName}" type="video/${videoName.split('.').pop()}">
    <a href="${videoName}">${videoName}</a>
  </video>`)

  const mapping = {
    h1: ['text-xl', 'font-bold', 'self-start', 'pb-2'],
    h2: ['text-base', 'uppercase', 'self-start', 'pt-1'],
    a: ['text-blue-400', 'underline'],
    ul: ['markdown-list', 'list-inside', 'ml-2', 'self-start'],
    blockquote: ['self-start', 'italic', 'pl-2', 'border-l-2', 'text-sm', 'py-1', 'my-1', 'border-yellow-200']
  };

  eleventyConfig.addPlugin(embedEverything)

  let milaOptions = {
    attrs: {
      target: "_blank",
      rel: "noopener noreferrer"
    }
  };
  const md = markdownIt({linkify: true, html: true})
  md.use(mila, milaOptions)
  md.use(markdownItClass, mapping)
  eleventyConfig.setLibrary('md', md)

  return {
    pathPrefix: process.env.PATH_PREFIX,
    markdownTemplateEngine: "njk",
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: `_site`
    }
  }
}
