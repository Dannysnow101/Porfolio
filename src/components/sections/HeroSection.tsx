'use client';

import { useEffect, useState } from 'react';
import { Linkedin, ArrowUpRight, Github } from 'lucide-react';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [scrollOut, setScrollOut] = useState(0); // 0 at top, 1 when scrolled down

  // First-load animation
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll-out fade
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      const threshold = 400; // how far before it's fully faded
      const raw = y / threshold;
      const p = Math.min(1, Math.max(0, raw)); // clamp 0–1
      setScrollOut(p);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Fade: full opacity at top, down to ~50% when far scrolled
  const fadeOpacity = mounted ? 1 - 0.5 * scrollOut : 0;

  return (
    <section id="about" className="relative pt-10 lg:pt-16">
      {/* Confetti dots background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute left-6 top-10 h-2 w-2 rounded-full bg-red-400"></span>
        <span className="absolute left-32 top-40 h-1.5 w-1.5 rounded-full bg-blue-400"></span>
        <span className="absolute left-1/2 top-6 h-2 w-2 rounded-full bg-emerald-400"></span>
        <span className="absolute right-10 top-24 h-1.5 w-1.5 rounded-full bg-yellow-400"></span>
        <span className="absolute bottom-24 left-10 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
        <span className="absolute bottom-10 right-24 h-2 w-2 rounded-full bg-red-400"></span>
      </div>

      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* Left text side */}
        <div
          className={`transition-all duration-700 ease-out ${
            mounted ? 'translate-y-0' : 'translate-y-4'
          }`}
          style={{ opacity: fadeOpacity }}
        >
          {/* Role badge */}
          <div className="mb-4 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold text-emerald-600">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Frontend Developer
          </div>

          {/* Name */}
          <h1 className="mb-2 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
            Building React &amp; Next.js applications
          </h1>

          {/* Short description */}
          <p className="mb-8 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
            I’m{' '}
            <span className="font-bold text-lg text-emerald-500">
              Sowale Daniel
            </span>
            , a frontend developer using React, Next.js (App Router) and
            TypeScript to build fast, accessible UIs. I also work with React
            Native, CSS/SCSS and REST APIs, with a focus on clean, reusable
            components.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            {/* Download CV */}
            <a
              href="/cv/sowale-daniel-cv.pdf"
              // ↑ put your real CV path or external URL here
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
            >
              Download CV
            </a>

            {/* View GitHub */}
            <a
              href="https://github.com/Dannysnow101?tab=repositories"
              // ↑ replace with your real GitHub profile link if needed
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md border border-emerald-200 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-emerald-200"
            >
              View GitHub
              <span className="inline-flex h-7 w-7 items-center justify-center text-emerald-500">
                <ArrowUpRight className="h-6 w-6 transition-transform hover:translate-x-1 hover:-translate-y-1" />
              </span>
            </a>
          </div>
        </div>

        {/* Right image side */}
        <div
          className={`relative flex items-center justify-center gap-1 md:justify-end transition-all duration-700 ease-out ${
            mounted ? 'translate-x-0' : 'translate-x-4'
          }`}
          style={{ opacity: fadeOpacity }}
        >
          {/* Wrapper so we can scale only on mobile, keep h-90 w-90 */}
          <div className="flex w-full justify-center md:justify-end">
            <div className="relative h-90 w-90 scale-75 origin-center transition-transform sm:scale-90 md:scale-100">
              {/* Green square background */}
              <div className="absolute inset-0 rounded-sm bg-emerald-400" />

              {/* Black square outline, same size, shifted bottom-left */}
              <div className="absolute -bottom-10 -left-10 h-90 w-90 rounded-sm border-[4px] border-black" />

              {/* Portrait image centered on top */}
              <img
                src="/images/My_Passport-removebg.png"
                alt="Portrait"
                className="relative z-10 mx-auto mt-0 h-90 w-90 rounded-sm object-cover"
              />
            </div>
          </div>

          {/* Follow me on + social icons – vertical rotated text */}
          <div className="flex flex-col items-center gap-6">
            <div className="mt-14 flex flex-col items-center">
              <span className="rotate-90 whitespace-nowrap text-[10px] font-semibold tracking-[0.3em] text-gray-500">
                Follow me on:
              </span>
              <span className="mt-14 h-16 w-px bg-emerald-400" />
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="https://github.com/Dannysnow101"
                target="_blank"
                rel="noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-600"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/sowale-daniel/"
                target="_blank"
                rel="noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-600"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}