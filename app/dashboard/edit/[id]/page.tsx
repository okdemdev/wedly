import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ServiceForm } from '@/app/components/ServiceForm';

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const service = await prisma.services.findUnique({
    where: { id: params.id },
  });

  if (!service || service.ownerId !== user?.id) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Service</h1>
      <ServiceForm userId={user?.id} initialData={service} />
    </div>
  );
}
