import { createContext } from 'react';
import Header from '@/Components/Header/Header';

export const AuthContext = createContext({ user: null });
export default function Layout({ children, auth }) {
  return (
    <AuthContext.Provider value={auth}>
      <div className="container">
        <Header />
        {children}
      </div>
    </AuthContext.Provider>
  );
}
