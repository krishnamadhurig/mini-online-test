import { useEffect, useState } from 'react';
import * as questionService from '../services/questionService';
import { errMsg } from '../services/api';

const empty = { text: '', options: ['', '', '', ''], correctIndex: 0 };

export default function Admin() {
  const [form, setForm] = useState(empty);
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const load = () =>
    questionService
      .list()
      .then(setList)
      .catch((err) => setError(errMsg(err)));

  useEffect(() => {
    load();
  }, []);

  const setOption = (i, value) =>
    setForm((f) => ({ ...f, options: f.options.map((o, k) => (k === i ? value : o)) }));

  const add = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');
    try {
      await questionService.create(form);
      setForm(empty);
      setMsg('Question added.');
      load();
    } catch (err) {
      setError(errMsg(err));
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    try {
      await questionService.remove(id);
      load();
    } catch (err) {
      setError(errMsg(err));
    }
  };

  return (
    <div>
      <div className="card">
        <h1>Add a question</h1>
        <form onSubmit={add}>
          <label>
            Question
            <textarea
              rows={2}
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              required
            />
          </label>
          {form.options.map((opt, i) => (
            <div key={i} className="opt-row">
              <input
                type="radio"
                name="correct"
                checked={form.correctIndex === i}
                onChange={() => setForm({ ...form, correctIndex: i })}
                aria-label={`Option ${'ABCD'[i]} is correct`}
              />
              <input
                placeholder={`Option ${'ABCD'[i]}`}
                value={opt}
                onChange={(e) => setOption(i, e.target.value)}
                required
              />
            </div>
          ))}
          <p className="muted">Select the circle next to the correct option.</p>
          {error && <p className="error">{error}</p>}
          {msg && <p className="ok">{msg}</p>}
          <button>Add question</button>
        </form>
      </div>

      <div className="card">
        <h2>Question bank ({list.length})</h2>
        {list.map((q) => (
          <div key={q._id} className="bank-item">
            <div>
              <strong>{q.text}</strong>
              <div className="muted">
                {q.options.map((o, i) => (i === q.correctIndex ? `✓ ${o}` : o)).join('  |  ')}
              </div>
            </div>
            <button className="danger small" onClick={() => remove(q._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}