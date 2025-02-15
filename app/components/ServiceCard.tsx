import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function ServiceCard({ service }: { service: any }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={service.thumbnail || '/placeholder.svg'}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{service.title}</CardTitle>
        <CardDescription>
          {service.category} in {service.city}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3">{service.about}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-gray-500">By {service.owner.name}</p>
        <Button asChild>
          <Link href={`/services/${service.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
