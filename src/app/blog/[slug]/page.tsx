'use client';
import useSWR from 'swr';
import React from 'react';
import Image from 'next/image';

interface BlogArticleProps {
  params: Promise<{
    slug: string;
  }>;
}

function BlogArticle({ params }: BlogArticleProps) {
  const actualParams = React.use(params);
  const { slug } = actualParams;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `http://localhost:3001/posts?slug=${slug}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Jan Marshal - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data[0].title}
        </span>
      </h1>

      <Image
        src={
          'https://media.istockphoto.com/id/1354066936/photo/teito-in-veigas-village-somiedo-natural-park-and-biosphere-reserve-asturias-spain.jpg?s=612x612&w=0&k=20&c=CZGKx6vfYbdjNBg89HNFbe4THg5qqMf3NIzZCuHKFv8='
        }
        alt="Title Image"
        width={800}
        height={800}
        className="rounded-lg mt-8 border"
      />
    </div>
  );
}

export default BlogArticle;
