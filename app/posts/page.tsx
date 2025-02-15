import { createPost } from '@/actions/actions';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

type Post = {
  id: string;
  published: boolean;
  slug: string;
  title: string;
  body: string;
  authorId: string;
};

export default async function Posts() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
  });
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Posts ({posts.length})</h1>
      <ul className="space-y-4 mb-12">
        {posts.map((post: Post) => (
          <li key={post.id} className="hover:bg-gray-50 p-4 rounded-lg transition-colors">
            <Link
              href={`/posts/${post.slug}`}
              className="text-blue-600 hover:text-blue-800 text-lg font-medium"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Create Post</h1>
        <form action={createPost} className="space-y-4">
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <textarea
            name="body"
            placeholder="Content"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <button
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            type="submit"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}
