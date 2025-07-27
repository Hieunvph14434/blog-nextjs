'use client';
import BlogForm from '@/components/blog/Form';
import Blogs from '@/components/Blogs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { gSlug } from '@/lib/slug-generate';
import { useState } from 'react';
import useSWR from 'swr';

export default function Home() {
  const [open, setOpen] = useState(false);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `http://localhost:3001/posts`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  console.log(gSlug('Sample Blog Title'));

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log('Check data: ', data);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger onClick={() => setOpen(true)}>
          Open
        </AlertDialogTrigger>
        <AlertDialogContent className="w-full max-w-5xl sm:max-w-5xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription asChild>
            <BlogForm setOpen={setOpen} />
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
      <Blogs blogs={data} />
    </>
  );
}
