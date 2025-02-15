import Link from 'next/link';

export default async function Home() {
  return (
    <div>
      <p>Hello World!</p>
      <p>Go to posts:</p>
      <button className="bg-slate-400 py-5 px-6 rounded-xl">
        <Link href="/posts">Posts</Link>
      </button>
    </div>
  );
}
