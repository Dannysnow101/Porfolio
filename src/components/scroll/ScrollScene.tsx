'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

interface ScrollSceneRenderProps {
    progress: number; // 0 -> 1 across the runway (desktop) or 0/1 reveal (mobile)
    delta: number; // -1 -> 1 around midpoint (desktop only, 0 on mobile)
    isDesktop: boolean; // which mode produced this state
}

interface ScrollSceneProps {
    heightVh?: number;
    className?: string;
    id?: string;
    children: (state: ScrollSceneRenderProps) => ReactNode;
}

/**
 * Renders a scroll-driven "scene".
 *
 * Desktop (>= 768px, no reduced-motion): the classic scroll-jacked pin --
 * a tall runway that keeps the content sticky in the viewport while progress
 * scrubs from 0 to 1 as the user scrolls through it.
 *
 * Mobile / reduced-motion: no pinning, no tall runway. The section sits in
 * normal document flow at its natural height, and a lightweight
 * IntersectionObserver triggers a single fade/slide reveal when it scrolls
 * into view. This avoids sticky + 100vh-centering ever clipping content
 * that's taller than the screen (the cause of the broken mobile layout).
 */
export default function ScrollScene({
    heightVh = 200,
    className = '',
    id,
    children,
}: ScrollSceneProps) {
    const outerRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const [state, setState] = useState<ScrollSceneRenderProps>({
        progress: 0,
        delta: -1,
        isDesktop: false,
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const node = outerRef.current;
        if (!node) return;

        const desktopQuery = window.matchMedia('(min-width: 768px)');
        const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        let cleanupMode: (() => void) | null = null;

        const setupPinMode = () => {
            const compute = () => {
                const rect = node.getBoundingClientRect();
                const winH = window.innerHeight || document.documentElement.clientHeight;
                const total = rect.height - winH;
                const scrolled = -rect.top;
                const raw = total > 0 ? scrolled / total : 0;
                const progress = Math.min(1, Math.max(0, raw));
                const delta = Math.min(1, Math.max(-1, progress * 2 - 1));
                setState({ progress, delta, isDesktop: true });
            };

            const onScroll = () => {
                if (rafRef.current != null) return;
                rafRef.current = requestAnimationFrame(() => {
                    rafRef.current = null;
                    compute();
                });
            };

            compute();
            window.addEventListener('scroll', onScroll, { passive: true });
            window.addEventListener('resize', onScroll);

            return () => {
                window.removeEventListener('scroll', onScroll);
                window.removeEventListener('resize', onScroll);
                if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            };
        };

        const setupRevealMode = () => {
            setState({ progress: 0, delta: 0, isDesktop: false });

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setState({ progress: 1, delta: 0, isDesktop: false });
                        }
                    });
                },
                { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
            );
            observer.observe(node);

            return () => observer.disconnect();
        };

        const applyMode = () => {
            cleanupMode?.();
            const useReveal = reducedQuery.matches || !desktopQuery.matches;
            cleanupMode = useReveal ? setupRevealMode() : setupPinMode();
        };

        applyMode();

        desktopQuery.addEventListener('change', applyMode);
        reducedQuery.addEventListener('change', applyMode);

        return () => {
            cleanupMode?.();
            desktopQuery.removeEventListener('change', applyMode);
            reducedQuery.removeEventListener('change', applyMode);
        };
    }, []);

    return (
        <div
            ref={outerRef}
            id={id}
            className={`scene-runway relative w-full ${className}`}
            style={{ '--scene-h': `${heightVh}vh` } as CSSProperties}
        >
            <div className='flex flex-col items-center justify-center py-16 md:sticky md:top-0 md:h-screen md:py-0'>
                <div className='w-full md:translate-y-[6vh] md:[perspective:1300px]'>{children(state)}</div>
            </div>
        </div>
    );
}