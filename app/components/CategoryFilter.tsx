'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
    <div className="sticky z-40 bg-background w-full border-b shadow-md">
      <ScrollArea className="w-full">
        <div className="flex w-max gap-8 px-4 py-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = currentCategory === category.value;
            return (
              <button
                key={category.value}
                onClick={() => {
                  router.push(`?${createQueryString('category', category.value)}`);
                }}
                className="flex flex-col items-center gap-1.5 relative group"
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? 'text-neutral-950' : 'text-neutral-500 group-hover:text-neutral-950'
                  }`}
                />
                <span
                  className={`text-xs whitespace-nowrap font-bold ${
                    isActive ? 'text-neutral-950' : 'text-neutral-500 group-hover:text-neutral-950'
                  }`}
                >
                  {category.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-0.5 bg-neutral-950 transition-all w-full" />
                )}
                {!isActive && (
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-0.5 bg-neutral-950 transition-all w-0 group-hover:w-full" />
                )}
              </button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
