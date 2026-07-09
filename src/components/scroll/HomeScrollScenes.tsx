'use client';

import { useEffect, useRef, useState } from 'react';

import ScrollScene from './ScrollScene';
import StatsSection from '@/components/sections/StatsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ContactSection from '@/components/sections/ContactSection';
import { useSmoothed } from '@/hooks/useSmoothed';

function useCursorParallax<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const [tilt, setTilt] = useState({ nx: 0, ny: 0 });
    const target = useRef({ nx: 0, ny: 0 });
    const current = useRef({ nx: 0, ny: 0 });
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (window.innerWidth < 768) return;

        const node = ref.current;
        if (!node) return;

        const onMove = (e: PointerEvent) => {
            const r = node.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width;
            const y = (e.clientY - r.top) / r.height;
            target.current.nx = Math.min(1, Math.max(-1, x * 2 - 1));
            target.current.ny = Math.min(1, Math.max(-1, y * 2 - 1));
        };
        const onLeave = () => {
            target.current.nx = 0;
            target.current.ny = 0;
        };

        const loop = () => {
            current.current.nx += (target.current.nx - current.current.nx) * 0.08;
            current.current.ny += (target.current.ny - current.current.ny) * 0.08;
            setTilt({ nx: current.current.nx, ny: current.current.ny });
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);

        node.addEventListener('pointermove', onMove);
        node.addEventListener('pointerleave', onLeave);
        return () => {
            node.removeEventListener('pointermove', onMove);
            node.removeEventListener('pointerleave', onLeave);
            if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return { ref, tilt };
}

interface PinnedProps {
    progress: number;
    delta: number;
    isDesktop: boolean;
    children: React.ReactNode;
}

function Pinned({ progress, delta, isDesktop, children }: PinnedProps) {
    const { ref, tilt } = useCursorParallax<HTMLDivElement>();
    const smoothProgress = useSmoothed(progress, 0.1);
    const smoothDelta = useSmoothed(delta, 0.1);

    if (!isDesktop) {
        // Mobile / reduced-motion: a clean, simple fade + slide-up.
        // No perspective, no rotateX/Y, no translateZ zoom -- those are the
        // effects that don't survive a narrow, short viewport gracefully.
        const reveal = Math.min(1, Math.max(0, smoothProgress));
        return (
            <div
                className='relative mx-auto w-full max-w-xl px-4'
                style={{
                    opacity: reveal,
                    transform: `translateY(${(1 - reveal) * 22}px)`,
                    transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                }}
            >
                <div
                    aria-hidden
                    className='animate-float-a pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full bg-emerald-200/30 blur-3xl'
                />
                <div
                    aria-hidden
                    className='animate-float-b pointer-events-none absolute -bottom-8 -right-6 h-36 w-36 rounded-full bg-emerald-100/40 blur-3xl'
                />
                <div className='relative'>{children}</div>
            </div>
        );
    }

    const rotX = smoothDelta * 8 + -tilt.ny * 5;
    const rotY = smoothDelta * -6 + tilt.nx * 5;
    const entry = Math.min(1, smoothProgress * 3.33);
    const tz = -120 + entry * 220;
    const opacity = Math.min(1, 0.2 + smoothProgress * 2.7);
    const scale = 0.96 + entry * 0.04;

    // Continuous ambient drift across the *entire* 0 -> 1 hold, not just the
    // entry window, so the block never sits perfectly frozen mid-scroll.
    const driftX = Math.sin(smoothProgress * Math.PI * 2) * 10;
    const driftY = Math.cos(smoothProgress * Math.PI * 1.6) * 6;

    return (
        <div
            ref={ref}
            className='relative mx-auto max-w-6xl px-4 lg:px-0 [transform-style:preserve-3d]'
            style={{
                transform: `perspective(1300px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${tz}px) translate(${driftX}px, ${driftY}px) scale(${scale})`,
                opacity,
                transition: 'opacity 0.2s ease-out',
                willChange: 'transform, opacity',
            }}
        >
            <div
                aria-hidden
                className='animate-float-a pointer-events-none absolute -left-24 -top-16 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl'
            />
            <div
                aria-hidden
                className='animate-float-b pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl'
            />
            <div
                aria-hidden
                className='animate-float-c pointer-events-none absolute right-1/4 top-1/2 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl'
            />
            <div className='relative'>{children}</div>
        </div>
    );
}

export default function HomeScrollScenes() {
    return (
        <>
            <ScrollScene heightVh={180} id='stats-scene'>
                {({ progress, delta, isDesktop }) => (
                    <Pinned progress={progress} delta={delta} isDesktop={isDesktop}>
                        <StatsSection sceneProgress={progress} sceneDelta={delta} isDesktop={isDesktop} />
                    </Pinned>
                )}
            </ScrollScene>

            <ScrollScene heightVh={220} id='skills-scene'>
                {({ progress, delta, isDesktop }) => (
                    <Pinned progress={progress} delta={delta} isDesktop={isDesktop}>
                        <SkillsSection sceneProgress={progress} sceneDelta={delta} isDesktop={isDesktop} />
                    </Pinned>
                )}
            </ScrollScene>

            <ScrollScene heightVh={280} id='projects-scene'>
                {({ progress, delta, isDesktop }) => (
                    <Pinned progress={progress} delta={delta} isDesktop={isDesktop}>
                        <PortfolioSection sceneProgress={progress} sceneDelta={delta} isDesktop={isDesktop} />
                    </Pinned>
                )}
            </ScrollScene>

            <ScrollScene heightVh={240} id='contact-scene'>
                {({ progress, delta, isDesktop }) => (
                    <Pinned progress={progress} delta={delta} isDesktop={isDesktop}>
                        <ContactSection sceneProgress={progress} sceneDelta={delta} isDesktop={isDesktop} />
                    </Pinned>
                )}
            </ScrollScene>
        </>
    );
}
