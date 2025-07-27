'use client';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import { AlertDialogCancel, AlertDialogFooter } from '../ui/alert-dialog';
import TiptapEditor from '../tiptap/TiptapEditor';
import { DropDetail } from '../collapsible/DropDetail';
import { gSlug } from '@/lib/slug-generate';

export default function BlogForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  const formSchema = z.object({
    title: z
      .string()
      .min(1, { message: 'Username is required.' })
      .min(2, { message: 'Username must be at least 2 characters.' }),

    photo: z.string().nullable().optional(),
    content: z
      .string()
      .transform((val) => {
        return val.trim() === '<p></p>' ? '' : val;
      })
      .refine((val) => val.trim().length > 0, {
        message: 'Content is required.',
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      photo: null,
      content: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = await fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: values.title,
        content: values.content,
        photo: preview,
        slug: gSlug(values.title),
      }),
    });
    console.log(values);
    console.log('res', res);

    setOpen(false);
  }

  const readFileAsBase64 = (file: File, onLoad: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onLoad(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<typeof formSchema>, 'photo'>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      readFileAsBase64(file, (base64) => {
        setPreview(base64);
        field.onChange(base64);
      });
    } // store base64 into form value
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    field: ControllerRenderProps<z.infer<typeof formSchema>, 'photo'>
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      readFileAsBase64(file, (base64) => {
        setPreview(base64);
        field.onChange(base64);
      });
    }
  };

  const preventDefault = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Form {...form}>
      <form
        id="blog-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white dark:bg-gray-950 transition-colors"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-3">
              <DropDetail
                label={
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Title
                  </FormLabel>
                }
              >
                <FormControl>
                  <Input
                    placeholder="Enter your blog title"
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="mt-1" />
              </DropDetail>
            </FormItem>
          )}
        />

        {/* Cover Photo Upload */}
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem className="mb-3">
              <DropDetail
                label={
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Cover photo
                  </FormLabel>
                }
              >
                <FormControl>
                  <div
                    onDrop={(e) => handleDrop(e, field)}
                    onDragOver={preventDefault}
                    onDragEnter={preventDefault}
                    className="mt-2 flex flex-col sm:flex-row rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 transition-colors overflow-hidden shadow-sm"
                  >
                    {/* Left: Image or Icon */}
                    <div className="w-full sm:w-5/12 flex items-center justify-center p-3 bg-white dark:bg-gray-800 border-b sm:border-b-0 sm:border-r border-dashed border-gray-300 dark:border-gray-600">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Preview"
                          className="max-h-16 w-auto object-contain rounded-md border border-gray-200 dark:border-gray-700"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                          <PhotoIcon
                            className="w-12 h-12 mb-1"
                            aria-hidden="true"
                          />
                          <p className="text-xs">No image uploaded</p>
                        </div>
                      )}
                    </div>

                    {/* Right: Upload Section */}
                    <div className="w-full sm:w-7/12 p-3 flex flex-col items-center justify-center text-center gap-1 bg-gray-50 dark:bg-gray-900">
                      <label
                        htmlFor="file-upload"
                        className="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 transition-colors cursor-pointer"
                      >
                        Upload a file
                        <Input
                          type="file"
                          id="file-upload"
                          className="sr-only"
                          onChange={(event) => handleFileChange(event, field)}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        or drag and drop
                      </p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="mt-1" />
              </DropDetail>
            </FormItem>
          )}
        />

        {/* Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <DropDetail
                label={
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Content
                  </FormLabel>
                }
              >
                <FormControl>
                  <TiptapEditor value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage className="mt-1" />
              </DropDetail>
            </FormItem>
          )}
        />

        {/* Footer */}
        <AlertDialogFooter className="pt-4">
          <AlertDialogCancel className="cursor-pointer bg-gray-100 dark:bg-gray-800 dark:text-gray-200 border dark:border-gray-700">
            Cancel
          </AlertDialogCancel>
          <Button
            type="submit"
            className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Submit
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
}
