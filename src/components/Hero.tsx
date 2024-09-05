'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { Avatar } from '@nextui-org/react';

const Hero = () => {
    type Blog = {
        id: number;
        title: string;
        description: string;
        thumbnail: string;
        tag: string;
        author: string;
        authorImage: string;
        postDate: string;
        shortDescription: string;
    };

    const blogs: Blog[] = [
        {
            id: 1,
            title: 'Exploring the Beauty of the Mountains',
            description: 'This is a short description about exploring the majestic mountains and the unique experiences they offer.',
            thumbnail: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            tag: 'Traveling',
            author: 'John Doe',
            authorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
            postDate: 'September 3, 2024',
            shortDescription: 'Join me as I trek through the towering mountains, discovering breathtaking landscapes and hidden gems along the way.'
        },
        {
            id: 2,
            title: 'A Journey Through Tropical Islands',
            description: 'This is a short description about traveling through tropical islands and experiencing their vibrant cultures.',
            thumbnail: 'https://images.pexels.com/photos/6942960/pexels-photo-6942960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            tag: 'Traveling',
            author: 'Sarah Green',
            authorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
            postDate: 'August 29, 2024',
            shortDescription: 'Discover the wonders of tropical islands with stunning beaches, lush rainforests, and incredible marine life.'
        },
        {
            id: 3,
            title: 'Sunrise at Machu Picchu: A Magical Experience',
            description: 'This is a short description about witnessing the beauty of Machu Picchu at sunrise.',
            thumbnail: 'https://images.pexels.com/photos/18662534/pexels-photo-18662534/free-photo-of-machu-picchu-by-sunrise.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            tag: 'Traveling',
            author: 'Emily Rose',
            authorImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
            postDate: 'September 1, 2024',
            shortDescription: 'Experience the awe-inspiring beauty of Machu Picchu at sunrise and learn about its fascinating history.'
        },
    ];

    return (
        <div className="relative -top-16 w-full h-[600px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-lg">
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[EffectFade, Pagination, Autoplay]}
                className="h-full"
            >
                {blogs.map((blog) => (
                    <SwiperSlide key={blog.id}>
                        <div
                            className="relative w-full h-full bg-cover bg-center bg-fixed rounded-lg"
                            style={{ backgroundImage: `url(${blog.thumbnail})` }}
                        >
                            {/* Overlay for dark effect */}
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                            {/* Blog details */}
                            <div>
                                <div className="absolute bottom-36 md:bottom-16 left-5 sm:left-10 text-white z-10 w-full sm:w-2/3 md:w-1/2">
                                    <div className="bg-[#faf8ff57] w-fit px-2 sm:px-3 py-1 text-sm rounded-full">{blog.tag}</div>
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold w-full sm:w-2/3">
                                        {blog.title}
                                    </h2>
                                    <p className="mt-4 text-sm sm:text-base md:text-lg">{blog.description}</p>
                                </div>

                                <div className="absolute bottom-16 left-5 text-white z-10 md:hidden">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Avatar size="sm" src={blog.authorImage} />
                                            <p className="text-sm sm:text-base">{blog.author}</p>
                                        </div>
                                        <p className="text-xs sm:text-sm">{blog.postDate}</p>
                                    </div>
                            </div>

                            {/* Author details */}
                            <div className="absolute bottom-16 right-5 text-white z-10 hidden md:block">
                                <div className="flex items-center gap-2 mb-2">
                                    <Avatar size="md" src={blog.authorImage} />
                                    <p className="text-sm sm:text-base">{blog.author}</p>
                                </div>
                                <p className="text-xs sm:text-sm">{blog.postDate}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Hero;
