'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { projects } from '@/data/projects';

interface Props {
    sceneProgress?: number;
    sceneDelta?: number;
}

export default function PortfolioSection({ sceneProgress = 1 }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const total = projects.length;

    const p = Math.min(1, Math.max(0, sceneProgress));
    const entry = Math.min(1, p * 3.33);

    // Scroll-driven shuffle
    const lastProgressRef = useRef(p);
    const accumRef = useRef(0);
    const pauseUntilRef = useRef(0);
    const SHUFFLE_THRESHOLD = 140;

    useEffect(() => {
        const dp = sceneProgress - lastProgressRef.current;
        lastProgressRef.current = sceneProgress;

        // Only auto-shuffle while inside the scene (avoid edges)
        if (sceneProgress <= 0.1 || sceneProgress >= 0.9) {
            accumRef.current = 0;
            return;
        }
        if (Date.now() < pauseUntilRef.current) return;

        // Approximate viewport pixels travelled inside scene
        // Scene height ~280vh, runway = 180vh => 1 unit progress ≈ 1.8 * winH
        const winH = typeof window !== 'undefined' ? window.innerHeight : 800;
        accumRef.current += dp * winH * 1.8;

        while (accumRef.current >= SHUFFLE_THRESHOLD) {
            setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
            accumRef.current -= SHUFFLE_THRESHOLD;
        }
        while (accumRef.current <= -SHUFFLE_THRESHOLD) {
            setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
            accumRef.current += SHUFFLE_THRESHOLD;
        }
    }, [sceneProgress, total]);

    const pauseShuffle = () => {
        pauseUntilRef.current = Date.now() + 800;
        accumRef.current = 0;
    };

    const goPrev = () => {
        pauseShuffle();
        setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    };
    const goNext = () => {
        pauseShuffle();
        setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    };

    const getPosition = (index: number): 'center' | 'left' | 'right' | 'hidden' => {
        const diff = (index - currentIndex + total) % total;
        if (diff === 0) return 'center';
        if (diff === total - 1) return 'left';
        if (diff === 1) return 'right';
        return 'hidden';
    };

    const headerOffset = (1 - entry) * 30;
    const headerOpacity = 0.2 + entry * 0.8;
    const headerScale = 0.98 + entry * 0.02;
    const arrowOpacity = 0.2 + entry * 0.8;

    return (
        <section id='projects' className='overflow-x-hidden'>
            <div
                className='mb-8'
                style={{
                    marginTop: headerOffset,
                    opacity: headerOpacity,
                    transform: `scale(${headerScale})`,
                    transition: 'margin-top 0.3s ease-out, opacity 0.3s ease-out, transform 0.3s ease-out',
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

            <div className='flex justify-center'>
                <div className='relative h-72 w-full overflow-hidden md:h-80 md:w-3/5 [perspective:1200px]'>
                    {projects.map((project, index) => {
                        const position = getPosition(index);
                        const isCenter = position === 'center';

                        let positionClasses = '';
                        let innerTransform = '';
                        if (position === 'center') {
                            positionClasses =
                                'left-1/2 top-0 w-[80%] -translate-x-1/2 opacity-100 z-20';
                            innerTransform = `translateZ(80px) scale(1)`;
                        } else if (position === 'left') {
                            positionClasses =
                                'left-1/2 top-4 w-[70%] -translate-x-[115%] opacity-80 z-10';
                            innerTransform = `translateZ(-40px) rotateY(14deg) scale(0.95)`;
                        } else if (position === 'right') {
                            positionClasses =
                                'left-1/2 top-4 w-[70%] translate-x-[15%] opacity-80 z-10';
                            innerTransform = `translateZ(-40px) rotateY(-14deg) scale(0.95)`;
                        } else {
                            positionClasses =
                                'left-1/2 top-4 w-[70%] -translate-x-1/2 opacity-0 pointer-events-none z-0';
                            innerTransform = `translateZ(-100px) scale(0.75)`;
                        }

                        return (
                            <article
                                key={project.title}
                                className={`absolute h-full overflow-hidden rounded-xl bg-gray-200 shadow-sm transition-all duration-700 ease-out ${positionClasses} ${
                                    isCenter ? 'group' : ''
                                }`}
                            >
                                <div
                                    className='relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d]'
                                    style={{ transform: innerTransform }}
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className={`h-full w-full object-cover transition-transform duration-500 ${
                                            isCenter ? 'group-hover:scale-105' : ''
                                        }`}
                                    />

                                    {isCenter && (
                                        <>
                                            {/* Light sheen */}
                                            <span
                                                aria-hidden
                                                className='pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full rotate-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-[300%] group-hover:opacity-100'
                                            />
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
                                        </>
                                    )}
                                </div>
                            </article>
                        );
                    })}

                    <button
                        type='button'
                        onClick={goPrev}
                        aria-label='Previous project'
                        className='absolute z-30 flex items-center justify-center w-12 h-12 text-gray-800 transition -translate-y-1/2 bg-white rounded-full shadow-md left-2 top-1/2 hover:bg-emerald-50'
                        style={{ opacity: arrowOpacity, transition: 'opacity 0.3s ease-out' }}
                    >
                        <ChevronLeft className='w-5 h-5' />
                    </button>
                    <button
                        type='button'
                        onClick={goNext}
                        aria-label='Next project'
                        className='absolute z-30 flex items-center justify-center w-12 h-12 text-gray-800 transition -translate-y-1/2 bg-white rounded-full shadow-md right-2 top-1/2 hover:bg-emerald-50'
                        style={{ opacity: arrowOpacity, transition: 'opacity 0.3s ease-out' }}
                    >
                        <ChevronRight className='w-5 h-5' />
                    </button>
                </div>
            </div>
        </section>
    );
}
