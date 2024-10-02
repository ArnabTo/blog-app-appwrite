import conf from "@/conf/conf";
import { NextRequest, NextResponse } from "next/server";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export async function POST(request: NextRequest) {
console.log(conf.stripeScretKey)
    try {
        const {amount} = await request.json();
 
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({clientSecret: paymentIntent.client_secret});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}