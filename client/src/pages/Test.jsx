import { useNavigate } from 'react-router-dom';
import useTest from '../hooks/useTest';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';
import QuestionPalette from '../components/QuestionPalette';

export default function Test() {
  const nav = useNavigate();
  const t = useTest();

  if (t.error && t.questions.length === 0) {
    return (
      <div className="card">
        <p className="error">{t.error}</p>
        <button onClick={() => nav('/')}>Back to home</button>
      </div>
    );
  }
  if (t.loading) return <p className="center">Preparing your test…</p>;

  const total = t.questions.length;
  const isLast = t.idx === total - 1;

  const finish = () => {
    const unanswered = total - t.answeredCount;
    if (unanswered > 0 && !window.confirm(`${unanswered} question(s) are unanswered. Submit anyway?`)) return;
    t.submit(false);
  };

  return (
    <div>
      <div className="test-bar">
        <span>Question {t.idx + 1} of {total}</span>
        <Timer seconds={t.left} />
      </div>

      <div className="card">
        <QuestionCard
          question={t.current}
          selected={t.answers[t.current._id]}
          onSelect={(i) => t.choose(t.current._id, i)}
        />
        <div className="row between">
          <button className="ghost" disabled={t.idx === 0} onClick={() => t.setIdx(t.idx - 1)}>
            Previous
          </button>
          {isLast ? (
            <button onClick={finish} disabled={t.submitting}>Submit test</button>
          ) : (
            <button onClick={() => t.setIdx(t.idx + 1)}>Next</button>
          )}
        </div>
      </div>

      <QuestionPalette
        questions={t.questions}
        answers={t.answers}
        current={t.idx}
        onJump={t.setIdx}
      />

      <div className="row between">
        <span className="muted">{t.answeredCount} of {total} answered</span>
        <button className="danger" onClick={finish} disabled={t.submitting}>
          {t.submitting ? 'Submitting…' : 'Submit now'}
        </button>
      </div>
      {t.error && <p className="error">{t.error}</p>}
    </div>
  );
}