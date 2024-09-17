'use client';
import authServices from "@/app/appwrite/auth";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import dataBaseServices from "@/app/appwrite/database";
import storageServices from "@/app/appwrite/storage";
import Image from "next/image";
import { Loader } from "lucide-react";
import { useAppDispatch, useAppStore } from "@/lib/hooks";
import { setUserData } from "@/lib/features/userSlice";
import { useTheme } from "next-themes";

type InputData = {
  name: string;
  email: string;
  password: string;
  profileAvatar: FileList | File[];
  // avatar: "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain"
};

export default function SignUp() {

  const { theme } = useTheme();
  const [emailMsg, setEmailMsg] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [nameMsg, setNameMsg] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const store = useAppStore();
  const dispatch = useAppDispatch();
  const { setAuthStatus } = useAuth();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<InputData>();

  const selectedFile = watch("profileAvatar");

  useEffect(() => {
    const userCheck = async () => {
      const isUser = await authServices.userStatus();
      if (isUser) {
        router.push('/');
      }
    }
    userCheck();
  }, [theme])
  const handleSignUp = async (data: InputData) => {
    setErrorMsg('');
    const { name, email, password, profileAvatar } = data;

    if (name && email && password) {
      setNameMsg('');
      setEmailMsg('');
      setPassMsg('');
      setErrorMsg('');

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


    const selectedFile = data.profileAvatar;
    console.log(selectedFile)

    try {
      setLoading(true);
      const signUpuser = await authServices.register({ name: name, email: email, password: password });
      if (signUpuser) {
        setAuthStatus(true);
        store.dispatch(setUserData({ name: name, email: email, avatar: 'default' }));
        try {
          if (profileAvatar && profileAvatar.length > 0) {
            const file = profileAvatar[0];
            const uploadFile = await storageServices.uploadFile(file);
            if (uploadFile) {
              const bucketId = uploadFile.bucketId;
              const fileId = uploadFile.$id;
              const insertData = await dataBaseServices.insertData({ name: name, email: email, avatarId: fileId, avatarBucketId: bucketId });
              if (insertData) {
                setLoading(false);
                router.push('/');
                window.location.reload();
              }
            }
          }
        } catch (error) {
          console.log(error, 'error on fileupload and insertdata')
        }
      }
    } catch (error: any) {
      setErrorMsg(error.message);
      console.log(error, 'error on sign up');
    } finally {
      setLoading(false);
    }

  };


  const onFileChange = () => {
    const fileList = selectedFile as unknown as FileList; // Cast selectedFile to FileList
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      onFileChange();
    }
  }, [selectedFile])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className={`w-full md:w-1/3 ${theme == 'dark' ? 'bg-textcolor' : 'bg-white'} px-10 py-5 rounded-2xl shadow-lg`}>
        <div className="flex flex-col gap-3 mb-3">
          <h1 className="text-4xl font-extrabold text-start">Sign Up</h1>
          <p className="text-lg">Create your account</p>
        </div>
        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-3 flex flex-col">
          <Input
            {...register('name', { required: true })}
            type="text" label="Name" />
          <p className="text-red-500">{errors.name && <span>This field is required</span>}
            {nameMsg}
          </p>
          <Input
            {...register('email', { required: true })}
            type="email" label="Email" />
          <p className="text-red-500">{errors.email && <span>This field is required</span>}
            {emailMsg}</p>
          <Input
            {...register('password', { required: true })}
            type="password" label="Password" />
          <p className="text-red-500">{errors.password && <span>This field is required</span>}{passMsg}</p>
          <span>
            {preview && (
              <div>
                <Image src={preview} width={200} height={200} alt="preview" className="max-w-[200px] rounded-md" />
              </div>
            )}
          </span>
          <Input
            {...register('profileAvatar', { required: true })}
            type="file" />
          <p className="text-red-500">{errors.password && <span>This field is required</span>}{passMsg}</p>
          <Button
            type="submit"
            color="success"
            className="bg-black text-white font-bold shadow-md py-7"
            disabled={loading}
          >
            {loading ? <p className="flex justify-center items-center gap-4"><Loader /> wait</p> : "Sign Up"}
          </Button>
          <Link className="text-blue-500" href="/sign-in">Already have an account? Sign In</Link>
          {
            errorMsg && <p className="text-red-500">{errorMsg}</p>
          }
        </form>
      </div>

    </div>
  );
}
