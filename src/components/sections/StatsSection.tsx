'use client';

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

interface Props {
    sceneProgress?: number;
    sceneDelta?: number;
}

export default function StatsSection({ sceneProgress = 1 }: Props) {
    const p = Math.min(1, Math.max(0, sceneProgress));
    const entry = Math.min(1, p * 3.33); // reach 1 by progress ≈ 0.3

    const renderStat = (item: StatItem, index: number, valueClass: string, labelClass: string) => {
        const fromLeft = index === 0 || index === 2;
        const offsetX = (1 - entry) * (fromLeft ? -30 : 30);
        const tz = entry * 60;
        const opacity = 0.2 + entry * 0.8;
        const scale = 0.96 + entry * 0.04;

        return (
            <div
                key={item.label}
                className='[transform-style:preserve-3d]'
                style={{
                    transform: `translateX(${offsetX}px) translateZ(${tz}px) scale(${scale})`,
                    opacity,
                    transition: 'transform 0.25s ease-out, opacity 0.25s ease-out',
                    transitionDelay: `${index * 60}ms`,
                }}
            >
                <div className={valueClass}>{item.value}</div>
                <div className={labelClass}>{item.label}</div>
            </div>
        );
    };

    return (
        <section id='stats' className='w-full py-10 border-gray-100 border-y'>
            <div className='max-w-6xl mx-auto'>
                <div className='grid grid-cols-2 text-center gap-x-6 gap-y-6 md:hidden'>
                    {stats.map((item, index) =>
                        renderStat(
                            item,
                            index,
                            'text-2xl font-extrabold text-emerald-500',
                            'mt-1 text-xs font-medium text-gray-700',
                        ),
                    )}
                </div>
                <div className='hidden md:grid md:grid-cols-4 md:gap-12 md:text-center'>
                    {stats.map((item, index) =>
                        renderStat(
                            item,
                            index,
                            'text-3xl font-extrabold text-emerald-500',
                            'mt-1 text-sm font-medium text-gray-700',
                        ),
                    )}
                </div>
            </div>
        </section>
    );
}
