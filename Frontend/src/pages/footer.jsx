import { Link } from "react-router-dom"


export const Footer = () =>{

    return(<>
        <section className="relative w-full bg-secondary-bg2-color">
            {/* <div className="relative  ">
                <img className="absolute -top-8 md:-top-17 lg:-top-27" src="/images/footer-top-bg1.png" alt="" />
            </div>     */}

            <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 pb-10 pt-16 sm:px-6 sm:pb-12 sm:pt-20 lg:px-10 lg:pb-16 lg:pt-24">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                        <div className="flex flex-col gap-3 text-sm font-medium text-secondary-bg-color sm:text-base">
                            <Link to="/">Home</Link>
                            <Link to="/">Services</Link>
                            <Link to="/">GOD'S Plan</Link>
                        </div>
                        <div className="flex flex-col gap-3 text-sm font-medium text-secondary-bg-color sm:text-base">
                            <Link to="/almighty/about-us">About Us</Link>
                            <Link to="/almighty/policies">Terms of Use</Link>
                            <Link to="/almighty/policies">Privacy Policy</Link>
                            <Link to="/almighty/contact-us">Contact Us</Link>
                        </div>
                        <div className="flex flex-col gap-3 text-sm font-medium text-secondary-bg-color sm:text-base">
                            <Link to="/almighty/delivery">Delivery Partner</Link>
                            <Link to="/">App for You</Link>
                        </div>
                    </div>

                    <div className="flex max-w-xl flex-col gap-3 text-sm text-secondary-bg-color sm:text-base lg:text-right">
                        <h1>+91 9876543210</h1>
                        <h1>123 , xyz colony , abc road , bhopal , 462000</h1>
                        <h1>almighty.support@gmail.com</h1>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <h1 className="font-black leading-none text-secondary-bg-color text-4xl tracking-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem]">
                        ALMIGHTY
                    </h1>
                </div>
            </div>
        </section>
    </>)
}