import React, { PropsWithChildren } from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

type Props = {};

function Providers({ children }: PropsWithChildren & Props) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </ReduxProvider>
  );
}

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <Providers>
      {!isLoginPage && !isRegisterPage && <Header />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </Providers>
  );
}

export default App;
