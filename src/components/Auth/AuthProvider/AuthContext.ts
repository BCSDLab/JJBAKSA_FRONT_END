import { User } from 'api/user/entity';
import { createContext } from 'react';

export interface AuthContextType {
  auth: User | null;
  accessToken: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

export default createContext<AuthContextType | null>(null);
