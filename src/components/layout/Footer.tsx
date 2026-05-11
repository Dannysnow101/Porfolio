import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className='bg-white border-t border-gray-100'>
            <div className='flex flex-col items-center justify-between max-w-6xl gap-4 px-4 py-6 mx-auto text-xs text-gray-500 md:flex-row lg:px-0'>
                <div>© 2024 Sowale Daniel. All rights reserved.</div>
                <div>Designed &amp; built by Sowale Daniel</div>

                <div className='flex items-center gap-3'>
                    <a
                        href='https://www.linkedin.com/in/sowale-daniel/'
                        target='_blank'
                        rel='noreferrer'
                        className='flex items-center justify-center text-white transition rounded-full h-7 w-7 bg-emerald-500 hover:bg-emerald-600'
                        aria-label='LinkedIn'
                    >
                        <Linkedin className='w-4 h-4' />
                    </a>
                    <a
                        href='https://github.com/Dannysnow101'
                        target='_blank'
                        rel='noreferrer'
                        className='flex items-center justify-center text-white transition rounded-full h-7 w-7 bg-emerald-500 hover:bg-emerald-600'
                        aria-label='GitHub'
                    >
                        <Github className='w-4 h-4' />
                    </a>
                </div>
            </div>
        </footer>
    );
}