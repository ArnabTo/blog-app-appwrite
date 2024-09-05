import { Card, CardBody, CardHeader } from '@nextui-org/react'
import blogs from '../blogs.json'
import Image from 'next/image'
import Link from 'next/link'
export default function Blogs() {

    console.log(blogs)
    return (
        <section className=' max-w-7xl mx-auto'>
            <h1 className='text-3xl font-extrabold mb-10'>Blogs</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
                {
                    blogs.map((blog) => {
                        return (
                            <Link href={`/blogs/${blog.id}`} key={blog.id}>
                                <Card className="py-4 bg-accent shadow-md h-full" >
                                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                        <p className="text-tiny uppercase font-bold">Daily Mix</p>
                                        <small className="text-default-500">12 Tracks</small>
                                        <h4 className="font-bold text-large">Frontend Radio</h4>
                                    </CardHeader>
                                    <CardBody className="overflow-visible py-2">
                                        <Image
                                            alt="Card background"
                                            className="object-cover rounded-xl w-full h-full"
                                            src={blog.thumbnail}
                                            width={270}
                                            height={270}
                                        />
                                    </CardBody>
                                </Card>
                            </Link>
                        )
                    })
                }
            </div>

        </section>
    )
}
