const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const userView = require('../views/userView');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }
  if (await User.findOne({ email: email.toLowerCase() })) {
    return res.status(409).json({ message: 'This email is already registered' });
  }

  const isAdmin =
    process.env.ADMIN_EMAIL && email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase();

  const user = await User.create({ name, email, password, role: isAdmin ? 'admin' : 'student' });

  res.status(201).json({ token: generateToken(user._id), user: userView.toJSON(user) });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: (email || '').toLowerCase() }).select('+password');
  if (!user || !(await user.matchPassword(password || ''))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json({ token: generateToken(user._id), user: userView.toJSON(user) });
};

exports.me = (req, res) => {
  res.json({ user: userView.toJSON(req.user) });
};