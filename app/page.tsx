import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/categories';
import { ScrollingLogo } from './components/ScrollingLogo';
import { Gift, Camera, Music, BellRing, Cake, SparklesIcon, Scissors } from 'lucide-react';

export default function Home() {
  return (
    <>
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <ScrollingLogo />
        </div>
      </nav>

      <div className="relative bg-gradient-to-b from-muted/30 to-background overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute left-[5%] top-[10%] opacity-10 animate-float">
            <Scissors className="w-16 h-16 text-pink-500" />
          </div>
          <div className="absolute right-[15%] top-[15%] opacity-10 animate-float-slower">
            <Camera className="w-16 h-16 text-pink-500" />
          </div>
          <div className="absolute left-[40%] top-[8%] opacity-10 animate-float-slow">
            <Cake className="w-14 h-14 text-pink-500" />
          </div>
          <div className="absolute right-[40%] bottom-[30%] opacity-10 animate-float">
            <Music className="w-14 h-14 text-pink-500" />
          </div>
          <div className="absolute left-[20%] bottom-[20%] opacity-10 animate-float-slower">
            <SparklesIcon className="w-16 h-16 text-pink-500" />
          </div>
          <div className="absolute right-[10%] bottom-[15%] opacity-10 animate-float-slow">
            <BellRing className="w-14 h-14 text-pink-500" />
          </div>
          <div className="absolute left-[60%] bottom-[10%] opacity-10 animate-float">
            <Gift className="w-12 h-12 text-pink-500" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl font-bold tracking-tight relative">
              Caută servicii pentru o{' '}
              <span className="relative inline-block">
                nuntă de vis
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  width="100%"
                  height="16"
                  viewBox="0 0 400 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C100 3 200 3 397 9"
                    stroke="rgb(236 72 153)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-draw"
                    pathLength="1"
                  />
                  <path
                    d="M13 13C120 7 220 7 387 13"
                    stroke="rgb(236 72 153)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-draw-delayed"
                    pathLength="1"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Găsește profesioniști pentru orice buget, background și stil
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-6">
          {categories.map((category) => (
            <Link
              key={category.value}
              href={`/services?category=${category.value}`}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-full aspect-video">
                <Image
                  src="https://cdn.pixabay.com/photo/2016/06/29/04/17/wedding-dress-1485984_1280.jpg"
                  alt={category.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 flex items-center gap-2">
                  <category.icon className="w-5 h-5 text-white" />
                  <h2 className="text-base font-medium text-white">{category.label}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
