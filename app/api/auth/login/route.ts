// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Indique à Next.js que cette route doit être exécutée au runtime
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // Récupération des données depuis le body
    const { username, password } = await req.json();

    // Vérification que les champs sont remplis
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Identifiant et mot de passe requis' },
        { status: 400 }
      );
    }

    // Recherche de l'utilisateur par username ou email
    const user = await prisma.user.findFirst({
      where: { OR: [{ username }, { email: username }] },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Identifiants incorrects' },
        { status: 401 }
      );
    }

    // Vérification du mot de passe
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Identifiants incorrects' },
        { status: 401 }
      );
    }

    // Réponse réussie
    return NextResponse.json(
      {
        message: 'Connexion réussie',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Erreur login:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
