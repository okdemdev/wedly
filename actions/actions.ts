'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createService(data: any) {
  const service = await prisma.services.create({
    data: {
      ...data,
      published: true,
      slug: data.title.toLowerCase().replace(/ /g, '-'),
    },
  });
  revalidatePath('/dashboard');
  return service;
}

export async function getServices(userId: string) {
  const services = await prisma.services.findMany({
    where: {
      ownerId: userId,
    },
    orderBy: {
      id: 'desc',
    },
  });
  return services;
}

export async function updateService(id: string, data: any) {
  const service = await prisma.services.update({
    where: { id },
    data: {
      ...data,
      slug: data.title.toLowerCase().replace(/ /g, '-'),
    },
  });
  revalidatePath('/dashboard');
  return service;
}

export async function deleteService(id: string) {
  await prisma.services.delete({
    where: { id },
  });
  revalidatePath('/dashboard');
}
