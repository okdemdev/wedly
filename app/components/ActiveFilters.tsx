'use client';

import { X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

export function ActiveFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = {
    city: searchParams.get('city'),
    minPrice: searchParams.get('minPrice'),
    maxPrice: searchParams.get('maxPrice'),
    rating: searchParams.get('rating'),
    category: searchParams.get('category'),
  };

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    router.push(`/services?${params.toString()}`);
  };

  if (!Object.values(filters).some(Boolean)) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {filters.city && (
        <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
          City: {filters.city}
          <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter('city')} />
        </Badge>
      )}
      {filters.category && (
        <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
          Category: {filters.category}
          <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter('category')} />
        </Badge>
      )}
      {(filters.minPrice || filters.maxPrice) && (
        <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
          Price: {filters.minPrice || '0'} - {filters.maxPrice || '∞'} RON
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => {
              removeFilter('minPrice');
              removeFilter('maxPrice');
            }}
          />
        </Badge>
      )}
      {filters.rating && (
        <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
          Rating: {filters.rating}+ stars
          <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter('rating')} />
        </Badge>
      )}
    </div>
  );
}
