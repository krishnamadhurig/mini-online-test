export default function QuestionPalette({ questions, answers, current, onJump }) {
  return (
    <div className="palette">
      {questions.map((q, i) => (
        <button
          key={q._id}
          className={'pal' + (i === current ? ' current' : '') + (answers[q._id] !== undefined ? ' done' : '')}
          onClick={() => onJump(i)}
          aria-label={`Go to question ${i + 1}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}