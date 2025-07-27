import Contact from '@/components/contact/Contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Next.js Blog Project',
  description:
    'Get in touch with us for any questions, feedback, or collaboration opportunities.',
  keywords: ['Contact', 'Next.js', 'Support', 'Feedback', 'Form', 'Email'],
  openGraph: {
    title: 'Contact | Next.js Blog Project',
    description:
      'Reach out to us with your message — we’d love to hear from you.',
    url: 'http://localhost:3000/contact',
    type: 'website',
    images: [
      {
        url: '/vercel.svg',
        width: 800,
        height: 600,
        alt: 'Contact Page Thumbnail',
      },
    ],
  },
};

function Page() {
  return <Contact />;
}

export default Page;
