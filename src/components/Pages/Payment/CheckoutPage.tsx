'use client';
import dataBaseServices from "@/app/appwrite/database";
import calCulateAmount from "@/lib/calCulateAmount";
import { Button } from "@nextui-org/react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { toast } from "sonner";

const CheckoutPage = ({ secret }: { secret: string }) => {

    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);



    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (!stripe || !elements || !secret) {
            return;
        }
        setIsLoading(true);

        const { error: paymentError } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // return_url: 'http://localhost:3000/',
            },
            redirect: 'if_required',
        })

        // if (paymentError.type === 'card_error' || paymentError.type === 'validation_error') {
        //      setMessage(paymentError.message ?? 'An unexpected error occurred.');
        // } else {
        //     setMessage('An unexpected error occurred.');
        // }

        if (paymentError) {
            if (paymentError.type === 'card_error' || paymentError.type === 'validation_error') {
                setMessage(paymentError.message ?? 'An unexpected error occurred.');
            } else {
                setMessage('An unexpected error occurred.');
            }
        } else {
            const { paymentIntent } = await stripe.retrievePaymentIntent(secret);
            if (paymentIntent && paymentIntent.status === 'succeeded') {
                console.log(paymentIntent)
                setMessage('Payment succeeded!');
                try {
                    const paymentDetails = {
                        userId: '1',
                        amount: paymentIntent.amount / 100,
                        currency: paymentIntent.currency,
                        paymentIntentId: paymentIntent.id,
                        status: paymentIntent.status,
                        paymentDate: new Date(paymentIntent.created * 1000),
                    }
                    console.log(
                        paymentDetails
                    )
                    const response = await dataBaseServices.createPaymentIntent(paymentDetails);
                    if (response) {
                        console.log(response, 'response in payment intent');
                        toast.success('Payment successful!');
                        setTimeout(() => {
                            router.push(`/checkout/payment-success?amount=${paymentDetails.amount}`);
                        },1000)
                    }
                } catch (error) {
                    toast.error('Payment failed!');
                    console.log(error, 'error in payment intent');
                }
            }
        }

        setIsLoading(false);

    }

    if (!secret || !stripe || !elements) {
        return <div className="h-screen flex items-center justify-center"><Loader /></div>
    }
    return (
        <div>
            <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
                <PaymentElement id="payment-element" />
                <Button className="bg-textcolor text-primary rounded-md" type="submit" disabled={!stripe}>Pay</Button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default CheckoutPage;