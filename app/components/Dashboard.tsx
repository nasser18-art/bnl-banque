'use client';

import React, { useEffect, useState } from 'react';
import { CreditCard, TrendingUp, Send, PiggyBank, ArrowUpRight, ArrowDownRight, AlertCircle, Lock, Phone, Mail, X } from 'lucide-react';
import Header from './Header';

interface User {
  id: string;
  email: string;
  username?: string;
  fullName?: string;
}

interface DashboardProps {
  user: User;
  handleLogout: () => void;
}

interface BankAccount {
  id: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
}

interface Operation {
  label: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  status?: string;
}

export default function Dashboard({ user, handleLogout }: DashboardProps) {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [operations, setOperations] = useState<Operation[]>([]);
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [blockReason, setBlockReason] = useState('');
  const [selectedAction, setSelectedAction] = useState('');

  useEffect(() => {
    // Données simulées avec solde élevé et compte bloqué
    setAccounts([
      {
        id: '1',
        name: 'Compte courant',
        type: 'courant',
        balance: 14025010.21,
        currency: '€'
      },
      {
        id: '2',
        name: 'Livret A',
        type: 'livret_a',
        balance: 60250.10,
        currency: '€'
      }
    ]);

    setOperations([
      { label: 'Virement entrant - Entreprise BUCCI', date: '25 Nov 2024', amount: 25120.09, type: 'credit' },
      { label: 'Virement entrant - Contrat immobilier', date: '20 Nov 2024', amount: 51700.14, type: 'credit' },
      { label: 'Virement sortant - SUSPENDU', date: '18 Nov 2024', amount: -50050.66, type: 'debit', status: 'suspended' },
      { label: 'Virement entrant - Investissement', date: '15 Nov 2024', amount: 30775.11, type: 'credit' },
      { label: 'Retrait carte - BLOQUÉ', date: '12 Nov 2024', amount: -503.33, type: 'debit', status: 'blocked' },
    ]);
  }, []);

  const handleActionClick = (action: string) => {
    setSelectedAction(action);
    
    const reasons: { [key: string]: string } = {
      virement: "⚠️ OPÉRATION SUSPENDUE - VÉRIFICATION RÉGLEMENTAIRE\n\nPour des raisons de sécurité, votre compte fait l'objet d'une vérification réglementaire suite à des mouvements de fonds importants. Conformément à la directive européenne LCB-FT (Lutte Contre le Blanchiment et le Financement du Terrorisme), nous devons procéder à une mise à jour de votre dossier client.\n\n💰 Montant requis pour déblocage : 30 020,19 €\n\nCe montant correspond aux :\n• Frais de régularisation administrative\n• Audit comptable approfondi\n• Mise en conformité avec les autorités bancaires (ACPR)\n• Vérification d'origine des fonds\n\n📞 Contactez votre conseiller au : +32 2 1011 0203 55 27\n📧 Email : conformite@bnl-banque.fr",
      
      carte: "🔒 CARTE BANCAIRE DÉSACTIVÉE\n\nVotre carte bancaire a été temporairement désactivée suite à la détection d'opérations inhabituelles sur votre compte. Pour votre sécurité, nous avons appliqué un protocole de protection renforcée.\n\n💰 Frais de déblocage : 30 020,19 €\n\nCes frais couvrent :\n• Audit de sécurité complet\n• Vérification d'identité renforcée (KYC)\n• Émission d'une nouvelle carte sécurisée\n• Activation du système anti-fraude avancé\n• Assurance protection maximale\n\n📞 Service cartes : +32 1 5127 34 55\n⏰ Disponible 24h/24 - 7j/7",
      
      epargne: "🏦 ACCÈS ÉPARGNE RESTREINT\n\nL'accès à vos comptes d'épargne est momentanément restreint dans le cadre d'une procédure de contrôle fiscal automatique (déclaration FATCA/CRS). L'administration fiscale française impose une validation de l'origine des fonds pour les montants supérieurs à 1 000 000 €.\n\n💰 Coût de la procédure : 30 020,19 €\n\nLe montant comprend :\n• Frais de dossier fiscal\n• Intervention expert-comptable agréé\n• Frais administratifs DGFiP\n• Certificat de conformité fiscale\n• Rapport d'audit patrimonial\n\n📞 Service fiscal : +32 1 1010 20 25\n📧 Email : fiscalite@bnl-banque.fr",
      
      budget: "⚙️ MISE À NIVEAU SÉCURITÉ REQUISE\n\nVotre espace de gestion budgétaire nécessite une mise à niveau de sécurité suite aux nouvelles normes bancaires européennes (DSP2 - Directive sur les Services de Paiement). Votre profil a été identifié comme nécessitant une authentification forte supplémentaire.\n\n💰 Frais de mise en conformité : 30 020,19 €\n\nCes frais incluent :\n• Mise à niveau technologique de l'espace client\n• Audit de sécurité informatique complet\n• Certification de conformité réglementaire\n• Installation système d'authentification biométrique\n• Formation personnalisée aux nouveaux outils\n\n📞 Support technique : +32 18 1850 55 90"
    };

    setBlockReason(reasons[action] || reasons.virement);
    setShowBlockedModal(true);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header username={user.fullName || user.username || user.email} handleLogout={handleLogout} />

      {/* Alerte de compte bloqué */}
      <div className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3">
          <AlertCircle size={20} />
          <p className="text-sm font-semibold">
            ⚠️ COMPTE SUSPENDU - Vérification réglementaire en cours - Contactez immédiatement votre conseiller
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Cartes bancaires visuelles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mes cartes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Carte Visa Premier */}
            <div className="relative h-56 rounded-2xl p-6 text-white shadow-2xl overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black">
              {/* Effet holographique */}
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 via-transparent to-blue-500/10"></div>
              
              <div className="relative h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs opacity-75 mb-1">BNL BANQUE</p>
                    <p className="text-sm font-semibold">VISA PREMIER</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      BLOQUÉE
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <div className="w-12 h-8 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded opacity-50"></div>
                  </div>
                  <p className="text-lg font-mono tracking-wider mb-2">
                    4539 •••• •••• 4892
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-75">Titulaire</p>
                      <p className="text-sm font-semibold uppercase">{user.fullName || user.username}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-75">Expire</p>
                      <p className="text-sm font-semibold">12/28</p>
                    </div>
                  </div>
                </div>

                {/* Badge bloqué */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-red-500/90 backdrop-blur-sm px-6 py-3 rounded-lg flex items-center gap-2">
                    <Lock size={24} />
                    <span className="font-bold text-lg">BLOQUÉ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte Mastercard Gold */}
            <div className="relative h-56 rounded-2xl p-6 text-white shadow-2xl overflow-hidden bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-orange-500/20"></div>
              
              <div className="relative h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs opacity-75 mb-1">BNL BANQUE</p>
                    <p className="text-sm font-semibold">MASTERCARD GOLD</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      SUSPENDUE
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <div className="w-12 h-8 bg-gradient-to-br from-red-200 to-orange-300 rounded opacity-50"></div>
                  </div>
                  <p className="text-lg font-mono tracking-wider mb-2">
                    5412 •••• •••• 8765
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-75">Titulaire</p>
                      <p className="text-sm font-semibold uppercase">{user.fullName || user.username}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-75">Expire</p>
                      <p className="text-sm font-semibold">09/27</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-orange-500/90 backdrop-blur-sm px-6 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle size={24} />
                    <span className="font-bold text-lg">SUSPENDU</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Comptes avec solde élevé */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mes comptes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accounts.map((acc) => (
              <div
                key={acc.id}
                className={`relative rounded-2xl shadow-xl p-6 text-white ${
                  acc.type === 'courant'
                    ? 'bg-gradient-to-br from-emerald-600 to-emerald-800'
                    : 'bg-gradient-to-br from-blue-600 to-blue-800'
                }`}
              >
                {/* Badge bloqué sur le compte */}
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Lock size={14} />
                  BLOQUÉ
                </div>

                <p className="text-sm opacity-90 mb-1">{acc.name}</p>
                <h3 className="text-4xl font-bold mb-4">
                  {formatAmount(acc.balance)}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-sm opacity-90">
                    {acc.type === 'courant' ? '**** **** **** 4892' : 'Taux: 3,00%'}
                  </p>
                  {acc.type === 'courant' ? (
                    <CreditCard size={32} className="opacity-80" />
                  ) : (
                    <PiggyBank size={32} className="opacity-80" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions rapides avec gestion des blocages */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => handleActionClick('virement')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center gap-3 group relative"
            >
              <div className="absolute top-2 right-2">
                <Lock size={16} className="text-red-500" />
              </div>
              <div className="bg-emerald-100 p-4 rounded-full group-hover:bg-emerald-200 transition">
                <Send className="text-emerald-700" size={24} />
              </div>
              <span className="text-sm font-semibold text-gray-700">Virement</span>
            </button>

            <button 
              onClick={() => handleActionClick('carte')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center gap-3 group relative"
            >
              <div className="absolute top-2 right-2">
                <Lock size={16} className="text-red-500" />
              </div>
              <div className="bg-blue-100 p-4 rounded-full group-hover:bg-blue-200 transition">
                <CreditCard className="text-blue-700" size={24} />
              </div>
              <span className="text-sm font-semibold text-gray-700">Mes cartes</span>
            </button>

            <button 
              onClick={() => handleActionClick('epargne')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center gap-3 group relative"
            >
              <div className="absolute top-2 right-2">
                <Lock size={16} className="text-red-500" />
              </div>
              <div className="bg-purple-100 p-4 rounded-full group-hover:bg-purple-200 transition">
                <PiggyBank className="text-purple-700" size={24} />
              </div>
              <span className="text-sm font-semibold text-gray-700">Épargne</span>
            </button>

            <button 
              onClick={() => handleActionClick('budget')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center gap-3 group relative"
            >
              <div className="absolute top-2 right-2">
                <Lock size={16} className="text-red-500" />
              </div>
              <div className="bg-orange-100 p-4 rounded-full group-hover:bg-orange-200 transition">
                <TrendingUp className="text-orange-700" size={24} />
              </div>
              <span className="text-sm font-semibold text-gray-700">Budget</span>
            </button>
          </div>
        </div>

        {/* Dernières opérations */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Dernières opérations</h2>
            <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              Voir tout
            </a>
          </div>
          <div className="space-y-1">
            {operations.map((op, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-4 px-3 hover:bg-gray-50 rounded-lg transition"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      op.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    } ${op.status ? 'opacity-50' : ''}`}
                  >
                    {op.type === 'credit' ? (
                      <ArrowDownRight className="text-green-600" size={20} />
                    ) : (
                      <ArrowUpRight className="text-red-600" size={20} />
                    )}
                  </div>
                  <div>
                    <p className={`font-semibold ${op.status ? 'text-red-600' : 'text-gray-900'}`}>
                      {op.label}
                    </p>
                    <p className="text-sm text-gray-500">{op.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`font-bold text-lg ${
                      op.type === 'credit' ? 'text-green-600' : 'text-gray-900'
                    } ${op.status ? 'line-through opacity-50' : ''}`}
                  >
                    {op.type === 'credit' ? '+' : ''}
                    {formatAmount(op.amount)}
                  </span>
                  {op.status && (
                    <p className="text-xs text-red-600 font-semibold mt-1">
                      {op.status === 'suspended' ? 'SUSPENDU' : 'BLOQUÉ'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal de blocage */}
      {showBlockedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-3 rounded-full">
                    <AlertCircle className="text-red-600" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Opération bloquée</h3>
                    <p className="text-sm text-gray-600">Action : {selectedAction}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowBlockedModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-sm text-red-800 font-semibold mb-2">
                  ⚠️ IMPORTANT : Votre compte nécessite une action immédiate
                </p>
              </div>

              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
                  {blockReason}
                </pre>
              </div>

              <div className="mt-6 space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Phone size={18} className="text-emerald-600" />
                    Contactez-nous immédiatement
                  </h4>
                  <p className="text-sm text-gray-600">Téléphone : +32 6 6655 12 28(Disponible 24h/24)</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Mail size={18} className="text-emerald-600" />
                    Email
                  </h4>
                  <p className="text-sm text-gray-600">conformite@bnl-banque.fr</p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => alert('Redirection vers le service de déblocage...')}
                  className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
                >
                  Contacter le service
                </button>
                <button
                  onClick={() => setShowBlockedModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}