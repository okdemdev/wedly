'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { categories } from '@/lib/categories';

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="sticky top-20 z-40 border-b bg-background">
      <div className="flex items-center gap-4">
        <ScrollArea className="w-full">
          <div className="flex w-max pb-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = currentCategory === category.value;
              return (
                <button
                  key={category.value}
                  onClick={() => {
                    router.push(`?${createQueryString('category', category.value)}`);
                  }}
                  className={`flex min-w-[56px] flex-col items-center gap-2 px-3 transition-colors ${
                    isActive
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-primary hover:border-b-2 hover:border-primary'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs whitespace-nowrap">{category.label}</span>
                </button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
        <div className="flex shrink-0 border-l pl-4 pr-4">
          <Button variant="outline" size="sm" className="h-10 gap-2">
            <Sliders className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
