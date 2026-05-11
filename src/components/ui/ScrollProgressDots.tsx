'use client';

import { useEffect, useState } from 'react';

const SECTIONS = [
    { id: 'hero', label: 'Hero' },
    { id: 'stats', label: 'Stats' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
];

export default function ScrollProgressDots() {
    const [active, setActive] = useState<string>('hero');

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible?.target?.id) setActive(visible.target.id);
            },
            { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
        );
        SECTIONS.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) obs.observe(el);
        });
        return () => obs.disconnect();
    }, []);

    const goTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className='pointer-events-none fixed right-5 top-1/2 z-40 -translate-y-1/2'>
            <ul className='flex flex-col gap-3'>
                {SECTIONS.map((s) => {
                    const isActive = active === s.id;
                    return (
                        <li key={s.id}>
                            <button
                                aria-label={`Scroll to ${s.label}`}
                                onClick={() => goTo(s.id)}
                                className={`pointer-events-auto block h-2 w-2 rounded-full transition-all duration-300 ${
                                    isActive
                                        ? 'scale-125 bg-emerald-500'
                                        : 'border border-gray-300 bg-transparent hover:border-emerald-400'
                                }`}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
