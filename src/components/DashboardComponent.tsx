'use client';
import useUser from "@/hooks/useUser";
import { Avatar, Button, Card, CardBody, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Skeleton, Spinner, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { CirclePlus, Ellipsis, Heart, MessageSquareMore, Option, Plus } from "lucide-react";
import useBlogs from "@/hooks/useBlogs";
import DOMPurify from "dompurify";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import dataBaseServices from "@/app/appwrite/database";
import { Models } from "appwrite";

const DashboardComponent = () => {
    const { user, profileAvatar, loader } = useUser();
    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);
    const [usersBlogs, setUserBlogs] = useState<any[]>([]);
    const { blogs, deleteBlog, deleteThumbnail } = useBlogs();
    // Filter blogs by user email
    const userBlogs = blogs.filter((blog) => blog.authorEmail === user?.email);

    const handleBlogDelete = async (targetBlogId: string, bucketId: string, fileId: string) => {

        await deleteThumbnail(bucketId, fileId);
        await deleteBlog(targetBlogId);
        toast.success('Blog deleted successfully');
    }

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                setLoading(true);
                const userEmail = user?.email;
                if (userEmail) {
                    const userBlogs = (await dataBaseServices.getUserBlogs(userEmail)).documents;

                    const blogsWithCommentsCount = await Promise.all(userBlogs.map(async (blog: Models.Document) => {
                        const commentsCount = await dataBaseServices.queryComments(blog.$id);
                        return { ...blog, commentsCount: commentsCount?.total || 0 };
                    }));

                    setUserBlogs(blogsWithCommentsCount);
                }
            } catch (error) {
                toast.error('Failed to fetch user blogs');
            } finally {
                setLoading(false);
            }
        };

        fetchUserBlogs();
    }, [user?.email]);

    return (
        <div className="max-w-6xl mx-auto my-20">
            <div className="flex flex-col-reverse lg:flex-row space-y-10">
                <div className="w-11/12 mx-5 space-y-10">
                    <h1 className="text-4xl text-center lg:text-start font-extrabold">Your Blogs</h1>
                    <div className="space-y-10">
                        <div className="grid grid-cols-1 space-y-5">
                            {loader ? (
                                <>
                                    <Skeleton className="w-full h-24" />
                                    <Skeleton className="w-full h-24" />
                                    <Skeleton className="w-full h-24" />
                                </>
                            ) : (
                                usersBlogs && usersBlogs.length > 0 ? (
                                    usersBlogs.map((blog) => (
                                        <div key={blog.$id}>
                                            <Card className="flex">
                                                <CardBody>
                                                    <Link href={`/blogs/${blog.$id}`}>
                                                        <div className="flex items-center">
                                                            <div className="p-3 space-y-5">
                                                                <p className="text-gray-500">{blog?.createdAt}</p>
                                                                <h1 className="text-2xl font-extrabold">{blog.title}</h1>
                                                                <div className="line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.content }} />
                                                                <div>
                                                                    <small
                                                                        className={`text-default-500 px-3 py-2 rounded-full ${theme == 'dark' ? 'text-textcolor' : 'text-primary'
                                                                            } ${theme == 'dark' ? 'bg-[#F1F0F1]' : 'bg-textcolor'}`}
                                                                    >
                                                                        {blog.category}
                                                                    </small>
                                                                </div>
                                                            </div>
                                                            <Image
                                                                className="rounded-md min-h-40"
                                                                src={blog.thumbnail}
                                                                alt="thumbnail"
                                                                width={200}
                                                                height={300}
                                                            />
                                                        </div>
                                                    </Link>
                                                    <div className="flex justify-between p-3">
                                                        <div className="flex items-center gap-5">
                                                            <span className="flex items-center gap-1">
                                                                <Heart></Heart>
                                                                {blog.supports}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <MessageSquareMore />
                                                                {blog?.commentsCount}
                                                            </span>
                                                        </div>

                                                        <div className="flex justify-between items-center pr-">
                                                            <div className="cursor-pointer mt-5 lg:pr-5">
                                                                <Dropdown>
                                                                    <DropdownTrigger>
                                                                        <Ellipsis />
                                                                    </DropdownTrigger>
                                                                    <DropdownMenu aria-label="Static Actions">
                                                                        <DropdownItem href={`/dashboard/update-blog/${blog?.$id}`} key="new"><Link href={`/dashboard/update-blog/${blog?.$id}`}>Edit</Link></DropdownItem>
                                                                        <DropdownItem key="copy">Change visibility</DropdownItem>
                                                                        <DropdownItem key="edit">Share</DropdownItem>
                                                                        <DropdownItem onClick={() => handleBlogDelete(blog.$id, blog?.bucketId, blog?.fileId)} key="delete" className="text-danger" color="danger">
                                                                            Delete
                                                                        </DropdownItem>
                                                                    </DropdownMenu>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>

                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        {userBlogs.length === 0 ? (
                                            <p className="text-xl font-bold text-center">No blogs found</p>
                                        ) : (
                                            <div className="flex justify-center items-center">
                                                <Spinner color="success" />
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Tooltip content="Create Blog">
                            <Link href="/dashboard/create-blog">
                                <CirclePlus size={35} />
                            </Link>
                        </Tooltip>
                    </div>
                </div>

                <div>
                    <Divider orientation="vertical" />
                </div>

                <div className="w-full lg:w-1/2 px-5 lg:h-screen flex flex-col items-center lg:justify-start">
                    {loader ? (
                        <Skeleton className="rounded-full w-20 h-20" />
                    ) : (
                        <Image className="rounded-full w-20 h-20" src={profileAvatar ?? ''} width={100} height={100} alt="avatar" />
                    )}
                    <p className="font-medium">{loader ? <Skeleton className="w-32 h-6" /> : user?.name}</p>
                    {/* <p>{user?.followers} 5 Followers</p> */}
                    <p> 5 Followers</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;
