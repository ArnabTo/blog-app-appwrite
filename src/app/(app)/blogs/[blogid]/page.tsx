'use client';
import dataBaseServices from "@/app/appwrite/database";
import { updateSupport } from "@/store/features/blogSuppoertSlice";
import { AppDispatch, RootState } from "@/store/Store";
import { Avatar, Button, Divider } from "@nextui-org/react";
import DOMPurify from "dompurify";
import { Heart } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    const { theme } = useTheme();
    const [blogDetails, setBlogDetails] = useState<BlogData>();
    const [loading, setLoading] = useState<boolean>(false);
    const params = useParams();
    const [localSupports, setLocalSupports] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>();
    const { loading: supportLoading, error } = useSelector((state: RootState) => state.blogSupport);
    useEffect(() => {
        console.log(params.blogid);
        try {
            setLoading(true);
            const getBlogData = async () => {
                const currentBlogData = await dataBaseServices.queryBlogs(`${params.blogid}`);
                if (currentBlogData && currentBlogData.documents.length > 0) {
                    const blogData = currentBlogData.documents[0] as unknown as BlogData;
                    setBlogDetails(blogData);
                    setLocalSupports(blogData.supports);
                }
            }
            getBlogData();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    }, [params.blogid])


    const handleSupport = async () => {
        if (blogDetails) {
          try {
            // Update local state immediately
            setLocalSupports(prev => prev + 1);
            
            // Dispatch the action to update the server
            await dispatch(updateSupport({ id: blogDetails.$id, updatedSupports: localSupports + 1 })).unwrap();
            
            toast.success('Support added successfully!');
          } catch (error) {
            // If the server update fails, revert the local state
            setLocalSupports(prev => prev - 1);
            console.error('Error updating support:', error);
            toast.error('Failed to add support');
          }
        }
      };

    if (loading) return <p>Loading...</p>
    return (
        <div className="max-w-3xl mx-auto my-10">
            <div className="space-y-5">
                <h1 className="text-start text-5xl font-extrabold">{blogDetails?.title}</h1>

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
                <Divider></Divider>
                {
                    blogDetails ?
                        <div>
                            {
                                blogDetails?.supports == 0 ? <p className="flex items-center gap-2"><Heart   onClick={handleSupport} className=" cursor-pointer" />{blogDetails?.supports}</p> : <p className="flex items-center gap-2"><Heart   onClick={handleSupport} size={20} fill={theme === 'dark' ? 'white' : 'black'} className=" cursor-pointer" />  {localSupports}</p>
                            }
                        </div>
                        :
                        <div>
                            <p className="flex"><Heart className=" cursor-pointer" /> 0f</p>
                        </div>
                }
                <Divider></Divider>
                <Image src={blogDetails?.thumbnail ?? ''} className="w-full h-full rounded-md mb-10" width={500} height={500} alt='blog thumbnail' />
                <div className=" leading-10" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogDetails?.content ?? '') }} />
            </div>
        </div>
    )
}
