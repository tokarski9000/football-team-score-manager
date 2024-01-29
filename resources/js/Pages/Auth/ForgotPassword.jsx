import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Elements/InputError/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ForgotPassword({ status }) {
  const {
    data, setData, post, processing, errors,
  } = useForm({
    email: '',
  });

  const submit = (e) => {
    e.preventDefault();

    post(route('password.email'));
  };

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      <p>
        Forgot your password? No problem. Just let us know your email address and we will email you a password
        reset link that will allow you to choose a new one.
      </p>

      {status ? <div>{status}</div> : null}

      <form onSubmit={submit}>
        <input
          id="email"
          type="email"
          name="email"
          value={data.email}
          placeholder="Email"
          isFocused
          onChange={(e) => setData('email', e.target.value)}
          aria-invalid={errors.email ? true : null}
        />
        <InputError>{errors.email}</InputError>
        <div>
          <button disabled={processing}>
            Email Password Reset Link
          </button>
        </div>
      </form>
    </GuestLayout>
  );
}
