'use client';

import { Children, isValidElement, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

import { projects } from '@/data/projects';

export default function ProjectDetailsPage() {
    const router = useRouter();
    const params = useParams<{ slug: string }>();

    const rawSlug = params?.slug;
    const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

    const project = useMemo(() => {
        if (!slug) return null;
        return projects.find((p) => p.slug === slug) ?? null;
    }, [slug]);

    const [readme, setReadme] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError(false);
                setReadme('');

                if (!project) {
                    setError(true);
                    return;
                }

                const url = new URL(project.githubUrl);
                const parts = url.pathname.split('/').filter(Boolean);
                const owner = parts[0];
                const repo = parts[1];

                if (!owner || !repo) {
                    setError(true);
                    return;
                }

                const response = await fetch(`/api/readme?owner=${owner}&repo=${repo}`);
                if (!response.ok) {
                    setError(true);
                    return;
                }

                const text = await response.text();
                setReadme(text);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [project]);

    const close = () => {
        router.push('/#projects');
    };

    if (!project && !loading) {
        return (
            <div className='min-h-screen bg-white'>
                <div className='max-w-5xl px-6 py-12 mx-auto'>
                    <button
                        type='button'
                        onClick={close}
                        className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition border border-gray-200 rounded-lg hover:bg-gray-50'
                    >
                        <ArrowLeft className='w-4 h-4' />
                        Close
                    </button>

                    <div className='p-8 mt-10 text-center bg-white border border-gray-200 rounded-lg'>
                        <p className='text-sm text-gray-600'>unavailable for now</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white'>
            <div className='max-w-5xl px-6 py-10 mx-auto'>
                {/* Top bar */}
                <div className='flex items-center justify-between gap-4'>
                    <button
                        type='button'
                        onClick={close}
                        className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition bg-white border border-gray-200 rounded-lg hover:bg-gray-50'
                    >
                        <ArrowLeft className='w-4 h-4' />
                        Close
                    </button>

                    <div className='flex items-center gap-3'>
                        <a
                            href={project?.githubUrl ?? '#'}
                            target='_blank'
                            rel='noreferrer'
                            className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition bg-white border border-gray-200 rounded-lg hover:bg-gray-50'
                        >
                            <Github className='w-4 h-4' />
                            GitHub
                            <ExternalLink className='w-4 h-4 text-gray-400' />
                        </a>

                        <a
                            href={project?.liveUrl ?? '#'}
                            target='_blank'
                            rel='noreferrer'
                            className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-emerald-600 hover:bg-emerald-700'
                        >
                            Live Demo
                            <ExternalLink className='w-4 h-4' />
                        </a>
                    </div>
                </div>

                {/* Header card */}
                <div className='mt-6 overflow-hidden bg-white border shadow-sm rounded-2xl border-emerald-100'>
                    <div className='relative h-44 sm:h-52'>
                        {project?.image && (
                            <img
                                src={project.image}
                                alt={project.title}
                                className='object-cover w-full h-full'
                            />
                        )}
                        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent' />

                        <div className='absolute bottom-0 left-0 right-0 p-6'>
                            <div className='inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white'>
                                {project?.category}
                            </div>
                            <h1 className='mt-2 text-2xl font-bold text-white sm:text-3xl'>
                                {project?.title}
                            </h1>
                            <p className='max-w-3xl mt-2 text-sm text-gray-200'>
                                {project?.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* README */}
                <div className='p-6 mt-6 bg-white border border-gray-200 shadow-sm rounded-2xl'>
                    {loading && (
                        <div className='flex items-center justify-center py-12'>
                            <div className='w-8 h-8 border-2 border-gray-200 rounded-full animate-spin border-b-emerald-600' />
                        </div>
                    )}

                    {!loading && error && (
                        <div className='flex items-center justify-center py-12'>
                            <p className='text-sm text-gray-600'>unavailable for now</p>
                        </div>
                    )}

                    {!loading && !error && (
                        <div className='markdown'>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: (props) => <h1 className='mt-6 text-2xl font-bold text-gray-900' {...props} />,
                                    h2: (props) => <h2 className='mt-6 text-xl font-bold text-gray-900' {...props} />,
                                    h3: (props) => <h3 className='mt-5 text-lg font-semibold text-gray-900' {...props} />,

                                    // ✅ Make badge rows (shields) line up in a straight line (wrap if needed)
                                    p: ({ children, ...props }: any) => {
                                        const arr = Children.toArray(children);

                                        // Remove <br/> and pure whitespace nodes (often causes badge stacking)
                                        const cleaned = arr.filter((child) => {
                                            if (typeof child === 'string') return child.trim() !== '';
                                            if (isValidElement(child) && child.type === 'br') return false;
                                            return true;
                                        });

                                        const isBadgeRow =
                                            cleaned.length > 0 &&
                                            cleaned.every((child) => {
                                                if (!isValidElement(child)) return false;

                                                // <img />
                                                if (child.type === 'img') return true;

                                                // <a><img /></a>
                                                if (child.type === 'a') {
                                                    // ✅ FIX: TS sees props as {}, so cast to any when reading props.children
                                                    const aChildren = Children.toArray((child as any).props?.children);
                                                    return aChildren.some(
                                                        (c) => isValidElement(c) && (c as any).type === 'img'
                                                    );
                                                }

                                                return false;
                                            });

                                        if (isBadgeRow) {
                                            return (
                                                <p className='flex flex-wrap items-center gap-2 mt-3' {...props}>
                                                    {cleaned}
                                                </p>
                                            );
                                        }

                                        return (
                                            <p className='mt-3 text-sm leading-relaxed text-gray-700' {...props}>
                                                {children}
                                            </p>
                                        );
                                    },

                                    // ✅ Ensure shields/badges behave like inline elements
                                    img: ({ className, ...props }: any) => (
                                        <img
                                            {...props}
                                            className={['inline-block align-middle', className].filter(Boolean).join(' ')}
                                        />
                                    ),

                                    a: (props) => (
                                        <a
                                            className='font-medium underline text-emerald-700 underline-offset-4 hover:text-emerald-800'
                                            target='_blank'
                                            rel='noreferrer'
                                            {...props}
                                        />
                                    ),
                                    ul: (props) => <ul className='pl-6 mt-3 text-sm text-gray-700 list-disc' {...props} />,
                                    ol: (props) => <ol className='pl-6 mt-3 text-sm text-gray-700 list-decimal' {...props} />,
                                    li: (props) => <li className='mt-1' {...props} />,
                                    blockquote: (props) => (
                                        <blockquote className='px-4 py-3 mt-4 text-sm text-gray-700 border-l-4 border-emerald-200 bg-emerald-50' {...props} />
                                    ),
                                    hr: () => <hr className='my-6 border-gray-200' />,
                                    table: (props) => (
                                        <div className='mt-4 overflow-x-auto'>
                                            <table className='w-full text-sm text-left border border-gray-200' {...props} />
                                        </div>
                                    ),
                                    thead: (props) => <thead className='bg-gray-50' {...props} />,
                                    th: (props) => <th className='px-3 py-2 font-semibold text-gray-900 border-b border-gray-200' {...props} />,
                                    td: (props) => <td className='px-3 py-2 text-gray-700 border-b border-gray-200' {...props} />,

                                    // ✅ TS fix for `inline` prop
                                    code: ({ node, inline, className, children, ...props }: any) => {
                                        if (inline) {
                                            return (
                                                <code
                                                    className='rounded bg-gray-100 px-1.5 py-0.5 text-[12px] font-medium text-gray-900'
                                                    {...props}
                                                >
                                                    {children}
                                                </code>
                                            );
                                        }

                                        return (
                                            <code className='text-[12px] text-gray-100' {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                    pre: (props) => (
                                        <pre className='p-4 mt-4 overflow-x-auto bg-gray-900 rounded-lg' {...props} />
                                    ),
                                }}
                            >
                                {readme}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}