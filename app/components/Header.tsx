'use client';

import React from 'react';

interface HeaderProps {
  username: string;
  handleLogout: () => void;
}

export default function Header({ username, handleLogout }: HeaderProps) {
  return (
    <header className="bg-emerald-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">BNL</h1>
          <span className="text-sm opacity-75">Banque</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm hidden sm:block">Bonjour, {username}</span>
          <button
            onClick={handleLogout}
            className="bg-white text-emerald-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
}