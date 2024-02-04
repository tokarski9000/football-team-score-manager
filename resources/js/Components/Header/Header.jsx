import { Link, useForm } from '@inertiajs/react';
import { useContext } from 'react';
import { AuthContext } from '@/Layouts/Layout.jsx';
import ApplicationLogo from '@/Components/ApplicationLogo.jsx';

export default function Header() {

  const auth = useContext(AuthContext);


  return (
    <div>
      <nav>
        <ul className={'ms-0'}>
          <li>
            <ApplicationLogo />
          </li>
        </ul>
        <ul>
          {auth.user
            ? (
              <>
                <li>
                  <Link href={route('home')}>
                    Games
                  </Link>
                </li>
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

                </li>
              </>
            )
            : (
              <>

                <li>
                  <Link href={route('home')}>
                    Games
                  </Link>
                </li>
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
              </>
            )}
        </ul>
      </nav>
    </div>
  );
}
