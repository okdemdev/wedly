import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/categories';
import { ScrollingLogo } from './components/ScrollingLogo';

export default function Home() {
  return (
    <>
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <ScrollingLogo />
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 space-y-3">
          <h1 className="text-4xl font-bold">Caută servicii pentru o nuntă de vis</h1>
          <p className="text-lg text-muted-foreground">
            Găsește profesioniști pentru orice buget, background și stil
          </p>
        </div>

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
