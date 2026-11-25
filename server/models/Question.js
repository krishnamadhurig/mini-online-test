const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    options: {
      type: [String],
      validate: [(v) => v.length === 4, 'A question needs exactly 4 options'],
    },
    correctIndex: { type: Number, required: true, min: 0, max: 3 },
    subject: { type: String, default: 'JavaScript & Web' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);