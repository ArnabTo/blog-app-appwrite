'use client'
import { Badge, Button, Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { CircleDot } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Pricingpage() {
    const { theme } = useTheme();
    return (
        <div>
            <div className="max-w-6xl mx-auto py-16">
                <div className="px-2 lg:px-10 space-y-5">
                    <span className="flex flex-col justify-center items-center gap-3">
                        <h1 className="text-5xl font-bold">Pricing</h1>
                        <Chip size="lg" className={`${theme === 'dark' ? 'bg-primary text-textcolor' : 'bg-textcolor text-primary'}`}>Monthly</Chip>
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-3 w-full lg:w-[18rem] xl:w-[22rem] h-fit bg-textcolor p-5 rounded-xl border cursor-pointer group hover:bg-primary-light transition-all hover:border-primary-light">
                            <h1 className="text-text-light dark:text-text-dark group-hover:text-text-dark text-3xl lg:4xl xl:text-5xl font-bold">Free Trial</h1>
                            <p className="text-gray-500 group-hover:text-gray-50 dark:text-gray-300">Perfect for casual readers who want to get a taste of our content without any commitment. With the Free Plan, you will get limited access to our most recent articles every month, along with exposure to ads.</p>
                            <div><p className="text-3xl font-bold text-text-light group-hover:text-text-dark dark:text-text-dark">0$</p></div>
                            <div>
                                <h2 className="font-bold text-text-light group-hover:text-text-dark dark:text-text-dark">Features:</h2>
                                <ul className="space-y-2 text-gray-500 group-hover:text-gray-50 dark:text-gray-300 list-disc px-5">
                                    <li>Read up to 5 articles per month.</li>
                                    <li>Ads will be displayed.</li>
                                    <li>Ads will be displayed.</li>
                                    <li>Great for exploring the blog before deciding on an upgrade.</li>
                                </ul>
                            </div>
                            <Button variant="bordered" color="secondary" className="w-full rounded-md bg-button-light-bg text-button-light-text group-hover:bg-white font-bold group-hover:text-text-light">Get Started</Button>
                        </div>

                        <div className={`space-y-3 w-full lg:w-[18rem] xl:w-[22rem] h-fit border-textcolor border-2 p-5 rounded-lg group group hover:bg-primary-light hover:border-primary-light  transition-all cursor-pointer`}>
                            <h1 className="text-text-light group-hover:text-text-dark  dark:text-text-dark text-3xl lg:4xl xl:text-5xl font-bold">Premium Plan</h1>
                            <p className="text-gray-500 group-hover:text-gray-50 dark:text-gray-300">
                                Our most popular plan for readers who want unlimited access to our content without any interruptions. As a Premium subscriber, you can enjoy an ad-free experience, early access to articles, and dive into our exclusive premium content.
                            </p>
                            <div><p className="text-3xl font-bold text-text-light group-hover:text-text-dark dark:text-text-dark">25$</p></div>
                            <div>
                                <h2 className="font-bold text-text-light group-hover:text-text-dark dark:text-text-dark">Features:</h2>
                                <ul className="space-y-2 text-gray-500 group-hover:text-gray-50 dark:text-gray-300 list-disc px-5">
                                    <li>Unlimited access to all articles</li>
                                    <li>Ad-free experience for distraction-free reading..</li>
                                    <li>Access to premium, in-depth content not available in the Free Plan.</li>
                                    <li>Early access to new blog posts.</li>
                                    <li>Participation in members-only discussions or events.</li>
                                </ul>
                            </div>
                          <Link href={`/checkout/${25}`}> <Button variant="bordered" color="secondary" className="w-full rounded-md border-textcolor text-textcolor bg-button-light-bg text-button-light-text hover:bg-button-light-hover group-hover:bg-white group-hover:text-text-light font-bold">Get Started</Button></Link>
                        </div>

                        <div className="space-y-3 w-full lg:w-[18rem] xl:w-[22rem]  h-fit border-textcolor border-2 p-5 rounded-lg group group  hover:bg-primary-light transition-all hover:border-primary-light cursor-pointer">
                            <h1 className="text-text-light group-hover:text-text-dark  dark:text-text-dark text-3xl lg:4xl xl:text-5xl font-bold">Business/Pro Plan</h1>
                            <p className="text-gray-500 group-hover:text-gray-50 dark:text-gray-300">
                                Designed for professionals and businesses who want to take full advantage of our content and services. This plan includes all Premium features, plus downloadable resources, personalized content, and collaboration opportunities to help businesses grow through tailored content or sponsorships.
                            </p>
                            <div><p className="text-3xl font-bold text-text-light group-hover:text-text-dark dark:text-text-dark">35$</p></div>
                            <div>
                                <h2 className="font-bold text-text-light group-hover:text-text-dark dark:text-text-dark">Features:</h2>
                                <ul className="space-y-2 text-gray-500 group-hover:text-gray-50 dark:text-gray-300 list-disc px-5">
                                    <li>All Premium Plan features included.</li>
                                    <li>Download exclusive resources like e-books, guides, and research reports.</li>
                                    <li>White-label content you can rebrand for your own use.</li>
                                    <li>Sponsored blog posts for your brand or business.</li>
                                    <li>One-on-one consultation for personalized advice or content collaboration.</li>
                                    <li>Product selling and marketing support</li>
                                </ul>
                            </div>
                            <Link href={`/checkout/${35}`}> <Button variant="bordered" color="secondary" className="w-full rounded-md border-textcolor text-textcolor bg-button-light-bg text-button-light-text hover:bg-button-light-hover group-hover:bg-white group-hover:text-text-light font-bold">Get Started</Button></Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
