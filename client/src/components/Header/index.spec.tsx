import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '.';

jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../api/auth.api', () => ({
  postAuthLogout: jest.fn(),
}));

jest.mock('../../assets/logos/logo-transparent.png', () => 'logo');
jest.mock('../../assets/logos/small-logo-transparent.png', () => 'small-logo');

describe('Header', () => {
  const user = {
    id: 1,
    name: 'John Doe',
  };

  beforeEach(() => {
    const useAuthModule = require('../../hooks/useAuth').useAuth;
    const postAuthLogoutModule = require('../../api/auth.api').postAuthLogout;

    useAuthModule.mockReturnValue({
      user,
      removeUser: jest.fn(),
    });

    postAuthLogoutModule.mockResolvedValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the logo and navigation links', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const logoLink = screen.getByAltText('agile-tasker logo');
    const homeLink = screen.getByLabelText('Home');
    const boardLink = screen.getByLabelText('Board');

    expect(logoLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(boardLink).toBeInTheDocument();
  });

  it('renders the logout button when a user is authenticated', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const logoutButton = screen.getByLabelText('Logout');

    expect(logoutButton).toBeInTheDocument();
  });

  it('renders the Sign In button when no user is authenticated', () => {
    const useAuthModule = require('../../hooks/useAuth').useAuth;
    useAuthModule.mockReturnValue({
      user: null,
      removeUser: jest.fn(),
    });

    render(
      <Router>
        <Header />
      </Router>
    );

    const signInButton = screen.getByLabelText('Sign In');
    expect(signInButton).toBeInTheDocument();
  });
});
