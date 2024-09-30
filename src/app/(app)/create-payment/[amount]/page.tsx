'use client';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import conf from "@/conf/conf";
import { useParams } from "next/navigation";
import CheckoutPage from "@/components/Pages/CheckoutPage";
import { useEffect, useState } from "react";
import calCulateAmount from "@/lib/calCulateAmount";
import { Variable } from "lucide-react";
import { color } from "framer-motion";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHER_KEY as string);

const CreatePayment = () => {

    const params = useParams();

    const[clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: calCulateAmount(Number(params.amount)) }),
            });
            const data = await response.json();
            setClientSecret(data.clientSecret);
        }
        getClientSecret();
    }, [params.amount]);

    const appearence = {
        theme: 'flat',
        Variables: {
            colorPrimary: '#ffffff',
            colorBackground: '#000000',
            colorText: '#ffffff',
        }
    }
    const options = {clientSecret, appearence};

    return (
        <div className="h-screen max-w-6xl mx-auto">
            <h1>Complete payment</h1>
            {
                clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                            <CheckoutPage/>
                    </Elements>
                )
            }
        </div>
    );
};

export default CreatePayment;