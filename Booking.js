const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ✅ optional
 service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  date: { type: Date }, // ✅ optional
  time: { type: String }, // ✅ optional
  description: String,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);