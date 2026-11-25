const Attempt = require('../models/Attempt');
const attemptView = require('../views/attemptView');

exports.getHistory = async (req, res) => {
  const list = await Attempt.find({ user: req.user._id, status: 'submitted' }).sort({
    submittedAt: -1,
  });
  res.json(list.map(attemptView.summary));
};

exports.getResult = async (req, res) => {
  const attempt = await Attempt.findOne({
    _id: req.params.id,
    user: req.user._id,
    status: 'submitted',
  }).populate('answers.question');

  if (!attempt) return res.status(404).json({ message: 'Result not found' });

  res.json(attemptView.review(attempt));
};