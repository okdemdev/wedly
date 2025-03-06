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

export function ServiceFilters({ cities, className }: { cities: string[]; className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);

  // Initialize state from URL params
  const [priceRange, setPriceRange] = React.useState([
    searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : 0,
    searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : 10000,
  ]);
  const [rating, setRating] = React.useState(searchParams.get('rating') || 'any');
  const [selectedCity, setSelectedCity] = React.useState(searchParams.get('city') || 'all');

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
  // Remove the duplicate applyFilters and add clearAllFilters
  const clearAllFilters = () => {
    router.push('/services');
    setPriceRange([0, 10000]);
    setRating('any');
    setSelectedCity('all');
    setOpen(false);
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    if (selectedCity && selectedCity !== 'all') params.set('city', selectedCity);
    if (rating && rating !== 'any') params.set('rating', rating);
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());

    router.push(`/services?${params.toString()}`);
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className={cn('flex flex-col w-full max-w-[500px] mr-4', className)}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-[50px] justify-center text-neutral-950 rounded-full border-0 shadow-[0_4px_20px_rgb(0,0,0,0.1)] hover:shadow-[0_6px_25px_rgb(0,0,0,0.15)] transition-all duration-300 bg-white"
          >
            <div className="flex items-center gap-2">
              <Search className="h-[12px] w-[12px]" />
              <span className="text-sm">
                {Object.values(filters).some(Boolean) ? 'Edit your search' : 'Start your search'}
              </span>
            </div>
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent side="top" className="w-full sm:max-w-2xl sm:mx-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl">Filter Services</SheetTitle>
          <SheetDescription>Find the perfect service for your needs</SheetDescription>
        </SheetHeader>

        <div className="space-y-8 py-4">
          {/* Active Filters Section with improved styling */}
          {Object.values(filters).some(Boolean) && (
            <div className="space-y-3 border rounded-lg p-5 bg-muted/30">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Active filters</label>
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear all
                </Button>
              </div>
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

          {/* Filter Options with improved styling */}
          <div className="grid gap-8">
            <div className="space-y-3">
              <label className="text-sm font-medium">City</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Price Range (RON)</label>
              <Slider
                min={0}
                max={10000}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex items-center justify-between text-sm">
                <div className="border rounded-md px-3 py-1.5">{priceRange[0]} RON</div>
                <div className="border rounded-md px-3 py-1.5">{priceRange[1]} RON</div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Minimum Rating</label>
              <Select value={rating} onValueChange={setRating}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any rating</SelectItem>
                  {[5, 4, 3, 2, 1].map((value) => (
                    <SelectItem key={value} value={value.toString()}>
                      {value}+ Stars
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={applyFilters} className="w-full h-11 mt-6">
            Show results
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
