import Blogs from '@/components/Blogs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Blog Home | Next.js App',
  description: 'Browse the latest blog posts and updates.',
  keywords: ['blog', 'next.js', 'articles', 'tech', 'development'],
  openGraph: {
    title: 'My Blog Home',
    description: 'Browse the latest blog posts and updates.',
    url: 'http://localhost:3000',
    type: 'website',
    images: [
      {
        url: '/vercel.svg',
        width: 800,
        height: 600,
        alt: 'Blog Thumbnail',
      },
    ],
  },
  authors: [{ name: 'Hieunv' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function Home() {
  return (
    <>
      <Blogs />
    </>
  );
}
