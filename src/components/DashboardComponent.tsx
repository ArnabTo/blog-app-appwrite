'use client';
import useUser from "@/hooks/useUser";
import { Avatar, Divider, Skeleton, Spinner } from "@nextui-org/react";
import Image from "next/image";
import blogs from '../blogs.json';
import Link from "next/link";
import { useTheme } from "next-themes";

const DashboardComponent = () => {
    const { user, profileAvatar, loader } = useUser();
    const { theme } = useTheme();

    // Filter blogs by user email
    const userBlogs = blogs.filter((blog) => blog.authorEmail === user?.email);

    return (
        <div className="max-w-6xl mx-auto my-20">
            <div className="flex">
                <div className="w-11/12 mx-5 space-y-10">
                    <h1 className="text-4xl text-start font-extrabold">Your Blogs</h1>
                    <div>
                        <div className="grid grid-cols-1 space-y-5">
                            {loader ? (
                                <>
                                    <Skeleton className="w-full h-24" />
                                    <Skeleton className="w-full h-24" />
                                    <Skeleton className="w-full h-24" />
                                </>
                            ) : (
                                userBlogs && userBlogs.length > 0 ? (
                                    userBlogs.map((blog) => (
                                        <Link key={blog.id} href={`/blogs/${blog.id}`} className={`rounded-lg ${theme == 'dark' ? 'bg-textcolor' : 'bg-accent'}`}>
                                            <div className="flex justify-between items-center">
                                                <div className="pl-5 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar src={profileAvatar ?? ''} size="sm" />
                                                        <span>{blog?.author}</span>
                                                    </div>
                                                    <div className="my-4">
                                                        <div className="flex flex-col gap-1 mb-1">
                                                            <p className="text-xl font-extrabold">{blog?.title}</p>
                                                            <p className="line-clamp-2">{blog?.description}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">{blog?.postDate}</p>
                                                    </div>
                                                </div>
                                                {/* Ensure the parent div and image take full height */}
                                                <div className="w-48 h-48 relative">
                                                    <Image className="object-cover" fill src={blog?.thumbnail} alt="thumbnail" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div>
                                        {userBlogs ? (
                                            <div className="flex justify-center items-center">
                                                <Spinner color="success" />
                                            </div>
                                        ) : (
                                            <p className="text-xl font-bold">No blogs found</p>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <Divider orientation="vertical" />
                </div>

                <div className="w-1/2 px-5 h-screen flex flex-col justify-start">
                    {loader ? (
                        <Skeleton className="rounded-full w-20 h-20" />
                    ) : (
                        <Image className="rounded-full w-20 h-20" src={profileAvatar ?? ''} width={100} height={100} alt="avatar" />
                    )}
                    <p className="font-medium">{loader ? <Skeleton className="w-32 h-6" /> : user?.name}</p>
                    <p>{user?.followers} 5 Followers</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;
