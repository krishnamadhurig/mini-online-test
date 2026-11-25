export default function QuestionCard({ question, selected, onSelect }) {
  return (
    <>
      <h2>{question.text}</h2>
      <div className="options">
        {question.options.map((opt, i) => (
          <label key={i} className={'option' + (selected === i ? ' picked' : '')}>
            <input
              type="radio"
              name={question._id}
              checked={selected === i}
              onChange={() => onSelect(i)}
            />
            <span className="bubble">{'ABCD'[i]}</span>
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </>
  );
}