'use client';

import { useEffect, useState } from 'react';
import { Logo } from './Logo';

export function ScrollingLogo() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`transition-all duration-300 ${
        isScrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
      }`}
    >
      <Logo />
    </div>
  );
}
