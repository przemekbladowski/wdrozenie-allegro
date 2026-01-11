import { createContext, useContext, useState, ReactNode } from 'react';

import { mockProducts, Product } from '../data/products';

interface UserData {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  favorites: number[];
  listings: Product[];
}

interface UserContextType {
  user: UserData;
  updateUser: (data: Partial<UserData>) => void;
  resetUser: () => void;
}

const defaultUser: UserData = {
  name: 'Jan Kowalski',
  email: 'jan.kowalski@example.com',
  phone: '+48 123 456 789',
  location: 'Warszawa',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZXxlbnwxfHx8fDE3NjUwMDU4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  favorites: [],
  listings: mockProducts.filter(p => p.seller.name === 'Jan Kowalski')
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData>(() => {
    const saved = localStorage.getItem('userData');
    if (saved) {
      const parsedUser = JSON.parse(saved);
      // Ensure favorites array exists
      return {
        ...defaultUser,
        ...parsedUser,
        favorites: parsedUser.favorites || [],
        listings: parsedUser.listings || []
      };
    }
    return defaultUser;
  });

  const updateUser = (data: Partial<UserData>) => {
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
  };

  const resetUser = () => {
    setUser(defaultUser);
    localStorage.removeItem('userData');
  };

  return (
    <UserContext.Provider value={{ user, updateUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}