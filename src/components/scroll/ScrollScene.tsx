'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ScrollSceneRenderProps {
    progress: number; // 0 → 1 across the runway
    delta: number;    // -1 → 1 around midpoint
}

interface ScrollSceneProps {
    heightVh?: number;
    className?: string;
    id?: string;
    children: (state: ScrollSceneRenderProps) => ReactNode;
}

export default function ScrollScene({
    heightVh = 200,
    className = '',
    id,
    children,
}: ScrollSceneProps) {
    const outerRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const [state, setState] = useState<ScrollSceneRenderProps>({ progress: 0, delta: -1 });

    useEffect(() => {
        const prefersReduced =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReduced) {
            setState({ progress: 1, delta: 0 });
            return;
        }

        const compute = () => {
            const node = outerRef.current;
            if (!node) return;
            const rect = node.getBoundingClientRect();
            const winH = window.innerHeight || document.documentElement.clientHeight;
            const total = rect.height - winH;
            const scrolled = -rect.top;
            const raw = total > 0 ? scrolled / total : 0;
            const progress = Math.min(1, Math.max(0, raw));
            const delta = Math.min(1, Math.max(-1, progress * 2 - 1));
            setState({ progress, delta });
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
        };
    }, []);

    return (
        <div
            ref={outerRef}
            id={id}
            className={`relative w-full overflow-x-clip ${className}`}
            style={{ height: `${heightVh}vh` }}
        >
            <div className='sticky top-0 flex h-screen items-center justify-center'>
                <div
                    className='w-full translate-y-[6vh]'
                    style={{ perspective: '1300px' }}
                >
                    {children(state)}
                </div>
            </div>
        </div>
    );
}
