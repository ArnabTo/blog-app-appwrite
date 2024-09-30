'use client';
import authServices from "@/app/appwrite/auth";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Image, Avatar, Switch, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CustomButton } from "../custom/CustomButton";
import ThemeSwitch from "../custom/ThemeSwitch";
import useUser from "@/hooks/useUser";
import { useTheme } from "next-themes";

const NavigationBar = () => {
    
    const { user, profileAvatar, handleLogout } = useUser();
    
    const { theme } = useTheme();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "Blogs",
            link: "/blogs"
        },
        {
            name: "Products",
            link: "/products"
        },
        {
            name: "Pricing",
            link: "/pricing"
        },
        {
            name: "Prodcast",
            link: "/prodcast"
        }
    ];
    const menuItems = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "Profile",
            link: `/profile/${user?.email}`
        },
        {
            name: "Dashboard",
            link: "/dashboard"
        },
        {
            name: "Blogs",
            link: "/blogs"
        },
        {
            name: "Products",
            link: "/products"
        },
        {
            name: "Prodcast",
            link: "/prodcast"
        },
        {
            name: "Log Out",
            link: "/logout"
        }
    ]

    return (

        <Navbar onMenuOpenChange={setIsMenuOpen} className=" bg-transparent">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-xl text-inherit">BlogVerse</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {navItems.map((item, index) => (
                    <NavbarItem key={`${item}-${index}`}>
                        <Link
                            className={`font-bold hover:text-textcolor  transition-all delay-100 ${theme === 'dark' ? 'text-secondary hover:bg-secondary hover:text-textcolor' : 'text-textcolor hover:bg-black hover:text-secondary'} hover:rounded-full hover:px-2 py-1`} color="foreground"
                            href={item?.link}
                            size="lg"
                        >
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
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
                                <Link href={`/profile/${user?.email}`} className={`${theme == 'dark' ? 'text-secondary' : 'text-textcolor'}`}>Profile</Link>
                            </DropdownItem>
                            <DropdownItem key="copy">
                                <Link href="/dashboard" className={`${theme == 'dark' ? 'text-secondary' : 'text-textcolor'}`}>Dashboard</Link>
                            </DropdownItem>
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
                                <></>
                                :
                                <Button as={Link} href="/sign-in" className={` ${theme == 'dark' ? 'bg-white text-textcolor' : 'bg-textcolor text-white'} rounded-md font-semibold px-6`} size="md">
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
                      className={`w-full font-bold hover:text-textcolor  transition-all delay-100 ${theme === 'dark' ? 'hover:bg-secondary hover:text-textcolor text-secondary' : 'hover:bg-black hover:text-secondary text-textcolor'} hover:rounded-full hover:px-2 py-1`} color="foreground"
                            href={item?.link}
                            size="lg"
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>

    );
};

export default NavigationBar;