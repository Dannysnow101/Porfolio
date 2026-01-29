'use client';

import { useEffect, useRef, useState } from 'react';

export default function ContactSection() {
    // progress 0 → 1 based on how much of the section is visible
    const [progress, setProgress] = useState(0);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const node = sectionRef.current;
            if (!node) return;

            const rect = node.getBoundingClientRect();
            const winH = window.innerHeight || document.documentElement.clientHeight;

            // How much of this section is currently visible?
            const visibleTop = Math.max(rect.top, 0);
            const visibleBottom = Math.min(rect.bottom, winH);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);

            const ratio = rect.height ? visibleHeight / rect.height : 0; // 0 → 1

            // Reach full animation when ~60% of the section is visible
            const p = Math.min(1, Math.max(0, ratio / 0.6));
            setProgress(p);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    // header motion
    const headerOffsetY = (1 - progress) * 30; // px
    const headerOpacity = 0.2 + progress * 0.8;
    const headerScale = 0.98 + progress * 0.02;

    // left column motion (contact boxes)
    const leftOffsetX = (1 - progress) * -40; // slide from left
    const leftOpacity = 0.25 + progress * 0.75;
    const leftScale = 0.97 + progress * 0.03;

    // right column motion (form)
    const rightOffsetX = (1 - progress) * 40; // slide from right
    const rightOpacity = 0.25 + progress * 0.75;
    const rightScale = 0.97 + progress * 0.03;

    return (
        <section
            id='contact'
            ref={sectionRef}
            className='mt-20'
        >
            {/* Header */}
            <div
                className='mb-10 text-center'
                style={{
                    marginTop: headerOffsetY,
                    opacity: headerOpacity,
                    transform: `scale(${headerScale})`,
                    transition:
                        'margin-top 0.25s ease-out, opacity 0.25s ease-out, transform 0.25s ease-out',
                }}
            >
                <div className='mb-4 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold text-emerald-600'>
                    <span className='mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500' />
                    Contact
                </div>

                <h2 className='text-3xl font-bold text-gray-900'>
                    Let&apos;s Discuss Your Next <span className='text-emerald-500'>Project or Role</span>
                </h2>

                <p className='mt-3 text-sm leading-relaxed text-gray-600'>
                    Open to frontend roles (React / Next.js / TypeScript) and select freelance projects. Email me or use
                    the form below.
                </p>
            </div>

            <div className='grid gap-8 md:grid-cols-3'>
                {/* Left contact info */}
                <div
                    className='space-y-7'
                    style={{
                        opacity: leftOpacity,
                        transform: `translateX(${leftOffsetX}px) scale(${leftScale})`,
                        transition: 'transform 0.25s ease-out, opacity 0.25s ease-out',
                    }}
                >
                    {/* Email me – whole box is clickable */}
                    <a
                        href='mailto:sowaledaniel5@gmail.com'
                        className='block rounded-2xl bg-white p-5 shadow-sm transition hover:bg-emerald-50'
                    >
                        <div className='flex items-center gap-3'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-500'>
                                ✉️
                            </div>
                            <div>
                                <div className='text-xs font-semibold uppercase tracking-wide text-gray-500'>
                                    Email me
                                </div>
                                <div className='mt-1 text-sm text-gray-900'>sowaledaniel5@gmail.com</div>
                            </div>
                        </div>
                    </a>

                    {/* Call me – whole box is clickable */}
                    <a
                        href='tel:+2349031483166'
                        className='block rounded-2xl bg-white p-5 shadow-sm transition hover:bg-emerald-50'
                    >
                        <div className='flex items-center gap-3'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-500'>
                                📞
                            </div>
                            <div>
                                <div className='text-xs font-semibold uppercase tracking-wide text-gray-500'>
                                    Call me
                                </div>
                                <div className='mt-1 text-sm text-gray-900'>+2349031483166</div>
                            </div>
                        </div>
                    </a>

                    {/* Address (not clickable) */}
                    <div className='rounded-2xl bg-white p-5 shadow-sm'>
                        <div className='flex items-center gap-3'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-500'>
                                📍
                            </div>
                            <div>
                                <div className='text-xs font-semibold uppercase tracking-wide text-gray-500'>
                                    Address
                                </div>
                                <div className='mt-1 text-sm text-gray-900'>Lagos, Nigeria</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right form */}
                <div
                    className='md:col-span-2'
                    style={{
                        opacity: rightOpacity,
                        transform: `translateX(${rightOffsetX}px) scale(${rightScale})`,
                        transition: 'transform 0.25s ease-out, opacity 0.25s ease-out',
                    }}
                >
                    <form className='space-y-4 rounded-2xl bg-white p-6 shadow-sm'>
                        <div className='grid gap-4 md:grid-cols-2'>
                            <input
                                type='text'
                                placeholder='Full name'
                                className='h-11 rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
                            />
                            <input
                                type='email'
                                placeholder='Your email'
                                className='h-11 rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
                            />
                        </div>

                        <textarea
                            rows={5}
                            placeholder='Message'
                            className='w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
                        />

                        <div className='flex justify-end'>
                            <button
                                type='submit'
                                className='h-11 rounded-full bg-emerald-500 px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600'
                            >
                                Submit Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}