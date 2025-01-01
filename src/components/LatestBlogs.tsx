'use client';
import dataBaseServices from "@/app/appwrite/database";
import Link from "next/link";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

type BlogData = {
    $id: string;
    title: string;
    content: string;
    authorEmail: string;
    thumbnail: string;
    bucketId: string;
    fileId: string;
    createdAt: string;
    category: string;
    authorAvatar: string;
    author: string;
    readTime: string;
    likes: string;
    comments: string;
}
const LatestBlogs = () => {
    const { theme } = useTheme();
    const [blogs, setBlogs] = useState<BlogData[]>([]);
    const [latestBlogs, setLatestBlogs] = useState<BlogData[]>([]);

    useEffect(() => {
        const getLatestBlogs = async () => {
            const latestBlogs = await dataBaseServices.fetchLatestBlogs();
            setBlogs(latestBlogs.documents as unknown as BlogData[]);
        }
        getLatestBlogs();
        setLatestBlogs(blogs.slice(0, 4));
    }, [blogs])

    return (
        <div className="px-5 lg:px-0 my-24">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-textColor my-5">Latest Blogs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                    <Link href={`/blogs/${latestBlogs[0]?.$id}`}
                        className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-20 flex-grow group"
                    >
                        <div>
                            <Image src={latestBlogs[0]?.thumbnail} alt="" width={270} height={270} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                            <div className='absolute inset-0 backdrop-blur-md group-hover:backdrop-blur-0 transition-all duration-500 group-hover:bg-black group-hover:bg-opacity-50'></div>

                            <div className='relative translate-y-[35rem] group-hover:translate-y-0 md:group-hover:translate-y-56 lg:group-hover:translate-y-32 xl:group-hover:translate-y-36 z-10 transition-all duration-500'>
                                <h2 className="text-xl md:text-3xl font-semibold text-text-dark">{latestBlogs[0]?.title}</h2>
                                <div className="line-clamp-2 text-gray-300" dangerouslySetInnerHTML={{ __html: latestBlogs[0]?.content }} />
                                <Link href={`/blogs/${latestBlogs[0]?.$id}`}>
                                    <button className="mt-4 px-4 py-2 bg-button-light-bg text-button-light-text hover:bg-button-light-hover font-semibold rounded-md transition-all duration-300">
                                        Read more →
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </Link>

                    <div className="grid grid-cols-1 gap-4">
                        <Link href={`/blogs/${latestBlogs[1]?.$id}`}>
                            <div className="flex flex-col md:flex-row items-center gap-3 group">
                                <Image className="w-full md:w-revert-layer rounded-md group-hover:scale-110 brightness-50 group-hover:filter-none transition-all delay-100" src={latestBlogs[1]?.thumbnail} alt='blog' width={200} height={200} />
                                <div>
                                    <small
                                        className='bg-badge-bg text-badge-text px-2 py-1 rounded-full mb-2'>
                                        {latestBlogs[1]?.category}
                                    </small>
                                    <h2 className="text-2xl font-bold">{latestBlogs[1]?.title}</h2>
                                    <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: latestBlogs[1]?.content }} />
                                </div>
                            </div>
                        </Link>
                        <Link href={`/blogs/${latestBlogs[2]?.$id}`}>
                            <div className="flex flex-col md:flex-row items-center gap-3 group">
                                <Image className="w-full md:w-revert-layer rounded-md group-hover:scale-110 brightness-50 group-hover:filter-none transition-all delay-100" src={latestBlogs[2]?.thumbnail} alt='blog' width={200} height={200} />
                                <div>
                                <small
                                        className='bg-badge-bg text-badge-text px-2 py-1 rounded-full mb-2'>
                                        {latestBlogs[2]?.category}
                                    </small>
                                    <h2 className="text-2xl font-bold">{latestBlogs[2]?.title}</h2>
                                    <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: latestBlogs[2]?.content }} />
                                </div>
                            </div>
                        </Link>
                        <Link href={`/blogs/${latestBlogs[3]?.$id}`}>
                            <div className="flex flex-col md:flex-row items-center gap-3 group">
                                <Image className="w-full md:w-revert-layer rounded-md group-hover:scale-110 brightness-50 group-hover:filter-none transition-all delay-100 " src={latestBlogs[3]?.thumbnail} alt='blog' width={200} height={200} />
                                <div>
                                <small
                                        className='bg-badge-bg text-badge-text px-2 py-1 rounded-full mb-2'>
                                        {latestBlogs[3]?.category}
                                    </small>
                                    <h2 className="text-2xl font-bold">{latestBlogs[3]?.title}</h2>
                                    <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: latestBlogs[3]?.content }} />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LatestBlogs;