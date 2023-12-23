import Header from '@/Components/Header/Header'
import '@picocss/pico'
export default function Layout({ children, auth }) {
    return (
        <div className='container'>
        <Header auth={auth} />
            {children}
        </div>
    )
}