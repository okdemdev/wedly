'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: {
    id: string;
    slug: string;
    title: string;
    about: string;
    city: string;
    thumbnail: string;
    images: string[];
    owner: {
      name: string;
    };
  };
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const images = service.images.length > 0 ? service.images : [service.thumbnail];

  return (
    <div className="group relative flex flex-col gap-2">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <div className="absolute right-4 top-4 z-10">
          <button className="rounded-full bg-white p-2 transition-transform hover:scale-110">
            <Heart className="h-4 w-4" />
          </button>
        </div>

        <Link href={`/services/${service.slug}`} className="relative block h-full">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image || '/placeholder.svg'}
              alt={`${service.title} - Image ${index + 1}`}
              fill
              className={cn(
                'object-cover transition-all duration-500',
                isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0',
                index === currentImage ? 'opacity-100' : 'opacity-0'
              )}
              onLoadingComplete={() => setIsLoading(false)}
              priority={index === 0}
            />
          ))}
        </Link>

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={cn(
                  'h-1.5 w-1.5 rounded-full bg-white/80 transition-all',
                  index === currentImage ? 'w-2' : 'opacity-70'
                )}
              >
                <span className="sr-only">View image {index + 1}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <Link href={`/services/${service.slug}`} className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium">{service.city}</h3>
          <div className="flex items-center gap-1">
            <svg viewBox="0 0 32 32" aria-hidden="true" className="h-3 w-3 fill-current">
              <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" />
            </svg>
            <span className="font-medium">4.93</span>
          </div>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{service.about}</p>
        <p className="font-medium">By {service.owner.name}</p>
      </Link>
    </div>
  );
}
