'use client';

import { useEffect, useRef } from 'react';

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

export default function SnowflakeCursor() {
    const cursorRef = useRef<HTMLDivElement | null>(null);

    const targetRef = useRef({ x: -100, y: -100 });
    const currentRef = useRef({ x: -100, y: -100 });
    const rafRef = useRef(0);
    const visibleRef = useRef(false);

    useEffect(() => {
        // Don't run on touch devices
        if (typeof window === 'undefined') return;
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const el = cursorRef.current;
        if (!el) return;

        const onPointerMove = (e: PointerEvent) => {
            targetRef.current.x = e.clientX;
            targetRef.current.y = e.clientY;

            if (!visibleRef.current) {
                visibleRef.current = true;
                el.style.opacity = '1';
            }
        };

        const onPointerLeave = () => {
            visibleRef.current = false;
            el.style.opacity = '0';
        };

        const tick = () => {
            currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.14);
            currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.14);

            if (el) {
                el.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px) translate(-50%, -50%)`;
            }

            rafRef.current = window.requestAnimationFrame(tick);
        };

        rafRef.current = window.requestAnimationFrame(tick);

        window.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerleave', onPointerLeave);

        return () => {
            window.cancelAnimationFrame(rafRef.current);
            window.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerleave', onPointerLeave);
        };
    }, []);

    return (
        <>
            {/* Hide default cursor everywhere */}
            <style>{`
                * { cursor: none !important; }
            `}</style>

            {/* Snowflake cursor */}
            <div
                ref={cursorRef}
                className='pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 transition-opacity duration-200'
                aria-hidden='true'
            >
                {/* Outer glow ring */}
                <div className='absolute rounded-full -inset-3 bg-emerald-300/20 blur-md' />

                {/* Snowflake SVG */}
                <svg
                    width='28'
                    height='28'
                    viewBox='0 0 28 28'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='relative drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]'
                >
                    {/* Main cross */}
                    <line x1='14' y1='2' x2='14' y2='26' stroke='#34d399' strokeWidth='2' strokeLinecap='round' />
                    <line x1='2' y1='14' x2='26' y2='14' stroke='#34d399' strokeWidth='2' strokeLinecap='round' />

                    {/* Diagonal cross */}
                    <line x1='5.5' y1='5.5' x2='22.5' y2='22.5' stroke='#34d399' strokeWidth='2' strokeLinecap='round' />
                    <line x1='22.5' y1='5.5' x2='5.5' y2='22.5' stroke='#34d399' strokeWidth='2' strokeLinecap='round' />

                    {/* Top arm ticks */}
                    <line x1='11' y1='6' x2='14' y2='9' stroke='#34d399' strokeWidth='1.5' strokeLinecap='round' />
                    <line x1='17' y1='6' x2='14' y2='9' stroke='#34d399' strokeWidth='1.5' strokeLinecap='round' />

                    {/* Bottom arm ticks */}
                    <line x1='11' y1='22' x2='14' y2='19' stroke='#34d399' strokeWidth='1.5' strokeLinecap='round' />
                    <line x1='17' y1='22' x2='14' y2='19' stroke='#34d399' strokeWidth='1.5' strokeLinecap='round' />

                    {/* Left arm ticks */}
                    <line x1='6' y1='11' x2='9' y2='14' stroke='#34d399' strokeWidth='1.5' strokeLinecap='round' />
                    <line x1='6' y1='17' x2='9' y2='14' stroke='#34d399' strokeWidth='1.5' strokeLinecap='round' />

                    {/* Right arm ticks */}
                    <line x1='22' y1='11' x2='19' y2='14' stroke='#34d399' strokeWidth='1.5' strokeLinecap='round' />
                    <line x1='22' y1='17' x2='19' y2='14' stroke='#34d399' strokeWidth='1.5' strokeLinecap='round' />

                    {/* Center dot */}
                    <circle cx='14' cy='14' r='2.5' fill='#34d399' />

                    {/* Arm end dots */}
                    <circle cx='14' cy='3' r='1.5' fill='#6ee7b7' />
                    <circle cx='14' cy='25' r='1.5' fill='#6ee7b7' />
                    <circle cx='3' cy='14' r='1.5' fill='#6ee7b7' />
                    <circle cx='25' cy='14' r='1.5' fill='#6ee7b7' />
                </svg>
            </div>
        </>
    );
}