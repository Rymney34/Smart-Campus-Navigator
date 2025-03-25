const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Route to get a single image
router.get('/images/one', imageController.getSingleImage);

router.get('/images', imageController.getImages);
router.get('/images/:id', imageController.getImageById);
router.get('/images/block/:blockName', imageController.getImageByBlock);  // New route for image by block name


module.exports = router;
