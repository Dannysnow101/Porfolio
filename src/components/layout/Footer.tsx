import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className='border-t border-gray-100 bg-white'>
            <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-gray-500 md:flex-row lg:px-0'>
                <div>© 2024 Sowale Daniel. All rights reserved.</div>
                <div>Designed &amp; built by Sowale Daniel</div>

                <div className='flex items-center gap-3'>
                    <a
                        href='https://www.linkedin.com/in/sowale-daniel/'
                        target='_blank'
                        rel='noreferrer'
                        className='flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white transition hover:bg-emerald-600'
                    >
                        <Linkedin className='h-4 w-4' />
                    </a>
                    <a
                        href='https://github.com/Dannysnow101'
                        target='_blank'
                        rel='noreferrer'
                        className='flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white transition hover:bg-emerald-600'
                    >
                        <Github className='h-4 w-4' />
                    </a>
                </div>
            </div>
        </footer>
    );
}