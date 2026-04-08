const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);