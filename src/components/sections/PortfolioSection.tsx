'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { projects } from '@/data/projects';

export default function PortfolioSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const total = projects.length;

    // progress 0 → 1 depending on how close the section center is to viewport center
    const [progress, setProgress] = useState(0);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const node = sectionRef.current;
            if (!node) return;

            const rect = node.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            const sectionCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;

            const distance = Math.abs(sectionCenter - viewportCenter); // 0 when centered
            const maxDistance = windowHeight / 1.2; // how far before it becomes 0

            const raw = 1 - distance / maxDistance; // 1 at center
            const p = Math.min(1, Math.max(0, raw)); // clamp 0–1
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

    const goPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    };

    const goNext = () => {
        setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    };

    const getPosition = (index: number): 'center' | 'left' | 'right' | 'hidden' => {
        const diff = (index - currentIndex + total) % total;

        if (diff === 0) return 'center';
        if (diff === total - 1) return 'left';
        if (diff === 1) return 'right';
        return 'hidden';
    };

    // values derived from progress
    const headerOffset = (1 - progress) * 30; // px
    const headerOpacity = 0.2 + progress * 0.8;
    const headerScale = 0.98 + progress * 0.02; // 0.98 → 1

    const cardOffset = (1 - progress) * 40; // px
    const cardOpacity = 0.25 + progress * 0.75;
    const cardScale = 0.96 + progress * 0.04; // 0.96 → 1

    const arrowOffset = (1 - progress) * 12;
    const arrowOpacity = 0.2 + progress * 0.8;

    return (
        <section id='projects' className='mt-20' ref={sectionRef}>
            {/* Header */}
            <div
                className='mb-8'
                style={{
                    marginTop: headerOffset,
                    opacity: headerOpacity,
                    transform: `scale(${headerScale})`,
                    transition: 'margin-top 0.25s ease-out, opacity 0.25s ease-out, transform 0.25s ease-out',
                }}
            >
                <div className='inline-flex items-center px-4 py-1 mb-4 text-xs font-semibold border rounded-full border-emerald-200 bg-emerald-50 text-emerald-600'>
                    <span className='mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500' />
                    Projects
                </div>

                <h2 className='text-3xl font-bold text-gray-900'>
                    My Creative Works
                    <span className='text-emerald-500'> Latest Projects</span>
                </h2>

                <p className='max-w-md mt-3 text-sm leading-relaxed text-gray-600'>
                    I have selected and mentioned here some of my latest projects to share with you.
                </p>
            </div>

            {/* Projects area */}
            <div className='flex justify-center mt-4'>
                {/* 60% width on desktop */}
                <div className='relative w-full h-72 md:h-80 md:w-3/5'>
                    {projects.map((project, index) => {
                        const position = getPosition(index);
                        const isCenter = position === 'center';

                        let positionClasses = '';
                        if (position === 'center') {
                            positionClasses = 'left-1/2 top-0 w-[80%] -translate-x-1/2 scale-100 opacity-100 z-20';
                        } else if (position === 'left') {
                            positionClasses =
                                'left-1/2 top-4 w-[70%] -translate-x-[115%] scale-95 opacity-80 z-10';
                        } else if (position === 'right') {
                            positionClasses = 'left-1/2 top-4 w-[70%] translate-x-[15%] scale-95 opacity-80 z-10';
                        } else {
                            positionClasses =
                                'left-1/2 top-4 w-[70%] -translate-x-1/2 scale-75 opacity-0 pointer-events-none z-0';
                        }

                        return (
                            <article
                                key={project.title}
                                className={`absolute h-full overflow-hidden rounded-xl bg-gray-200 shadow-sm transition-all duration-800 ease-out ${positionClasses} ${
                                    isCenter ? 'group' : ''
                                }`}
                                style={{
                                    marginTop: cardOffset,
                                    opacity: cardOpacity,
                                }}
                            >
                                {/* Inner wrapper for scroll-based scale */}
                                <div
                                    className='w-full h-full transition-transform ease-out transform duration-400'
                                    style={{ transform: `scale(${cardScale})` }}
                                >
                                    {/* Image (zoom on hover ONLY for center card) */}
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className={`h-full w-full object-cover transition-transform duration-500 ${
                                            isCenter ? 'group-hover:scale-105' : ''
                                        }`}
                                    />

                                    {/* Hover overlay ONLY on center card */}
                                    {isCenter && (
                                        <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 pointer-events-none bg-black/60 group-hover:opacity-100'>
                                            <div className='max-w-xs px-4 text-center text-white pointer-events-auto'>
                                                <div className='mb-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide'>
                                                    {project.category}
                                                </div>
                                                <h3 className='mb-1 text-sm font-semibold'>{project.title}</h3>
                                                <p className='mb-4 text-[11px] leading-relaxed text-gray-200'>
                                                    {project.description}
                                                </p>

                                                <div className='flex justify-center gap-3'>
                                                    <a
                                                        href={project.liveUrl}
                                                        className='rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-gray-900 transition hover:bg-gray-100'
                                                        target='_blank'
                                                        rel='noreferrer'
                                                    >
                                                        Live Demo
                                                    </a>

                                                    <Link
                                                        href={`/projects/${project.slug}`}
                                                        className='rounded-full border border-white px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10'
                                                    >
                                                        Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </article>
                        );
                    })}

                    {/* Left arrow */}
                    <button
                        type='button'
                        onClick={goPrev}
                        className='absolute z-30 flex items-center justify-center w-12 h-12 text-gray-800 -translate-y-1/2 bg-white rounded-full shadow-md left-2 top-1/2'
                        style={{
                            marginLeft: -arrowOffset,
                            opacity: arrowOpacity,
                            transition: 'margin-left 0.25s ease-out, opacity 0.25s ease-out',
                        }}
                    >
                        <ChevronLeft className='w-5 h-5' />
                    </button>

                    {/* Right arrow */}
                    <button
                        type='button'
                        onClick={goNext}
                        className='absolute z-30 flex items-center justify-center w-12 h-12 text-gray-800 -translate-y-1/2 bg-white rounded-full shadow-md right-2 top-1/2'
                        style={{
                            marginRight: -arrowOffset,
                            opacity: arrowOpacity,
                            transition: 'margin-right 0.25s ease-out, opacity 0.25s ease-out',
                        }}
                    >
                        <ChevronRight className='w-5 h-5' />
                    </button>
                </div>
            </div>
        </section>
    );
}