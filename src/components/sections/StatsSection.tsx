'use client';

import { useSmoothed } from '@/hooks/useSmoothed';

interface StatItem {
    value: number;
    suffix: string;
    label: string;
}

const stats: StatItem[] = [
    { value: 10, suffix: '+', label: 'Production-ready projects' },
    { value: 2, suffix: '+', label: 'Years Frontend Experience' },
    { value: 3, suffix: '+', label: 'Full-stack apps' },
    { value: 4, suffix: '+', label: 'APIs integrated' },
];

interface Props {
    sceneProgress?: number;
    sceneDelta?: number;
    isDesktop?: boolean;
}

interface StatCardProps {
    item: StatItem;
    index: number;
    entry: number;
    progress: number;
    count: number;
    isDesktop: boolean;
    valueClass: string;
    labelClass: string;
}

function StatCard({ item, index, entry, progress, count, isDesktop, valueClass, labelClass }: StatCardProps) {
    const fromLeft = index === 0 || index === 2;
    const offsetX = (1 - entry) * (fromLeft ? -30 : 30);
    const tz = isDesktop ? entry * 60 : 0;
    const opacity = 0.2 + entry * 0.8;
    const scale = 0.96 + entry * 0.04;
    // Gentle continuous bob so the card doesn't sit dead-still once it has
    // fully entered -- runs across the whole scroll hold, not just entry.
    const bob = isDesktop ? Math.sin(progress * Math.PI * 3 + index) * 3 : 0;

    return (
        <div
            className='[transform-style:preserve-3d]'
            style={{
                transform: `translateX(${offsetX}px) translateY(${bob}px) translateZ(${tz}px) scale(${scale})`,
                opacity,
                transition: 'transform 0.25s ease-out, opacity 0.25s ease-out',
                transitionDelay: `${index * 60}ms`,
            }}
        >
            <div className={valueClass}>
                {count}
                {item.suffix}
            </div>
            <div className={labelClass}>{item.label}</div>
        </div>
    );
}

export default function StatsSection({ sceneProgress = 1, isDesktop = true }: Props) {
    const p = Math.min(1, Math.max(0, sceneProgress));
    const entry = Math.min(1, p * 3.33);
    // Smoothed across the *entire* scroll range (not capped at the entry
    // window) so the numbers keep counting up as the user keeps scrolling
    // through the runway, instead of popping in once and going static.
    const smoothCount = useSmoothed(p, 0.08);

    return (
        <section id='stats' className='w-full py-10 border-gray-100 border-y'>
            <div className='max-w-6xl mx-auto'>
                <div className='grid grid-cols-2 text-center gap-x-6 gap-y-6 md:hidden'>
                    {stats.map((item, index) => (
                        <StatCard
                            key={item.label}
                            item={item}
                            index={index}
                            entry={entry}
                            progress={p}
                            count={Math.round(item.value * smoothCount)}
                            isDesktop={isDesktop}
                            valueClass='text-2xl font-extrabold text-emerald-500'
                            labelClass='mt-1 text-xs font-medium text-gray-700'
                        />
                    ))}
                </div>
                <div className='hidden md:grid md:grid-cols-4 md:gap-12 md:text-center'>
                    {stats.map((item, index) => (
                        <StatCard
                            key={item.label}
                            item={item}
                            index={index}
                            entry={entry}
                            progress={p}
                            count={Math.round(item.value * smoothCount)}
                            isDesktop={isDesktop}
                            valueClass='text-3xl font-extrabold text-emerald-500'
                            labelClass='mt-1 text-sm font-medium text-gray-700'
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
