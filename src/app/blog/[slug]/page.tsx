import React from 'react';
import BlogArticle from '@/components/blog/BlogArticle';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Detail | Next.js Blog Project',
  description:
    'Read full blog posts written using Next.js and our custom Markdown editor.',
  keywords: ['Blog', 'Next.js', 'React', 'TypeScript', 'Shadcn', 'Content'],
  openGraph: {
    title: 'Blog Detail | Next.js Blog Project',
    description:
      'Read in-depth articles powered by Next.js and an open-source tech stack.',
    url: 'http://localhost:3000/blog',
    type: 'article',
    images: [
      {
        url: '/vercel.svg',
        width: 800,
        height: 600,
        alt: 'Blog Post Thumbnail',
      },
    ],
  },
};

interface BlogArticleProps {
  params: Promise<{
    slug: string;
  }>;
}

function Page({ params }: BlogArticleProps) {
  return <BlogArticle params={params} />;
}

export default Page;
