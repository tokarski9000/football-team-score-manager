import {createContext, useState} from 'react';
import Header from '@/Components/Header/Header';
import Footer from "@/Components/Footer/Footer.jsx";

export const AuthContext = createContext({ user: null });
export default function Layout({ children, auth }) {
  return (
    <AuthContext.Provider value={auth}>
      <div className="container">
        <Header />
        {children}
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}
