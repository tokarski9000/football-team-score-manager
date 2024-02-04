import {AuthContext} from "@/Layouts/Layout.jsx";
import {useContext} from "react";
import {Link, useForm} from "@inertiajs/react";

export default function Footer() {
  const auth = useContext(AuthContext);
  const { post } = useForm();

  const logout = (e) => {
    e.preventDefault();
    post(route('logout'));
  };
  return (
    <footer>
      <div className={'d-flex flex-row justify-content-between'}>
        <div>
          <p>
           <small>Copyright RT</small>
          </p>
        </div>
        <div>
          {auth.user && <Link
            href={route('home')}
            onClick={logout}
          >
            Logout
          </Link>
          }
        </div>
      </div>
    </footer>
  )
}
