'use client';
import dataBaseServices from "@/app/appwrite/database";
import useUser from "@/hooks/useUser";
import { Button } from "@nextui-org/react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const CheckoutPage = ({ secret }: { secret: string }) => {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { currentUserData } = useUser();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements || !secret) {
            setMessage("Stripe has not been initialized.");
            return;
        }

        setIsLoading(true);
        setMessage(null);

        try {
            const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {},
                redirect: 'if_required',
            });

            if (paymentError) {
                throw paymentError;
            }

            if (paymentIntent && paymentIntent.status === 'succeeded') {
                if (currentUserData && currentUserData.$id) {
                    const paymentDetails = {
                        userId: currentUserData.$id,
                        amount: paymentIntent.amount / 100,
                        currency: paymentIntent.currency,
                        paymentIntentId: paymentIntent.id,
                        status: paymentIntent.status,
                        paymentDate: new Date(paymentIntent.created * 1000),
                    };

                    const response = await dataBaseServices.createPaymentIntent(paymentDetails);
                    if (response) {
                        const plan = paymentIntent.amount === 2500 ? 'Premium' : 'Business';
                        await dataBaseServices.updateUserPlan(currentUserData.$id, { plan: plan });
                        toast.success('Payment successful!');
                        setTimeout(() => {
                            router.push(`/checkout/payment-success?amount=${paymentDetails.amount}`);
                        }, 1000);
                    }
                }
            } else {
                setMessage("Payment status is not successful. Please try again.");
            }
        } catch (error: any) {
            if (error.type === 'card_error' || error.type === 'validation_error') {
                setMessage(error.message ?? 'An unexpected error occurred.');
            } else {
                setMessage('An unexpected error occurred.');
            }
            toast.error('Payment failed!');
        } finally {
            setIsLoading(false);
        }
    };

    if (!secret || !stripe || !elements) {
        return <div className="h-screen flex items-center justify-center"><Loader /></div>;
    }

    return (
        <div>
            <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
                <PaymentElement id="payment-element" />
                <Button 
                    className="bg-textcolor text-primary rounded-md flex items-center" 
                    type="submit" 
                    disabled={isLoading || !stripe}
                >
                    {isLoading ? <Loader className="animate-spin mr-2" strokeWidth={2} size={20}/> : null}
                    {isLoading ? 'Processing...' : 'Pay'}
                </Button>
                {message && <p className="text-red-500">{message}</p>}
            </form>
        </div>
    );
};

export default CheckoutPage;