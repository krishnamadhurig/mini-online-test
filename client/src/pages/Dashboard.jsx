import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="card">
      <h1>Hello, {user.name}</h1>
      <p>Before you begin, please read the rules.</p>
      <ul className="rules">
        <li>10 multiple-choice questions, one correct answer each.</li>
        <li>You have 10 minutes. The test submits itself when the timer reaches 00:00.</li>
        <li>You can move between questions and change answers before you submit.</li>
        <li>If you refresh the page, the timer keeps running.</li>
      </ul>
      <div className="row">
        <Link to="/test" className="btn">Start test</Link>
        <Link to="/history" className="btn ghost">Past attempts</Link>
      </div>
    </div>
  );
}