import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getServices } from '@/actions/actions';

export async function ServiceList({ userId }: { userId?: string }) {
  if (!userId) return null;
  const services = await getServices(userId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {services.map((service) => (
        <Card key={service.id}>
          <CardHeader>
            <CardTitle>{service.title}</CardTitle>
            <CardDescription>{service.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{service.about.substring(0, 100)}...</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href={`/dashboard/edit/${service.id}`}>Edit</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
