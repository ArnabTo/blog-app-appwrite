import authServices from "@/app/appwrite/auth";
import dataBaseServices from "@/app/appwrite/database";
import storageServices from "@/app/appwrite/storage";
import { useEffect, useState } from "react";


const useUser = () => {
    
    interface User {
        $id: string;
        $createdAt: string;
        $updatedAt: string;
        accessedAt: string;
        email: string;
        emailVerification: boolean;
        labels: any[];
        mfa: boolean;
        name: string;
        passwordUpdate: string;
        phone: string;
        phoneVerification: boolean;
        prefs: any;
        registration: string;
        status: boolean;
        targets: any[];
    }
    interface UserType {
        avatarBucketId: string;
        avatarId: string;
        email: string;
        name: string;
    }
    const [user, setUser] = useState<User | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userData, setUserData] = useState<User | null>(null);
    const [currentUserData, setCurrentUserData] = useState<UserType | null>(null);
    const [profileAvatar, setProfileAvatar] = useState<string | null>(null);
    const [loader, setLoader] = useState(false);


    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await authServices.getUser();
                if (user) {
                    setUser(user);
                    setUserEmail(user.email);
                }
            } catch (error) {
                console.log(error)
                setUser(null);
            }
        }
        checkUser();

    }, [setUserData]);

    useEffect(() => {
        if (!userEmail) {
            return
        }
        const getUserData = async () => {
            setLoader(true);
            try {
                const userData = await dataBaseServices.getData();
                if (userData) {
                    const currentUserData = userData.documents.find((doc) => doc.email == userEmail)

                    const requiredUserData = {
                        avatarBucketId: currentUserData?.avatarBucketId,
                        avatarId: currentUserData?.avatarId,
                        email: currentUserData?.email,
                        name: currentUserData?.name,
                    }
                    setCurrentUserData(requiredUserData);
                    if (currentUserData) {
                        const bucketId = currentUserData.avatarBucketId;
                        const fildId = currentUserData.avatarId
                        const getUserImage = await storageServices.getFileUrl({ bucketId: bucketId, fileId: fildId });
                        if (getUserImage) {
                            setProfileAvatar(getUserImage?.href);
                        }

                        // const userImagesPromises = currentUserData.map(async (doc) => {
                        //     const bucketId = doc.avatarBucketId;
                        //     const fileId = doc.avatarId;
                        //     const fileUrl = await storageServices.getFileUrl({ bucketId, fileId });
                        //     return fileUrl;
                        // });

                        // const userImages = await Promise.all(userImagesPromises);
                        // setProfileAvatar(userImages);
                    }
                }

            } catch (error) {
                console.log(error)
                setCurrentUserData(null);
            } finally {
                setLoader(false);
            }

        }

        getUserData();
    }, [userEmail]);
    const handleLogout = async () => {
        try {
            await authServices.logOut();
            setUser(null); // Clear user state after logging out
            window.location.reload();
        } catch (error) {
            console.log("Error logging out:", error);
        }
    };


    return {user, currentUserData, profileAvatar, loader, handleLogout};
};

export default useUser;