import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Snow Portfolio V2',
    description: 'A portfolio template built with Next.js and Tailwind CSS.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='en' className='scroll-smooth'>
            <body className='antialiased text-gray-900 bg-white'>
                {children}
            </body>
        </html>
    );
}