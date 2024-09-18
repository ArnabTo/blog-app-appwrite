'use client';
import useBlogs from "@/hooks/useBlogs"
import { Avatar, Card, CardBody, CardFooter } from "@nextui-org/react";
import DOMPurify from "dompurify";
import { Loader } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function AllBlogs() {

    const { theme } = useTheme();
    const { blogs, loading, error  } = useBlogs();
  return (
    <div className='max-w-7xl mx-auto mb-28 my-10'>
    <div>
          <h1 className={`text-3xl text-center font-extrabold mb-10 ${theme == 'dark' ? 'text-primary' : 'text-neutral'} `}>
      All Blogs
    </h1>
    </div>
    {
        loading ? <div className='flex justify-center my-5'><Loader size={40} className='animate-spin' /></div>
            :
            <div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10 space-y-3'>
                    {blogs.map((blog: any) => {
                        return (
                            <Link href={`/blogs/${blog.$id}`} key={blog.id}>
                                <Card className={`py-4 shadow-lg h-full group relative overflow-hidden  ${theme == 'dark' ? 'glass-dark' : 'glass-light'}`}>
                                    <CardBody className="overflow-visible py-2 z-10">
                                        <Image
                                            alt="Card background"
                                            className="object-cover rounded-xl w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300"
                                            src={blog.thumbnail}
                                            width={270}
                                            height={270}
                                        />
                                    </CardBody>
                                    <CardFooter className="pb-0 pt-2 px-4 flex-col items-start relative z-10 space-y-2">
                                        <small
                                            className={`text-default-500 px-2 py-1 rounded-full mb-2 ${theme == 'dark' ? 'text-textcolor' : 'text-textcolor'
                                                } ${theme == 'dark' ? 'bg-[#F1F0F1]' : 'bg-primary'}`}
                                        >
                                            {blog.category}
                                        </small>
                                        <div className='flex items-center gap-2'>
                                            <Avatar size='sm' src={blog?.authorAvatar} />
                                            <p className="text-tiny uppercase font-bold">{blog.author}</p>
                                        </div>
                                        <h4
                                            className={`font-bold text-large ${theme == 'dark' ? 'text-primary' : 'text-textcolor'
                                                }`}
                                        >
                                            {blog?.title}
                                        </h4>
                                        <div className='line-clamp-3' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog?.content) }} />
                                    </CardFooter>
                                    <div
                                        className={`absolute inset-0 rounded-xl ${theme == 'dark' ? 'glass-dark-bg' : 'glass-light-bg'
                                            }`}
                                    />
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
    }
</div>
  )
}
