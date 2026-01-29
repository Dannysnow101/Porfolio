import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'M Design – Creative Product Designer Portfolio',
    description:
        'Portfolio of Tanvir, a creative product designer helping businesses solve problems with modern UI/UX design.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='en' className='scroll-smooth'>
            <body className='bg-white text-gray-900 antialiased'>
                {children}
            </body>
        </html>
    );
}