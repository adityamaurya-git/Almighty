import { ArrowRight } from 'lucide-react';
import { Navbar } from "../components/Navbar"
import { Footer } from "./footer"

export const Home = () =>{

    return(<>
        <section className="heroSection relative w-full h-screen bg-primary-bg2-color">
            <Navbar />
            <div className="tagLine w-full flex flex-col justify-center items-center h-[85vh] ">
                <h1 className="text-[2.5rem] text-black ">THE</h1>
                <h1 className="text-[7rem]/25 text-black font-black">ALMIGHTY</h1>
                <h1 className="text-[1.3rem] text-black font-black">Cravings Don't Wait and Neither Should You!</h1>
            </div>

            <img className="absolute bottom-0" src="/images/beige-spikes1.png" alt="beige"/>
        </section>


        <section className="w-full h-screen relative flex flex-col justify-center">

            

            <div className="absolute top-10 w-full h-[8vh] flex gap-3 p-1 justify-center items-center">
                {/* <h1 className="text-4xl text-secondary-bg2-color">THE ALMIGHTY WAY. </h1> */}
                {/* <div className="w-10 h-10 rounded-full bg-primary-bg-color"></div> */}
                <h1 className="text-5xl text-primary-bg2-color bg-secondary-bg2-color px-4 py-1">GET READY TO SAVE MORE</h1>
                {/* <div className="w-10 h-10 rounded-full bg-primary-bg-color"></div> */}
                {/* <h1 className="text-4xl text-secondary-bg2-color">THE ALMIGHTY WAY. </h1> */}
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

        <section className="relative w-full h-[130vh] flex justify-center p-2">
            <div className="ctaSection w-[80vw] h-[75vh] rounded-4xl flex flex-col justify-center items-center py-10">
                <div className="w-[70vw] h-full flex">
                    <h1 className=" w-full text-[5rem]/23 pt-10 text-primary-text-color text-center" >READY FOR AN ADVENTURE</h1>
                </div>

                <button className="bg-primary-text2-color text-primary-text-color px-4 py-2 rounded-xl" >DISCOVER</button>
            </div>

            <div className="absolute bottom-40 -rotate-3 w-full h-[8vh] flex gap-3 p-1 justify-center items-center bg-primary-bg2-color">
                <h1 className="text-4xl text-secondary-bg2-color">THE ALMIGHTY WAY </h1>
                <div className="w-10 h-10 rounded-full bg-secondary-bg2-color"></div>
                <h1 className="text-4xl text-secondary-bg2-color">GET READY TO SAVE MORE </h1>
                <div className="w-10 h-10 rounded-full bg-secondary-bg2-color"></div>
                <h1 className="text-4xl text-secondary-bg2-color">THE ALMIGHTY WAY </h1>
            </div>

            <div className="absolute bottom-40 rotate-3 w-full h-[8vh] flex gap-3 p-1 justify-center items-center bg-secondary-bg2-color">
                <h1 className="text-4xl text-secondary-bg-color">THE ALMIGHTY WAY </h1>
                <div className="w-10 h-10 rounded-full bg-primary-bg2-color"></div>
                <h1 className="text-4xl text-secondary-bg-color">GET READY TO SAVE MORE </h1>
                <div className="w-10 h-10 rounded-full bg-primary-bg2-color"></div>
                <h1 className="text-4xl text-secondary-bg-color">THE ALMIGHTY WAY </h1>
            </div>

        </section>

        <section className="w-full h-screen ">
            {/* <CircularWords /> */}
            
            <div className="w-full h-[20vh] text-center text-secondary-bg2-color">
                <h1 className="uppercase text-4xl">Save with</h1>
                <h1 className="uppercase text-[4.5rem]/15 ">Almighty</h1>
            </div>

            <div className="w-full h-[80vh]">

            </div>

        </section>

        {/* <Footer/> */}
    </>)
}