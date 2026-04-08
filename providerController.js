const User = require('../models/User');
const Service = require('../models/Service');

const getAllProviders = async (req, res) => {
  try {
    const providers = await User.find({ role: 'provider' }).select('-password');
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createService = async (req, res) => {
  try {
    const service = await Service.create({ ...req.body, provider: req.user._id });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyServices = async (req, res) => {
  try {
    const services = await Service.find({ provider: req.user._id });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllProviders, createService, getMyServices };