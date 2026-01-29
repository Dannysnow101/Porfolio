import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
    return (
        <div className='min-h-screen bg-white'>
            <Navbar />

            <main className='mx-auto max-w-6xl px-4 pt-10 pb-20 lg:px-0'>
                <HeroSection />
                <StatsSection />
                <SkillsSection />
                <PortfolioSection />
                <ContactSection />
            </main>

            <Footer />
        </div>
    );
}