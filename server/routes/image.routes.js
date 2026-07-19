/**
 * Image Routes
 */

const express = require('express');
const router = express.Router();
const imageGenerator = require('../services/imageGenerator');

// Generate images
router.post('/generate', async (req, res) => {
  try {
    const { niche, topic, count = 5 } = req.body;

    if (!niche || !topic) {
      return res.status(400).json({ error: 'Niche and topic are required' });
    }

    const images = await imageGenerator.generateImages(niche, topic, count);
    res.json({ success: true, images });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get image preview
router.get('/preview/:imageId', async (req, res) => {
  try {
    const { imageId } = req.params;
    const buffer = await imageGenerator.getImagePreview(imageId);
    res.setHeader('Content-Type', 'image/webp');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(buffer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
