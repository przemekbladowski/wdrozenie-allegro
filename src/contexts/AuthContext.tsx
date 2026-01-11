import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: (resetUserData?: () => void, clearCartData?: () => void) => void;
  requireAuth: (callback: () => void) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const login = (email: string, password: string) => {
    // Prosta walidacja - w prawdziwej aplikacji byłoby to połączenie z API
    if (email && password.length >= 6) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = (resetUserData?: () => void, clearCartData?: () => void) => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');

    // Reset user data if function provided
    if (resetUserData) {
      resetUserData();
    }

    // Clear cart if function provided
    if (clearCartData) {
      clearCartData();
    }
  };

  const navigate = useNavigate();

  const requireAuth = (callback: () => void) => {
    if (isAuthenticated) {
      callback();
    } else {
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, requireAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}