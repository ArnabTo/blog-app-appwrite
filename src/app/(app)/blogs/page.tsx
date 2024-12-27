'use client';
import useBlogs from "@/hooks/useBlogs"
import { Avatar, BreadcrumbItem, Breadcrumbs, Card, CardBody, CardFooter, Skeleton, skeleton } from "@nextui-org/react";
import DOMPurify from "dompurify";
import { Loader } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function AllBlogs() {

    const { theme } = useTheme();
    const { blogs, loading, error } = useBlogs();

    console.log(theme)

    if (loading) {
        return (
            <div className='max-w-7xl mx-auto pt-20'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10 space-y-3'>
                    {Array(10).fill(0).map((_, index) => (
                        <Card key={index} className={`w-[300px] space-y-3 p-4  ${theme == 'dark' ? 'glass-dark' : 'glass-light'}`} radius="lg">
                            <Skeleton className="rounded-lg">
                                <div className="h-44 rounded-lg bg-default-300" />
                            </Skeleton>
                            <Skeleton className="w-1/4 rounded-lg">
                                <div className="w-1/4 h-4 rounded-lg bg-default-300" />
                            </Skeleton>
                            <div className="w-full flex items-center gap-2">
                                <div>
                                    <Skeleton className="flex rounded-full w-8 h-8" />
                                </div>
                                <div className="w-full">
                                    <Skeleton className="rounded-lg w-1/2 h-4" />
                                </div>
                            </div>
                            <Skeleton className="w-3/4 rounded-lg">
                                <div className="w-1/4 h-4 rounded-lg bg-default-300" />
                            </Skeleton>
                            <Skeleton className="w-full rounded-lg">
                                <div className="w-full h-4 rounded-lg bg-default-300" />
                            </Skeleton>
                            <Skeleton className="w-full rounded-lg">
                                <div className="w-full h-4 rounded-lg bg-default-300" />
                            </Skeleton>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='max-w-7xl mx-auto mb-28 my-10 space-y-10'>
            <div className="space-y-2">
                <Breadcrumbs>
                    <BreadcrumbItem className="text-lg" href="/">Home</BreadcrumbItem>
                    <BreadcrumbItem className="text-lg">Blogs</BreadcrumbItem>
                </Breadcrumbs>
                <h1 className={`text-3xl text-start font-extrabold mb-10 ${theme == 'dark' ? 'text-primary' : 'text-neutral'} `}>
                    All Blogs
                </h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10 space-y-3'>
                {blogs.map((blog: any) => {
                    return (
                        <Link href={`/blogs/${blog.$id}`} key={blog.id}>
                            <Card className={`py-4 shadow-lg rounded-xl h-full group relative overflow-hidden  ${theme == 'dark' ? 'glass-dark' : 'glass-light'}`}>
                                <div className="overflow-hidden py-2 z-10 rounded-xl">
                                    <div className="overflow-hidden rounded-xl">
                                        <Image
                                            alt="Card background"
                                            className="object-cover rounded-xl w-full min-h-[250px] group-hover:scale-110 brightness-50 group-hover:filter-none transition-all duration-300"
                                            src={blog.thumbnail}
                                            width={270}
                                            height={270}
                                        />
                                    </div>
                                </div>
                                <CardBody className="pb-0 pt-2 px-4 flex-col items-start relative z-10 space-y-2">
                                    <small
                                        className={`text-default-500 px-2 py-1 rounded-full mb-2 ${theme == 'dark' ? 'text-textcolor bg-primary' : 'text-primary bg-textcolor'}`}>
                                        {blog.category}
                                    </small>
                                    <div className='flex items-center gap-2'>
                                        <Avatar size='sm' src={blog?.authorAvatar} />
                                        <p className="text-tiny uppercase font-bold">{blog.author}</p>
                                    </div>
                                    <h4
                                        className={`font-bold text-2xl ${theme == 'dark' ? 'text-primary' : 'text-textcolor'
                                            }`}
                                    >
                                        {blog?.title}
                                    </h4>
                                    <div className='line-clamp-3 text-lg text-gray-500' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog?.content) }} />
                                </CardBody>
                                <div
                                    className={`absolute inset-0 rounded-xl ${theme == 'dark' ? 'glass-dark-bg' : 'glass-light-bg'
                                        }`}
                                />
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}
