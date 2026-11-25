import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">Mini Test</Link>
      {user && (
        <nav>
          <Link to="/">Home</Link>
          <Link to="/history">History</Link>
          {user.role === 'admin' && <Link to="/admin">Admin</Link>}
          <span className="who">{user.name}</span>
          <button className="ghost small" onClick={handleLogout}>Log out</button>
        </nav>
      )}
    </header>
  );
}