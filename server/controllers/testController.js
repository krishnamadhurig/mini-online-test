const Question = require('../models/Question');
const Attempt = require('../models/Attempt');
const questionView = require('../views/questionView');
const { QUESTION_COUNT, DURATION_SECONDS, GRACE_SECONDS } = require('../config/constants');

const secondsLeft = (attempt) =>
  Math.max(0, DURATION_SECONDS - Math.floor((Date.now() - attempt.startedAt.getTime()) / 1000));

async function gradeAttempt(attempt, answers, auto) {
  const questions = await Question.find({ _id: { $in: attempt.questions } });
  let score = 0;

  attempt.answers = attempt.questions.map((id) => {
    const q = questions.find((x) => String(x._id) === String(id));
    const picked = Number.isInteger(answers[id]) ? answers[id] : -1;
    if (q && picked === q.correctIndex) score++;
    return { question: id, selected: picked };
  });

  attempt.score = score;
  attempt.status = 'submitted';
  attempt.submittedAt = new Date();
  attempt.autoSubmitted = auto;
  await attempt.save();
  return attempt;
}

exports.startTest = async (req, res) => {
  let attempt = await Attempt.findOne({ user: req.user._id, status: 'in-progress' });

  if (attempt && secondsLeft(attempt) === 0) {
    await gradeAttempt(attempt, {}, true);
    attempt = null;
  }

  if (!attempt) {
    const picked = await Question.aggregate([{ $sample: { size: QUESTION_COUNT } }]);
    if (picked.length < QUESTION_COUNT) {
      return res.status(400).json({
        message: `The test needs ${QUESTION_COUNT} questions but only ${picked.length} exist. Run the seed script or add questions as admin.`,
      });
    }
    attempt = await Attempt.create({
      user: req.user._id,
      total: picked.length,
      questions: picked.map((q) => q._id),
    });
  }

  const docs = await Question.find({ _id: { $in: attempt.questions } });
  const order = new Map(attempt.questions.map((id, i) => [String(id), i]));
  docs.sort((a, b) => order.get(String(a._id)) - order.get(String(b._id)));

  res.json({
    attemptId: attempt._id,
    remainingSeconds: secondsLeft(attempt),
    questions: docs.map(questionView.forStudent),
  });
};

exports.submitTest = async (req, res) => {
  const attempt = await Attempt.findOne({ _id: req.params.id, user: req.user._id });
  if (!attempt) return res.status(404).json({ message: 'Attempt not found' });

  if (attempt.status === 'submitted') return res.json({ attemptId: attempt._id });

  const elapsed = (Date.now() - attempt.startedAt.getTime()) / 1000;
  const answers = elapsed > DURATION_SECONDS + GRACE_SECONDS ? {} : req.body.answers || {};

  await gradeAttempt(attempt, answers, Boolean(req.body.auto));
  res.json({ attemptId: attempt._id, score: attempt.score, total: attempt.total });
};