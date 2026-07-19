/**
 * News Routes
 */

const express = require('express');
const router = express.Router();
const newsService = require('../services/newsService');

// Get news for niche
router.get('/:niche', async (req, res) => {
  try {
    const { niche } = req.params;
    const { limit = 10 } = req.query;

    const news = await newsService.getNewsForNiche(niche, parseInt(limit));
    res.json({
      success: true,
      niche,
      count: news.length,
      items: news
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all supported niches
router.get('/list/all', (req, res) => {
  const niches = [
    'cryptocurrency',
    'artificial_intelligence',
    'cybersecurity',
    'personal_finance',
    'digital_marketing',
    'software_development',
    'real_estate',
    'ecommerce',
    'blockchain',
    'renewable_energy',
    'technology',
    'health',
    'finance',
    'sports',
    'travel',
    'food',
    'fashion',
    'business',
    'science',
    'gaming',
    'lifestyle',
    'productivity',
    'psychology',
    'education',
    'automotive'
  ];

  res.json({ niches, total: niches.length });
});

module.exports = router;
