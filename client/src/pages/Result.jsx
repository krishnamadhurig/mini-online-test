import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as attemptService from '../services/attemptService';
import { errMsg } from '../services/api';
import ReviewItem from '../components/ReviewItem';

export default function Result() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    attemptService
      .result(id)
      .then(setData)
      .catch((err) => setError(errMsg(err)));
  }, [id]);

  if (error) return <p className="error center">{error}</p>;
  if (!data) return <p className="center">Loading result…</p>;

  const percent = Math.round((data.score / data.total) * 100);
  const wrong = data.total - data.score;

  return (
    <div>
      <div className="card score">
        <div className="big">{data.score}<small> / {data.total}</small></div>
        <p>{percent}% · {data.score} right, {wrong} wrong or unanswered</p>
        <p className="muted">{new Date(data.submittedAt).toLocaleString()}</p>
        {data.autoSubmitted && (
          <p className="note">Time ran out, so the test was submitted automatically.</p>
        )}
      </div>

      {data.review.map((item, i) => (
        <ReviewItem key={i} number={i + 1} item={item} />
      ))}

      <div className="row">
        <Link to="/history" className="btn">View history</Link>
        <Link to="/" className="btn ghost">Home</Link>
      </div>
    </div>
  );
}