import dataBaseServices from "@/app/appwrite/database";
import storageServices from "@/app/appwrite/storage";
import { useEffect, useState } from "react";

// Define the Blog type
type Blog = {
    $id: string;
    title: string;
    content: string;
    thumbnail: string;
    author: string;
    authorEmail: string;
    authorAvatar: string;
    createdAt: string;
    category: string;
    readTime: string;
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
                    author: doc.author,
                    authorEmail: doc.authorEmail,
                    authorAvatar: doc.authorAvatar,
                    createdAt: doc.createdAt,
                    category: doc.category,
                    readTime: doc.readTime,
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

    const deleteBlog = async (blogId: string, fileId: string, bucketId: string,) => {
        try {
            if (fileId) {
                await storageServices.deleteFile({ bucketId, fileId });
            }

            await dataBaseServices.deleteBlog(bucketId);

            setBlogs(prevBlogs => prevBlogs.filter(blog => blog.$id !== blogId))
        } catch (error) {
            console.log(error, 'Error deleting blog')
            setError('Failed to delete blog')
        }
    }
    useEffect(() => {
        fetchBlogs();
    }, []);

    return { blogs, loading, error, deleteBlog };
};

export default useBlogs;
