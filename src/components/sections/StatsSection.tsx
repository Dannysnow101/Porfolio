'use client';

import { useEffect, useRef, useState } from 'react';

interface StatItem {
    value: string;
    label: string;
}

const stats: StatItem[] = [
    { value: '10+', label: 'Production-ready projects' },
    { value: '2+', label: 'Years Frontend Experience' },
    { value: '3+', label: 'Full-stack apps' },
    { value: '4+', label: 'APIs integrated' },
];

export default function StatsSection() {
    const [progress, setProgress] = useState(0); // 0 → 1 based on center distance
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
            const maxDistance = windowHeight / 1.2;

            const raw = 1 - distance / maxDistance; // 1 at center
            const p = Math.min(1, Math.max(0, raw));
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

    const renderStat = (
        item: StatItem,
        index: number,
        valueClass: string,
        labelClass: string
    ) => {
        const fromLeft = index === 0 || index === 2; // 2 from left, 2 from right

        const offsetX = (1 - progress) * (fromLeft ? -30 : 30); // px
        const opacity = 0.3 + progress * 0.7;
        const scale = 0.96 + progress * 0.04;

        return (
            <div
                key={item.label}
                className='transform transition-all duration-300 ease-out'
                style={{
                    transform: `translateX(${offsetX}px) scale(${scale})`,
                    opacity,
                    transitionDelay: `${index * 80}ms`,
                }}
            >
                <div className={valueClass}>{item.value}</div>
                <div className={labelClass}>{item.label}</div>
            </div>
        );
    };

    return (
        <section
            className='mt-16 w-full border-y border-gray-100 py-10'
            ref={sectionRef}
        >
            <div className='mx-auto max-w-6xl'>
                {/* MOBILE: 2 x 2 grid (2 one side, 2 the other) */}
                <div className='grid grid-cols-2 gap-x-6 gap-y-6 text-center md:hidden'>
                    {stats.map((item, index) =>
                        renderStat(
                            item,
                            index,
                            'text-2xl font-extrabold text-emerald-500',
                            'mt-1 text-xs font-medium text-gray-700'
                        )
                    )}
                </div>

                {/* DESKTOP: 4 in a straight line */}
                <div className='hidden md:grid md:grid-cols-4 md:gap-12 md:text-center'>
                    {stats.map((item, index) =>
                        renderStat(
                            item,
                            index,
                            'text-3xl font-extrabold text-emerald-500',
                            'mt-1 text-sm font-medium text-gray-700'
                        )
                    )}
                </div>
            </div>
        </section>
    );
}