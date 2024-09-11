'use client';
import QuillEditor from "@/components/TextEditor/Editor";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CreateBlogPage = () => {

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    }
    /*
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
    ]

    type InputData = {
        title: string;
        thumbnail: FileList;
    };
    const [content, setContent] = useState('')
    const [preview, setPreview] = useState('');
    const { register, handleSubmit, formState: { errors }, watch } = useForm<InputData>();

    const handleForm = async (data: InputData) => {
        console.log(data, content)

    }

    const selectFile = watch('thumbnail')

    const onFileChange = () => {
        const fileList = selectFile as unknown as FileList;
        if(fileList && fileList.length > 0) {
            const file = fileList[0];
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    }

    useEffect(() => {
        if(selectFile) {
            onFileChange();
        }
    },[selectFile])
    return (
        <div className="max-w-6xl mx-auto p-4 h-screen space-y-10 my-20">
            <h1 className="text-3xl font-extrabold text-center">Create your blogs</h1>
            <form onSubmit={handleSubmit(handleForm)} className="space-y-5">
                <div>
                    <label className="block text-lg font-medium mb-2">Title</label>
                    <input type="text" {...register('title', { required: true })} placeholder="Title" className="py-2 rounded-md w-full px-2" />
                    {errors.title && <span>This field is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium mb-2">Thumbnail</label>
                    {
                        preview && (
                            <img src={preview} alt="preview" className="w-full h-72 object-cover rounded-md" />
                        )
                    }
                    <Input
                        {...register('thumbnail', { required: true })}
                        type="file" />
                    <p className="text-red-500">{errors.thumbnail && <span>This field is required</span>}</p>
                </div>

                <div className="mb-4">
                    <QuillEditor value={content} onChange={setContent} theme="snow" modules={modules} formats={formats} />
                </div>

                <Button type="submit">Save Blog</Button>
            </form>
        </div>
    );
};

export default CreateBlogPage;