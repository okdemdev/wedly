import { Suspense } from 'react';
import { getKindeServerSession, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';
import { Loader2 } from 'lucide-react';
import { ServiceForm } from '../components/ServiceForm';
import { ServiceList } from '../components/ServiceList';
import { Button } from '@/components/ui/button';

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <Button variant="destructive" asChild>
        <LogoutLink>Logout</LogoutLink>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Create New Service</h2>
          <ServiceForm userId={user?.id} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Services</h2>
          <Suspense fallback={<Loader2 className="animate-spin" />}>
            <ServiceList userId={user?.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
