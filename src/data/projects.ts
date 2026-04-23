export interface ProjectItem {
    slug: string;
    title: string;
    category: string;
    description: string;
    image: string;
    liveUrl: string;
    githubUrl: string;
}

export const projects: ProjectItem[] = [
    {
        slug: 'easywears',
        title: 'EasyWears – E‑commerce UI',
        category: 'E‑COMMERCE · WEBSITE',
        description: 'Modern product listing and checkout experience for fashion brands.',
        image: '/images/EasyWears.png',
        liveUrl: 'https://easywearsweb.netlify.app/',
        githubUrl: 'https://github.com/Dannysnow101/EasyWears',
    },
    {
        slug: 'flutterwave-clone',
        title: 'Flutterwave Homepage Clone',
        category: 'FINTECH · LANDING PAGE',
        description: 'Pixel‑perfect clone of Flutterwave homepage using Next.js.',
        image: '/images/Flutterwave.png',
        liveUrl: 'https://flutterwaveclone101.netlify.app/',
        githubUrl: 'https://github.com/Dannysnow101/FlutterwaveClone',
    },
    {
        slug: 'portfolio-v1',
        title: 'Portfolio v1 – Dark Theme',
        category: 'PERSONAL · PORTFOLIO',
        description: 'First version of my personal portfolio with dark UI.',
        image: '/images/PortfolioV1.png',
        liveUrl: 'https://snowportfolio.netlify.app/',
        githubUrl: 'https://github.com/Dannysnow101/Portfolio',
    },
    {
        slug: 'snow-pastq',
        title: 'Snow PastQ – Practice Engine',
        category: 'EDTECH · PRACTICE PLATFORM',
        description: 'Smart exam practice tool with customizable sessions and question banks.',
        image: '/images/SnowPastQ.png',
        liveUrl: 'https://snowpastq.netlify.app/',
        githubUrl: 'https://github.com/Dannysnow101/Snow_Past_Q',
    },
    {
        slug: 'grand-play-hotel',
        title: 'Grand Play Hotel – Luxury Landing',
        category: 'HOSPITALITY · HOTEL WEBSITE',
        description: 'Elegant hotel landing page showcasing rooms, amenities, and booking experience.',
        image: '/images/GrandPlayHotel.png',
        liveUrl: 'https://grand-play-hotel.netlify.app/',
        githubUrl: 'https://github.com/Dannysnow101/grand-play-preview',
    },
    {
        slug: 'snow-ai',
        title: 'SnowAI – Smart Chat Assistant',
        category: 'AI · CHAT APPLICATION',
        description: 'Modern AI chat interface designed for fast, focused, and intelligent conversations.',
        image: '/images/SnowAI.png',
        liveUrl: 'https://snowai.netlify.app/',
        githubUrl: 'https://github.com/Dannysnow101/Snow_AI',
},
];