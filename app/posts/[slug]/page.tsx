import { prisma } from '@/lib/prisma';

type Post = {
  id: string;
  slug: string;
  title: string;
  body: string;
  authorId: string;
};

export default async function Post({ params }) {
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
  });
  return (
    <div>
      <h1>{post?.title}</h1>
      <h1>{post?.body}</h1>
    </div>
  );
}
