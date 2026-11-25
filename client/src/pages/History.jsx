import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as attemptService from '../services/attemptService';
import { errMsg } from '../services/api';

export default function History() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    attemptService
      .history()
      .then(setRows)
      .catch((err) => setError(errMsg(err)));
  }, []);

  if (error) return <p className="error center">{error}</p>;
  if (!rows) return <p className="center">Loading history…</p>;

  return (
    <div className="card">
      <h1>Your attempts</h1>
      {rows.length === 0 ? (
        <p>
          You have not taken a test yet. <Link to="/test">Start your first test</Link>.
        </p>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr><th>#</th><th>Date</th><th>Score</th><th>Percent</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r._id}>
                  <td>{rows.length - i}</td>
                  <td>{new Date(r.submittedAt).toLocaleString()}</td>
                  <td>{r.score} / {r.total}</td>
                  <td>{Math.round((r.score / r.total) * 100)}%</td>
                  <td><Link to={`/result/${r._id}`}>View result</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}