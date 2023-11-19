import { useState, createContext, useEffect, useContext, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

import axios from '../utils/axiosAdapter';

interface AuthContextType {
  login: (username: string, password: string) => Promise<void>;
  token: string | null;
  user: string | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const authToken = sessionStorage.getItem('authToken') || null;

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: any) => {
  const [token, setToken] = useState(authToken);
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const {
        data: { token },
      } = await axios.post('v1/auth/login', {
        username,
        password,
      });

      if (token) {
        setToken(token);
        setUser(username);
      }
    } catch (error) {
      setError(JSON.stringify(error));
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    token && sessionStorage.setItem('authToken', token);

    if (token) {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        console.error('Token is expired');
        sessionStorage.removeItem('authToken');
      } else {
        sessionStorage.setItem('authToken', token);
      }
    }
  }, [token]);

  return <AuthContext.Provider value={{ token, user, login, isLoading, error }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
