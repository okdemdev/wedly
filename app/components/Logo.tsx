import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return <h1 className={cn('text-2xl font-bold text-pink-600 px-8 py-4', className)}>wedly</h1>;
}
