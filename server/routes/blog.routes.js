/**
 * Blog Routes
 */

const express = require('express');
const router = express.Router();
const contentGenerator = require('../services/contentGenerator');
const imageGenerator = require('../services/imageGenerator');
const seoOptimizer = require('../services/seoOptimizer');
const schemaGenerator = require('../services/schemaGenerator');
const newsService = require('../services/newsService');
const { generateSlug, generateMetaDescription } = require('../utils/helpers');

// Generate complete blog post
router.post('/generate', async (req, res) => {
  try {
    const { niche, keyword, imageCount = 5, language = 'en' } = req.body;

    if (!niche || !keyword) {
      return res.status(400).json({ error: 'Niche and keyword are required' });
    }

    console.log(`\n🚀 Starting blog generation for ${niche}: "${keyword}"`);

    // Step 1: Fetch news context
    console.log('📰 Step 1: Fetching news...');
    res.write(`data: {"status": "Fetching news...", "progress": 10}\n\n`);
    const news = await newsService.getNewsForNiche(niche, 5);
    const newsContext = await newsService.formatNewsContext(news);

    // Step 2: Generate blog content
    console.log('✍️  Step 2: Generating blog content...');
    res.write(`data: {"status": "Generating blog content...", "progress": 20}\n\n`);
    const contentResult = await contentGenerator.generateBlogContent(niche, keyword, newsContext, imageCount);
    const htmlContent = contentResult.html;

    // Step 3: Generate title
    console.log('📝 Step 3: Generating SEO title...');
    res.write(`data: {"status": "Generating title...", "progress": 30}\n\n`);
    const title = await contentGenerator.generateTitle(niche, keyword);
    const slug = generateSlug(title);

    // Step 4: Generate meta description
    console.log('📄 Step 4: Generating meta description...');
    res.write(`data: {"status": "Generating meta description...", "progress": 40}\n\n`);
    const metaDescription = await contentGenerator.generateMetaDescription(htmlContent, keyword);

    // Step 5: Generate images
    console.log('🎨 Step 5: Generating images...');
    res.write(`data: {"status": "Generating images...", "progress": 50}\n\n`);
    const images = await imageGenerator.generateImages(niche, keyword, imageCount);

    // Step 6: Generate schema
    console.log('🏗️  Step 6: Generating schema markup...');
    res.write(`data: {"status": "Generating schema...", "progress": 70}\n\n`);
    const canonicalUrl = `https://blog-generator.com/blog/${slug}/`;
    const schema = await contentGenerator.generateSchemaMarkup(
      htmlContent,
      title,
      keyword,
      'Blog Generator',
      new Date().toISOString()
    );

    // Step 7: SEO Analysis
    console.log('🔍 Step 7: Analyzing SEO...');
    res.write(`data: {"status": "Analyzing SEO...", "progress": 80}\n\n`);
    const seoAnalysis = seoOptimizer.analyzeSEO(
      htmlContent,
      title,
      metaDescription,
      keyword,
      niche
    );
    const seoReport = seoOptimizer.generateSEOReport(seoAnalysis, title, metaDescription, keyword);

    // Step 8: Generate meta tags and hreflang
    console.log('🌐 Step 8: Generating meta tags...');
    const metaTags = schemaGenerator.generateHtmlMeta({
      title,
      description: metaDescription,
      keyword,
      author: 'Blog Generator',
      canonicalUrl,
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString()
    });

    const hreflang = schemaGenerator.generateHreflang(
      'https://blog-generator.com',
      slug,
      ['en', 'es', 'fr', 'de', 'zh']
    );

    console.log('✅ Blog generation complete!');
    res.write(`data: {"status": "Complete!", "progress": 100}\n\n`);

    // Send final result
    setTimeout(() => {
      res.write(`data: {"status": "Complete", "progress": 100, "result": ${JSON.stringify({
        title,
        slug,
        metaDescription,
        content: htmlContent,
        images,
        schema,
        seoReport,
        metaTags,
        hreflang,
        niche,
        keyword,
        language,
        generatedAt: new Date().toISOString(),
        wordCount: contentResult.metadata.wordCount
      })}}\n\n`);
      res.end();
    }, 500);

  } catch (error) {
    console.error('Error in blog generation:', error);
    res.write(`data: {"error": "${error.message}", "progress": 0}\n\n`);
    res.end();
  }
});

// Get blog preview
router.get('/preview/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    // In production, fetch from database
    res.json({ slug, message: 'Preview endpoint' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
