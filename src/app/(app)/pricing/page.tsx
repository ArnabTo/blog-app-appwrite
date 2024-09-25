'use client'
import { Badge, Button, Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { CircleDot } from "lucide-react";
import { useTheme } from "next-themes";

export default function Pricingpage() {
    const { theme } = useTheme();
    return (
        <div>
            <div className="max-w-6xl mx-auto py-16">
                <div className="px-2 lg:px-10 space-y-5">
                    <span className="flex flex-col justify-center items-center gap-3">
                        <h1 className="text-5xl font-bold">Pricing</h1>
                        <Chip size="lg" className={`${theme === 'dark' ? 'bg-primary' : 'bg-textcolor'} ${theme === 'dark' ? 'text-textcolor' : 'text-primary'} `}>Monthly</Chip>
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-3 w-full lg:w-[18rem] xl:w-[22rem] h-fit bg-textcolor text-[#d1cfcf] p-5 rounded-lg cursor-pointer">
                            <h1 className="text-3xl lg:4xl xl:text-5xl font-bold ">Free Trial</h1>
                            <p className="text-[#d1cfcf]">Perfect for casual readers who want to get a taste of our content without any commitment. With the Free Plan, you will get limited access to our most recent articles every month, along with exposure to ads.</p>
                            <div><p className="text-3xl font-bold">0$</p></div>
                            <div>
                                <h2 className="font-bold">Features:</h2>
                                <ul className="space-y-2 text-[#d1cfcf] list-disc px-5">
                                    <li>Read up to 5 articles per month.</li>
                                    <li>Ads will be displayed.</li>
                                    <li>Ads will be displayed.</li>
                                    <li>Great for exploring the blog before deciding on an upgrade.</li>
                                </ul>
                            </div>
                            <Button variant="bordered" color="secondary" className="w-full rounded-md hover:bg-primary hover:text-textcolor font-bold">Get Started</Button>
                        </div>

                        <div className={`space-y-3 w-full lg:w-[18rem] xl:w-[22rem] h-fit ${theme == 'dark' ? 'bg-primary' : 'text-textcolor'}  border-textcolor border-2 p-5 rounded-lg group hover:bg-textcolor  transition-all cursor-pointer`}>
                            <h1 className="text-3xl lg:4xl xl:text-5xl font-bold text-textcolor group-hover:text-[#d1cfcf] ">Premium Plan</h1>
                            <p className={'text-textcolor group-hover:text-[#d1cfcf]'}>
                                Our most popular plan for readers who want unlimited access to our content without any interruptions. As a Premium subscriber, you can enjoy an ad-free experience, early access to articles, and dive into our exclusive premium content.
                            </p>
                            <div><p className="text-3xl font-bold text-textcolor group-hover:text-[#d1cfcf]">25$</p></div>
                            <div>
                                <h2 className="font-bold text-textcolor group-hover:text-[#d1cfcf]">Features:</h2>
                                <ul className="space-y-2 text-textcolor group-hover:text-[#d1cfcf] list-disc px-5">
                                    <li>Unlimited access to all articles</li>
                                    <li>Ad-free experience for distraction-free reading..</li>
                                    <li>Access to premium, in-depth content not available in the Free Plan.</li>
                                    <li>Early access to new blog posts.</li>
                                    <li>Participation in members-only discussions or events.</li>
                                </ul>
                            </div>
                            <Button variant="bordered" color="secondary" className="w-full rounded-md border-textcolor text-textcolor group-hover:border-[#d1cfcf] group-hover:text-[#d1cfcf] hover:bg-primary font-bold">Get Started</Button>
                        </div>

                        <div className="space-y-3 w-full lg:w-[18rem] xl:w-[22rem]  h-fit bg-primary border-textcolor border-2 p-5 rounded-lg group hover:bg-textcolor cursor-pointer">
                            <h1 className="text-3xl lg:4xl xl:text-5xl  font-bold text-textcolor group-hover:text-[#d1cfcf] ">Business/Pro Plan</h1>
                            <p className={'text-textcolor group-hover:text-[#d1cfcf]'}>
                                Designed for professionals and businesses who want to take full advantage of our content and services. This plan includes all Premium features, plus downloadable resources, personalized content, and collaboration opportunities to help businesses grow through tailored content or sponsorships.
                            </p>
                            <div><p className="text-3xl font-bold text-textcolor group-hover:text-[#d1cfcf]">35$</p></div>
                            <div>
                                <h2 className="font-bold text-textcolor group-hover:text-[#d1cfcf]">Features:</h2>
                                <ul className="space-y-2 text-textcolor group-hover:text-[#d1cfcf] list-disc px-5">
                                    <li>All Premium Plan features included.</li>
                                    <li>Download exclusive resources like e-books, guides, and research reports.</li>
                                    <li>White-label content you can rebrand for your own use.</li>
                                    <li>Sponsored blog posts for your brand or business.</li>
                                    <li>One-on-one consultation for personalized advice or content collaboration.</li>
                                    <li>Product selling and marketing support</li>
                                </ul>
                            </div>
                            <Button variant="bordered" color="secondary" className="w-full rounded-md border-textcolor text-textcolor group-hover:border-[#d1cfcf] group-hover:text-[#d1cfcf] hover:bg-primary font-bold">Get Started</Button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
