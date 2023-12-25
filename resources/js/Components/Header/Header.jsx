import { Link, useForm } from "@inertiajs/react";

export default function Header({auth}) {
    const { post } = useForm();

    const logout = (e) => {
        e.preventDefault();
        post(route('logout'))
    }
    return (
    <div>
        <nav>
        <ul>
            <li><strong><Link href={route('home')}>Piłka</Link></strong></li>
        </ul>
        <ul>
            {auth.user ?
            (
                <>
                    <li>
                        <Link href={route('game')}>Create Game</Link>
                    </li>
                    <li>
                        <Link href={route('dashboard')}
                              onClick={logout}>Logout</Link>
                    </li>
                </>
            )
                :
                (<>
                    <li><Link href={route('login')}>Log in</Link></li>
                </>)
            }
        </ul>
        </nav>
    </div>
    );
}
