'use client'
import ProfilePage from "@/components/ProfilePage";
import { AuthContext } from "@/context/AuthProvider";
import { Spinner} from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Profile() {

    const params = useParams();
    const userEmail = decodeURIComponent(params.useremail as string);
    const router = useRouter();
    const { isLoading, authStatus } = useContext(AuthContext);
   

    if (isLoading) {
        return <div className='flex justify-center items-center gap-20 max-w-6xl mx-auto h-screen'>
            <Spinner color="success" />
        </div>
    }

    if (!authStatus) {
        router.push('/sign-in');
    }

    return (
        <div>
           <ProfilePage userEmail={userEmail}></ProfilePage>
        </div>
    )
}
