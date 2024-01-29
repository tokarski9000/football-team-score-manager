import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Elements/InputError/InputError';

export default function Login({ status, canResetPassword }) {
  const {
    data, setData, post, processing, errors, reset,
  } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => () => {
    reset('password');
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route('login'));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />
      {status ? <div>{status}</div> : null}

      <form onSubmit={submit}>
        <div>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            autoComplete="username"
            onChange={(e) => setData('email', e.target.value)}
            aria-invalid={errors.email ? true : null}
          />
          <InputError>{errors.email}</InputError>
        </div>

        <div className="mt-4">
          <input
            id="password"
            type="password"
            name="password"
            value={data.password}
            placeholder="Password"
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
            aria-invalid={errors.password ? true : null}
          />

          <InputError>{errors.password}</InputError>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="remember"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
            />
            <span>Remember me</span>
          </label>
        </div>

        <div>
          {canResetPassword ? (
            <p>
              <Link
                href={route('password.request')}
              >
                Forgot your password?
              </Link>
            </p>
          ) : null}
          <button disabled={processing}>
            Log in
          </button>
        </div>
      </form>
    </GuestLayout>
  );
}
