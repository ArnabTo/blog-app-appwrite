'use client';
import dataBaseServices from "@/app/appwrite/database";
import storageServices from "@/app/appwrite/storage";
import { Avatar, Button, Divider } from "@nextui-org/react";
import DOMPurify from "dompurify";
import { HandHeart } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface BlogData {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    title: string;
    content: string;
    thumbnail: string;
    category: string;
    authorAvatar: string;
    author: string;
    authorEmail: string;
    createdAt: string;
    readTime: string;
    supports: number;
}

export default function BlogDetailPage() {

    const [blogDetails, setBlogDetails] = useState<BlogData>();
    const [loading, setLoading] = useState<boolean>(false);
    const params = useParams();

    useEffect(() => {
        console.log(params.blogid);
        try {
            setLoading(true);
            const getBlogData = async () => {
                const currentBlogData = await dataBaseServices.queryBlogs(`${params.blogid}`);
                if (currentBlogData && currentBlogData.documents.length > 0) {
                    const blogData = currentBlogData.documents[0] as unknown as BlogData;
                    setBlogDetails(blogData);
                }
            }
            getBlogData();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    }, [params.blogid])

    console.log(blogDetails)


    if (loading) return <p>Loading...</p>
    return (
        <div className="max-w-3xl mx-auto my-10">
            <div className="space-y-5">
                <h1 className="text-start text-5xl font-extrabold">{blogDetails?.title}</h1>
                <Divider></Divider>
                <div className="flex items-center gap-3">
                    <Avatar src={blogDetails?.authorAvatar ?? ''} size="md" />
                    <div>
                        <span className="flex items-center gap-3">
                            <p>{blogDetails?.author}</p>
                            <p className="text-blue-700">Follow</p>
                        </span>
                        <span className="flex items-center gap-3">
                            <p>{blogDetails?.readTime}</p>
                            <p className="text-gray-600">{blogDetails?.createdAt}</p>
                        </span>
                    </div>
                </div>
                <div>
                    {
                        blogDetails?.supports > 0 ? <p><HandHeart className=" cursor-pointer" />{blogDetails?.supports}</p> : <p><HandHeart fill="red" className=" cursor-pointer" /> {blogDetails?.supports}</p>
                    }
                </div>
                <Divider></Divider>
                <Image src={blogDetails?.thumbnail ?? ''} className="w-full h-full rounded-md mb-10" width={500} height={500} alt={blogDetails?.title} />
                <div className=" leading-10" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogDetails?.content ?? '') }} />
            </div>
        </div>
    )
}
