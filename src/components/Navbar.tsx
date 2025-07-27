'use client';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import BlogForm from './blog/Form';
import { X } from 'lucide-react';
import { Button } from './ui/button';
// import { Button } from './tiptap-ui-primitive/button';

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full relative flex items-center justify-between max-w-7xl mx-auto px-4 py-5">
      <div>
        <Link href="/" className="font-bold text-3xl">
          My<span className="text-primary">Blog</span>
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <ul className="flex items-center gap-5">
          <li>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger onClick={() => setOpen(true)}>
                <span className="font-medium text-1xl cursor-pointer">
                  New Blog
                </span>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-5xl sm:max-w-5xl">
                <Button
                  onClick={() => setOpen(false)}
                  variant={'outline'}
                  className="absolute top-4 right-4 cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </Button>
                <AlertDialogHeader>
                  <AlertDialogTitle>New Blog</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription asChild>
                  <BlogForm setOpen={setOpen} />
                </AlertDialogDescription>
              </AlertDialogContent>
            </AlertDialog>
          </li>
          <li>
            <Link href="/about" className="font-medium text-1xl">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="font-medium text-1xl">
              Contact
            </Link>
          </li>
        </ul>

        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
