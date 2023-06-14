import React from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <ThemeProvider>
      {!isLoginPage && !isRegisterPage && <Header />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
