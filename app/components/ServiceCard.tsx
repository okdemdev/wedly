'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  service: {
    id: string;
    slug: string;
    title: string;
    about: string;
    city: string;
    thumbnail: string;
    images: string[];
    priceFrom: number;
    priceTo: number;
    isPromoted: boolean;
    rating: number;
    isFavorite: boolean;
    owner: {
      name: string;
    };
  };
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [currentImage, setCurrentImage] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const allImages = [service.thumbnail, ...service.images];

  const nextImage = () => {
    if (currentImage < allImages.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const previousImage = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    const container = scrollContainerRef.current;

    const handleTouchMove = (e: TouchEvent) => {
      if (!container) return;
      const touch = e.touches[0];
      const diff = startX - touch.clientX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextImage();
        } else {
          previousImage();
        }
        cleanup();
      }
    };

    const cleanup = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', cleanup);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', cleanup);
  };

  return (
    <div className="group relative flex flex-col gap-2">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        {service.isPromoted && (
          <div className="absolute bottom-0 left-0 z-10">
            <div className="relative">
              <div className="bg-pink-500 text-white text-xs font-medium px-3 py-1 rounded-tr-xl">
                Promoted
              </div>
            </div>
          </div>
        )}

        <div className="absolute right-8 top-8 z-10">
          <button className="rounded-full bg-white p-2">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        {/* Navigation Buttons (Desktop) */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-0"
              disabled={currentImage === 0}
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-0"
              disabled={currentImage === allImages.length - 1}
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        {/* Images Container */}
        <div
          ref={scrollContainerRef}
          className="flex h-full w-full"
          onTouchStart={handleTouchStart}
        >
          {allImages.map((image, index) => (
            <div
              key={index}
              className="h-full w-full flex-none transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <Image
                src={image || '/placeholder.svg'}
                alt={`${service.title} - Image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        {/* Pagination Dots */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1">
            {allImages.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full bg-white/80 transition-all ${
                  index === currentImage ? 'w-2' : 'w-1.5 opacity-70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <Link
        href={`/services/${service.slug}`}
        className={`space-y-1 ${service.isPromoted ? 'p-2' : ''}`}
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium">
            {service.title} - {service.city}
          </h3>
          <div className="flex items-center gap-1">
            <svg viewBox="0 0 32 32" aria-hidden="true" className="h-3 w-3 fill-current">
              <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" />
            </svg>
            <span className="font-medium">{service.rating.toFixed(2)}</span>
          </div>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{service.about}</p>
        <div className="flex items-center justify-between">
          <p className="font-medium">
            de la <span className="font-bold">{service.priceFrom} RON</span>
          </p>
          <div className="flex gap-2">
            {service.isFavorite && <Badge variant="default">Featured</Badge>}
          </div>
        </div>
      </Link>
    </div>
  );
}
