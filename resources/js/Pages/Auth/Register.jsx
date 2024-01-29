import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Elements/InputError/InputError';

export default function Register() {
  const {
    data, setData, post, processing, errors, reset,
  } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => () => {
    reset('password', 'password_confirmation');
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route('register'));
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <form onSubmit={submit}>
        <div>
          <input
            id="name"
            name="name"
            value={data.name}
            autoComplete="name"
            placeholder="Name"
            isFocused
            onChange={(e) => setData('name', e.target.value)}
            required
            aria-invalid={errors.name ? true : null}
          />

          <InputError>{errors.name}</InputError>
        </div>

        <div className="mt-4">
          <input
            id="email"
            type="email"
            name="email"
            value={data.email}
            placeholder="Email"
            autoComplete="username"
            onChange={(e) => setData('email', e.target.value)}
            required
            aria-invalid={errors.email ? true : null}
          />

          <InputError>{errors.email}</InputError>
        </div>

        <div>

          <input
            id="password"
            type="password"
            name="password"
            value={data.password}
            autoComplete="new-password"
            placeholder="Password"
            onChange={(e) => setData('password', e.target.value)}
            required
            aria-invalid={errors.password ? true : null}
          />

          <InputError>{errors.password}</InputError>
        </div>

        <div className="mt-4">

          <input
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            placeholder="Confirm password"
            autoComplete="new-password"
            onChange={(e) => setData('password_confirmation', e.target.value)}
            required
            aria-invalid={errors.password_confirmation ? true : null}
          />

          <InputError>{errors.password_confirmation}</InputError>
        </div>

        <div>
          <p>
            <Link
              href={route('login')}
            >
              Already registered?
            </Link>
          </p>
          <button className="ms-4" disabled={processing}>
            Register
          </button>
        </div>
      </form>
    </GuestLayout>
  );
}
