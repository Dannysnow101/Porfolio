import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import HomeScrollScenes from '@/components/scroll/HomeScrollScenes';
import ScrollProgressDots from '@/components/ui/ScrollProgressDots';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
    return (
        <div className='min-h-screen bg-white overflow-x-clip'>
            <Navbar />
            <ScrollProgressDots />

            <main className='pt-10 pb-20'>
                <div className='max-w-6xl px-4 mx-auto lg:px-0' id='hero'>
                    <HeroSection />
                </div>

                <HomeScrollScenes />
            </main>

            <Footer />
        </div>
    );
}
