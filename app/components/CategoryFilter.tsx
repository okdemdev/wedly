'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/categories';

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.value}
              variant={currentCategory === category.value ? 'default' : 'ghost'}
              className="flex flex-col items-center gap-2 h-auto px-4 py-2"
              onClick={() => {
                router.push(`?${createQueryString('category', category.value)}`);
              }}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-normal">{category.label}</span>
            </Button>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
