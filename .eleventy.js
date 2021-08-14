const Image = require('@11ty/eleventy-img')

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
  // Copy `img/` to `_site/img`
  eleventyConfig.addPassthroughCopy("src/static/images");

  // image optimisation using eleventy-img
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortCode);
  eleventyConfig.addLiquidShortcode("image", imageShortCode);
  eleventyConfig.addJavaScriptFunction("image", imageShortCode);

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site'
    }
  }
}