exports.forStudent = (q) => ({
  _id: q._id,
  text: q.text,
  options: q.options,
});

exports.forAdmin = (q) => ({
  _id: q._id,
  text: q.text,
  options: q.options,
  correctIndex: q.correctIndex,
  subject: q.subject,
});