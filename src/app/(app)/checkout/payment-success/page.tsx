'use client'
import { Card, CardBody } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const PaymentSuccess = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const amount = searchParams.get('amount')

    useEffect(() => {
        setTimeout(() => {
           router.push('/');
        }, 5000);
    },[])
    return (
        <div className='w-full md:max-w-md mx-auto h-screen flex justify-center items-center'>
            <Card>
                <CardBody>
                    <div className='flex flex-col items-center space-y-2 md:p-5'>
                        <h1 className='text-3xl font-extrabold text-textcolor'>Payment Successfull 🎊</h1>
                        <p className='text-lg font-semibold text-center'>Congratulations! Your payment was successful of {amount}$. </p>
                     <p>Redirecting you in 5 seconds......</p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default PaymentSuccess;