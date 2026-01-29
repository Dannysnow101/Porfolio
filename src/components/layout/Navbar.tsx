import Link from 'next/link';

export default function Navbar() {
    return (
        <header className='border-b border-gray-100 bg-white'>
            <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-5 lg:px-0'>
                {/* Logo */}
                <Link href='/' className='flex items-center gap-3'>
                    <div className='h-11'>
                        <img
                            src='/images/Logo.png'
                            alt='Danny Snow logo'
                            className='h-full w-auto object-contain'
                        />
                    </div>
                </Link>

                {/* Nav links */}
                <nav className='hidden items-center gap-6 text-sm font-medium text-gray-700 md:flex'>
                    <a
                        href='#projects'
                        className='relative pb-0 text-sm font-medium text-gray-700 transition hover:text-emerald-500
                                   after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-emerald-500
                                   after:content-[""] after:transition-all after:duration-300 hover:after:w-full'
                    >
                        Projects
                    </a>
                    <a
                        href='#skills'
                        className='relative pb-0 text-sm font-medium text-gray-700 transition hover:text-emerald-500
                                   after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-emerald-500
                                   after:content-[""] after:transition-all after:duration-300 hover:after:w-full'
                    >
                        Tech Stack
                    </a>
                    <a
                        href='#about'
                        className='relative pb-0 text-sm font-medium text-gray-700 transition hover:text-emerald-500
                                   after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-emerald-500
                                   after:content-[""] after:transition-all after:duration-300 hover:after:w-full'
                    >
                        About
                    </a>
                    <a
                        href='#contact'
                        className='relative pb-0 text-sm font-medium text-gray-700 transition hover:text-emerald-500
                                   after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-emerald-500
                                   after:content-[""] after:transition-all after:duration-300 hover:after:w-full'
                    >
                        Contact
                    </a>
                </nav>

                {/* Download CV button */}
                <button className='rounded-xl border border-emerald-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-emerald-500 hover:text-white'>
                    Download CV
                </button>
            </div>
        </header>
    );
}