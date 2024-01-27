import Header from '@/Components/Header/Header'
import {createContext} from "react";

export const AuthContext = createContext({ user: null })
export default function Layout({ children, auth }) {
    return (
        <AuthContext.Provider value={auth}>
            <div className='container'>
            <Header />
                {children}
            </div>
        </AuthContext.Provider>
    )
}
