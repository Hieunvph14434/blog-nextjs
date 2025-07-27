'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    await new Promise((r) => setTimeout(r, 1000)); // mock delay

    setStatus('✅ Message sent!');
    setForm({ name: '', email: '', message: '' });
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={5}
                required
              />
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
