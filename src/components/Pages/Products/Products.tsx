'use client';

import dataBaseServices from "@/app/appwrite/database";
import { AuthContext } from "@/context/AuthProvider";
import { Button, Card, CardBody, CardFooter, CardHeader, Kbd, ModalFooter, Skeleton, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Image } from "@nextui-org/react";

type Product = {
    $id: string;
    name: string;
    details: string;
    productThumbnail: string;
    price: number;
}
const Products = () => {
    const { authStatus, isLoading } = useContext(AuthContext);
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [products, setProducts] = useState<any[]>([]);
   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [loadingProducts, setLoadingProducts] = useState(true); // New loading state for products

    useEffect(() => {
        const getProducts = async () => {
            try {
                const products = (await dataBaseServices.getProducts()).documents;
                setProducts(products as unknown as any);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingProducts(false); // Stop loading once products are fetched
            }
        };

        getProducts();
    }, []);

    if (isLoading) {
        return <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {
                products && products.length > 0 && products.map((product: any) => (
                    <Card key={product.$id} className="w-[18rem] space-y-5 p-4" radius="lg">
                        <Skeleton className="rounded-lg">
                            <div className="h-40 rounded-lg bg-default-300"></div>
                        </Skeleton>
                        <div className="flex justify-between items-center">
                            <Skeleton className="w-1/2 rounded-lg">
                                <div className="h-3 w-1/2 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-2/5 rounded-lg">
                                <div className="h-3 w-1/2 rounded-lg bg-default-200"></div>
                            </Skeleton>
                        </div>
                    </Card>
                ))
            }
        </div>
    }

    if (!authStatus) {
        toast.error("Please login first");
        router.push("/sign-in");
        return null;
    }

    const handleSelectedCard = (product: any) => {
        onOpen();
        setSelectedProduct(product);
    };

    const handleProduct = () => {
        // Product action handler logic here
    };

    return (
        <div className="px-5">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {
                    products && products.length > 0 && products.map((product: any) => (
                        <Card
                            onClick={() => handleSelectedCard(product)}
                            shadow="sm"
                            key={product.$id}
                            isPressable
                            onPress={() => console.log("item pressed")}
                        >
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
                            </CardFooter>
                        </Card>
                    ))}

            </div>

          {
            selectedProduct && (
                <Modal placement="bottom" size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{selectedProduct?.name}</ModalHeader>
                            <ModalBody>
                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={selectedProduct?.name}
                                    className="w-full object-cover h-[240px]"
                                    src={selectedProduct?.productThumbnail}
                                />
                                <p>{selectedProduct.details}</p>
                                <p><b>Quantity:</b> 5</p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                    Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                    Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button onClick={handleProduct} className="bg-textcolor text-primary" onPress={onClose}>
                                    Buy
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            )
          }
        </div>
    );
};

export default Products;
