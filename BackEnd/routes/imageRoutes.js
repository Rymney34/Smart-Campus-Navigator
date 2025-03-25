const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Route to get a single image
router.get('/images/one', imageController.getSingleImage);

router.get('/images', imageController.getImages);
router.get('/images/:id', imageController.getImageById);

module.exports = router;
