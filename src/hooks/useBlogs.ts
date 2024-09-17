'use client';
import dataBaseServices from "@/app/appwrite/database";
import storageServices from "@/app/appwrite/storage";
import { useEffect, useState } from "react";

// Define the Blog type
type Blog = {
    $id: string;
    title: string;
    content: string;
    thumbnail: string;
    bucketId: string;
    fileId: string;
    author: string;
    authorEmail: string;
    authorAvatar: string;
    createdAt: string;
    category: string;
    readTime: string;
    supports: number;
};

const useBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch blogs function
    const fetchBlogs = async () => {
        try {
            const response = await dataBaseServices.getBlogsData();

            // Check if response and response.documents exist
            if (response && response.documents) {
                // Map the documents to the Blog type explicitly
                const blogData = response.documents.map((doc: any) => ({
                    $id: doc.$id,
                    title: doc.title,
                    content: doc.content,
                    thumbnail: doc.thumbnail,
                    bucketId: doc.bucketId,
                    fileId: doc.fileId,
                    author: doc.author,
                    authorEmail: doc.authorEmail,
                    authorAvatar: doc.authorAvatar,
                    createdAt: doc.createdAt,
                    category: doc.category,
                    readTime: doc.readTime,
                    supports: doc.supports
                })) as Blog[];

                setBlogs(blogData);
            } else {
                setError("No blogs found or response is undefined");
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setError("Failed to fetch blogs");
        } finally {
            setLoading(false);
        }
    };

    const deleteThumbnail = async (bucketId: string, fileId: string) => {
        try {
            console.log(bucketId, fileId, 'sdflsdkfjlkdskjf')
          const response =  await storageServices.deleteFile({bucketId, fileId});
          console.log(response, 'Deleted thumbnail')
        } catch (error) {
            console.log(error, 'Error deleting thumbnail')
            setError('Failed to delete thumbnail')
        }
    }
    const deleteBlog = async (blogId: string) => {
        try {
            await dataBaseServices.deleteBlog(blogId);
            setBlogs(prevBlogs => prevBlogs.filter(blog => blog.$id !== blogId))
        } catch (error) {
            console.log(error, 'Error deleting blog')
            setError('Failed to delete blog')
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    return { blogs, loading, error,deleteThumbnail, deleteBlog };
};

export default useBlogs;
