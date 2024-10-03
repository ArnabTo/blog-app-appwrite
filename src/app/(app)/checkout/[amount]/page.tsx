'use client';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams, useRouter } from "next/navigation";
import CheckoutPage from "@/components/Pages/Payment/CheckoutPage";
import { useContext, useEffect, useState } from "react";
import calCulateAmount from "@/lib/calCulateAmount";
import { Loader, Variable } from "lucide-react";
import { AuthContext } from "@/context/AuthProvider";
import { toast } from "sonner";
import { Card, CardBody, Divider } from "@nextui-org/react";
import { set } from "react-hook-form";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHER_KEY as string);

const CreatePayment = () => {

    const { isLoading, authStatus } = useContext(AuthContext);
    const router = useRouter();
    const params = useParams();
    const amount = calCulateAmount(Number(params.amount));
    const [clientSecret, setClientSecret] = useState('');
    const [userNewPlan, setUserNewPlan] = useState<string>();

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

        if (params.amount == "25") {
            setUserNewPlan('Premium');
        } else if (params.amount === "35") {
            setUserNewPlan('Business/Pro');
        }
    }, [params.amount]);
console.log(userNewPlan, 'userNewPlan', amount)
    const appearence = {
        theme: 'flat',
        Variables: {
            colorPrimary: '#ffffff',
            colorBackground: '#000000',
            colorText: '#ffffff',
        }
    }
    const options = { clientSecret, appearence };

    if (isLoading) {
        return <div className="h-screen flex items-center justify-center"><Loader size={40} className="animate-spin" /></div>
    }
    if (!authStatus) {
        toast.error('Please login first');
        router.push('/sign-in');
    }

    if (!clientSecret) {
        return <div className="h-screen flex items-center justify-center"><Loader size={40} className="animate-spin" /></div>
    }
    return (
        <div className="max-w-6xl mx-auto py-10 space-y-5 h-screen">
            <h1 className="text-3xl font-bold">Checkout</h1>
            <Card>
                <CardBody>
                    <div className="flex flex-col md:flex-row gap-3 justify-center p-5">
                        <div>
                            <h2 className="text-3xl font-bold">Payment</h2>
                            <p className="text-gray-500 text-xl">Amount: {params.amount}$</p>
                        </div>
                        <div>
                            <Divider orientation="vertical" />
                        </div>
                        <div className="w-full">
                            {
                                clientSecret && (
                                    <Elements options={options} stripe={stripePromise}>
                                        <CheckoutPage secret={clientSecret} />
                                    </Elements>
                                )
                            }
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default CreatePayment;