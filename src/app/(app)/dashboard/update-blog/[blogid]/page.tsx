'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Input, Button, Select, SelectItem } from '@nextui-org/react';
import { toast } from 'sonner';
import QuillEditor from '@/components/TextEditor/Editor';
import useUser from '@/hooks/useUser';
import dataBaseServices from '@/app/appwrite/database';
import storageServices from '@/app/appwrite/storage';

type InputData = {
  title: string;
  content: string;
  thumbnail: FileList;
  category: string;
};

type CategoryType = 'Technology' | 'Health' | 'Personal' | 'Business' | 'Custom' | string;

const UpdatePage = () => {
  const { user } = useUser();
  const router = useRouter();
  const params = useParams();
  
  const [content, setContent] = useState<string>('');
  const [preview, setPreview] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('');
  const [customCategory, setCustomCategory] = useState<string>('');
  const [finalCategory, setFinalCategory] = useState<string>('');

  const {control, register, handleSubmit, formState: { errors }, watch, setValue } = useForm<InputData>();

  const categories: CategoryType[] = [
    'Technology', 'Health', 'Personal', 'Business', 'Custom'
  ];

  useEffect(() => {
    const fetchCurrentBlogData = async () => {
      if (params.blogid) {
        const currentBlogData = await dataBaseServices.queryBlogs(`${params.blogid}`);
        if (currentBlogData && currentBlogData.documents.length > 0) {
          const blogData = currentBlogData.documents[0];
          // console.log(blogData)
          setValue('title', blogData.title);
          setContent(blogData.content);
          setThumbnailUrl(blogData.thumbnail);
          setPreview(blogData.thumbnail);
          
          if (categories.includes(blogData.category)) {
            setSelectedCategory(blogData.category);
          } else {
            setSelectedCategory('Custom');
            setCustomCategory(blogData.category);
          }
          setFinalCategory(blogData.category);
        }
      }
    };

    fetchCurrentBlogData();
  }, [params.blogid, setValue]);

  const handleForm: SubmitHandler<InputData> = async (data) => {
    const { title, thumbnail } = data;

    try {
      let newThumbnailUrl = thumbnailUrl;

      if (thumbnail && thumbnail.length > 0) {
        const file = thumbnail[0];
        const uploadThumbnail = await storageServices.uploadFile(file);
        if (uploadThumbnail && user?.email) {
          const { bucketId, $id: fileId } = uploadThumbnail;
          const thumbnailUrlResponse = await storageServices.getFileUrl({ bucketId, fileId });
          if (thumbnailUrlResponse) {
            newThumbnailUrl = thumbnailUrlResponse.toString();
          }
        }
      }

      const blogId = params.blogid as string;
      const updateBlog = await dataBaseServices.updateBlog( blogId, {
        title,
        content,
        thumbnail: newThumbnailUrl,
        category: finalCategory,
      });

      if (updateBlog) {
        toast.success('Blog updated successfully');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog');
    }
  };

  const onFileChange = () => {
    const fileList = watch('thumbnail') as unknown as FileList;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'thumbnail') {
        onFileChange();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    setFinalCategory(selectedCategory === 'Custom' ? customCategory : selectedCategory);
  }, [selectedCategory, customCategory]);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-10 my-20">
      <h1 className="text-3xl font-extrabold text-center">Update Blog</h1>
      <form onSubmit={handleSubmit(handleForm)} className="space-y-5">
        <div>
        <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                label="Title"
                type="text"
                className="py-2 rounded-md w-full px-2"
              />
            )}
          />
          {errors.title && <span>This field is required</span>}
        </div>

        <div className="mb-4">
          {preview && (
            <img src={preview} alt="preview" className="w-full h-72 object-cover rounded-md" />
          )}
          <Input
            label="Thumbnail"
            {...register('thumbnail')}
            type="file"
          />
        </div>

        <div className="mb-16">
          <QuillEditor
            className="h-[30rem] mb-16 rounded-md"
            value={content}
            onChange={setContent}
            theme="snow"
            modules={{
              toolbar: [
                [{ header: '1' }, { header: '2' }, { font: [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                ['link', 'image', 'video'],
                ['clean'],
              ],
              clipboard: { matchVisual: false },
            }}
            formats={[
              'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote',
              'list', 'bullet', 'indent', 'link', 'image', 'video'
            ]}
          />
        </div>

        <div className="mb-4 space-y-5">
          <Select
            label="Select Category"
            className="max-w-xs"
            selectedKeys={[selectedCategory]}
            onChange={(e) => setSelectedCategory(categories[Number(e.target.value)])}
          >
            {categories.map((category, index) => (
              <SelectItem key={index} value={category}>
                {category}
              </SelectItem>
            ))}
          </Select>

          {selectedCategory === 'Custom' && (
            <div>
              <Input
                label="Add your custom category"
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            </div>
          )}
        </div>

        <Button type="submit">Update Blog</Button>
      </form>
    </div>
  );
};

export default UpdatePage;