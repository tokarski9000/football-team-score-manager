import { Link, useForm } from "@inertiajs/react";
import {useContext} from "react";
import {AuthContext} from "@/Layouts/Layout.jsx";

export default function Header() {
    const { post } = useForm();

    const auth = useContext(AuthContext);
    const logout = (e) => {
        e.preventDefault();
        post(route('logout'))
    }

    return (
    <div>
        <nav>
        <ul>
            <li>
                <strong>
                    <Link href={route('home')}>Piłka</Link>
                </strong>
            </li>
        </ul>
        <ul>
            {auth.user ?
            (
                <>
                    <li>
                        <Link href={route('player.index')}>
                            Players
                        </Link>
                    </li>
                    <li>
                        <Link href={route('game.create')}>
                            Create Game
                        </Link>
                    </li>
                    <li>
                        <Link href={route('dashboard')}
                              onClick={logout}>
                            Logout
                        </Link>
                    </li>
                </>
            )
                :
                (<>
                    <li>
                        <Link href={route('player.index')}>
                            Players
                        </Link>
                    </li>
                    <li>
                        <Link href={route('login')}>
                            Log in
                        </Link>
                    </li>
                </>)
            }
        </ul>
        </nav>
    </div>
    );
}
