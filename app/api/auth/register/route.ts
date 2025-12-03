import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { username, email, fullName, password } = await req.json();

    if (!username || !email || !password || !fullName) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Utilisateur déjà existant' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { username, email, fullName, password: hashedPassword }
    });

    return NextResponse.json({ message: 'Utilisateur créé', user: newUser }, { status: 201 });

  } catch (err) {
    console.error('Erreur register:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
