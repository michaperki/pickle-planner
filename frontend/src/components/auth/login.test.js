import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider } from '../../contexts/AuthContext'; // Assuming you have an AuthProvider
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import { loginUser } from '../../services/api';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom to enable expect(...).toBeInTheDocument()
import Login from './Login';

jest.mock('../../services/api', () => ({
  ...jest.requireActual('../../services/api'), // Keep the actual implementation
  loginUser: jest.fn(), // Mock the loginUser function
}));

describe('Login Component', () => {
  test('renders the login form', () => {
    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    // Ensure that the login form elements are present
    const loginHeader = getByText(/Login/i); // Updated query
    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password:');
    const loginButton = getByText('Login');

    expect(loginHeader).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('handles login failure', async () => {
    // Mock the loginUser function to return an error response
    loginUser.mockRejectedValueOnce(new Error('Login failed'));

    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    // Fill in the email and password inputs
    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Simulate a button click to trigger login
    const loginButton = getByText('Login');
    fireEvent.click(loginButton);

    // Wait for the error message to appear
    await waitFor(() => {
      const errorMessage = getByText('Login failed. Please try again later.');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  // Add more test cases for successful login if needed
});
