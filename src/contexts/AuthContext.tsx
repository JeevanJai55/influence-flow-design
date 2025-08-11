import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('oneinfluence_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple mock authentication - in real app this would be API call
    if (email && password.length >= 6) {
      const user = {
        id: '1',
        email,
        name: email.split('@')[0],
      };
      setUser(user);
      localStorage.setItem('oneinfluence_user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simple mock signup - in real app this would be API call
    if (name && email && password.length >= 6) {
      const user = {
        id: Date.now().toString(),
        email,
        name,
      };
      setUser(user);
      localStorage.setItem('oneinfluence_user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('oneinfluence_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};