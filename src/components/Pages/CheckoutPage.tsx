'use client';
import calCulateAmount from "@/lib/calCulateAmount";
import { Button } from "@nextui-org/react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const CheckoutPage = () => {

 const stripe = useStripe();
 const elements = useElements();

 const [message, setMessage] = useState<string | null>(null);
 const [isLoading, setIsLoading] = useState(false);





 const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
        return;
    }
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: 'http://localhost:3000/',
        }
    })

    if (error.type === 'card_error' || error.type === 'validation_error') {
         setMessage(error.message ?? 'An unexpected error occurred.');
    } else {
        setMessage('An unexpected error occurred.');
    }

 }
    return (
        <div>
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" />
                 <Button type="submit" disabled={!stripe}>Pay</Button>
            </form>
        </div>
    );
};

export default CheckoutPage;