const Image = require('../schemas/Image');

// Get image by block name
exports.getImageByBlock = async (req, res) => {
  const blockName = req.params.blockName; // Keep the name as received

  try {
    const image = await Image.findOne({ blockName: { $regex: new RegExp(`^${blockName}$`, 'i') } }); // Case-insensitive match

    if (!image) {
      return res.status(404).json({ message: `Image not found for block: ${blockName}` });
    }

    res.json({ image: image.image }); // Send the image URL
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving image', error });
  }
};

// Get a single image
exports.getSingleImage = async (req, res) => {
  try {
    const image = await Image.findOne({}, 'image');  // Get one image from the database
    if (!image) {
      return res.status(404).json({ message: 'No image found' });
    }
    res.json({ image: image.image });  // Send just the image URL as a string
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving image', error });
  }
};

// Get all Images
exports.getImages = async (req, res) => {
  try {
    const images = await Image.find({}, 'image'); // Only return the 'image' field
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving images', error });
  }
};

// Retrieve a single image by ID
exports.getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id, 'image'); // Only return the 'image' field
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json({ image: image.image });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving image', error });
  }
};
