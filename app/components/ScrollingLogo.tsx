'use client';

import { useEffect, useState } from 'react';
import { Logo } from './Logo';

export function ScrollingLogo({ className }: { className?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`transition-all duration-300 ${
        isScrolled ? 'opacity-0 w-0 overflow-hidden mr-0' : 'opacity-100 w-auto mr-4'
      } ${className}`}
    >
      <Logo />
    </div>
  );
}
