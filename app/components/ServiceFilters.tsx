'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search } from 'lucide-react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function ServiceFilters({ cities }: { cities: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = React.useState([0, 10000]);
  const [rating, setRating] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');

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

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    if (selectedCity) params.set('city', selectedCity);
    if (rating) params.set('rating', rating);
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());

    router.push(`/services?${params.toString()}`);
  };

  return (
    <Sheet>
      <div className="flex flex-col w-full">
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-[400px] justify-between text-muted-foreground rounded-full border-gray-300 group"
          >
            <div className="flex items-center">
              <Search className="mr-4 h-4 w-4" />
              <span className="pl-2">Start your search</span>
            </div>
            {Object.values(filters).some(Boolean) && (
              <span className="text-sm text-muted-foreground">
                {Object.values(filters).filter(Boolean).length} active
              </span>
            )}
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Services</SheetTitle>
          <SheetDescription>Adjust your search criteria</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-4">
          {/* Active Filters Section */}
          {Object.values(filters).some(Boolean) && (
            <div className="space-y-2 border rounded-lg p-4 bg-muted/50">
              <label className="text-sm font-medium">Active filters</label>
              <div className="flex flex-wrap gap-2">
                {filters.city && (
                  <Badge variant="secondary" className="flex items-center gap-2">
                    {filters.city}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter('city')} />
                  </Badge>
                )}
                {filters.category && (
                  <Badge variant="secondary" className="flex items-center gap-2">
                    {filters.category}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeFilter('category')}
                    />
                  </Badge>
                )}
                {(filters.minPrice || filters.maxPrice) && (
                  <Badge variant="secondary" className="flex items-center gap-2">
                    {filters.minPrice || '0'} - {filters.maxPrice || '∞'} RON
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
                  <Badge variant="secondary" className="flex items-center gap-2">
                    {filters.rating}+ stars
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter('rating')} />
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Filter Options */}
          <div className="space-y-2">
            <label>City</label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label>Price Range</label>
            <Slider
              min={0}
              max={10000}
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between text-sm">
              <span>{priceRange[0]} RON</span>
              <span>{priceRange[1]} RON</span>
            </div>
          </div>

          <div className="space-y-2">
            <label>Minimum Rating</label>
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                {[5, 4, 3, 2, 1].map((value) => (
                  <SelectItem key={value} value={value.toString()}>
                    {value}+ Stars
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={applyFilters} className="w-full">
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
