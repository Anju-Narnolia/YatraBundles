// import Info from "../components/Infor"
// import girl from "../asset/girl.png";
import { GraduationCap, Info, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function Hero() {

    return (
        <div className="">
            <section className="relative w-full h-[50rem] flex flex-col md:flex-row  text-black">
                <div className="absolute inset-0">
                    <Image
                        src="/female-hiker-with-backpack-taking-break-high-hill.jpg"
                        alt="Spiritual travel background"
                        fill
                        priority
                    />
                    {/* Optional gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-l from-orange-400/50 via-orange-500/20 to-orange-400/50"></div>
                </div>


                <div className="z-100 w-1/2 ">
                    <div className="absolute left-90 -bottom-20  ">
                        <Image
                            src="/full-shot-smiley-family-with-baggage.png"
                            alt="family"
                            width={500}
                            height={500}
                            priority
                        /></div>
                    {/* Rating Badge */}
                    <div className="absolute md:bottom-10 max-w-xl md:left-10 bottom-10 left-5 bg-white md:px-6 md:py-8 p-2 rounded-xl shadow-lg flex items-center gap-3">
                        <span className="text-green-500 text-3xl md:text-6xl font-bold">4.9</span>
                        <div>
                            <div className="flex space-x-1">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <Star key={index} className="text-yellow-400 fill-yellow-400 md:w-6 md:h-6 w-4 h-4" />
                                ))}
                            </div>
                            <p className="text-gray-700 font-medium text-md md:text-xl">Traveler Rating</p></div>
                    </div>
                </div>
                <div className="relative z-10 flex flex-col gap-6 py-10 pl-30 md:py-20 justify-center md:text-start text-center">
                    <h1 className="md:text-7xl text-4xl font-bold leading-12 md:leading-22 text-black">
                        Spiritual Journeys <br />
                        <span className="relative text-orange-500 font-bold inline-block">
                            Begin Here
                            {/* <!-- Top underline: short + slight curve --> */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 30"
                                className="absolute md:-bottom-2 bottom-0 md:-left-20 w-full h-2 md:h-6">
                                <path d="M2 20 Q 125 10, 448 20"
                                    className="stroke-orange-500" strokeWidth="5" fill="none" />
                            </svg>

                            {/* <!-- Bottom underline: longer + sits lower --> */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 40"
                                className="absolute md:-bottom-5 -bottom-3 md:-left-0 w-full md:h-6">
                                <path d="M2 25 Q 150 10, 798 25"
                                    className="stroke-orange-500" strokeWidth="5" fill="none" />
                            </svg>
                        </span>
                        {" "}
                        With <br></br>YatraBundle
                    </h1>
                    <p className="text-gray-800 leading-relaxed font-light text-base max-w-xl">
                        If your travel plans aren’t going as smoothly as you hoped, it’s time for YatraBundles.
                        Get personalized, hassle-free travel packages curated by travel experts to help you explore
                        more and worry less. Our bundles are designed to save you time, money, and stress, putting your perfect trip within reach.
                    </p>
                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row gap-4 mt-2 items-center">
                        <Link href="/destinations" ><button className="px-6 py-3 rounded-full  bg-white text-orange-500  hover:bg-orange-100 transition shadow-[4px_4px_15px_rgba(241,113,113,0.6)]">
                            EXPLORE PACKAGES
                        </button></Link>
                        <Link href="/contact" ><button className="px-6 py-3 rounded-full bg-orange-500 text-white  hover:bg-orange-400 transition shadow-[4px_4px_15px_rgba(241,113,113,0.6)]">
                            CONTACT US
                            </button></Link>
                    </div>
                </div>
            </section >

        </div >)
}