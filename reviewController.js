const Review = require('../models/Review');
const User = require('../models/User');

const createReview = async (req, res) => {
  try {
    const review = await Review.create({ ...req.body, reviewer: req.user._id });
    // Update provider rating
    const provider = await User.findById(req.body.provider);
    const reviews = await Review.find({ provider: req.body.provider });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    provider.rating = avgRating;
    provider.totalReviews = reviews.length;
    await provider.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProviderReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ provider: req.params.id }).populate('reviewer', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createReview, getProviderReviews };