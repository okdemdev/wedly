import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { ScrollingLogo } from '../components/ScrollingLogo';
import { CategoryFilter } from '../components/CategoryFilter';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceFilters } from '../components/ServiceFilters';
import { ActiveFilters } from '../components/ActiveFilters';
import { cities } from '@/lib/cities';

async function getPublicServices(params: {
  category?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}) {
  return await prisma.services.findMany({
    where: {
      published: true,
      ...(params.category ? { category: params.category } : {}),
      ...(params.city ? { city: params.city } : {}),
      ...(params.minPrice ? { priceFrom: { gte: params.minPrice } } : {}),
      ...(params.maxPrice ? { priceTo: { lte: params.maxPrice } } : {}),
      ...(params.rating ? { rating: { gte: params.rating } } : {}),
    },
    include: {
      owner: true,
    },
    orderBy: [{ isPromoted: 'desc' }, { createdAt: 'desc' }],
  });
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: {
    category?: string;
    city?: string;
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
  };
}) {
  // Wait for searchParams to be ready
  const params = await Promise.resolve(searchParams);
  const services = await getPublicServices({
    category: typeof params.category === 'string' ? params.category : undefined,
    city: typeof params.city === 'string' ? params.city : undefined,
    minPrice: params.minPrice ? parseFloat(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : undefined,
    rating: params.rating ? parseFloat(params.rating) : undefined,
  });
  const cities = [...new Set(services.map((service) => service.city))];
  const hasCategory = typeof params.category === 'string';
  // Rest of the component remains the same, just use params instead of searchParams
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background shadow-md">
        <div className="container mx-auto">
          <div className="flex flex-col space-y-2 px-4 pt-4 pb-2 md:px-4">
            <div className="flex md:flex-row items-center justify-between">
              <ScrollingLogo className="mr-4" />
              <ServiceFilters
                cities={cities}
                className="flex-1 max-w-[500px] transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <Suspense fallback={<div>Loading categories...</div>}>
          <CategoryFilter />
        </Suspense>
      </div>
      {/* Rest of the component remains the same */}
      <div className="container">
        <main className="py-6 px-4">
          {!hasCategory ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 rounded-lg border bg-muted/40 p-8 text-center">
              <h2 className="text-xl font-semibold">Selectează o categorie</h2>
              <p className="text-muted-foreground">
                Alege o categorie din meniul de mai sus pentru a vedea serviciile disponibile.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}

          {hasCategory && services.length === 0 && (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 rounded-lg border bg-muted/40 p-8 text-center">
              <h2 className="text-xl font-semibold">Nu am găsit servicii</h2>
              <p className="text-muted-foreground">
                Încearcă să ajustezi filtrele pentru a găsi ceea ce cauți.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
