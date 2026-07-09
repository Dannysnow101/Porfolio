'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Tech Stack' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className='bg-white border-b border-gray-100'>
            <div className='flex items-center justify-between max-w-6xl px-4 py-5 mx-auto lg:px-0'>
                <Link href='/' className='flex items-center gap-3' onClick={() => setOpen(false)}>
                    <div className='h-11'>
                        <img
                            src='/images/Logo.png'
                            alt='Danny Snow logo'
                            className='object-contain w-auto h-full'
                        />
                    </div>
                </Link>

                <nav className='items-center hidden gap-6 text-sm font-medium text-gray-700 md:flex'>
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className='relative pb-0 text-sm font-medium text-gray-700 transition hover:text-emerald-500
                                       after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-500
                                       after:content-[""] after:transition-all after:duration-300 hover:after:w-full'
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className='flex items-center gap-2'>
                    <a
                        href='/cv/sowale-daniel-cv.pdf'
                        download='Sowale-Daniel-CV.pdf'
                        className='hidden px-4 py-2 text-sm font-medium text-black transition border rounded-xl border-emerald-500 hover:bg-emerald-500 hover:text-white sm:inline-flex'
                    >
                        Download CV
                    </a>

                    <button
                        type='button'
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        className='flex items-center justify-center w-10 h-10 text-gray-700 transition border border-gray-200 rounded-lg hover:bg-emerald-50 md:hidden'
                    >
                        {open ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
                    </button>
                </div>
            </div>

            <div
                className={`overflow-hidden border-t border-gray-100 transition-[max-height] duration-300 ease-out md:hidden ${
                    open ? 'max-h-80' : 'max-h-0 border-t-0'
                }`}
            >
                <nav className='flex flex-col gap-1 px-4 py-3'>
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className='px-3 py-2.5 text-sm font-medium text-gray-700 transition rounded-lg hover:bg-emerald-50 hover:text-emerald-600'
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href='/cv/sowale-daniel-cv.pdf'
                        download='Sowale-Daniel-CV.pdf'
                        onClick={() => setOpen(false)}
                        className='px-3 py-2.5 mt-1 text-sm font-semibold text-center text-white transition rounded-lg bg-emerald-500 hover:bg-emerald-600 sm:hidden'
                    >
                        Download CV
                    </a>
                </nav>
            </div>
        </header>
    );
}
