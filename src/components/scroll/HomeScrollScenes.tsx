'use client';

import { useEffect, useRef, useState } from 'react';

import ScrollScene from './ScrollScene';
import StatsSection from '@/components/sections/StatsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ContactSection from '@/components/sections/ContactSection';

/**
 * Cursor parallax hook (desktop only). Returns smoothed nx, ny in [-1, 1].
 * Attach the returned ref to the pinned scene container.
 */
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
    children: React.ReactNode;
}

function Pinned({ progress, delta, children }: PinnedProps) {
    const { ref, tilt } = useCursorParallax<HTMLDivElement>();
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const tiltScale = isMobile ? 0.5 : 1;

    // Scroll-driven base camera tilt
    const scrollRotX = delta * 8 * tiltScale;  // ±8deg
    const scrollRotY = delta * -6 * tiltScale; // ±6deg
    // Cursor adds subtle ±5deg
    const cursorRotY = tilt.nx * 5 * tiltScale;
    const cursorRotX = -tilt.ny * 5 * tiltScale;

    const rotX = scrollRotX + cursorRotX;
    const rotY = scrollRotY + cursorRotY;
    const tz = -120 + Math.min(1, progress * 3.33) * 220; // -120 → +100
    const opacity = Math.min(1, 0.2 + progress * 2.7);
    const scale = 0.96 + Math.min(1, progress * 3.33) * 0.04;

    return (
        <div
            ref={ref}
            className='mx-auto max-w-6xl px-4 lg:px-0 [transform-style:preserve-3d]'
            style={{
                transform: `perspective(1300px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${tz}px) scale(${scale})`,
                opacity,
                transition: 'opacity 0.2s ease-out',
                willChange: 'transform, opacity',
            }}
        >
            {/* Ambient glow blobs */}
            <div
                aria-hidden
                className='pointer-events-none absolute -left-24 -top-16 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl'
            />
            <div
                aria-hidden
                className='pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl'
            />
            <div className='relative'>{children}</div>
        </div>
    );
}

export default function HomeScrollScenes() {
    return (
        <>
            <ScrollScene heightVh={180} id='stats-scene'>
                {({ progress, delta }) => (
                    <Pinned progress={progress} delta={delta}>
                        <StatsSection sceneProgress={progress} sceneDelta={delta} />
                    </Pinned>
                )}
            </ScrollScene>

            <ScrollScene heightVh={220} id='skills-scene'>
                {({ progress, delta }) => (
                    <Pinned progress={progress} delta={delta}>
                        <SkillsSection sceneProgress={progress} sceneDelta={delta} />
                    </Pinned>
                )}
            </ScrollScene>

            <ScrollScene heightVh={280} id='projects-scene'>
                {({ progress, delta }) => (
                    <Pinned progress={progress} delta={delta}>
                        <PortfolioSection sceneProgress={progress} sceneDelta={delta} />
                    </Pinned>
                )}
            </ScrollScene>

            <ScrollScene heightVh={240} id='contact-scene'>
                {({ progress, delta }) => (
                    <Pinned progress={progress} delta={delta}>
                        <ContactSection sceneProgress={progress} sceneDelta={delta} />
                    </Pinned>
                )}
            </ScrollScene>
        </>
    );
}
