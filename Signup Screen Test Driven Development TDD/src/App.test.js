import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from './components/Auth/AuthForm';

describe('AuthForm', () => {
  test('renders login form by default', () => {
    render(<AuthForm />);

    expect(screen.queryByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login.' })).toBeInTheDocument();
  });

  test('switches to sign-up form when toggle button is clicked', () => {
    render(<AuthForm />);
    
    fireEvent.click(screen.getByText('Create new account'));
    
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
  });

  test('displays error message for empty form submission', () => {
    render(<AuthForm />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Login.' }));

    expect(screen.getByText('All fields are required')).toBeInTheDocument();
  });

  test('displays loading message during form submission', () => {
    render(<AuthForm />);
  
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'Login.' }));
    
    expect(screen.getByText('Sending request...')).toBeInTheDocument();
  });

});
