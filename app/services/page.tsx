import { Suspense } from 'react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import { CategoryFilter } from '../components/CategoryFilter';
import { ServiceCard } from '../components/ServiceCard';

async function getServices(category?: string) {
  return await prisma.services.findMany({
    where: {
      published: true,
      ...(category ? { category } : {}),
    },
    include: {
      owner: true,
    },
  });
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const services = await getServices(searchParams.category);

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <p className="font-bold text-[40px] text-pink-500">Wedly</p>
          <nav>
            {isLoggedIn ? (
              <Button asChild variant="outline">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <div className="space-x-4">
                <LoginLink>
                  <Button variant="outline">Sign in</Button>
                </LoginLink>
                <RegisterLink>
                  <Button>Sign up</Button>
                </RegisterLink>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="container py-6 space-y-8">
        <Suspense fallback={<div>Loading categories...</div>}>
          <CategoryFilter />
        </Suspense>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {!isLoggedIn && services.length > 0 && (
          <div className="text-center py-12">
            <Button size="lg" asChild>
              <RegisterLink>
                List your wedding service <Heart className="ml-2 h-4 w-4" />
              </RegisterLink>
            </Button>
          </div>
        )}

        {services.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No services found</h2>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
