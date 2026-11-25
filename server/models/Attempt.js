const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  answers: [
    {
      question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      selected: { type: Number, default: -1 }, 
    },
  ],
  score: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: { type: String, enum: ['in-progress', 'submitted'], default: 'in-progress' },
  startedAt: { type: Date, default: Date.now },
  submittedAt: { type: Date },
  autoSubmitted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Attempt', attemptSchema);