module.exports = function(eleventyConfig) {
  
    eleventyConfig.addPassthroughCopy("source/images");
    eleventyConfig.addPassthroughCopy("source/fonts");
    eleventyConfig.addPassthroughCopy("source/js");
    eleventyConfig.addPassthroughCopy("source/downloads");

    return {
        dir: {
            input: 'source', 
            output: 'docs'  
        },
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk'
    };
};