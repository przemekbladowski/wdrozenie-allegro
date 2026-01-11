
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';
import '../../styles/auth.css';

export function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
        newsletter: true
    });
    const [error, setError] = useState('');

    const { login } = useAuth();
    const { updateUser } = useUser();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        // Map input IDs to state keys
        const keyMap: { [key: string]: string } = {
            firstNameInput: 'firstName',
            lastNameInput: 'lastName',
            emailInput: 'email',
            phoneInput: 'phone',
            passwordInput: 'password',
            confirmPasswordInput: 'confirmPassword',
            termsCheckbox: 'termsAccepted',
            newsletterCheckbox: 'newsletter'
        };

        const key = keyMap[id];
        if (key) {
            setFormData(prev => ({
                ...prev,
                [key]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
            setError('Wypełnij wszystkie wymagane pola');
            return;
        }

        if (formData.password.length < 6) {
            setError('Hasło musi mieć minimum 6 znaków');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Hasła nie są zgodne');
            return;
        }

        if (!formData.termsAccepted) {
            setError('Musisz zaakceptować regulamin');
            return;
        }

        // Mock registration - just login
        if (login(formData.email, formData.password)) {
            updateUser({
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200',
                favorites: [],
                listings: []
            });
            alert(`Witaj ${formData.firstName}! Twoje konto zostało utworzone.`);
            navigate('/account');
        } else {
            setError('Błąd rejestracji. Sprawdź dane.');
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
                <div className="auth-card register">
                    <div className="auth-icon-circle">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <line x1="20" y1="8" x2="20" y2="14"></line>
                            <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                    </div>

                    <h1 className="auth-title">Utwórz konto</h1>
                    <p className="auth-subtitle">Wypełnij formularz aby założyć nowe konto</p>

                    <form onSubmit={handleRegister}>
                        <div className="auth-form-group">
                            <label className="auth-form-label">Imię</label>
                            <input type="text" id="firstNameInput" className="auth-form-input" placeholder="Twoje imię" onChange={handleChange} />
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-form-label">Nazwisko</label>
                            <input type="text" id="lastNameInput" className="auth-form-input" placeholder="Twoje nazwisko" onChange={handleChange} />
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-form-label">Adres email</label>
                            <input type="email" id="emailInput" className="auth-form-input" placeholder="twoj@email.com" onChange={handleChange} />
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-form-label">Numer telefonu</label>
                            <input type="tel" id="phoneInput" className="auth-form-input" placeholder="+48 123 456 789" onChange={handleChange} />
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-form-label">Hasło</label>
                            <input type="password" id="passwordInput" className="auth-form-input" placeholder="Minimum 6 znaków" onChange={handleChange} />
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-form-label">Potwierdź hasło</label>
                            <input type="password" id="confirmPasswordInput" className="auth-form-input" placeholder="Powtórz hasło" onChange={handleChange} />
                        </div>

                        <div className="auth-checkbox-group">
                            <label className="auth-checkbox-label">
                                <input type="checkbox" id="termsCheckbox" className="auth-checkbox-input" onChange={handleChange} />
                                <span className="auth-checkbox-text">
                                    Akceptuję <button type="button" className="auth-inline-link" onClick={() => alert('Demo: Regulamin')}>regulamin</button>
                                    {' '}i{' '}
                                    <button type="button" className="auth-inline-link" onClick={() => alert('Demo: Polityka prywatności')}>politykę prywatności</button>
                                </span>
                            </label>
                        </div>

                        <div className="auth-checkbox-group">
                            <label className="auth-checkbox-label">
                                <input type="checkbox" id="newsletterCheckbox" className="auth-checkbox-input" defaultChecked onChange={handleChange} />
                                <span className="auth-checkbox-text">
                                    Chcę otrzymywać newsletter z ofertami i promocjami
                                </span>
                            </label>
                        </div>

                        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                        <button type="submit" className="auth-submit-button">
                            Zarejestruj się
                        </button>
                    </form>

                    <p className="auth-demo-info">
                        To jest demo. Użyj dowolnych danych aby przetestować rejestrację
                    </p>

                    <div className="auth-links-section">
                        <p className="auth-link-text">
                            Masz już konto?{' '}
                            <Link to="/login" className="auth-text-link">Zaloguj się</Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
