import { useEffect, useState } from 'react';
import { Avatar, Card, CardBody, CardFooter, Pagination } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import dataBaseServices from '@/app/appwrite/database';
import useBlogs from '@/hooks/useBlogs';
import DOMPurify from 'dompurify'
import { Loader } from 'lucide-react';

export default function Blogs() {
    const { theme } = useTheme();

    const [currentPage, setCurrentPage] = useState(1);
    const { blogs, loading, error } = useBlogs();

    const blogsPerPage = 8;
    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    const currentPageBlogs = blogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }


    return (
        <section className='max-w-7xl mx-auto mb-28'>
            <h1 className={`text-3xl font-extrabold mb-10 ${theme == 'dark' ? 'text-primary' : 'text-neutral'} `}>
                Blogs
            </h1>
            {
                loading ? <div className='flex justify-center my-5'><Loader size={40} className='animate-spin' /></div>
                    :
                    <div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10 space-y-3 lg:space-y-0'>
                            {currentPageBlogs.map((blog: any) => {
                                return (
                                    <Link href={`/blogs/${blog.$id}`} key={blog.id}>
                                        <Card className='shadow-lg h-full group relative bg-card-light-bg dark:bg-card-dark-bg'>
                                            <div className="overflow-hidden p-2 z-10 rounded-xl">
                                                    <Image
                                                        alt="Card background"
                                                        className="object-cover rounded-xl w-full min-h-[250px] group-hover:scale-110 brightness-50 group-hover:filter-none transition-all duration-300"
                                                        src={blog.thumbnail}
                                                        width={270}
                                                        height={270}
                                                    />
                                            </div>
                                            <CardBody className="pt-2 px-4 pb-5 flex-col items-start relative z-10 space-y-2">
                                                <small
                                                    className='bg-badge-bg text-badge-text px-2 py-1 rounded-full mb-2'>
                                                    {blog.category}
                                                </small>
                                                <div className='flex items-center gap-2'>
                                                    <Avatar size='sm' src={blog?.authorAvatar} />
                                                    <p className="text-tiny uppercase font-bold">{blog.author}</p>
                                                </div>
                                                <h4
                                                    className='font-bold text-lg text-inherit'
                                                >
                                                    {blog?.title}
                                                </h4>
                                                <div className='line-clamp-3 dark:text-gray-400' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog?.content) }} />
                                            </CardBody>

                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                        {/* Pagination */}
                        {
                            blogs.length > 5 &&
                            <div className='flex justify-center'>
                                <Pagination color="primary" total={totalPages} page={currentPage} initialPage={1} onChange={handlePageChange} />
                            </div>
                        }

                    </div>
            }
        </section>
    );
}







{/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10 space-y-3'>
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
            </div> */}