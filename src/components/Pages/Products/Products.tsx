'use client'

import dataBaseServices from "@/app/appwrite/database";
import { Button, Card, CardBody, CardHeader, Kbd } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Products = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const products = (await dataBaseServices.getProducts()).documents;
            setProducts(products as unknown as any);
        }

        getProducts();
    }, [])
    // console.log(products)
    return (
        <div>
             
            <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {
                    products && products.length > 0 && products.map((product: any) => (
                        <Card key={product.$id}>
                            <CardHeader>
                                <Image className="rounded-lg" src={product.productThumbnail} width={300} height={300} alt={product.name} />
                            </CardHeader>
                            <CardBody>
                                <h2>{product.name}</h2>
                                <p>{product.details}</p>
                                <Button>Buy Now</Button>
                            </CardBody>
                        </Card>
                    ))
                }
            </div>
        </div>
    );
};

export default Products;