const express = require('express');
const router = express.Router();
const flipkartController = require('../controllers/flipkartController');

router.get('/fetch/flipkart/mobile', async (req, res) => {
  try {
    const products = await flipkartController.scrapeFlipkartMobiles();
    res.json(products);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const snapdealController = require('../controllers/snapdealController');

router.get('/fetch/snapdeal/t-shirt', async (req, res) => {
  try {
    const products = await snapdealController.scrapeSnapdealTShirts();
    res.json(products);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/fetch/flipkart/mobile/full', async (req, res) => {
  try {
    const products = await flipkartController.scrapeFlipkartMobilesFull();
    res.json(products);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

