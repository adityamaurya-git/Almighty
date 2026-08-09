import { ArrowRight } from 'lucide-react';
import { Navbar } from "../components/Navbar"
import { Footer } from "./footer"
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from '../utils/gsapConfig';

export const Home = () => {

    const ticker = useRef(null);
    const tickerText = useRef(null);

    useEffect(() =>{

        window.addEventListener("wheel" , (e) =>{
            if(e.deltaY > 0){
                gsap.to(tickerText.current , {
                    transform : "translateX(-200%)",
                    duration : 4.5,
                    repeat : -1,
                    ease : "none"
                })
                
            }
            else{
                gsap.to(tickerText.current , {
                    transform : "translateX(0%)",
                    duration : 4.5,
                    repeat : -1,
                    ease : "none"
                })
            }
        })

    },[])

   

    return (<>

        <section className="heroSection relative w-full h-screen ">
            <Navbar />

            <div className="w-full h-[85vh] flex font-gilroySemiBold">
                <div className="tagLine w-[60%] flex flex-col justify-center items-center h-[85vh] ">
                    <h1 className="text-[3.2rem]/15 tracking-tighter text-center font-black">Cravings Don't Wait and Neither Should You!</h1>
                    <div className="w-full flex gap-2 text-xl justify-center ">
                        <h1 className="font-bold">Your City.</h1>
                        <h1 className="font-bold">Your Stores.</h1>
                        <h1 className="font-bold">Delivered Fast.</h1>
                    </div>
                </div>
                <div className=" relative w-[40%] h-[85vh] flex items-center justify-center">
                    <div className="absolute bottom-10 left-20 w-80 h-80 bg-primary-bg2-color shadow-2xl rounded-full">

                    </div>
                    <div className="absolute w-[80%] z-10">
                        <img  src="/images/delivery boy (1).png" alt="" />
                    </div>
                </div>
            </div>

        </section>

        {/* why Almighty */}

        <section className="w-full h-screen bg-secondary-bg-color overdlow-auto">
            <h1 className="text-[2rem] lg:text-[4.5rem] text-center">Why Almighty ?</h1>

            <div className="w-full h-[85vh] gap-5 flex flex-col lg:flex-row items-center justify-center">

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
        <section className="w-full h-screen relative flex flex-col justify-center bg-secondary-bg-color">

            <div className="absolute top-10 w-full h-[8vh] flex gap-3 p-1 justify-center items-center">

                <h1 className="text-5xl text-secondary-bg-color bg-primary-bg2-color rounded-lg px-4 py-1">GET READY TO SAVE MORE</h1>

            </div>



            <div className="w-full h-[90vh] flex gap-5 justify-center items-center">
                <div className="w-[23%] h-[40vh] bg-secondary-bg2-color text-secondary-bg-color rounded-2xl  px-4 py-4">
                    <div className="w-full h-[70%] flex flex-col gap-1 justify-start">
                        <h1 className="text-2xl">FOOD DELIVERY</h1>
                        <p className="text-sm">FROM RESTAURANTS</p>
                        <span className=" px-4 py-1 w-fit bg-primary-bg2-color text-black rounded-xl">UPTO 60% OFF</span>
                    </div>
                    <div className="w-12 h-12 rounded-full flex justify-center items-center bg-primary-bg2-color text-black">
                        <ArrowRight size="2rem" />
                    </div>
                </div>
                <div className="w-[23%] h-[40vh] bg-secondary-bg2-color text-secondary-bg-color rounded-2xl  px-4 py-4">
                    <div className="w-full h-[70%] flex flex-col gap-1 justify-start">
                        <h1 className="text-2xl">INSTANT GROCERY</h1>
                        <p className="text-sm">FROM YOUR LOCAL STORE</p>
                        <span className=" px-4 py-1 w-fit bg-primary-bg2-color text-black rounded-xl">UPTO 60% OFF</span>
                    </div>
                    <div className="w-12 h-12 rounded-full flex justify-center items-center bg-primary-bg2-color text-black">
                        <ArrowRight size="2rem" />
                    </div>
                </div>
                <div className="w-[23%] h-[40vh] bg-secondary-bg2-color text-secondary-bg-color rounded-2xl  px-4 py-4">
                    <div className="w-full h-[70%] flex flex-col gap-1 justify-start">
                        <h1 className="text-2xl">INSTANT MEDICINE</h1>
                        <p className="text-sm">FROM YOUR LOCAL MEDICAL</p>
                        <span className=" px-4 py-1 w-fit bg-primary-bg2-color text-black rounded-xl">UPTO 60% OFF</span>
                    </div>
                    <div className="w-12 h-12 rounded-full flex justify-center items-center  bg-primary-bg2-color text-black">
                        <ArrowRight size="2rem" />
                    </div>
                </div>
                <div className="w-[23%] h-[40vh] bg-secondary-bg2-color text-secondary-bg-color rounded-2xl px-4 py-4">
                    <div className="w-full h-[70%] flex flex-col gap-1 justify-start">
                        <h1 className="text-2xl">INSTANT ELECTRONICS</h1>
                        <p className="text-sm">FROM YOUR LOCAL SHOP</p>
                        <span className=" px-4 py-1 w-fit bg-primary-bg2-color text-black rounded-xl">UPTO 60% OFF</span>
                    </div>
                    <div className="w-12 h-12 rounded-full flex justify-center items-center bg-primary-bg2-color text-black">
                        <ArrowRight size="2rem" />
                    </div>
                </div>
            </div>

        </section>

        {/*  */}
        <section className="relative w-full h-[130vh] flex justify-center p-2 bg-secondary-bg-color">
            <div className="ctaSection w-[80vw] h-[75vh] rounded-4xl flex flex-col justify-center items-center py-10">
                <div className="w-[70vw] h-full flex">
                    <h1 className=" w-full text-[5rem]/23 pt-10 text-primary-text-color text-center" >READY FOR AN ADVENTURE</h1>
                </div>

                <button className="bg-primary-text2-color text-primary-text-color px-4 py-2 rounded-xl" >DISCOVER</button>
            </div>

            <div ref={ticker} data-duration="20" className="ticker absolute bottom-40 -rotate-3 w-full h-[8vh] flex gap-3 p-1 justify-center items-center bg-primary-bg2-color">
                <div className="ticker-wrap">
                    <div ref={tickerText} className="ticker-text flex gap-3">
                        <h1 className="text-4xl text-secondary-bg2-color">THE ALMIGHTY WAY </h1>
                        <div className="w-10 h-10 rounded-full bg-secondary-bg2-color"></div>

                        <h1 className="text-4xl text-secondary-bg2-color">GET READY TO SAVE MORE </h1>
                        <div className="w-10 h-10 rounded-full bg-secondary-bg2-color"></div>

                        <h1 className="text-4xl text-secondary-bg2-color">THE ALMIGHTY WAY </h1>
                        <div className="w-10 h-10 rounded-full bg-secondary-bg2-color"></div>
                    </div>
                </div>
            </div>

            <div ref={ticker} className="absolute bottom-40 rotate-3 w-full h-[8vh] flex gap-3 p-1 justify-center items-center bg-secondary-bg2-color">
                <h1 className="text-4xl text-secondary-bg-color">THE ALMIGHTY WAY </h1>
                <div className="w-10 h-10 rounded-full bg-primary-bg2-color"></div>
                <h1 className="text-4xl text-secondary-bg-color">GET READY TO SAVE MORE </h1>
                <div className="w-10 h-10 rounded-full bg-primary-bg2-color"></div>
                <h1 className="text-4xl text-secondary-bg-color">THE ALMIGHTY WAY </h1>
            </div>

        </section>

        {/* CTA section */}
        <section className="w-full h-screen bg-secondary-bg-color">
            {/* <CircularWords /> */}

            <div className="w-full h-[20vh] text-center text-secondary-bg2-color ">
                <h1 className="uppercase text-4xl">Save with</h1>
                <h1 className="uppercase text-[4.5rem]/15 ">Almighty</h1>
            </div>

            <div className="w-full h-[80vh] flex flex-col justify-center gap-5 px-20 ">
                <div>
                    <h1 className="text-3xl">Eat More. Spend Less.</h1>
                    <p className="text-partner-text2-color">Download the app right now to get the prices.</p>
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