import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe } from 'node:test';
import { expect, it, vi } from 'vitest';
import { Login } from './login';

const mocks = vi.hoisted(() => {
  const mockedRouterPush = vi.fn();
  return {
    useRouter: () => ({ push: mockedRouterPush }),
    mockedRouterPush,
  };
});

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
      ...actual,
      useRouter: mocks.useRouter,
  };
});

describe('test login page', () => {
  // it('should button be clicked once', () => {
  //   render(<Login />);
  //   const button = screen.getByRole('button', { name: /login/i });
  //   fireEvent.click(button)
  // })
  it('should render input fields', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  })
  it('should render button', () => {
    render(<Login />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  })
  it('should "Disabled" text in button when email and password are empty', async () => {
    render(<Login />);
    const button = screen.getByRole('button')

    expect(button).toHaveTextContent('Disabled')
  })
  it('should "Login" text in button when email and password are filled', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button');

    // Aguardar o usuário digitar
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    // Verificar se o botão está com o texto "Login"
    expect(button).toHaveTextContent('Login');
  })
  it('should redirect to dashboard on successful login', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, '123456789')
    const button = screen.getByRole('button', { name: /login/i });

    fireEvent.click(button)

    expect(mocks.mockedRouterPush).toHaveBeenCalledWith('/dashboard');
  })
})
