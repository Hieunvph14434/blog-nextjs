import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

function About() {
  return (
    <main className="min-h-screen px-6 py-20 md:px-12 space-y-24 bg-background text-foreground">
      {/* Hero */}
      <section className="max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Built with Next.js — Fast, Scalable, Future-Proof
        </h1>
        <p className="text-muted-foreground text-lg">
          This project is built using the power of Next.js – the React framework
          for production. We’ve chosen it for its speed, flexibility, and
          developer experience.
        </p>
        <Button size="lg" className="text-white">
          Explore the Code
        </Button>
      </section>

      {/* Why Next.js */}
      <section className="max-w-4xl mx-auto space-y-8 text-center">
        <h2 className="text-2xl font-semibold">Why Next.js?</h2>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          {[
            {
              title: 'Hybrid Rendering',
              desc: 'Supports static generation and server-side rendering – the best of both worlds.',
            },
            {
              title: 'Fast Refresh',
              desc: 'Lightning-fast development with automatic refresh and error overlay.',
            },
            {
              title: 'Built-in Routing',
              desc: 'File-based routing that scales effortlessly with your app.',
            },
            {
              title: 'Edge-Ready',
              desc: 'Designed for serverless and edge-first environments.',
            },
          ].map(({ title, desc }) => (
            <div
              key={title}
              className="p-5 rounded-xl bg-muted/40 border space-y-1"
            >
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Developer Experience */}
      <section className="max-w-4xl mx-auto space-y-6 text-center">
        <h2 className="text-2xl font-semibold">Developer Experience We Love</h2>
        <p className="text-muted-foreground">
          From TypeScript support, hot reload, to built-in ESLint and image
          optimization — Next.js keeps productivity high and configuration low.
        </p>
      </section>

      {/* Our Tech Stack */}
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-2xl font-semibold">Tech Stack</h2>
        <p className="text-muted-foreground">
          This project combines modern frontend tools to create beautiful,
          performant user experiences.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-muted-foreground">
          <span className="px-3 py-1 rounded-full bg-muted">Next.js</span>
          <span className="px-3 py-1 rounded-full bg-muted">React</span>
          <span className="px-3 py-1 rounded-full bg-muted">Tailwind CSS</span>
          <span className="px-3 py-1 rounded-full bg-muted">shadcn/ui</span>
          <span className="px-3 py-1 rounded-full bg-muted">TypeScript</span>
          <span className="px-3 py-1 rounded-full bg-muted">Vercel</span>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-semibold">
          Open-source and developer-friendly
        </h2>
        <p className="text-muted-foreground">
          Feel free to fork this project, explore the codebase, or contribute.
        </p>
        <Button size="lg" variant="outline">
          Visit GitHub Repo
        </Button>
      </section>
    </main>
  );
}

export default About;
