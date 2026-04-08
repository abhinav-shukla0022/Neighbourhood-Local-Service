const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getAllProviders, createService, getMyServices } = require('../controllers/providerController');
const router = express.Router();

router.get('/', getAllProviders);
router.post('/services', protect, createService);
router.get('/services', protect, getMyServices);

module.exports = router;