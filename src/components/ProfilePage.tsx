import dataBaseServices from "@/app/appwrite/database";
import useUser from "@/hooks/useUser";
import { Button, Card, CardBody, CardFooter, Divider, Skeleton, Tab, Tabs } from "@nextui-org/react";
import { Models } from "appwrite";
import { BookDashed, Edit, Heart, MessageCircleMore, MessageSquareMore } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";


export default function ProfilePage({ userEmail }: { userEmail: string }) {

    const { theme } = useTheme();
    const { user, profileAvatar, loader } = useUser();
    const [publishedBlogs, setPublishedBlogs] = useState<Models.Document[]>([]);
    const [UnpublishedBlogs, setUnPublishedBlogs] = useState<Models.Document[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // useEffect(() => {
    //     try {
    //         setLoading(true);
    //         const fetchUserBlogs = async () => {

    //             if (userEmail) {
    //                 const userBlogs = (await dataBaseServices.getUserBlogs(userEmail)).documents;

    //                 const blogsWithCommentsCount = await Promise.all(userBlogs.map(async (blog: Models.Document) => {
    //                     const commentsCount = await dataBaseServices.queryComments(blog.$id);
    //                     return { ...blog, commentsCount };
    //                 }));
    //                 setUnPublishedBlogs(userBlogs.filter((blog: Models.Document) => blog.status === "Unpublished"));
    //                 setPublishedBlogs(userBlogs.filter((blog: Models.Document) => blog.status === "Published"));
    //             }
    //         }


    //         fetchUserBlogs();
    //     } catch (error) {
    //         toast.error('Failed to fetch user blogs');
    //     } finally {
    //         setLoading(false);
    //     }
    // }, [user])



    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                setLoading(true);
                if (userEmail) {
                    const userBlogs = (await dataBaseServices.getUserBlogs(userEmail)).documents;

                    // Fetch comments count for each blog
                    const blogsWithCommentsCount = await Promise.all(userBlogs.map(async (blog: Models.Document) => {
                        const commentsCount = await dataBaseServices.queryComments(blog.$id);
                        return { ...blog, commentsCount: commentsCount?.total || 0 };
                    }));

                    setUnPublishedBlogs(blogsWithCommentsCount.filter((blog: Models.Document) => blog.status === "Unpublished"));
                    setPublishedBlogs(blogsWithCommentsCount.filter((blog: Models.Document) => blog.status === "Published"));
                }
            } catch (error) {
                toast.error('Failed to fetch user blogs');
            } finally {
                setLoading(false);
            }
        };

        fetchUserBlogs();
    }, [userEmail]);

    console.log(publishedBlogs, UnpublishedBlogs,)

    return (
        <div>
            <div className="max-w-6xl mx-auto my-20">
                <div className="flex flex-col-reverse lg:flex-row space-y-10">
                    <div className="w-11/12 mx-5 space-y-10">
                        <h1 className="text-4xl text-center lg:text-start font-extrabold">Your Blogs</h1>
                        <div className="space-y-10">
                            <div className="flex w-full flex-col">
                                <Tabs aria-label="Options">
                                    <Tab key="published" title="Published">
                                        {
                                            loader ? (
                                                <Skeleton className="w-full h-24" />
                                            ) : (
                                                <div>
                                                    {
                                                        publishedBlogs && publishedBlogs.length > 0 ?
                                                            <div className="grid grid-cols-1 gap-3">
                                                                {
                                                                    publishedBlogs.map((blog: Models.Document) => (
                                                                        <Link key={blog.$id} href={`/blogs/${blog.$id}`}>
                                                                            <Card className="flex">
                                                                                <CardBody>
                                                                                    <div className="flex items-center">
                                                                                        <div className="p-3 space-y-5">
                                                                                            <h1 className="text-2xl font-extrabold">{blog.title}</h1>
                                                                                            <div className="line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.content }} />
                                                                                            {/* <div className="flex justify-between">
                                                                                                <div className="flex items-center w-2/3">
                                                                                                    <span className="flex items-center gap-1">
                                                                                                        <Heart></Heart>
                                                                                                        {blog.supports}
                                                                                                    </span>
                                                                                                    <span className="flex items-center gap-1">
                                                                                                        <MessageSquareMore />
                                                                                                        {blog.commentsCount}
                                                                                                    </span>
                                                                                                </div>
                                                                                                <Button className={`${ theme === 'dark' ? 'bg-primary' : 'bg-textcolor'} ${ theme === 'dark' ? 'text-textcolor' : 'text-secondary'}`}>Make Unpublish <BookDashed /></Button>
                                                                                                <div></div>
                                                                                            </div> */}
                                                                                        </div>
                                                                                        <Image
                                                                                            className="rounded-md"
                                                                                            src={blog.thumbnail}
                                                                                            alt="thumbnail"
                                                                                            width={200}
                                                                                            height={300}
                                                                                        />
                                                                                    </div>

                                                                                    <div className="flex justify-between p-3">
                                                                                        <div className="flex items-center gap-5">
                                                                                            <span className="flex items-center gap-1">
                                                                                                <Heart></Heart>
                                                                                                {blog.supports}
                                                                                            </span>
                                                                                            <span className="flex items-center gap-1">
                                                                                                <MessageSquareMore />
                                                                                                {blog.commentsCount}
                                                                                            </span>
                                                                                        </div>
                                                                                        <Button className={`${theme === 'dark' ? 'bg-primary' : 'bg-textcolor'} ${theme === 'dark' ? 'text-textcolor' : 'text-secondary'}`}>Make Unpublish <BookDashed /></Button>
                                                                                    </div>
                                                                                </CardBody>
                                                                            </Card>
                                                                        </Link>
                                                                    ))
                                                                }
                                                            </div>
                                                            :
                                                            <div><p>No published blogs</p></div>
                                                    }
                                                </div>
                                            )
                                        }
                                    </Tab>
                                    <Tab key="unpublished" title="Unpublished">
                                        {
                                            loader ? (
                                                <Skeleton className="w-full h-24" />
                                            ) : (
                                                <div>
                                                    {
                                                        UnpublishedBlogs && UnpublishedBlogs.length > 0 ?
                                                            <div className="grid grid-cols-1 gap-3">
                                                                {
                                                                    UnpublishedBlogs.map((blog: Models.Document) => (
                                                                        <Card key={blog.$id} className="flex">
                                                                            <CardBody>
                                                                                <div className="flex items-center">
                                                                                    <div className="p-3">
                                                                                        <h1 className="text-2xl font-extrabold">{blog.title}</h1>
                                                                                        <div className="line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.content }} />
                                                                                        <div>
                                                                                            <span>
                                                                                                <Heart></Heart>
                                                                                                {blog.supports}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <Image
                                                                                        className="rounded-md h-full"
                                                                                        src={blog.thumbnail}
                                                                                        alt="thumbnail"
                                                                                        width={200}
                                                                                        height={300}
                                                                                    />
                                                                                </div>
                                                                            </CardBody>
                                                                        </Card>
                                                                    ))
                                                                }
                                                            </div>
                                                            :
                                                            <div><p>No published blogs</p></div>
                                                    }
                                                </div>
                                            )
                                        }
                                    </Tab>
                                    <Tab key="sheduled" title="Sheduled">
                                        <Card>
                                            <CardBody>
                                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                            </CardBody>
                                        </Card>
                                    </Tab>
                                </Tabs>
                            </div>
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

        </div>
    )
}
