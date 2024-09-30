'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Avatar, Button } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import useBlogs from '@/hooks/useBlogs';

const Hero = () => {
    type Blog = {
        $id: string;
        title: string;
        content: string;
        thumbnail: string;
        category: string;
        author: string;
        authorAvatar: string;
        createdAt: string;
        supports: number;
    };
    const { theme } = useTheme();

    // const blogs: Blog[] = [
    //     {
    //         id: 1,
    //         title: 'Exploring the Beauty of the Mountains',
    //         description: 'This is a short description about exploring the majestic mountains and the unique experiences they offer.',
    //         thumbnail: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //         tag: 'Traveling',
    //         author: 'John Doe',
    //         authorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    //         postDate: 'September 3, 2024',
    //         shortDescription: 'Join me as I trek through the towering mountains, discovering breathtaking landscapes and hidden gems along the way.'
    //     },
    //     {
    //         id: 2,
    //         title: 'A Journey Through Tropical Islands',
    //         description: 'This is a short description about traveling through tropical islands and experiencing their vibrant cultures.',
    //         thumbnail: 'https://images.pexels.com/photos/6942960/pexels-photo-6942960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //         tag: 'Traveling',
    //         author: 'Sarah Green',
    //         authorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    //         postDate: 'August 29, 2024',
    //         shortDescription: 'Discover the wonders of tropical islands with stunning beaches, lush rainforests, and incredible marine life.'
    //     },
    //     {
    //         id: 3,
    //         title: 'Sunrise at Machu Picchu: A Magical Experience',
    //         description: 'This is a short description about witnessing the beauty of Machu Picchu at sunrise.',
    //         thumbnail: 'https://images.pexels.com/photos/18662534/pexels-photo-18662534/free-photo-of-machu-picchu-by-sunrise.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //         tag: 'Traveling',
    //         author: 'Emily Rose',
    //         authorImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    //         postDate: 'September 1, 2024',
    //         shortDescription: 'Experience the awe-inspiring beauty of Machu Picchu at sunrise and learn about its fascinating history.'
    //     },
    // ];

    const { blogs } = useBlogs();
    const topBlogs = blogs.sort((a, b) => b.supports - a.supports).slice(0, 3);

    return (
        <div className='my-11 space-y-5'>
            <div className='flex flex-col justify-center items-center space-y-2 md:space-y-5'>
                <h3 className='font-semibold'>The Blog</h3>
                <h1 className='text-4xl md:text-5xl text-center font-bold'>Writings from Our Team</h1>
                <p className='text-center'>Explore the latest news and insights from the blog</p>
            </div>
            <Button className={`flex justify-center items-center mx-auto ${theme == 'dark' ? 'bg-primary text-textcolor' : 'bg-textcolor text-secondary'} font-bold rounded-md`}>Subscribe</Button>
            <div className="relative max-w-7xl mx-auto w-full h-[600px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-xl">
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
                    {topBlogs.map((blog) => (
                        <SwiperSlide key={blog.$id} className='rounded-xl'>
                            <div
                                className="relative w-full h-full bg-cover bg-center bg-fixed rounded-xl"
                                style={{ backgroundImage: `url(${blog.thumbnail})` }}
                            >
                                {/* Overlay for dark effect */}
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>

                                {/* Blog details */}
                                <div>
                                    <div className="absolute bottom-36 md:bottom-16 left-5 sm:left-10 z-10 w-full sm:w-2/3 md:w-1/2">
                                        <div className="bg-[#E7E7E7] text-black border border-white w-fit px-2 sm:px-3 py-1 text-sm rounded-full">{blog?.category}</div>
                                        <h2 className="text-2xl  text-primary sm:text-3xl md:text-4xl font-extrabold w-full">
                                            {blog?.title}
                                        </h2>
                                       <div dangerouslySetInnerHTML={{__html: blog?.content}} className='line-clamp-3 text-primary'/>
                                    </div>

                                    <div className="absolute bottom-16 left-5 text-white z-10 md:hidden">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Avatar size="sm" src={blog?.authorAvatar} />
                                            <p className="text-sm sm:text-base">{blog?.author}</p>
                                        </div>
                                        <p className="text-xs sm:text-sm">{blog?.createdAt}</p>
                                    </div>
                                </div>
                                {/* Author details */}
                                <div className="absolute bottom-16 right-5 text-white z-10 hidden md:block">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Avatar size="md" src={blog?.authorAvatar} />
                                        <p className="text-sm sm:text-base">{blog?.author}</p>
                                    </div>
                                    <p className="text-xs sm:text-sm">{blog?.createdAt}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div >
    );
};

export default Hero;
