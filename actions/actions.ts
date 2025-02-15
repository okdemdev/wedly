'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function saveUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    throw new Error('Something went wrong');
  }

  // Check if user exists
  let dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    // Create new user
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email ?? '',
        name: user.given_name ?? '',
      },
    });

    console.log('New user created:', dbUser);
  }

  // Revalidate any pages if needed
  revalidatePath('/');
}
