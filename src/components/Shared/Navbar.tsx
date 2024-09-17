'use client';
import authServices from "@/app/appwrite/auth";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Image, Avatar, Switch, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CustomButton } from "../custom/CustomButton";
import ThemeSwitch from "../custom/ThemeSwitch";
import useUser from "@/hooks/useUser";
import { useTheme } from "next-themes";

const NavigationBar = () => {

    const { theme } = useTheme();
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems = [
        "Profile",
        "Dashboard",
        "Blogs",
        "Log Out",
    ];


    const { user, profileAvatar, handleLogout } = useUser();
    return (

        <Navbar onMenuOpenChange={setIsMenuOpen} className=" bg-transparent">
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
                    <Link className={`font-bold hover:text-textcolor  transition-all delay-100 ${ theme === 'dark' ? 'hover:bg-secondary' : 'hover:bg-black' } ${ theme === 'dark' ? 'hover:text-textcolor' : 'hover:text-secondary'} hover:rounded-full hover:px-2 py-1 ${theme === 'dark' ? 'text-secondary' : 'text-textcolor'} `} href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className={`font-bold hover:text-textcolor  transition-all delay-100 ${ theme === 'dark' ? 'hover:bg-secondary' : 'hover:bg-black' } ${ theme === 'dark' ? 'hover:text-textcolor' : 'hover:text-secondary'} hover:rounded-full hover:px-2 py-1 ${theme === 'dark' ? 'text-secondary' : 'text-textcolor'} `} color="foreground" href="#"  >
                        About Us
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className={`font-bold hover:text-textcolor  transition-all delay-100 ${ theme === 'dark' ? 'hover:bg-secondary' : 'hover:bg-black' } ${ theme === 'dark' ? 'hover:text-textcolor' : 'hover:text-secondary'} hover:rounded-full hover:px-2 py-1 ${theme === 'dark' ? 'text-secondary' : 'text-textcolor'} `} color="foreground" href="#"  >
                        Blogs
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className={`font-bold hover:text-textcolor  transition-all delay-100 ${ theme === 'dark' ? 'hover:bg-secondary' : 'hover:bg-black' } ${ theme === 'dark' ? 'hover:text-textcolor' : 'hover:text-secondary'} hover:rounded-full hover:px-2 py-1 ${theme === 'dark' ? 'text-secondary' : 'text-textcolor'} `} color="foreground" href="#"  >
                        Blogs
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className={`font-bold hover:text-textcolor  transition-all delay-100 ${ theme === 'dark' ? 'hover:bg-secondary' : 'hover:bg-black' } ${ theme === 'dark' ? 'hover:text-textcolor' : 'hover:text-secondary'} hover:rounded-full hover:px-2 py-1 ${theme === 'dark' ? 'text-secondary' : 'text-textcolor'} `} color="foreground" href="#">
                        Products
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <ThemeSwitch />
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Dropdown>
                        <DropdownTrigger>
                            {
                                profileAvatar ? (
                                    <Avatar
                                        className="cursor-pointer" src={profileAvatar}
                                    />
                                ) : (
                                    <></>
                                )
                            }
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="profile">
                                <Link href="/user-profile" className={`${theme == 'dark' ? 'text-secondary' : 'text-textcolor'}`}>Profile</Link>
                            </DropdownItem>
                            <DropdownItem key="copy">
                                <Link href="/dashboard" className={`${theme == 'dark' ? 'text-secondary' : 'text-textcolor'}`}>Dashboard</Link>
                            </DropdownItem>
                            <DropdownItem key="edit">Edit file</DropdownItem>
                            {/* <DropdownItem key="sign out">
                                    <CustomButton onClick={handleLogout} color="black" size="md">
                                        Sign out
                                    </CustomButton>
                                </DropdownItem> */}
                            <DropdownItem onClick={handleLogout} key="delete" className="text-danger" color="danger">
                                Sign out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
                <NavbarItem>
                    <div className="flex items-center gap-4">
                        {
                            user ?
                                // <CustomButton onClick={handleLogout} color="black" size="md">
                                //     Sign out
                                // </CustomButton>
                                <></>
                                :
                                <Button as={Link} href="/sign-in" className={` ${theme == 'dark' ? 'bg-white' : 'bg-textcolor'} ${ theme == 'dark' ? 'text-textcolor' : 'text-white' } rounded-md font-semibold px-6`} size="md">
                                    Sign In
                                </Button>
                        }

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

    );
};

export default NavigationBar;