'use client';

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import TiptapEditor from '@/components/tiptap/TiptapEditor';

interface BlogArticleProps {
  params: Promise<{
    slug: string;
  }>;
}

function BlogArticle({ params }: BlogArticleProps) {
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    params.then((result) => {
      setSlug(result.slug);
    });
  }, [params]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    slug ? `http://localhost:3001/posts?slug=${slug}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (error)
    return (
      <div className="text-red-500 text-center mt-10">Failed to load.</div>
    );
  if (isLoading || !data) {
    return (
      <div className="mt-10 text-center text-gray-500 animate-pulse">
        Loading article...
      </div>
    );
  }

  const post = data[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center">
        {/* <p className="text-sm font-medium text-primary uppercase tracking-wide">
          Jan Marshal - Blog
        </p> */}
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          {post.title}
        </h1>
      </div>

      <div className="mt-8 flex justify-center">
        <Image
          src={post.photo}
          alt="Blog Post Image"
          width={800}
          height={400}
          className="rounded-xl shadow-lg border"
        />
      </div>

      <div className="mt-10">
        <TiptapEditor
          value={post.content}
          onChange={() => {}}
          editable={false}
          maxHeight="h-auto"
        />
      </div>
    </div>
  );
}

export default BlogArticle;
