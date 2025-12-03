'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: any) => void;
  onGoToRegister: () => void;
}

export default function LoginPage({ onLoginSuccess, onGoToRegister }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    if (!credentials.username || !credentials.password) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erreur lors de la connexion');
        setLoading(false);
        return;
      }

      // Connexion réussie
      onLoginSuccess(data.user);
    } catch (err) {
      setError('Erreur de connexion au serveur');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Partie gauche - Bannière verte */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-700 via-emerald-600 to-green-700 p-12 flex-col justify-between">
        <div>
          <h1 className="text-5xl font-bold text-white mb-4">BNL</h1>
          <p className="text-xl text-white opacity-90">La banque d'un monde qui change</p>
        </div>
        <div className="text-white space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lock size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Sécurisé</h3>
              <p className="text-sm opacity-90">Vos données sont protégées avec les plus hauts standards de sécurité</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
              <User size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Simple</h3>
              <p className="text-sm opacity-90">Gérez vos comptes en toute simplicité depuis n'importe où</p>
            </div>
          </div>
        </div>
      </div>

      {/* Partie droite - Formulaire */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h2>
              <p className="text-gray-600">Accédez à votre espace personnel</p>
            </div>

            {error && (
              <div className="mb-5 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Identifiant
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
                    placeholder="Entrez votre identifiant"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
                    placeholder="Entrez votre mot de passe"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:bg-emerald-700 transition duration-200 shadow-lg shadow-emerald-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </div>

            <div className="mt-6 flex justify-between items-center text-sm">
              <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline">
                Mot de passe oublié ?
              </a>
              <button
                onClick={onGoToRegister}
                className="text-gray-600 hover:text-gray-800 font-medium hover:underline"
              >
                Créer un compte
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            © 2024 BNL Banque. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}