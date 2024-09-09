import { Input } from "@nextui-org/input";
import Image from "next/image";
import Logo from '../../../public/logo.png'


const Footer = () => {
    return (
        <footer className="px-1 py-1">
            <div className="bg-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-center py-16 px-10 rounded-lg">
                <div>
                    <div className="flex items-center gap-3 mb-4"> <Image src={Logo} width={50} height={50} alt="logo"/>
                        <h2 className="text-3xl text-secondary font-extrabold">BlogVerse</h2></div>
                    <p className="text-gray-500">BlogVerse is a sleek platform for sharing ideas and stories, offering easy-to-use tools for writers to create and connect with readers.</p>
                    <p>&copy; 2024 BlogVerse. All copyrights reserved</p>
                </div>
                <div className="flex justify-start lg:justify-center">
                    <ul>
                        <li><b className="text-secondary text-xl">About</b></li>
                        <li className="text-lg"><a href="#">About us</a></li>
                        <li className="text-lg"><a href="#">Blog</a></li>
                    </ul>
                </div>
                <div className="flex justify-start lg:justify-center">
                    <ul>
                        <li className="text-lg"><b className="text-white text-xl">Support</b></li>
                        <li className="text-lg"><a href="#">Contact Us</a></li>
                        <li className="text-lg"><a href="#">FAQ</a></li>
                    </ul>
                </div>
                <div>
                    <div>
                        <b className="text-xl text-secondary">Get Updates</b>
                        <div className="relative mt-2">
                            <input className="bg-secondary w-full py-3 rounded-lg"/>
                            <button className="absolute w-1/4 right-2 top-1 text-textcolor bg-primary py-2 rounded-lg">Subscribe</button>
                        </div>
                    </div>
                    <div className="mb-10">
                        <div></div>
                    </div>
                    <div className="flex gap-3">
                        <p className="text-secondary">Privacy Policy</p>
                        <p className="text-secondary">Terms of Service</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;