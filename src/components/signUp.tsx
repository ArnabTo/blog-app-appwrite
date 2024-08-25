'use client';
import authServices from "@/app/appwrite/auth";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";

type InputData = {
  name: string;
  email: string;
  password: string;
  // avatar: "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain"
};

export default function SignUp() {

  const [formData, setFormData] = useState<InputData | {}>({});
  const [ emailMsg, setEmailMsg ] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [ nameMsg, setNameMsg ] = useState('');

  const router = useRouter();
  const { setAuthStatus } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<InputData>();

  const handleSignUp = async (data: InputData) => {
    const { name, email, password } = data;

    if (name && email && password) {
      setNameMsg('');
      setEmailMsg('');
      setPassMsg('');

      if (!/^[a-zA-Z0-9]+$/.test(name)) {
        setNameMsg('name can only contain letters and numbers');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailMsg('Please enter a valid email address');
        return;
      }
      // if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      //   setPassMsg('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character');
      //   return;
      // }
    }
    console.log(name, email, password);
    try {
      const signUpuser = await authServices.register(data);
       if(signUpuser) {
        setAuthStatus(true);
        router.push('/');
       }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full md:w-1/2 bg-white border-2 px-10 py-5 rounded-2xl shadow-lg">
        <div className="flex flex-col gap-3 mb-3">
          <h1 className="text-4xl font-extrabold text-start">Sign Up</h1>
          <p className="text-lg">Create your account</p>
        </div>
        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-5">
          <Input
            {...register('name', { required: true })}
            type="text"
            className="shadow-lg rounded-md"
            placeholder="name"
          />
          <p className="text-red-500">{errors.name && <span>This field is required</span>}
          {nameMsg}
        </p>
          <Input
            {...register('email', { required: true })}
            type="email"
            className="shadow-lg rounded-md"
            placeholder="email@gmail.com"
          />
          <p className="text-red-500">{errors.email && <span>This field is required</span>}
          {emailMsg}</p>
          <Input
            {...register('password', { required: true })}
            type="password"
            className="shadow-lg rounded-md"
            placeholder="password"
          />
          <p className="text-red-500">{errors.password && <span>This field is required</span>}{passMsg}</p>
          <Button
            type="submit"
            color="success"
            className="bg-black text-white font-bold shadow-md"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
