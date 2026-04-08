const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createBooking, getMyBookings, getProviderBookings, updateBookingStatus } = require('../controllers/bookingController');
const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/requests', protect, getProviderBookings);
router.patch('/:id', protect, updateBookingStatus);

module.exports = router;