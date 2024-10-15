'use client';
import useUser from "@/hooks/useUser";
import { Avatar, Button, Card, CardBody, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Skeleton, Spinner, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, CardHeader, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { CirclePlus, Ellipsis, Heart, MessageSquareMore, PlusSquare } from "lucide-react";
import useBlogs from "@/hooks/useBlogs";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import dataBaseServices from "@/app/appwrite/database";
import { useForm } from "react-hook-form";
import storageServices from "@/app/appwrite/storage";


type ProductData = {
    name: string;
    price: number;
    details: string;
    authorEmail: string;
    productImage: FileList | File[];
}
const DashboardComponent = () => {
    const { user, profileAvatar, loader, currentUserData } = useUser();
    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);
    const [usersBlogs, setUserBlogs] = useState<any[]>([]);
    const { blogs, deleteBlog, deleteThumbnail } = useBlogs();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [preview, setPreview] = useState<string | null>(null);
    const [userProducts, setUserProducts] = useState<any[]>([]);
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<ProductData>();

    const selectedFile = watch("productImage");

    // handle file change
    const onFileChange = useCallback(() => {
        if (selectedFile && selectedFile.length > 0) {
            const file = selectedFile[0];
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [selectedFile]);

    // blog delete operation
    const handleBlogDelete = useCallback(async (targetBlogId: string, bucketId: string, fileId: string) => {
        await deleteThumbnail(bucketId, fileId);
        await deleteBlog(targetBlogId);
        toast.success('Blog deleted successfully');
    }, [deleteThumbnail, deleteBlog]);

    // user blog fetch operation
    const fetchUserBlogs = useCallback(async () => {
        try {
            setLoading(true);
            const userEmail = user?.email;
            if (userEmail) {
                const userBlogs = (await dataBaseServices.getUserBlogs(userEmail)).documents;

                const blogsWithCommentsCount = await Promise.all(userBlogs.map(async (blog: any) => {
                    const commentsCount = await dataBaseServices.queryComments(blog.$id);
                    return { ...blog, commentsCount: commentsCount?.total || 0 };
                }));

                setUserBlogs(blogsWithCommentsCount);
            }
        } catch (error) {
            toast.error('Failed to fetch user blogs');
        } finally {
            setLoading(false);
        }
    }, [user?.email]);


    // user product fetch operation
    const fetchUserProducts = async () => {
        try {
            if (user?.email) {
                const products = (await dataBaseServices.getSingleUserProduct(user?.email)).documents;
                setUserProducts(products.slice(0, 4));
            }
        } catch (error) {
            toast.error('Failed to fetch user products');
            console.log(error)
        }
    }

    
    useEffect(() => {
        fetchUserBlogs();
        fetchUserProducts();
    }, [fetchUserBlogs]);


    useEffect(() => {
        return onFileChange();
    }, [onFileChange]);


    // product add operation
    const handleAddProduct = async (data: ProductData) => {
        try {
            setLoading(true);
            const { name, price, details, productImage } = data;

            if (productImage && productImage.length > 0) {
                const uploadProductThumbnail = await storageServices.uploadFile(productImage[0]);

                if (uploadProductThumbnail && user) {
                    const { bucketId, $id: fileId } = uploadProductThumbnail;
                    const getProductThumbnail = await storageServices.getFileUrl({ bucketId, fileId });

                    if (getProductThumbnail) {
                        const productDetails = {
                            name,
                            details,
                            price: Number(price),
                            authorEmail: user.email,
                            productThumbnail: getProductThumbnail.href
                        };

                        await dataBaseServices.addProduct(productDetails);
                        toast.success('Product added successfully');
                        reset();
                        onClose();
                    }
                }
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    // product delete operation
    const handleDeleteProduct = async (productId: string) => {
        
    }
    return (
        <div className="max-w-6xl mx-auto my-20">
            <div className="flex flex-col-reverse lg:flex-row space-y-10">
                <div className="w-11/12 mx-5 space-y-10">
                    <h1 className="text-4xl text-center lg:text-start font-extrabold">Your Blogs</h1>
                    <div className="space-y-10">
                        <div className="grid grid-cols-1 space-y-5">
                            {loader ? (
                                <>
                                    <Skeleton className="w-full h-24" />
                                    <Skeleton className="w-full h-24" />
                                    <Skeleton className="w-full h-24" />
                                </>
                            ) : (
                                usersBlogs && usersBlogs.length > 0 ? (
                                    usersBlogs.map((blog) => (
                                        <div key={blog.$id}>
                                            <Card className="flex">
                                                <CardBody>
                                                    <Link href={`/blogs/${blog.$id}`}>
                                                        <div className="flex flex-col-reverse lg:flex-row items-center">
                                                            <div className="p-3 space-y-5">
                                                                <p className="text-gray-500">{blog?.createdAt}</p>
                                                                <h1 className="text-2xl font-extrabold">{blog.title}</h1>
                                                                <div className="line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.content }} />
                                                                <div>
                                                                    <small
                                                                        className={`text-default-500 px-3 py-2 rounded-full ${theme == 'dark' ? 'text-textcolor bg-[#F1F0F1]' : 'text-primary bg-textcolor'}`}>
                                                                        {blog.category}
                                                                    </small>
                                                                </div>
                                                            </div>
                                                            <Image
                                                                className="min-h-40 w-full p-3 lg:p-0 object-cover rounded-lg"
                                                                src={blog.thumbnail}
                                                                alt="thumbnail"
                                                                width={200}
                                                                height={300}
                                                            />
                                                        </div>
                                                    </Link>
                                                    <div className="flex justify-between p-3">
                                                        <div className="flex items-center gap-5">
                                                            <span className="flex items-center gap-1">
                                                                <Heart></Heart>
                                                                {blog.supports}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <MessageSquareMore />
                                                                {blog?.commentsCount}
                                                            </span>
                                                        </div>

                                                        <div className="flex justify-between items-center pr-">
                                                            <div className="cursor-pointer mt-5 lg:pr-5">
                                                                <Dropdown>
                                                                    <DropdownTrigger>
                                                                        <Ellipsis />
                                                                    </DropdownTrigger>
                                                                    <DropdownMenu aria-label="Static Actions">
                                                                        <DropdownItem href={`/dashboard/update-blog/${blog?.$id}`} key="new"><Link href={`/dashboard/update-blog/${blog?.$id}`}>Edit</Link></DropdownItem>
                                                                        <DropdownItem key="copy">Change visibility</DropdownItem>
                                                                        <DropdownItem key="edit">Share</DropdownItem>
                                                                        <DropdownItem onClick={() => handleBlogDelete(blog.$id, blog?.bucketId, blog?.fileId)} key="delete" className="text-danger" color="danger">
                                                                            Delete
                                                                        </DropdownItem>
                                                                    </DropdownMenu>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>

                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        {usersBlogs.length === 0 ? (
                                            <p className="text-xl font-bold text-center">No blogs found</p>
                                        ) : (
                                            <div className="flex justify-center items-center">
                                                <Spinner color="success" />
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Tooltip content="Create Blog">
                            <Link href="/dashboard/create-blog">
                                <CirclePlus size={35} />
                            </Link>
                        </Tooltip>
                    </div>
                </div>

                <div>
                    <Divider orientation="vertical" />
                </div>

                <div className="w-full lg:w-1/2 px-5 lg:h-screen flex flex-col items-center lg:justify-start">
                    {loader ? (
                        <Skeleton className="rounded-full w-20 h-20" />
                    ) : (
                        <Image className="rounded-full w-20 h-20" src={profileAvatar ?? ''} width={100} height={100} alt="avatar" />
                    )}
                    <p className="font-medium">{loader ? <Skeleton className="w-32 h-6" /> : user?.name}</p>
                    {/* <p>{user?.followers} 5 Followers</p> */}
                    <p> 5 Followers</p>

                    {
                        currentUserData && currentUserData.plan == 'Business' && (
                            <div className="w-full flex justify-center items-center gap-5">
                                <Button onPress={onOpen}>Open Modal</Button>
                                <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom">
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                                                <ModalBody>
                                                    <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-5">
                                                        <Input {...register("name", { required: true })} type="text" label="Title" />
                                                        <p className="text-red-500">{errors.name && <span>This field is required</span>}</p>

                                                        <Input {...register("details", { required: true })} type="text" label="Description" />
                                                        <p className="text-red-500">{errors.details && <span>This field is required</span>}</p>

                                                        <Input {...register("price", { required: true })} type="number" label="Price" />
                                                        <p className="text-red-500">{errors.price && <span>This field is required</span>}</p>

                                                        {preview && (
                                                            <div>
                                                                <Image src={preview} width={200} height={200} alt="product_thumbnail" />
                                                            </div>
                                                        )}
                                                        <Input {...register("productImage", { required: true })} type="file" className="mb-10" />
                                                        <p className="text-red-500">{errors.productImage && <span>This field is required</span>}</p>

                                                        <span className="flex justify-end items-center gap-5 mt-10">
                                                            <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                                                            <Button type="submit">Add <PlusSquare /></Button>
                                                        </span>
                                                    </form>
                                                </ModalBody>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                            </div>
                        )
                    }


                    {
                        userProducts.length === 0 ? (
                            <p className="text-xl font-bold text-center">No products found</p>
                        )
                            : (
                                <div className="space-y-5 mt-10">
                                    {
                                        userProducts.map((product) => (
                                            <Card key={product.$id} className="w-[18rem]" radius="lg">
                                                <CardHeader>
                                                    <Image src={product.productThumbnail} className="w-full rounded-lg" width={500} height={500} alt="product" />
                                                </CardHeader>
                                                <CardBody>
                                                    <span className="flex justify-between items-center">
                                                        <p >
                                                            {product.details}
                                                        </p>
                                                        <p className="text-xl font-bold">{product.price} $</p>
                                                    </span>
                                                </CardBody>
                                                <CardFooter className="flex justify-between items-center pb-5">
                                                    <Button variant="shadow" color="primary" className="text-textcolor" size="md">Edit</Button>
                                                    <Button onClick={() => handleDeleteProduct(product.$id)} variant="shadow" color="danger" size="md"> Delete</Button>
                                                </CardFooter>
                                            </Card>

                                        ))
                                    }

                                    <Link className="flex justify-center " href={`/dashboard/your-products/${user?.email}`}><Button className="mx-auto bg-primary text-textcolor rounded-lg" size="md" >See all...</Button></Link>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;
