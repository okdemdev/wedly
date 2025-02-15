import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    console.log('Kinde user data:', user);

    if (!user || !user.id) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const userEmail = user.email ?? '';

    // Check if user exists
    let dbUser = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    console.log('Existing user in DB:', dbUser);

    if (!dbUser) {
      console.log('Creating new user with data:', {
        id: user.id,
        name: user.given_name,
        email: userEmail,
      });

      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          email: userEmail,
          name: user.given_name ?? '',
        },
      });
      console.log('New user created:', dbUser);
    }

    return NextResponse.redirect('http://localhost:3000/dashboard');
  } catch (error) {
    console.error('Error in GET route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
