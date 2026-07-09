'use client';

import { Code2, Palette, GitBranch, LayoutGrid, Sparkles, type LucideIcon } from 'lucide-react';

interface SkillCard {
    title: string;
    description: string;
    icon: LucideIcon;
}

const skills: SkillCard[] = [
    {
        title: 'Frontend',
        description: 'React, Next.js (App Router), TypeScript, JavaScript (ES6+).',
        icon: Code2,
    },
    {
        title: 'UI & Styling',
        description: 'CSS, SCSS, responsive layouts with Flexbox and Grid.',
        icon: Palette,
    },
    {
        title: 'Workflow & APIs',
        description: 'REST APIs, JSON, Git and GitHub for version control.',
        icon: GitBranch,
    },
];

// Extra badges reveal progressively across the *rest* of the long scroll
// runway (after the main cards have popped in), so there's always something
// new to see while scrolling instead of the section going static early.
const extraBadges = ['JavaScript (ES6+)', 'Tailwind CSS', 'SCSS', 'Redux', 'Figma', 'React Native'];

interface Props {
    sceneProgress?: number;
    sceneDelta?: number;
    isDesktop?: boolean;
}

interface CardProps extends SkillCard {
    index: number;
    entry: number;
    bob: number;
    isDesktop: boolean;
}

function SkillCardItem({ title, description, icon: Icon, index, entry, bob, isDesktop }: CardProps) {
    const opacity = 0.2 + entry * 0.8;
    const offsetY = (1 - entry) * 16 - bob;
    const tz = isDesktop ? entry * 80 : 0;
    const scale = 0.97 + entry * 0.03;

    return (
        <div
            className='group relative overflow-hidden rounded-xl bg-white/60 p-4 [transform-style:preserve-3d]'
            style={{
                opacity,
                transform: `translateY(${offsetY}px) translateZ(${tz}px) scale(${scale})`,
                transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
                transitionDelay: `${index * 80}ms`,
            }}
        >
            <span
                aria-hidden
                className='pointer-events-none absolute inset-0 -translate-x-[120%] rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-[120%] group-hover:opacity-100'
            />
            <div className='mb-2 text-emerald-500'>
                <Icon className='w-5 h-5' />
            </div>
            <h3 className='mb-1 text-sm font-semibold text-gray-900'>{title}</h3>
            <p className='text-xs leading-relaxed text-gray-600'>{description}</p>
        </div>
    );
}

export default function SkillsSection({ sceneProgress = 1, isDesktop = true }: Props) {
    const p = Math.min(1, Math.max(0, sceneProgress));
    const entry = Math.min(1, p * 3.33);

    const scrollToProjects = () => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const leftOffsetX = (1 - entry) * -40;
    const leftOpacity = 0.2 + entry * 0.8;
    const leftScale = 0.98 + entry * 0.02;

    const rightOffsetX = (1 - entry) * 40;
    const rightOpacity = 0.25 + entry * 0.75;
    const rightScale = 0.96 + entry * 0.04;

    const badgeStart = 0.4;
    const badgeEnd = 0.92;
    const badgeWindow = 0.1;

    return (
        <section id='skills' className='grid gap-10 md:grid-cols-2'>
            <div
                className='[transform-style:preserve-3d]'
                style={{
                    opacity: leftOpacity,
                    transform: `translateX(${leftOffsetX}px) translateZ(${isDesktop ? entry * 40 : 0}px) scale(${leftScale})`,
                    transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
                }}
            >
                <div className='inline-flex items-center px-5 py-1 mb-4 text-xs font-semibold border rounded-full border-emerald-400 text-emerald-500'>
                    <span className='mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500' />
                    Tech Stack
                </div>
                <h2 className='mb-4 text-3xl font-bold text-gray-900'>
                    Tools I use to build <span className='text-emerald-500'>React &amp; Next.js</span> apps
                </h2>
                <p className='max-w-md mb-6 text-sm leading-relaxed text-gray-600'>
                    Here&apos;s the core stack I use to build production-ready React and Next.js apps, from UI and
                    styling to APIs and workflow.
                </p>
                <button
                    onClick={scrollToProjects}
                    className='inline-flex items-center gap-2 py-3 text-sm font-semibold text-white transition rounded-lg shadow-sm bg-emerald-500 px-7 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
                >
                    <LayoutGrid className='w-4 h-4' />
                    <span>View Projects</span>
                </button>

                <div className='flex flex-wrap gap-2 mt-8'>
                    {extraBadges.map((badge, i) => {
                        const threshold =
                            badgeStart + (i / Math.max(extraBadges.length - 1, 1)) * (badgeEnd - badgeStart);
                        const localEntry = Math.min(1, Math.max(0, (p - threshold) / badgeWindow));
                        return (
                            <span
                                key={badge}
                                className='inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50/70 px-3 py-1 text-[11px] font-medium text-emerald-700'
                                style={{
                                    opacity: localEntry,
                                    transform: `translateY(${(1 - localEntry) * 10}px) scale(${0.9 + localEntry * 0.1})`,
                                    transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
                                }}
                            >
                                <Sparkles className='h-2.5 w-2.5' />
                                {badge}
                            </span>
                        );
                    })}
                </div>
            </div>

            <div
                className='grid gap-4 sm:grid-cols-2 [transform-style:preserve-3d]'
                style={{
                    opacity: rightOpacity,
                    transform: `translateX(${rightOffsetX}px) translateZ(${isDesktop ? entry * 60 : 0}px) scale(${rightScale})`,
                    transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
                }}
            >
                {skills.map((s, i) => (
                    <SkillCardItem
                        key={s.title}
                        {...s}
                        index={i}
                        entry={entry}
                        isDesktop={isDesktop}
                        bob={isDesktop ? Math.sin(p * Math.PI * 3 + i) * 3 : 0}
                    />
                ))}
            </div>
        </section>
    );
}
