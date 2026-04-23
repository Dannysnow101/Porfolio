'use client';

import { useEffect, useState } from 'react';
import { Linkedin, ArrowUpRight, Github } from 'lucide-react';

export default function HeroSection() {
    const [mounted, setMounted] = useState(false);
    const [scrollOut, setScrollOut] = useState(0); // 0 at top, 1 when scrolled down

    // Change this when you swap between .docx and .pdf
    const cvFileName = 'MY CV.docx';
    const cvHref = `/${encodeURIComponent(cvFileName)}`;

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
        <section id='about' className='relative pt-10 lg:pt-16'>
            {/* Confetti dots background */}
            <div className='absolute inset-0 pointer-events-none -z-10'>
                <span className='absolute w-2 h-2 bg-red-400 rounded-full left-6 top-10'></span>
                <span className='absolute left-32 top-40 h-1.5 w-1.5 rounded-full bg-blue-400'></span>
                <span className='absolute w-2 h-2 rounded-full left-1/2 top-6 bg-emerald-400'></span>
                <span className='absolute right-10 top-24 h-1.5 w-1.5 rounded-full bg-yellow-400'></span>
                <span className='absolute bottom-24 left-10 h-1.5 w-1.5 rounded-full bg-emerald-400'></span>
                <span className='absolute w-2 h-2 bg-red-400 rounded-full bottom-10 right-24'></span>
            </div>

            <div className='grid items-center gap-12 md:grid-cols-2'>
                {/* Left text side */}
                <div
                    className={`transition-all duration-700 ease-out ${mounted ? 'translate-y-0' : 'translate-y-4'}`}
                    style={{ opacity: fadeOpacity }}
                >
                    {/* Role badge */}
                    <div className='inline-flex items-center px-4 py-1 mb-4 text-xs font-semibold border rounded-full border-emerald-200 bg-emerald-50 text-emerald-600'>
                        <span className='mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500' />
                        Frontend Developer
                    </div>

                    {/* Name */}
                    <h1 className='mb-2 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl'>
                        Building React &amp; Next.js applications
                    </h1>

                    {/* Short description */}
                    <p className='max-w-xl mb-8 text-sm leading-relaxed text-gray-600 md:text-base'>
                        I’m <span className='text-lg font-bold text-emerald-500'>Sowale Daniel</span>, a frontend
                        developer using React, Next.js (App Router) and TypeScript to build fast, accessible UIs. I
                        also work with React Native, CSS/SCSS and REST APIs, with a focus on clean, reusable components.
                    </p>

                    <div className='flex flex-wrap items-center gap-5'>
                        {/* Download CV */}
                        <a
                            href={cvHref}
                            download
                            className='py-3 text-sm font-semibold text-white transition rounded-md shadow-sm bg-emerald-500 px-7 hover:bg-emerald-600'
                        >
                            Download CV
                        </a>

                        {/* View GitHub */}
                        <a
                            href='https://github.com/Dannysnow101?tab=repositories'
                            target='_blank'
                            rel='noreferrer'
                            className='flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-900 border rounded-md border-emerald-200 hover:bg-emerald-200'
                        >
                            View GitHub
                            <span className='inline-flex items-center justify-center h-7 w-7 text-emerald-500'>
                                <ArrowUpRight className='w-6 h-6 transition-transform hover:translate-x-1 hover:-translate-y-1' />
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
                    <div className='flex justify-center w-full md:justify-end'>
                        <div className='relative transition-transform origin-center scale-75 h-90 w-90 sm:scale-90 md:scale-100'>
                            {/* Green square background */}
                            <div className='absolute inset-0 rounded-sm bg-emerald-400' />

                            {/* Black square outline, same size, shifted bottom-left */}
                            <div className='absolute -bottom-10 -left-10 h-90 w-90 rounded-sm border-[4px] border-black' />

                            {/* Portrait image centered on top */}
                            <img
                                src='/images/My_Passport-removebg.png'
                                alt='Portrait'
                                className='relative z-10 object-cover mx-auto mt-0 rounded-sm h-90 w-90'
                            />
                        </div>
                    </div>

                    {/* Follow me on + social icons – vertical rotated text */}
                    <div className='flex flex-col items-center gap-6'>
                        <div className='flex flex-col items-center mt-14'>
                            <span className='rotate-90 whitespace-nowrap text-[10px] font-semibold tracking-[0.3em] text-gray-500'>
                                Follow me on:
                            </span>
                            <span className='w-px h-16 mt-14 bg-emerald-400' />
                        </div>

                        <div className='flex flex-col gap-4'>
                            <a
                                href='https://github.com/Dannysnow101'
                                target='_blank'
                                rel='noreferrer'
                                className='flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-600'
                                aria-label='GitHub'
                            >
                                <Github className='w-4 h-4' />
                            </a>
                            <a
                                href='https://www.linkedin.com/in/sowale-daniel/'
                                target='_blank'
                                rel='noreferrer'
                                className='flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-600'
                                aria-label='LinkedIn'
                            >
                                <Linkedin className='w-4 h-4' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}