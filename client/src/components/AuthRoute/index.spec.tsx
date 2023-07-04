import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthRoute from '.';
import { screen } from '@testing-library/react';
import LoginPage from '../../pages/LoginPage';

jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('AuthRoute', () => {
  const useAuthmodule = require('../../hooks/useAuth').useAuth;

  beforeEach(() => {
    useAuthmodule.mockClear();
  });

  it('renders the child components when user is authenticated', () => {
    useAuthmodule.mockReturnValueOnce({
      user: { id: 1, name: 'John' },
      loading: false,
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route element={<AuthRoute />}>
            <Route path='/' element={<div>Protected Route</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );

    const protectedRoute = screen.getByText('Protected Route');
    expect(protectedRoute).toBeInTheDocument();
  });

  it('redirects to the login page when user is not authenticated', () => {
    useAuthmodule.mockReturnValueOnce({
      user: null,
      loading: false,
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<div>Login.</div>} />
          <Route element={<AuthRoute />}>
            <Route path='/' element={<div>Protected Route</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );

    const protectedRoute = screen.queryByText('Protected Route');
    expect(protectedRoute).not.toBeInTheDocument();

    const loginPage = screen.queryByText('Login.');
    expect(loginPage).toBeInTheDocument();
  });
});
