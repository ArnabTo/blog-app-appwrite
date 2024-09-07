import { CircleDollarSign, Map } from 'lucide-react'
import React from 'react'

export default function AdSection() {
    return (
        <div className="py-4 px-2 mx-auto sm:py-4 lg:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 h-full">
                <div className="col-span-2 sm:col-span-1 md:col-span-2 h-80 md:h-[600px] flex flex-col"> {/* Increased height */}
                    <div className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-20 flex-grow group"> {/* Adjusted padding-top */}
                        <img src="https://images.pexels.com/photos/18662534/pexels-photo-18662534/free-photo-of-machu-picchu-by-sunrise.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />

                        {/* Backdrop and hover effect */}
                        <div className='absolute inset-0 backdrop-blur-md group-hover:backdrop-blur-0 transition-all duration-500 group-hover:bg-black group-hover:bg-opacity-50'></div>

                        {/* Text content */}
                        <div className='relative translate-y-[30rem] md:translate-y-[55rem] z-10 group-hover:-translate-y-16 md:group-hover:translate-y-44 lg:group-hover:translate-y-64 xl:group-hover:translate-y-72 transition-all duration-500'>
                            <div className="mb-2 p-2 bg-gray-800 bg-opacity-50 rounded-full inline-block z-10">
                                <Map color='white' />
                            </div>
                            <h2 className="text-xl md:text-3xl font-semibold text-secondary">Uncover Hidden <span className='text-primary'>Treasures!</span></h2>
                            <p className="text-base md:text-lg mt-1 text-secondary">From local cuisine to unexplored paths, get tips and insights from real travelers. Plan your next trip like a seasoned adventurer!</p>

                            <button className="mt-4 px-4 py-2 bg-white text-black font-semibold rounded-md">
                            Learn More →
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 sm:col-span-1 md:col-span-2">
                    <div className="group relative flex flex-col overflow-hidden rounded-lg mb-4 h-1/2"> {/* Adjusted padding-top */}
                        <div className="w-full h-full">
                            <div
                                className="relative rounded-xl overflow-hidden bg-cover bg-center bg-no-repeat h-full"
                                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="absolute inset-0 h-full w-full blur-sm object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out')` }}
                            >
                                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
                                <div className="relative lg:top-16 z-10 p-6 text-white">
                                    <div className="mb-2 p-2 bg-gray-800 bg-opacity-50 rounded-full inline-block">
                                        <Map />
                                    </div>
                                    <h2 className="text-2xl font-semibold">Explore Exotic <span className='text-primary'>Destinations</span></h2>
                                    <p className="text-sm mt-1">Discover breathtaking views and hidden gems around the world. Let us guide you to the most exotic locations for your next adventure.</p>

                                    <button className="mt-4 px-4 py-2 bg-white text-sm text-black font-semibold rounded-md">
                                    Book Your Journey Today →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 h-1/2 group">
                        <div className="w-full h-full group">
                            <div
                                className=" relative rounded-xl overflow-hidden bg-cover bg-center bg-no-repeat h-[95%]"
                                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="absolute inset-0 h-full w-full blur-sm object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out')` }}
                            >
                                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
                                <div className="relative lg:top-16 z-10 p-6 text-white">
                                    <div className="mb-2 p-2 bg-gray-800 bg-opacity-50 rounded-full inline-block">
                                        <CircleDollarSign />
                                    </div>
                                    <h2 className="text-2xl font-semibold">Luxury Stays at <span className='text-primary'>Affordable Prices</span></h2>
                                    <p className="text-sm mt-1">From local cuisine to unexplored paths, get tips and insights from real travelers. Plan your next trip like a seasoned adventurer!</p>
                                    <button className="mt-4 px-4 py-2 bg-white text-sm text-black font-semibold rounded-md">
                                    Check Out Deals Now →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
