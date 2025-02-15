'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const user = await prisma.user.findFirst({
    where: {
      id: '67b0e76d2cdbdf07bd693d13',
    },
  });

  await prisma.post.create({
    data: {
      title: formData.get('title') as string,
      body: formData.get('body') as string,
      slug: (formData.get('title') as string).toLowerCase().replace(/\s+/g, '-') as string,
      published: true,
      authorId: user.id,
    },
  });

  revalidatePath('/posts');
}
