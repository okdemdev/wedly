import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { Logo } from '../components/Logo';
import { CategoryFilter } from '../components/CategoryFilter';
import { ServiceCard } from '../components/ServiceCard';

async function getPublicServices(category?: string) {
  return await prisma.services.findMany({
    where: {
      published: true,
      ...(category ? { category } : {}),
    },
    include: {
      owner: true,
    },
    orderBy: [
      {
        isPromoted: 'desc',
      },
      {
        createdAt: 'desc',
      },
    ],
  });
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const services = await getPublicServices(searchParams.category);

  return (
    <div className="min-h-screen bg-background">
      <Logo />
      <Suspense fallback={<div>Loading categories...</div>}>
        <CategoryFilter />
      </Suspense>

      <div className="container">
        <main className="py-6 px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {services.length === 0 && (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 rounded-lg border bg-muted/40 p-8 text-center">
              <h2 className="text-xl font-semibold">No services found</h2>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
