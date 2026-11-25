exports.summary = (a) => ({
  _id: a._id,
  score: a.score,
  total: a.total,
  submittedAt: a.submittedAt,
  autoSubmitted: a.autoSubmitted,
});

exports.review = (a) => ({
  id: a._id,
  score: a.score,
  total: a.total,
  submittedAt: a.submittedAt,
  autoSubmitted: a.autoSubmitted,
  review: a.answers
    .filter((x) => x.question)
    .map((x) => ({
      text: x.question.text,
      options: x.question.options,
      selected: x.selected,
      correctIndex: x.question.correctIndex,
      isCorrect: x.selected === x.question.correctIndex,
    })),
});