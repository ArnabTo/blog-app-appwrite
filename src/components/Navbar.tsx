'use client';
import authServices from "@/app/appwrite/auth";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Image, Avatar, Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/progress";
import { CustomButton } from "./custom/CustomButton";
import dataBaseServices from "@/app/appwrite/database";
import storageServices from "@/app/appwrite/storage";
import { useAppSelector } from "@/lib/hooks";
import StoreProvider from "@/app/StoreProvider";
import { MoonIcon, SunIcon } from "lucide-react";
import ThemeSwitch from "./custom/ThemeSwitch";

const NavigationBar = () => {

    type User = {
        name: string;
        email: string;
    }
    const [user, setUser] = useState<User | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userData, setUserData] = useState<User | null>(null);
    const [currentUserData, setCurrentUserData] = useState<User | null>(null);
    const [profileAvatar, setProfileAvatar] = useState<string | null>(null);
    const [loader, setLoader] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems = [
        "Profile",
        "Dashboard",
        "Blogs",
        "Log Out",
    ];


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
                    const currentUserData = userData.documents.filter((doc) => doc.email == userEmail)
                    setCurrentUserData(currentUserData);
                    if (currentUserData) {
                        currentUserData.map(async (doc) => {
                            const bucketId = doc.avatarBucketId;
                            const fildId = doc.avatarId
                            const getUserImage = await storageServices.getFileUrl({ bucketId: bucketId, fileId: fildId });
                            setProfileAvatar(getUserImage);
                        })


                        const userImagesPromises = currentUserData.map(async (doc) => {
                            const bucketId = doc.avatarBucketId;
                            const fileId = doc.avatarId;
                            const fileUrl = await storageServices.getFileUrl({ bucketId, fileId });
                            return fileUrl;
                        });

                        const userImages = await Promise.all(userImagesPromises);
                        setProfileAvatar(userImages);
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
    // console.log(user, 'userAuthData');
    // console.log(currentUserData, 'currentUserData');
    // console.log(userEmail, 'userEmail');

    return (
        <StoreProvider>
            <Navbar onMenuOpenChange={setIsMenuOpen} className="shadow-md">
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand>
                        {/* <AcmeLogo /> */}
                        <p className="font-bold text-inherit">ACME</p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem isActive>
                        <Link href="#">
                            Home
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#"  >
                            About Us
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#"  >
                            Blogs
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Products
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        {
                            profileAvatar ? (
                                <Avatar
                                    src={profileAvatar}
                                />
                            ) : (
                                <></>
                            )
                        }
                    </NavbarItem>
                    <NavbarItem>
                        <div className="flex items-center gap-4">
                            {
                                user ?
                                    <CustomButton onClick={handleLogout} color="black" size="md">
                                        Sign out
                                    </CustomButton>
                                    :
                                    <CustomButton as={Link} href="/sign-in" color="black" size="md">
                                        Sign In
                                    </CustomButton>
                            }
                            <ThemeSwitch />
                        </div>
                    </NavbarItem>
                </NavbarContent>
                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                color={
                                    index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                                }
                                className="w-full"
                                href="#"
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
        </StoreProvider>
    );
};

export default NavigationBar;