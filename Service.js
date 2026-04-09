const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, enum: ['Plumber', 'Electrician', 'Tutor', 'Delivery'], required: true },
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);