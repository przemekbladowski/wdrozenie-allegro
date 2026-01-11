
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/auth.css';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email || !password) {
      setError('Wypełnij wszystkie pola');
      return;
    }

    if (login(email, password)) {
      navigate('/account');
    } else {
      setError('Nieprawidłowe dane (demo: hasło min. 6 znaków)');
    }
  };

  return (
    <div className="auth-page">
      <header className="auth-header">
        <div className="auth-header-container">
          <Link to="/" className="auth-logo-section">
            <div className="auth-logo-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <span className="auth-logo-text">Marketplace</span>
          </Link>
        </div>
      </header>

      <main className="auth-main-content">
        <div className="auth-card">
          <div className="auth-icon-circle">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
          </div>

          <h1 className="auth-title">Zaloguj się</h1>
          <p className="auth-subtitle">Wpisz swoje dane aby uzyskać dostęp do konta</p>

          <form onSubmit={handleLogin}>
            <div className="auth-form-group">
              <label className="auth-form-label">Adres email</label>
              <input
                type="email"
                className="auth-form-input"
                placeholder="twoj@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-form-label">Hasło</label>
              <input
                type="password"
                className="auth-form-input"
                placeholder="Minimum 6 znaków"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            <button type="submit" className="auth-submit-button">
              Zaloguj się
            </button>
          </form>

          <p className="auth-demo-info">
            To jest demo. Użyj dowolnego emaila i hasła (min. 6 znaków)
          </p>

          <div className="auth-links-section">
            <p className="auth-link-text">
              Nie masz konta?{' '}
              <Link to="/register" className="auth-text-link">Zarejestruj się</Link>
            </p>
            <p className="auth-link-text">
              <button className="auth-text-link" onClick={() => alert('Demo: Reset hasła')}>Zapomniałeś hasła?</button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
