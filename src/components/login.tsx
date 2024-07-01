'use client'

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const disabledButton = !email || !password
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Supondo que a autenticação seja feita aqui
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={disabledButton} type="submit">{disabledButton ? 'Disabled' : 'Login'}</button>
    </form>
  );
};

