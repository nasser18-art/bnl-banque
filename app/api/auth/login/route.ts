import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Identifiant et mot de passe requis' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: { OR: [{ username }, { email: username }] }
    });

    if (!user) {
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
    }

    return NextResponse.json({
      message: 'Connexion réussie',
      user: { id: user.id, username: user.username, email: user.email, fullName: user.fullName }
    }, { status: 200 });

  } catch (err) {
    console.error('Erreur login:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
