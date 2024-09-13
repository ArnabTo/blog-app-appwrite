'use client';
import { Input } from "@nextui-org/input";
import Image from "next/image";
import Logo from '../../../public/logo.png'
import { useTheme } from "next-themes";
import { Thasadith } from "next/font/google";


const Footer = () => {

    const { theme } = useTheme();
    return (
        <footer className="px-1 py-1">
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-center py-16 px-10 rounded-lg ${theme === 'dark' ? 'bg-secondary' : 'bg-black'
            }`}>
                <div>
                    <div className="flex items-center gap-3 mb-4"> <Image src={Logo} width={50} height={50} alt="logo"/>
                        <h2 className={`text-3xl text-secondary font-extrabold ${theme === 'dark' ? 'text-textcolor' : 'text-secondary'}`}>BlogVerse</h2></div>
                    <p className="text-gray-500">BlogVerse is a sleek platform for sharing ideas and stories, offering easy-to-use tools for writers to create and connect with readers.</p>
                    <p>&copy; 2024 BlogVerse. All copyrights reserved</p>
                </div>
                <div className="flex justify-start lg:justify-center">
                    <ul>
                        <li><b className={`text-secondary text-xl ${theme === 'dark' ? 'text-textcolor' : 'text-secondary'}`}>About</b></li>
                        <li className="text-lg"><a className={` ${theme === 'dark' ? 'text-textcolor' : 'text-secondary'}`} href="#">About us</a></li>
                        <li className="text-lg"><a className={` ${theme === 'dark' ? 'text-textcolor' : 'text-secondary'}`} href="#">Blog</a></li>
                    </ul>
                </div>
                <div className="flex justify-start lg:justify-center">
                    <ul>
                        <li className="text-lg"><b className={`text-secondary text-xl ${theme === 'dark' ? 'text-textcolor' : 'text-secondary'}`}>Support</b></li>
                        <li className="text-lg"><a className={` ${theme === 'dark' ? 'text-textcolor' : 'text-secondary'}`} href="#">Contact Us</a></li>
                        <li className="text-lg"><a className={` ${theme === 'dark' ? 'text-textcolor' : 'text-secondary'}`} href="#">FAQ</a></li>
                    </ul>
                </div>
                <div className="flex justify-start lg:justify-center">
                    <ul>
                        <li className="text-lg"><b className={`text-secondary text-xl ${theme === 'dark' ? 'text-textcolor' : 'text-secondary'}`}>Support</b></li>
                        <li className="text-lg"><a className={` ${theme === 'dark' ? 'text-textcolor' : 'text-secondary'}`} href="#">Contact Us</a></li>
                        <li className="text-lg"><a className={` ${theme === 'dark' ? 'text-textcolor' : 'text-secondary'}`} href="#">FAQ</a></li>
                    </ul>
                </div>
                <div>
                    <div>
                        <b className={`text-secondary text-xl ${theme === 'dark' ? 'text-textcolor' : 'text-secondary'}`}>Get Updates</b>
                        <div className="relative mt-2">
                            <input className={`w-full py-3 px-3 outline-none rounded-lg ${theme === 'dark' ? 'bg-textcolor' : 'bg-secondary'} ${theme === 'dark' ? 'text-secondary' : 'text-textcolor'} `}/>
                            <button className="absolute w-1/4 right-2 top-1 text-textcolor bg-primary py-2 rounded-lg">Subscribe</button>
                        </div>
                    </div>
                    <div className="mb-10">
                        <div></div>
                    </div>
                    <div className="flex gap-3">
                        <p className={` ${theme === 'dark' ? 'text-textcolor' : 'text-secondary'}`}>Privacy Policy</p>
                        <p className={` ${theme === 'dark' ? 'text-textcolor' : 'text-secondary'}`}>Terms of Service</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;