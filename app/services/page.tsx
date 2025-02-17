import { Suspense } from 'react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
  });
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const services = await getPublicServices(searchParams.category);

  return (
    <div className="min-h-screen bg-background py-4">
      <header className="flex z-50 bg-background">
        <div className="container flex h-16 items-center justify-between px-6">
          <Logo />
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

      <div className="container">
        <Suspense fallback={<div>Loading categories...</div>}>
          <CategoryFilter />
        </Suspense>

        <main className="py-6 px-6">
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
