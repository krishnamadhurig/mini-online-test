export default function ReviewItem({ number, item }) {
  const status = item.isCorrect ? 'Correct' : item.selected === -1 ? 'Not answered' : 'Wrong';

  return (
    <div className={'card review ' + (item.isCorrect ? 'right' : 'wrong')}>
      <h3>
        {number}. {item.text} <span className="tag">{status}</span>
      </h3>
      <ul>
        {item.options.map((opt, j) => {
          const cls = j === item.correctIndex ? 'is-correct' : j === item.selected ? 'is-wrong' : '';
          return (
            <li key={j} className={cls}>
              <span className="bubble">{'ABCD'[j]}</span>
              <span>{opt}</span>
              {j === item.correctIndex && <em>Correct answer</em>}
              {j === item.selected && j !== item.correctIndex && <em>Your answer</em>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}