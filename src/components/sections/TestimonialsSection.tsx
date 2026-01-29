interface TestimonialItem {
    name: string;
    role: string;
    avatar: string;
    text: string;
}

const testimonials: TestimonialItem[] = [
    {
        name: 'Amir Uddin',
        role: 'UX Designer',
        avatar: '/images/testimonial-1.png',
        text: 'We will also facilitate the business marketing of these products with our SEO experts so that they become a ready to use website & help sell product from company.',
    },
    {
        name: 'Salim Ahmed',
        role: 'UI Designer',
        avatar: '/images/testimonial-2.png',
        text: 'We will also facilitate the business marketing of these products with our SEO experts so that they become a ready to use website & help sell product from company.',
    },
    {
        name: 'Guy Hawkins',
        role: 'UX Designer',
        avatar: '/images/testimonial-3.png',
        text: 'We will also facilitate the business marketing of these products with our SEO experts so that they become a ready to use website & help sell product from company.',
    },
];

export default function TestimonialsSection() {
    return (
        <section id='testimonial' className='mt-20'>
            {/* Header */}
            <div className='mb-8 flex items-center justify-between'>
                <div>
                    <div className='mb-4 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold text-emerald-600'>
                        <span className='mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500' />
                        Reviews
                    </div>

                    <h2 className='text-3xl font-bold text-gray-900'>
                        Our Customer Say
                        <br />
                        Something <span className='text-emerald-500'>About Us</span>
                    </h2>
                </div>

                <div className='hidden items-center gap-2 md:flex'>
                    <button className='flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-sm text-gray-500 transition hover:bg-emerald-500 hover:text-white'>
                        ←
                    </button>
                    <button className='flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-sm text-gray-500 transition hover:bg-emerald-500 hover:text-white'>
                        →
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className='grid gap-6 md:grid-cols-3'>
                {testimonials.map((item) => (
                    <article
                        key={item.name}
                        className='flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
                        <div className='mb-3 text-xs text-emerald-500'>
                            {'★★★★★'.split('').map((star, index) => (
                                <span key={index} className='text-[11px]'>
                                    {star}
                                </span>
                            ))}
                        </div>

                        <p className='mb-6 flex-1 text-xs leading-relaxed text-gray-600'>{item.text}</p>

                        <div className='mt-auto flex items-center gap-3'>
                            <div className='h-10 w-10 overflow-hidden rounded-full bg-gray-100'>
                                <img src={item.avatar} alt={item.name} className='h-full w-full object-cover' />
                            </div>
                            <div>
                                <div className='text-sm font-semibold text-gray-900'>{item.name}</div>
                                <div className='text-[11px] text-gray-500'>{item.role}</div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}