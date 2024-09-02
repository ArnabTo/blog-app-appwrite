'use client';
import authServices from "@/app/appwrite/auth";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/progress";
import { CustomButton } from "./custom/CustomButton";
const NavigationBar = () => {

    type User = {
        name: string;
        email: string;
    }
    const [user, setUser] = useState<User | null>(null);
    const [loader, setLoader] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];


    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await authServices.getUser();
                if (user) {
                    setUser(user);
                }
            } catch (error) {
                console.log(error)
                setUser(null);
            }
        }
        checkUser()
    }, []);

    const handleLogout = async () => {
        try {
            await authServices.logOut();
            setUser(null); // Clear user state after logging out
        } catch (error) {
            console.log("Error logging out:", error);
        }
    };
    console.log(user)
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
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
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
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