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
  const services = await getPublicServices({
    category: searchParams.category,
    city: searchParams.city,
    minPrice: searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined,
    rating: searchParams.rating ? parseFloat(searchParams.rating) : undefined,
  });

  const cities = [...new Set(services.map((service) => service.city))];

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
