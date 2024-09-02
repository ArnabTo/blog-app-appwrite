'use client';
import authServices from "@/app/appwrite/auth";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Link from "next/link";

type InputData = {
    email: string;
    password: string;
    // avatar: "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain"
};

export default function SignIn() {

    const [emailMsg, setEmailMsg] = useState('');
    const [passMsg, setPassMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();
    const { setAuthStatus } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm<InputData>();

    const handleSignUp = async (data: InputData) => {
        const { email, password } = data;

        if (email && password) {
            setEmailMsg('');
            setPassMsg('');

            if (!/\S+@\S+\.\S+/.test(email)) {
                setEmailMsg('Please enter a valid email address');
                return;
            }
            // if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            //   setPassMsg('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character');
            //   return;
            // }
        }
        try {
            const loginUser = await authServices.loginUser(data);
            if (loginUser) {
                setAuthStatus(true);
                router.push('/');
            }
        } catch (error: any) {
            setErrorMsg(error.message);
            console.log(error);
        }

    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full md:w-1/3 bg-white border-2 px-10 py-5 rounded-2xl shadow-lg">
                <div className="flex flex-col gap-3 mb-3">
                    <h1 className="text-4xl font-extrabold text-start">Sign In</h1>
                    <p className="text-lg">Login to your account</p>
                </div>
                <form onSubmit={handleSubmit(handleSignUp)} className="space-y-3 flex flex-col">
                    <Input
                        {...register('email', { required: true })}
                        type="email" label="Email" />
                    <p className="text-red-500">{errors.email && <span>This field is required</span>}
                        {emailMsg}</p>
                    <Input
                        {...register('password', { required: true })}
                        type="password" label="Password" />
                    <p className="text-red-500">{errors.password && <span>This field is required</span>}{passMsg}</p>
                    <Button
                        type="submit"
                        color="success"
                        className="bg-black text-white font-bold shadow-md py-7"
                    >
                        Sign In
                    </Button> 
                    <Link className="text-blue-500" href="/sign-up">New user? Create a new account</Link>
                </form>
            </div>
        </div>
    );
}
