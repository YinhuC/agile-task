import { createContext } from 'react';
import { User } from '../../types/user.types';

type AuthContextProps = {
  user?: User;
  setUser: (data: User | undefined) => void;
};

export const AuthContext = createContext<AuthContextProps>({
  setUser: () => {},
});
