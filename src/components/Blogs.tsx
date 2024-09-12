import { useEffect, useState } from 'react';
import { Avatar, Card, CardBody, CardFooter, Pagination } from '@nextui-org/react';
import blogs from '../blogs.json';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import dataBaseServices from '@/app/appwrite/database';
import useBlogs from '@/hooks/useBlogs';

export default function Blogs() {
    const { theme } = useTheme();

    const [currentPage, setCurrentPage] = useState(1);
 const [blog, setBlog] = useState([]);
    const blogsPerPage = 8;
    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    const currentPageBlogs = blogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const { allBlogs, loading, error } = useBlogs();
    console.log(allBlogs)
    return (
        <section className='max-w-7xl mx-auto mb-28'>
            <h1 className={`text-3xl font-extrabold mb-10 ${theme == 'dark' ? 'text-primary' : 'text-neutral'} `}>
                Blogs
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10 space-y-3'>
                {currentPageBlogs.map((blog) => {
                    return (
                        <Link href={`/blogs/${blog.id}`} key={blog.id}>
                            <Card className={`py-4 shadow-lg h-full group relative overflow-hidden  ${theme == 'dark' ? 'glass-dark' : 'glass-light'}`}>
                                <CardBody className="overflow-visible py-2 z-10">
                                    <Image
                                        alt="Card background"
                                        className="object-cover rounded-xl w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300"
                                        src={blog.thumbnail}
                                        width={270}
                                        height={270}
                                    />
                                </CardBody>
                                <CardFooter className="pb-0 pt-2 px-4 flex-col items-start relative z-10 space-y-2">
                                    <small
                                        className={`text-default-500 px-2 py-1 rounded-full mb-2 ${theme == 'dark' ? 'text-textcolor' : 'text-textcolor'
                                            } ${theme == 'dark' ? 'bg-[#F1F0F1]' : 'bg-primary'}`}
                                    >
                                        {blog.tag}
                                    </small>
                                    <div className='flex items-center gap-2'>
                                        <Avatar size='sm' src={blog?.authorImage} />
                                        <p className="text-tiny uppercase font-bold">{blog.author}</p>
                                    </div>
                                    <h4
                                        className={`font-bold text-large ${theme == 'dark' ? 'text-primary' : 'text-textcolor'
                                            }`}
                                    >
                                        {blog.title}
                                    </h4>
                                    <p>{blog.shortDescription}</p>
                                </CardFooter>
                                <div
                                    className={`absolute inset-0 rounded-xl ${theme == 'dark' ? 'glass-dark-bg' : 'glass-light-bg'
                                        }`}
                                />
                            </Card>
                        </Link>
                    );
                })}

                {/* {
                    loading ? <div><p>...loading</p></div> 
                    :
                    <div>
                        {
                             allBlogs && (
                                allBlogs.map((blog, index) => (
                                    <Link href={`/blogs/${index}`} key={index}>
                                    <Card className={`py-4 shadow-lg h-full group relative overflow-hidden  ${theme == 'dark' ? 'glass-dark' : 'glass-light'}`}>
                                        <CardBody className="overflow-visible py-2 z-10">
                                            <Image
                                                alt="Card background"
                                                className="object-cover rounded-xl w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300"
                                                src={blog.thumbnail}
                                                width={270}
                                                height={270}
                                            />
                                        </CardBody>
                                        <CardFooter className="pb-0 pt-2 px-4 flex-col items-start relative z-10 space-y-2">
                                            <small
                                                className={`text-default-500 px-2 py-1 rounded-full mb-2 ${theme == 'dark' ? 'text-textcolor' : 'text-textcolor'
                                                    } ${theme == 'dark' ? 'bg-[#F1F0F1]' : 'bg-primary'}`}
                                            >
                                                {blog.category}
                                            </small>
                                            <div className='flex items-center gap-2'>
                                                <Avatar size='sm' src={blog?.authorAvatar} />
                                                <p className="text-tiny uppercase font-bold">{blog.author}</p>
                                            </div>
                                            <h4
                                                className={`font-bold text-large ${theme == 'dark' ? 'text-primary' : 'text-textcolor'
                                                    }`}
                                            >
                                                {blog.title}
                                            </h4>
                                            <p>{blog.content}</p>
                                        </CardFooter>
                                        <div
                                            className={`absolute inset-0 rounded-xl ${theme == 'dark' ? 'glass-dark-bg' : 'glass-light-bg'
                                                }`}
                                        />
                                    </Card>
                                </Link>
                                ))
                             )
                        }
                    </div>
                } */}
            </div>

            {/* Pagination */}
            <div className='flex justify-center'>
                <Pagination className='text-textcolor' total={totalPages} page={currentPage} initialPage={1} onChange={handlePageChange} />
            </div>
        </section>
    );
}
