'use client';
import dataBaseServices from "@/app/appwrite/database";
import storageServices from "@/app/appwrite/storage";
import QuillEditor from "@/components/TextEditor/Editor";
import useUser from "@/hooks/useUser";
import { Input } from "@nextui-org/input";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

// Define types for the blog data
type InputData = {
    title: string;
    thumbnail: FileList;
    thumbnailBucketId: string;
    thumbnailId: string;
    category: string;
    authorAvatar: string;
    author: string;
    authorEmail: string;
    createdAt: string;
    content: string;
    readTime: string;
};

// Define types for the state variables
type CategoryType = "Technology" | "Health" | "Personal" | "Business" | "Custom" | string;

const CreateBlogPage = () => {
    const { user, profileAvatar } = useUser();

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        clipboard: {
            matchVisual: false,
        },
    };

    const formats = [
        'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'link', 'image', 'video'
    ];

    const router = useRouter();
    const [content, setContent] = useState<string>('');  // Type as string
    const [preview, setPreview] = useState<string>('');  // Type as string for the image preview URL
    const [thumbnailUrl, setThumbnailUrl] = useState<string>('');        // Type as string for the thumbnail URL
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>('');  // Type with defined categories
    const [customCategory, setCustomCategory] = useState<string>('');
    const [finalCategory, setFinalCategory] = useState<string>('');

    const { register, handleSubmit, formState: { errors }, watch } = useForm<InputData>(); // Typed form data

    const categories: CategoryType[] = [
        "Technology",
        "Health",
        "Personal",
        "Business",
        "Custom"
    ];
    
    const handleForm: SubmitHandler<InputData> = async (data) => {
        const { title, thumbnail, category } = data;

        // Calculate reading time based on word count
        const wordCount = content.trim().split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200); // average 200 words per minute

        try {
            if (thumbnail && thumbnail.length > 0) {
                const file = thumbnail[0];
                const uploadThumbnail = await storageServices.uploadFile(file);
                if (uploadThumbnail && user?.email) {
                    const bucketId = uploadThumbnail.bucketId;
                    const fileId = uploadThumbnail.$id;
                    const thumbnailUrl = await storageServices.getFileUrl({ bucketId, fileId });
                    if (thumbnailUrl) {
                        setThumbnailUrl(thumbnailUrl.toString());

                        const options: Intl.DateTimeFormatOptions = {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        };
                        const saveBlog = await dataBaseServices.saveBlog({
                            title: title,
                            content: content,
                            thumbnail: thumbnailUrl.toString(),
                            author: user?.name || 'Unknown', // Fallback to 'Unknown'
                            authorEmail: user?.email,
                            authorAvatar: profileAvatar || '',
                            createdAt: new Date().toLocaleDateString('en-GB', options),
                            category: finalCategory,
                            thumbnailBucketId: bucketId,
                            thumbnailId: fileId,
                            readTime: `${readTime} min read`, // Add read time
                        });

                        if (saveBlog) {
                            console.log(saveBlog, 'Blog created successfully');
                            toast.success('Blog created successfully');
                            setTimeout(() => {
                                router.push('/dashboard');
                            }, 2000);
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error, 'Error creating blog');
        }
    };

    const selectFile = watch('thumbnail');

    const onFileChange = () => {
        const fileList = selectFile as unknown as FileList;
        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    };

    useEffect(() => {
        if (selectFile) {
            onFileChange();
        }
        if (selectedCategory === 'Custom') {
            setFinalCategory(customCategory)
        } else {
            setFinalCategory(selectedCategory)
        }
    }, [selectFile, selectedCategory, customCategory, finalCategory]);

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-10 my-20">
            <h1 className="text-3xl font-extrabold text-center">Create your blogs</h1>
            <form onSubmit={handleSubmit(handleForm)} className="space-y-5">
                <div>
                    <Input label="Title" type="text" {...register('title', { required: true })} className="py-2 rounded-md w-full px-2" />
                    {errors.title && <span>This field is required</span>}
                </div>

                <div className="mb-4">
                    {preview && (
                        <img src={preview} alt="preview" className="w-full h-72 object-cover rounded-md" />
                    )}
                    <Input
                        label="Thumbnail"
                        {...register('thumbnail', { required: true })}
                        type="file"
                    />
                    {errors.thumbnail && <span>This field is required</span>}
                </div>

                <div className="mb-16">
                    <QuillEditor
                        className="h-[30rem] mb-16 rounded-md"
                        value={content}
                        onChange={setContent}
                        theme="snow"
                        modules={modules}
                        formats={formats}
                    />
                </div>

                <div className="mb-4 space-y-5">
                    <Select
                        label="Select Category"
                        className="max-w-xs"
                        onChange={(e) => setSelectedCategory(categories[Number(e.target.value)])}
                    >
                        {categories.map((category, index) => (
                            <SelectItem key={index}>
                                {category}
                            </SelectItem>
                        ))}
                    </Select>

                    {selectedCategory === 'Custom' && (
                        <div>
                            <Input
                                label="Add your custom category"
                                type="text"
                                onChange={(e) => setCustomCategory(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                <Button type="submit">Save Blog</Button>
            </form>
        </div>
    );
};

export default CreateBlogPage;
