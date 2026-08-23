import { ArrowRight } from 'lucide-react';
import { Navbar } from "../components/Navbar"
import { Footer } from "./footer"
import { Link } from 'react-router-dom';
import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from '../utils/gsapConfig';
import { FAQCustomer } from '../components/FAQCustomer';


const MarqueeItem = () => (
    <div className="marque flex items-center gap-3 shrink-0">
        <h1 className="text-2xl whitespace-nowrap">
            THE ALMIGHTY WAY
        </h1>

        <div className="w-10 h-10 rounded-full bg-black"></div>
    </div>
);

export const Home = () => {

    const marqueeRef = useRef(null);

    useLayoutEffect(() => {

        const ctx = gsap.context(() => {
            const tween = gsap.to(".move", {
                xPercent: -50,
                repeat: -1,
                duration: 15,
                ease: "none",
            });

            const handleWheel = (e) => {

                if (e.deltaY < 0) {

                    gsap.to(tween, {
                        timeScale: 1,
                        duration: 0.3
                    });

                } else {

                    gsap.to(tween, {
                        timeScale: -1,
                        duration: 0.3
                    });

                }

            };

            window.addEventListener("wheel", handleWheel, {
                passive: true
            });

            return () => {

                window.removeEventListener("wheel", handleWheel);

            };

        }, marqueeRef);

        return () => ctx.revert();

    }, []);



    return (<>

        <section className="heroSection relative w-full h-screen ">
            <Navbar />

            <div className="w-full h-[85vh] flex flex-col lg:flex-row font-gilroySemiBold ">

                <div className="tagLine lg:w-[60%] flex flex-col justify-center items-center h-[40vh] lg:h-[85vh] ">

                    <h1 className="text-[1.8rem]/10 lg:text-[3.2rem]/15 tracking-tighter text-center font-black">Cravings Don't Wait and Neither Should You!</h1>

                    <div className="w-full flex gap-2 text-sm lg:text-xl justify-center ">
                        <h1 className="font-bold">Your City.</h1>
                        <h1 className="font-bold">Your Stores.</h1>
                        <h1 className="font-bold">Delivered Fast.</h1>
                    </div>

                </div>

                <div className=" relative lg:w-[40%] h-[60vh] lg:h-[85vh] flex items-center justify-center">

                    <div className="absolute bottom-10 lg:left-20 w-60 h-60 lg:w-80 lg:h-80 bg-primary-bg2-color  shadow-2xl rounded-full"></div>

                    <div className="absolute w-[70%] lg:w-[80%] z-10">
                        <img src="/images/delivery boy (1).png" alt="" />
                    </div>
                </div>
            </div>

        </section>

        {/* why Almighty */}

        <section className="w-full min-h-screen flex flex-col gap-5 lg:h-screen bg-secondary-bg-color overdlow-auto">
            <h1 className="text-[2.4rem] lg:text-[4.5rem] text-center">Why Almighty ?</h1>

            <div className="w-full lg:h-[85vh] gap-5 flex flex-col lg:flex-row items-center justify-center">

                <div className=" w-[75vw] lg:w-[25vw] h-[80%] flex flex-col justify-between rounded-2xl shadow-xl bg-amber-50 p-4 border-4 border-white">
                    <div>
                        <h1 className="text-2xl">Offline Prices</h1>
                        <p className="text-partner-text2-color text-sm py-2">Experience the convenience of online ordering without the premium price tag. We bring you authentic offline prices from trusted local restaurants.</p>
                    </div>
                    <div className="w-full flex justify-center">
                        <img className="w-60 h-full" src="/images/discount.png" />
                    </div>
                </div>

                <div className=" w-[75vw] lg:w-[25vw] h-[80%] rounded-2xl flex flex-col justify-between shadow-xl p-4 bg-amber-50 border-4 border-white">
                    <div className="">
                        <h1 className="text-2xl">Earn Flat 1% on Every Order</h1>
                        <p className="text-partner-text2-color text-sm py-2">Earn 100 Almighty Coins on Every ₹100 Spend. 100 Almighty Coin = ₹1</p>
                    </div>
                    <div className="w-full flex justify-center">
                        <img className="w-60 h-full" src="/images/discount (1).png" />
                    </div>

                </div>

                <div className=" w-[75vw] lg:w-[25vw] h-[80%] flex flex-col justify-between rounded-2xl shadow-xl bg-amber-50 p-4 border-4 border-white">
                    <div className="">
                        <h1 className="text-2xl">Save On Every Spend</h1>
                        <p className="text-partner-text2-color text-sm py-2">Why pay more for the same meal? Order from your favorite local restaurants at offline prices and enjoy fresh, delicious food.</p>
                    </div>
                    <div className="w-full flex justify-center">
                        <img className="w-60 h-full" src="/images/piggy bank.png" />
                    </div>
                </div>
            </div>

        </section>

        {/*  */}
        <section className="w-full h-[150vh] lg:h-screen lg:relative flex flex-col justify-center bg-secondary-bg-color pt-10 lg:pt-0 ">

            <div className="lg:absolute lg:top-10 w-full lg:h-[8vh] flex gap-3 p-1 justify-center items-center">
                <h1 className=" text-2xl lg:text-5xl text-secondary-bg-color bg-primary-bg2-color rounded-lg px-4 py-1">GET READY TO SAVE MORE</h1>
            </div>

            <div className="w-full h-full lg:h-[90vh]  flex flex-col lg:flex-row gap-5 justify-center items-center">

                <div className="w-[60%] h-[25vh] lg:w-[23%] lg:h-[40vh] bg-secondary-bg2-color text-secondary-bg-color rounded-2xl  px-4 py-4">
                    <div className="w-full h-[70%] flex flex-col gap-1 justify-start">
                        <h1 className="text-lg lg:text-2xl">FOOD DELIVERY</h1>
                        <p className="text-sm">FROM RESTAURANTS</p>
                        <span className=" px-4 py-1 w-fit bg-primary-bg2-color text-black rounded-xl">UPTO 60% OFF</span>
                    </div>
                    <div className="w-12 h-12 rounded-full flex justify-center items-center bg-primary-bg2-color text-black">
                        <ArrowRight size="2rem" />
                    </div>
                </div>
                <div className="w-[60%] h-[25vh] lg:w-[23%] lg:h-[40vh] bg-secondary-bg2-color text-secondary-bg-color rounded-2xl  px-4 py-4">
                    <div className="w-full h-[70%] flex flex-col gap-1 justify-start">
                        <h1 className="text-lg lg:text-2xl">INSTANT GROCERY</h1>
                        <p className="text-sm">FROM YOUR LOCAL STORE</p>
                        <span className=" px-4 py-1 w-fit bg-primary-bg2-color text-black rounded-xl">UPTO 60% OFF</span>
                    </div>
                    <div className="w-12 h-12 rounded-full flex justify-center items-center bg-primary-bg2-color text-black">
                        <ArrowRight size="2rem" />
                    </div>
                </div>
                <div className="w-[60%] h-[25vh] lg:w-[23%] lg:h-[40vh] bg-secondary-bg2-color text-secondary-bg-color rounded-2xl  px-4 py-4">
                    <div className="w-full h-[70%] flex flex-col gap-1 justify-start">
                        <h1 className="text-lg lg:text-2xl">INSTANT MEDICINE</h1>
                        <p className="text-sm">FROM YOUR LOCAL MEDICAL</p>
                        <span className=" px-4 py-1 w-fit bg-primary-bg2-color text-black rounded-xl">UPTO 60% OFF</span>
                    </div>
                    <div className="w-12 h-12 rounded-full flex justify-center items-center  bg-primary-bg2-color text-black">
                        <ArrowRight size="2rem" />
                    </div>
                </div>
                <div className="w-[60%] h-[25vh] lg:w-[23%] lg:h-[40vh] bg-secondary-bg2-color text-secondary-bg-color rounded-2xl px-4 py-4">
                    <div className="w-full h-[70%] flex flex-col gap-1 justify-start">
                        <h1 className="text-lg lg:text-2xl">INSTANT ELECTRONICS</h1>
                        <p className="text-sm">FROM YOUR LOCAL SHOP</p>
                        <span className=" px-4 py-1 w-fit bg-primary-bg2-color text-black rounded-xl">UPTO 60% OFF</span>
                    </div>
                    <div className="w-12 h-12 rounded-full flex justify-center items-center bg-primary-bg2-color text-black">
                        <ArrowRight size="2rem" />
                    </div>
                </div>
            </div>

        </section>

        {/* INFO SECTION */}
        <section className="relative w-full  lg:h-screen flex flex-col justify-center p-2 bg-secondary-bg-color">

            <FAQCustomer />

        </section>

        <section ref={marqueeRef} className="relative w-full overflow-hidden pb-8 bg-secondary-bg-color">

            <div className="absolute left-0 top-0 z-20 h-full w-32 bg-linear-to-r from-secondary-bg-color to-transparent pointer-events-none" />

            <div className="absolute right-0 top-0 z-20 h-full w-32 bg-linear-to-l from-secondary-bg-color to-transparent pointer-events-none" />

            <div className="move flex gap-4 bg-primary-bg2-color py-2 overflow-hidden">

                {
                    Array.from({ length: 15 }).map((_, index) => {
                        return <MarqueeItem key={index} />
                    })
                }

            </div>
        </section>

        {/* CTA section */}
        <section className="w-full h-screen bg-secondary-bg-color flex justify-center items-center px-4">

            {/* <div className="w-full h-[20vh] text-center text-secondary-bg2-color ">
                <h1 className="uppercase text-4xl">Save with</h1>
                <h1 className="uppercase text-[4.5rem]/15 ">Almighty</h1>
            </div> */}

            <div className="w-[90vw] h-[80vh] flex flex-col justify-center gap-5 px-20 bg-linear-to-t from-secondary-bg-color to-white border-primary-bg2-color border-4 rounded-2xl">

                <div>
                    <h1 className="text-3xl">Eat More. Spend Less.</h1>
                    <p className="text-partner-text2-color">Download the app right now to save your money.</p>
                </div>

                <div className="w-full">
                    <div className="w-full flex flex-col gap-4">
                        <Link className="bg-primary-bg2-color w-60 text-center text-xl px-2 py-1 rounded-2xl " to="/">Download Android</Link>
                        <Link className="bg-primary-bg2-color w-60 text-center text-xl px-2 py-1 rounded-2xl " to="/">Download IOS</Link>
                    </div>
                </div>
            </div>

        </section>


    </>)
}