'use client'

import dataBaseServices from "@/app/appwrite/database";
import { AuthContext } from "@/context/AuthProvider";
import { Button, Card, CardBody, CardFooter, CardHeader, Kbd, Skeleton } from "@nextui-org/react";
import { Loader } from "lucide-react";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Image } from "@nextui-org/react";
const Products = () => {

    const { authStatus, isLoading } = useContext(AuthContext);
    const router = useRouter();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const products = (await dataBaseServices.getProducts()).documents;
            setProducts(products as unknown as any);
        }

        getProducts();
    }, [])
    // console.log(products)

    if (isLoading) {
        return <div className="grid grid-cols-1 md:grid col-span-2 lg:grid-cols-4 gap-3">
            {
                products && products.length > 0 && products.map((product: any) => (
                    <Card key={product.$id}>
                        <CardHeader>
                            <Skeleton className="rounded-lg w-full" />
                        </CardHeader>
                    </Card>
                ))
            }
        </div>
    }
    if (!authStatus) {
        toast.error("Please login first");
        router.push("/sign-in");
    }
    return (
        <div>
            <div className="grid gird-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {
                    products && products.length > 0 && products.map((product: any) => (
                        <Card shadow="sm" key={product.$id} isPressable onPress={() => console.log("item pressed")}>
                            <CardBody className="overflow-visible p-0">
                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={product.name}
                                    className="w-full object-cover h-[240px]"
                                    src={product.productThumbnail}
                                />
                            </CardBody>
                            <CardFooter className="text-small flex flex-col justify-between">
                                <div className="w-full flex justify-between items-center">
                                    <b>{product.name}</b>
                                    <p className="text-default-500">{product.price}$</p>
                                </div>
                                {/* <div className="w-full flex justify-between items-center">
                                    <p>{product.details}</p>
                                </div>
    
                                <div className="w-full flex justify-between items-center">
                                    <b>Quantity</b>
                                    <p className="text-default-500">5</p>
                                </div> */}
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </div>
    );
};

export default Products;