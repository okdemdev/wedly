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
    <div className="flex flex-wrap items-center -mx-1 gap-2">
      <span className="text-sm text-muted-foreground px-1">Active filters:</span>
      {filters.city && (
        <Badge
          variant="secondary"
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200"
        >
          City: {filters.city}
          <X className="h-4 w-4 cursor-pointer" onClick={() => removeFilter('city')} />
        </Badge>
      )}
      {filters.category && (
        <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5">
          Category: {filters.category}
          <X
            className="h-3 w-3 cursor-pointer hover:text-destructive"
            onClick={() => removeFilter('category')}
          />
        </Badge>
      )}
      {(filters.minPrice || filters.maxPrice) && (
        <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5">
          Price: {filters.minPrice || '0'} - {filters.maxPrice || '∞'} RON
          <X
            className="h-3 w-3 cursor-pointer hover:text-destructive"
            onClick={() => {
              removeFilter('minPrice');
              removeFilter('maxPrice');
            }}
          />
        </Badge>
      )}
      {filters.rating && (
        <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5">
          Rating: {filters.rating}+ stars
          <X
            className="h-3 w-3 cursor-pointer hover:text-destructive"
            onClick={() => removeFilter('rating')}
          />
        </Badge>
      )}
    </div>
  );
}
