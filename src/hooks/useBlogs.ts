import dataBaseServices from "@/app/appwrite/database";
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
    const [allBlogs, setBlogs] = useState<Blog[]>([]);
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

    useEffect(() => {
        fetchBlogs();
    }, []);

    return { allBlogs, loading, error };
};

export default useBlogs;
