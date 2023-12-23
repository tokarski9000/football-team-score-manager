import { Link } from "@inertiajs/react";

export default function Header({auth}) {
    const { data, setData, post, processing, errors, reset } = useForm({

    });
    return (           
    <div>
        <nav>
        <ul>
            <li><strong><Link href={route('home')}>Piłka</Link></strong></li>
        </ul>
        <ul>
            {auth.user ? 
            (
                <li>
                    <Link href={route('dashboard')}>Dashboard</Link>
                </li>
             )
            :
            (<>
                <li><Link href={route('login')}>Log in</Link></li>
                <li><Link href={route('register')} role="button">Register</Link></li>        
            </>)
            }
        </ul>
        </nav>
    </div>
    )
}