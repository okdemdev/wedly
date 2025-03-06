'use client';

import { useEffect, useState } from 'react';
import { Logo } from './Logo';

export function ScrollingLogo() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      // Find the parent container and update its class
      const container = document.querySelector('.header-container');
      if (container) {
        container.classList.toggle('logo-hidden', scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`transition-all duration-300 ${
        isScrolled ? 'opacity-0 w-0 overflow-hidden mr-0' : 'opacity-100 w-auto'
      }`}
    >
      <Logo />
    </div>
  );
}
