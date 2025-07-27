'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

// 1. Define schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

function Contact() {
  const [status, setStatus] = useState('');

  // 2. useForm with zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  // 3. Submit handler
  const onSubmit = async (data: ContactFormValues) => {
    setStatus('Sending...');
    try {
      const res = await fetch('http://localhost:3001/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('Message sent!');
      reset();
    } catch (error) {
      console.error('Error sending contact message:', error);
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Have a question, feedback, or just want to say hello? Feel free to
            reach out using the form. I’ll get back to you as soon as possible.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              Email:{' '}
              <a href="mailto:your@email.com" className="underline">
                your@email.com
              </a>
            </p>
            <p>
              Twitter:{' '}
              <a href="https://twitter.com/yourhandle" className="underline">
                @yourhandle
              </a>
            </p>
            <p>Location: Ho Chi Minh City, Vietnam</p>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-8 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" {...register('name')} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Write your message here..."
                rows={5}
                {...register('message')}
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full text-white">
              Send Message
            </Button>

            {status && (
              <p className="text-sm text-muted-foreground text-center">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}

export default Contact;
