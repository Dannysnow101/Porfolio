'use client';

import { useState, type FormEvent } from 'react';

interface Props {
    sceneProgress?: number;
    sceneDelta?: number;
}

export default function ContactSection({ sceneProgress = 1 }: Props) {
    const p = Math.min(1, Math.max(0, sceneProgress));
    const entry = Math.min(1, p * 3.33);

    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (sending) return;
        setSending(true);
        setSent(false);
        window.setTimeout(() => {
            setSending(false);
            setSent(true);
            window.setTimeout(() => setSent(false), 2500);
        }, 1200);
    };

    const headerOffsetY = (1 - entry) * 30;
    const headerOpacity = 0.2 + entry * 0.8;
    const headerScale = 0.98 + entry * 0.02;

    const leftOffsetX = (1 - entry) * -40;
    const leftOpacity = 0.25 + entry * 0.75;
    const leftScale = 0.97 + entry * 0.03;

    const rightOffsetX = (1 - entry) * 40;
    const rightOpacity = 0.25 + entry * 0.75;
    const rightScale = 0.97 + entry * 0.03;

    const inputClass =
        'h-11 rounded-md border border-gray-200 px-3 text-sm text-gray-900 transition-all duration-200 focus:scale-[1.01] focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-300';
    const textareaClass =
        'w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 transition-all duration-200 focus:scale-[1.01] focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-300';

    return (
        <section id='contact'>
            <div
                className='mb-10 text-center'
                style={{
                    marginTop: headerOffsetY,
                    opacity: headerOpacity,
                    transform: `scale(${headerScale})`,
                    transition: 'margin-top 0.3s ease-out, opacity 0.3s ease-out, transform 0.3s ease-out',
                }}
            >
                <div className='inline-flex items-center px-4 py-1 mb-4 text-xs font-semibold border rounded-full border-emerald-200 bg-emerald-50 text-emerald-600'>
                    <span className='mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500' />
                    Contact
                </div>
                <h2 className='text-3xl font-bold text-gray-900'>
                    Let&apos;s Discuss Your Next <span className='text-emerald-500'>Project or Role</span>
                </h2>
                <p className='mt-3 text-sm leading-relaxed text-gray-600'>
                    Open to frontend roles (React / Next.js / TypeScript) and select freelance projects. Email me or use
                    the form below.
                </p>
            </div>

            <div className='grid gap-8 md:grid-cols-3'>
                <div
                    className='space-y-7 [transform-style:preserve-3d]'
                    style={{
                        opacity: leftOpacity,
                        transform: `translateX(${leftOffsetX}px) translateZ(${entry * 50}px) scale(${leftScale})`,
                        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
                    }}
                >
                    <a
                        href='mailto:sowaledaniel5@gmail.com'
                        className='block p-5 transition bg-white shadow-sm rounded-2xl hover:bg-emerald-50'
                    >
                        <div className='flex items-center gap-3'>
                            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-emerald-500'>
                                ✉️
                            </div>
                            <div>
                                <div className='text-xs font-semibold tracking-wide text-gray-500 uppercase'>
                                    Email me
                                </div>
                                <div className='mt-1 text-sm text-gray-900'>sowaledaniel5@gmail.com</div>
                            </div>
                        </div>
                    </a>

                    <a
                        href='tel:+2349031483166'
                        className='block p-5 transition bg-white shadow-sm rounded-2xl hover:bg-emerald-50'
                    >
                        <div className='flex items-center gap-3'>
                            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-emerald-500'>
                                📞
                            </div>
                            <div>
                                <div className='text-xs font-semibold tracking-wide text-gray-500 uppercase'>
                                    Call me
                                </div>
                                <div className='mt-1 text-sm text-gray-900'>+2349031483166</div>
                            </div>
                        </div>
                    </a>

                    <div className='p-5 bg-white shadow-sm rounded-2xl'>
                        <div className='flex items-center gap-3'>
                            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-emerald-500'>
                                📍
                            </div>
                            <div>
                                <div className='text-xs font-semibold tracking-wide text-gray-500 uppercase'>
                                    Address
                                </div>
                                <div className='mt-1 text-sm text-gray-900'>Lagos, Nigeria</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className='md:col-span-2 [transform-style:preserve-3d]'
                    style={{
                        opacity: rightOpacity,
                        transform: `translateX(${rightOffsetX}px) translateZ(${entry * 70}px) scale(${rightScale})`,
                        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
                    }}
                >
                    <form onSubmit={handleSubmit} className='p-6 space-y-4 bg-white shadow-sm rounded-2xl'>
                        <div className='grid gap-4 md:grid-cols-2'>
                            <input type='text' placeholder='Full name' className={inputClass} required />
                            <input type='email' placeholder='Your email' className={inputClass} required />
                        </div>
                        <textarea rows={5} placeholder='Message' className={textareaClass} required />
                        <div className='flex items-center justify-end gap-3'>
                            {sent && (
                                <span className='text-xs font-medium text-emerald-600'>
                                    Thanks — I&apos;ll reply shortly.
                                </span>
                            )}
                            <button
                                type='submit'
                                disabled={sending}
                                className={`h-11 rounded-full bg-emerald-500 px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 ${
                                    sending ? 'animate-pulse opacity-80' : ''
                                }`}
                            >
                                {sending ? 'Sending…' : 'Submit Message'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
