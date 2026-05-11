import Link from 'next/link';

export default function Navbar() {
    return (
        <header className='bg-white border-b border-gray-100'>
            <div className='flex items-center justify-between max-w-6xl px-4 py-5 mx-auto lg:px-0'>
                <Link href='/' className='flex items-center gap-3'>
                    <div className='h-11'>
                        <img
                            src='/images/Logo.png'
                            alt='Danny Snow logo'
                            className='object-contain w-auto h-full'
                        />
                    </div>
                </Link>

                <nav className='items-center hidden gap-6 text-sm font-medium text-gray-700 md:flex'>
                                        <a
                        href='#about'
                        className='relative pb-0 text-sm font-medium text-gray-700 transition hover:text-emerald-500
                                   after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-500
                                   after:content-[""] after:transition-all after:duration-300 hover:after:w-full'
                    >
                        About
                    </a>
                    <a
                        href='#skills'
                        className='relative pb-0 text-sm font-medium text-gray-700 transition hover:text-emerald-500
                                   after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-500
                                   after:content-[""] after:transition-all after:duration-300 hover:after:w-full'
                    >
                        Tech Stack
                    </a>
                    <a
                        href='#projects'
                        className='relative pb-0 text-sm font-medium text-gray-700 transition hover:text-emerald-500
                                   after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-500
                                   after:content-[""] after:transition-all after:duration-300 hover:after:w-full'
                    >
                        Projects
                    </a>
                    <a
                        href='#contact'
                        className='relative pb-0 text-sm font-medium text-gray-700 transition hover:text-emerald-500
                                   after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-500
                                   after:content-[""] after:transition-all after:duration-300 hover:after:w-full'
                    >
                        Contact
                    </a>
                </nav>

                <a
    href='/cv/sowale-daniel-cv.pdf'
    download='Sowale-Daniel-CV.pdf'
    className='px-4 py-2 text-sm font-medium text-black transition border rounded-xl border-emerald-500 hover:bg-emerald-500 hover:text-white'
>
    Download CV
</a>

            </div>
        </header>
    );
}