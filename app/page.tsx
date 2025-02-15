import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { Button } from '@/components/ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { ServiceCard } from './components/ServiceCard';

async function getServices() {
  return await prisma.services.findMany({
    where: { published: true },
    include: { owner: true },
  });
}

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const services = await getServices();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-pink-600">WeddingServices</h1>
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
      </header>

      <main className="container mx-auto mt-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Discover Wedding Services
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto text-center">
          Browse through our collection of top-rated wedding services to make your special day
          perfect.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {!isLoggedIn && (
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <RegisterLink>
                Join and List Your Service <Heart className="ml-2" />
              </RegisterLink>
            </Button>
          </div>
        )}
      </main>

      <footer className="container mx-auto mt-24 py-6 text-center text-gray-500">
        <p>&copy; 2025 WeddingServices. All rights reserved.</p>
      </footer>
    </div>
  );
}
