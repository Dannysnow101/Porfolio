'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Github, Linkedin } from 'lucide-react';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

export default function HeroSection() {
    const [mounted, setMounted] = useState(false);

    const sectionRef = useRef<HTMLElement | null>(null);
    const leftRef = useRef<HTMLDivElement | null>(null);
    const rightRef = useRef<HTMLDivElement | null>(null);
    const portraitRef = useRef<HTMLDivElement | null>(null);
    const shineRef = useRef<HTMLDivElement | null>(null);

    const cursorTargetRef = useRef({ x: 0, y: 0 });
    const cursorCurrentRef = useRef({ x: 0, y: 0 });
    const scrollOutRef = useRef(0);

    // ✅ PDF is the correct format for CV downloads
    const cvHref = '/cv/sowale-daniel-cv.pdf';
    const cvFileName = 'Sowale-Daniel-CV.pdf';

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let raf = 0;

        const computeScrollOut = () => {
            const y = window.scrollY || window.pageYOffset;
            const threshold = 620;
            scrollOutRef.current = clamp(y / threshold, 0, 1);
        };

        const applyTransforms = () => {
            if (!leftRef.current || !rightRef.current || !portraitRef.current) return;

            if (reduceMotion) {
                leftRef.current.style.opacity = '1';
                rightRef.current.style.opacity = '1';
                leftRef.current.style.transform = 'none';
                rightRef.current.style.transform = 'none';
                portraitRef.current.style.transform = 'none';
                if (shineRef.current) shineRef.current.style.opacity = '0';
                return;
            }

            const scrollOut = scrollOutRef.current;

            cursorCurrentRef.current.x = lerp(cursorCurrentRef.current.x, cursorTargetRef.current.x, 0.08);
            cursorCurrentRef.current.y = lerp(cursorCurrentRef.current.y, cursorTargetRef.current.y, 0.08);

            const cx = cursorCurrentRef.current.x;
            const cy = cursorCurrentRef.current.y;

            const isMobile = window.innerWidth < 768;

            const tiltMax = isMobile ? 10 : 16;
            const yawMax = isMobile ? 12 : 18;
            const zMax = isMobile ? 110 : 190;
            const liftMax = isMobile ? 12 : 20;

            const opacity = 1 - 0.45 * scrollOut;

            const tilt = tiltMax * scrollOut;
            const yaw = yawMax * scrollOut;
            const z = -zMax * scrollOut;
            const lift = -liftMax * scrollOut;

            leftRef.current.style.opacity = String(opacity);
            leftRef.current.style.transform = `
                translateY(${lift}px)
                rotateX(${tilt}deg)
                rotateY(${-yaw}deg)
                translateZ(${z}px)
            `.replace(/\s+/g, ' ').trim();

            rightRef.current.style.opacity = String(opacity);
            rightRef.current.style.transform = `
                translateY(${lift}px)
                rotateX(${tilt}deg)
                rotateY(${yaw}deg)
                translateZ(${z}px)
            `.replace(/\s+/g, ' ').trim();

            const portraitBasePop = (isMobile ? 52 : 90) - (isMobile ? 30 : 62) * scrollOut;
            const cursorTiltX = (isMobile ? 4 : 8) * -cy;
            const cursorTiltY = (isMobile ? 6 : 12) * cx;
            const cursorMoveX = (isMobile ? 4 : 8) * cx;
            const cursorMoveY = (isMobile ? 3 : 6) * cy;
            const portraitRotateZ = scrollOut * 1.6;

            portraitRef.current.style.transform = `
                translateX(${cursorMoveX}px)
                translateY(${cursorMoveY}px)
                translateZ(${portraitBasePop}px)
                rotateX(${cursorTiltX}deg)
                rotateY(${cursorTiltY}deg)
                rotateZ(${portraitRotateZ}deg)
            `.replace(/\s+/g, ' ').trim();

            if (shineRef.current) {
                const shineOpacity = 0.05 + (1 - scrollOut) * 0.18;
                const shineX = -30 + cx * 26 + (1 - scrollOut) * 40;
                const shineY = cy * 18;
                const shineRotate = -18 + cx * 6;

                shineRef.current.style.opacity = String(shineOpacity);
                shineRef.current.style.transform = `translateX(${shineX}px) translateY(${shineY}px) rotate(${shineRotate}deg)`;
            }
        };

        const tick = () => {
            raf = window.requestAnimationFrame(() => {
                computeScrollOut();
                applyTransforms();
                tick();
            });
        };

        const onPointerMove = (e: PointerEvent) => {
            const node = portraitRef.current;
            if (!node) return;

            const rect = node.getBoundingClientRect();
            const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
            const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

            cursorTargetRef.current.x = clamp(x, -1, 1);
            cursorTargetRef.current.y = clamp(y, -1, 1);
        };

        const onPointerLeave = () => {
            cursorTargetRef.current = { x: 0, y: 0 };
        };

        tick();

        const sec = sectionRef.current;
        if (sec) {
            sec.addEventListener('pointermove', onPointerMove);
            sec.addEventListener('pointerleave', onPointerLeave);
        }

        window.addEventListener('resize', computeScrollOut);

        return () => {
            if (raf) window.cancelAnimationFrame(raf);
            if (sec) {
                sec.removeEventListener('pointermove', onPointerMove);
                sec.removeEventListener('pointerleave', onPointerLeave);
            }
            window.removeEventListener('resize', computeScrollOut);
        };
    }, [mounted]);

    return (
        <section
            id='about'
            ref={sectionRef}
            className='relative pt-10 lg:pt-16 [perspective:1200px]'
        >
            {/* Background: confetti + soft glow */}
            <div className='absolute inset-0 pointer-events-none -z-10'>
                <div className='absolute left-1/2 top-0 h-40 w-[520px] -translate-x-1/2 rounded-full bg-emerald-200/40 blur-3xl' />
                <span className='absolute w-2 h-2 bg-red-400 rounded-full left-6 top-10' />
                <span className='absolute left-32 top-40 h-1.5 w-1.5 rounded-full bg-blue-400' />
                <span className='absolute w-2 h-2 rounded-full left-1/2 top-6 bg-emerald-400' />
                <span className='absolute right-10 top-24 h-1.5 w-1.5 rounded-full bg-yellow-400' />
                <span className='absolute bottom-24 left-10 h-1.5 w-1.5 rounded-full bg-emerald-400' />
                <span className='absolute w-2 h-2 bg-red-400 rounded-full bottom-10 right-24' />
            </div>

            <div className='grid items-center gap-12 md:grid-cols-2 [transform-style:preserve-3d]'>
                {/* Left text side */}
                <div
                    ref={leftRef}
                    className={`[transform-origin:center_top] [transform-style:preserve-3d] [will-change:transform,opacity] transition-opacity duration-300 ${
                        mounted ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <div className='inline-flex items-center px-4 py-1 mb-4 text-xs font-semibold border rounded-full border-emerald-200 bg-emerald-50 text-emerald-600'>
                        <span className='mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500' />
                        Frontend Developer
                    </div>

                    <h1 className='mb-2 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl'>
                        Building React &amp; Next.js applications
                    </h1>

                    <p className='max-w-xl mb-8 text-sm leading-relaxed text-gray-600 md:text-base'>
                        I'm <span className='text-lg font-bold text-emerald-500'>Sowale Daniel</span>, a frontend
                        developer using React, Next.js (App Router) and TypeScript to build fast, accessible UIs. I also
                        work with React Native, CSS/SCSS and REST APIs, with a focus on clean, reusable components.
                    </p>

                    <div className='flex flex-wrap items-center gap-5'>
                        {/* ✅ PDF download — correct file name passed so browser saves it cleanly */}
                        <a
                            href={cvHref}
                            download={cvFileName}
                            className='py-3 text-sm font-semibold text-white transition rounded-md shadow-sm bg-emerald-500 px-7 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
                        >
                            Download CV
                        </a>

                        <a
                            href='https://github.com/Dannysnow101?tab=repositories'
                            target='_blank'
                            rel='noreferrer'
                            className='flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-900 transition border rounded-md border-emerald-200 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
                        >
                            View GitHub
                            <span className='inline-flex items-center justify-center h-7 w-7 text-emerald-500'>
                                <ArrowUpRight className='w-6 h-6 transition-transform hover:-translate-y-1 hover:translate-x-1' />
                            </span>
                        </a>
                    </div>
                </div>

                {/* Right image side */}
                <div
                    ref={rightRef}
                    className={`relative flex items-center justify-center gap-3 md:justify-end [transform-origin:center_top] [transform-style:preserve-3d] [will-change:transform,opacity] transition-opacity duration-300 ${
                        mounted ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <div className='flex justify-center w-full md:justify-end'>
                        <div
                            ref={portraitRef}
                            className='relative origin-center [transform-style:preserve-3d] [will-change:transform]'
                        >
                            <div className='absolute rounded-full -inset-6 -z-10 bg-emerald-200/40 blur-2xl' />

                            <div className='relative h-[300px] w-[300px] overflow-hidden rounded-sm sm:h-[340px] sm:w-[340px] md:h-[360px] md:w-[360px]'>
                                <div className='absolute inset-0 rounded-sm bg-emerald-400' />
                                <div className='absolute -bottom-10 -left-10 h-full w-full rounded-sm border-[4px] border-black' />

                                <img
                                    src='/images/My_Passport-removebg.png'
                                    alt='Portrait of Sowale Daniel'
                                    className='relative z-10 object-cover w-full h-full rounded-sm'
                                />

                                <div
                                    ref={shineRef}
                                    className='pointer-events-none absolute -left-1/2 top-0 h-[160%] w-[160%] opacity-0'
                                    style={{
                                        background:
                                            'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 45%, rgba(255,255,255,0) 70%)',
                                        filter: 'blur(1px)',
                                    }}
                                />

                                <div className='absolute border rounded-sm pointer-events-none inset-3 border-white/30' />
                            </div>
                        </div>
                    </div>

                    {/* Social sidebar */}
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
                                className='flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
                                aria-label='GitHub'
                            >
                                <Github className='w-4 h-4' />
                            </a>

                            <a
                                href='https://www.linkedin.com/in/sowale-daniel/'
                                target='_blank'
                                rel='noreferrer'
                                className='flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
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