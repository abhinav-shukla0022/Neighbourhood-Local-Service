const User = require('../models/User');
const jwt = require('jsonwebtoken');

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// REGISTER USER
const registerUser = async (req, res) => {
  const { name, email, password, role, phone, location, skills, hourlyRate } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,           // Mongoose middleware will hash it
      role,
      phone,
      location,
      ...(role === 'provider' && { 
        skills: skills || [], 
        hourlyRate: hourlyRate ? Number(hourlyRate) : null 
      })
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // check password
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser };