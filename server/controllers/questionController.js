const Question = require('../models/Question');
const questionView = require('../views/questionView');

exports.list = async (req, res) => {
  const questions = await Question.find().sort({ createdAt: -1 });
  res.json(questions.map(questionView.forAdmin));
};

exports.create = async (req, res) => {
  const { text, options, correctIndex, subject } = req.body;
  const clean = Array.isArray(options) ? options.map((o) => String(o).trim()) : [];

  if (!text || !text.trim()) return res.status(400).json({ message: 'Question text is required' });
  if (clean.length !== 4 || clean.some((o) => !o)) {
    return res.status(400).json({ message: 'Provide exactly 4 non-empty options' });
  }
  if (![0, 1, 2, 3].includes(Number(correctIndex))) {
    return res.status(400).json({ message: 'Choose the correct option' });
  }

  const q = await Question.create({
    text: text.trim(),
    options: clean,
    correctIndex: Number(correctIndex),
    subject: subject || undefined,
  });

  res.status(201).json(questionView.forAdmin(q));
};

exports.remove = async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};