'use client';

import { useState } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    return <Dashboard user={user} handleLogout={handleLogout} />;
  }

  if (showRegister) {
    return <RegisterPage onBackToLogin={() => setShowRegister(false)} />;
  }

  return <LoginPage onLoginSuccess={handleLoginSuccess} onGoToRegister={() => setShowRegister(true)} />;
}
