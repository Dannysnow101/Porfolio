'use client';

import { useEffect, useRef, useState } from 'react';
import { Code2, Palette, GitBranch, LayoutGrid, type LucideIcon } from 'lucide-react';

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

interface SkillCardItemProps extends SkillCard {
    index: number;
    progress: number; // 0 → 1 based on how close section is to center
}

function SkillCardItem({ title, description, icon: Icon, index, progress }: SkillCardItemProps) {
    // card motion (fade + small lift + scale)
    const cardOpacity = 0.3 + progress * 0.7;
    const cardOffsetY = (1 - progress) * 10; // px
    const cardScale = 0.97 + progress * 0.03;

    return (
        <div
            className='px-2 py-2 transform transition-all duration-300 ease-out'
            style={{
                opacity: cardOpacity,
                marginTop: cardOffsetY,
                transform: `scale(${cardScale})`,
                transitionDelay: `${index * 80}ms`,
            }}
        >
            <div className='mb-2 text-emerald-500'>
                <Icon className='h-5 w-5' />
            </div>
            <h3 className='mb-1 text-sm font-semibold text-gray-900'>{title}</h3>
            <p className='text-xs leading-relaxed text-gray-600'>{description}</p>
        </div>
    );
}

export default function SkillsSection() {
    const [frontend, uiStyling, workflowApis] = skills;

    // progress 0 → 1 depending on how close the section center is to the viewport center
    const [progress, setProgress] = useState(0);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const node = sectionRef.current;
            if (!node) return;

            const rect = node.getBoundingClientRect();
            const winH = window.innerHeight || document.documentElement.clientHeight;

            const sectionCenter = rect.top + rect.height / 2;
            const viewportCenter = winH / 2;

            const distance = Math.abs(sectionCenter - viewportCenter); // 0 when perfectly centered
            const maxDistance = winH / 1.2; // tune: how far before it becomes 0

            const raw = 1 - distance / maxDistance; // 1 at center, <1 as it moves away
            const p = Math.min(1, Math.max(0, raw)); // clamp 0–1

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

    const scrollToProjects = () => {
        const el = document.getElementById('projects');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // left/right block motion based on progress
    const leftOffsetX = (1 - progress) * -40; // slide from left
    const leftOpacity = 0.2 + progress * 0.8;
    const leftScale = 0.98 + progress * 0.02;

    const rightOffsetX = (1 - progress) * 40; // slide from right
    const rightOpacity = 0.25 + progress * 0.75;
    const rightScale = 0.96 + progress * 0.04;

    return (
        <section
            id='skills'
            ref={sectionRef}
            className='mt-20 grid gap-12 md:grid-cols-2'
        >
            {/* Left text */}
            <div
                style={{
                    opacity: leftOpacity,
                    transform: `translateX(${leftOffsetX}px) scale(${leftScale})`,
                    transition: 'transform 0.25s ease-out, opacity 0.25s ease-out',
                }}
            >
                <div className='mb-4 inline-flex items-center rounded-full border border-emerald-400 px-5 py-1 text-xs font-semibold text-emerald-500'>
                    <span className='mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500' />
                    Tech Stack
                </div>

                <h2 className='mb-4 text-3xl font-bold text-gray-900'>
                    Tools I use to build <span className='text-emerald-500'>React &amp; Next.js</span> apps
                </h2>

                <p className='mb-6 max-w-md text-sm leading-relaxed text-gray-600'>
                    Here&apos;s the core stack I use to build production‑ready React and Next.js apps, from UI and
                    styling to APIs and workflow.
                </p>

                <button
                    onClick={scrollToProjects}
                    className='inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600'
                >
                    <LayoutGrid className='h-4 w-4' />
                    <span>View Projects</span>
                </button>
            </div>

            {/* Right cards */}
            <div
                className='mt-6 md:mt-0'
                style={{
                    opacity: rightOpacity,
                    transform: `translateX(${rightOffsetX}px) scale(${rightScale})`,
                    transition: 'transform 0.25s ease-out, opacity 0.25s ease-out',
                }}
            >
                {/* Mobile: stack all three */}
                <div className='flex flex-col gap-4 md:hidden'>
                    <SkillCardItem {...frontend} index={0} progress={progress} />
                    <SkillCardItem {...uiStyling} index={1} progress={progress} />
                    <SkillCardItem {...workflowApis} index={2} progress={progress} />
                </div>

                {/* Desktop: two on the left, one on the right (centered) */}
                <div className='relative hidden h-[260px] w-full max-w-xl md:block'>
                    {/* Top-left: Frontend */}
                    <div className='absolute left-0 top-0 w-[50%]'>
                        <SkillCardItem {...frontend} index={0} progress={progress} />
                    </div>

                    {/* Bottom-left: UI & Styling */}
                    <div className='absolute left-0 bottom-0 w-[50%]'>
                        <SkillCardItem {...uiStyling} index={1} progress={progress} />
                    </div>

                    {/* Right, centered: Workflow & APIs */}
                    <div className='absolute right-0 top-1/2 w-[45%] -translate-y-1/2'>
                        <SkillCardItem {...workflowApis} index={2} progress={progress} />
                    </div>
                </div>
            </div>
        </section>
    );
}