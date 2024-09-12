'use client';
import dataBaseServices from "@/app/appwrite/database";
import storageServices from "@/app/appwrite/storage";
import QuillEditor from "@/components/TextEditor/Editor";
import useUser from "@/hooks/useUser";
import { Input } from "@nextui-org/input";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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

    type InputData = {
        title: string;
        thumbnail: FileList;
        category: string;
    };

    const [content, setContent] = useState('');
    const [preview, setPreview] = useState('');
    const [turl, settUrl] = useState('');

    const [customCategory, setCustomCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<any>('');

    const { register, handleSubmit, formState: { errors }, watch } = useForm<InputData>();

    
    const categories = [
        "Technology",
        "Health",
        "Personal",
        "Business",
        "Custom"
    ]
    const handleForm = async (data: InputData) => {
        const { title, thumbnail, category } = data;

        

        // Calculate reading time based on word count
        const wordCount = content.trim().split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200); // average 200 words per minute

        // try {
        //     if (thumbnail && thumbnail.length > 0) {
        //         const file = thumbnail[0];
        //         const uploadThumbnail = await storageServices.uploadFile(file);
        //         if (uploadThumbnail && user?.email) {
        //             const bucketId = uploadThumbnail.bucketId;
        //             const fileId = uploadThumbnail.$id;
        //             const thumbnailUrl = await storageServices.getFileUrl({ bucketId, fileId });
        //             if (thumbnailUrl) {
        //                 settUrl(thumbnailUrl.toString());

        //                 const options: Intl.DateTimeFormatOptions = {
        //                     day: 'numeric',
        //                     month: 'long',
        //                     year: 'numeric',
        //                 };

        //                 const saveBlog = await dataBaseServices.saveBlog({
        //                     title: title,
        //                     content: content,
        //                     email: user?.email,
        //                     thumbnail: thumbnailUrl.toString(),
        //                     author: user?.name,
        //                     authorEmail: user?.email,
        //                     authorAvatar: profileAvatar,
        //                     postDate: new Date().toLocaleDateString('en-GB', options),
        //                     category: finalCategory,
        //                     readTime: `${readTime} min read`, // Add read time
        //                 });

        //                 if (saveBlog) {
        //                     console.log(saveBlog, 'Blog created successfully');
        //                 }
        //             }
        //         }
        //     }
        // } catch (error) {
        //     console.log(error, 'Error creating blog');
        // }

        
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
    }, [selectFile]);


    const handleSelectionChange = (keys) => {
        const selectedIndex = keys[0];
        const selectedCategory = categorie[selectedIndex];
        setSelectedCategory(selectedCategory);
        console.log(selectedCategory); // This should log the value of the selected category
    };

    console.log(selectedCategory)
    return (
        <div className="max-w-6xl mx-auto p-4 h-screen space-y-10 my-20">
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

                <div className="mb-4">
                    <QuillEditor value={content} onChange={setContent} theme="snow" modules={modules} formats={formats} />
                </div>

                <div className="mb-4">
                    {/* <label className="block mb-2">Category</label>
                    <Select
                        label="Select Category"
                        placeholder="Select an option"
                        className="max-w-xs"
                        selectedKeys={[selectedCategory]}
                        onSelectionChange={(keys) => {
                            const key = keys[0];
                            setSelectedCategory(key as string);
                        }}
                    >
                        {categories.map((category) => (
                            <SelectItem key={category.value}>{category.label}</SelectItem>
                        ))}
                    </Select>

                    {selectedCategory === 'custom' && (
                        <Input
                            label="Custom Category"
                            placeholder="Enter custom category"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            className="mt-4"
                        />
                    )} */}


                    <Select
                        label="Select an animal"
                        className="max-w-xs"
                        onChange={ (e) => {setSelectedCategory(categories[e.target.value])} }
                    >
                        {categories.map((animal, index) => (
                            <SelectItem key={index}>
                                {animal}
                            </SelectItem>
                        ))}
                    </Select>

                    {
                        selectedCategory === 'custom' && (
                    }


                    {/* <Select
                        label="Select Category"
                        placeholder="Select an option"
                        className="max-w-xs"
                        selectedKeys={[selectedCategory]}
                        onSelectionChange={(keys) => {
                            const selectedIndex = keys[0];
                            const selectedCategoryValue = categorie.find((category, index) => index === selectedIndex);
                            setSelectedCategory(selectedCategoryValue);
                            console.log(selectedCategoryValue); // This should log the value of the selected category
                        }}
                    >
                        {categorie.map((category, index) => (
                            <SelectItem key={index} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </Select> */}

                </div>

                <Button type="submit">Save Blog</Button>
            </form>
        </div>
    );
};

export default CreateBlogPage;
