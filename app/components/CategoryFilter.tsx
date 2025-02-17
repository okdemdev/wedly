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
    <div className="sticky z-40 bg-background w-full">
      <div className="flex items-center border-b shadow-lg">
        <ScrollArea className="w-screen">
          <div className="flex w-max pb-1 gap-6 pt-4 ">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = currentCategory === category.value;
              return (
                <button
                  key={category.value}
                  onClick={() => {
                    router.push(`?${createQueryString('category', category.value)}`);
                  }}
                  className={`flex min-w-[56px] font-bold flex-col items-center gap-2 px-3 transition-colors ${
                    isActive
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-primary hover:border-b-2 hover:border-primary'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs pb-1 whitespace-nowrap">{category.label}</span>
                </button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>
    </div>
  );
}
