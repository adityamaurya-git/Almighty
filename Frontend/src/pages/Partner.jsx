import { Link } from "react-router-dom"
import { FAQ } from "../components/FAQ"
import { BadgeIndianRupee, BadgePercent, MessageCirclePlus } from "lucide-react"

export const Partner = () =>{

    return(<>
        <section className="w-full bg-primary-bg2-color">
            
            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
                <div className="inline-flex rounded-full bg-secondary-bg2-color px-4 py-2 text-sm font-bold text-secondary-bg-color sm:px-6 sm:text-base">
                    0% Commission
                </div>

                <div className="mt-8 flex w-full flex-col items-center text-center">
                    <h1 className="max-w-4xl text-4xl font-bold uppercase leading-tight text-sbg-secondary-bg2-color sm:text-5xl md:text-6xl lg:text-7xl">
                        Partner with Almighty and grow your business
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-sbg-secondary-bg2-color/90 sm:text-base md:text-lg">
                        Join a platform built to help vendors reach more customers with no commission pressure and a simple onboarding flow.
                    </p>

                    {/* <Link
                        to="/almighty/partner/register"
                        className="mt-8 inline-flex w-full max-w-sm items-center justify-center rounded-full bg-partner-text2-color px-6 py-3 text-sm font-bold text-sbg-secondary-bg2-color transition-transform duration-200 hover:scale-[1.02] sm:w-auto sm:px-8 sm:py-4 sm:text-base"
                    >
                        Register Your Store
                    </Link> */}
                    <Link to="/almighty/partner/dashboard" className="mt-8 bg-primary-text-color px-2 py-1 lg:px-4 lg:py-2 rounded-lg cursor-pointer">Dashboard</Link>
                </div>

                <div className="mt-12 w-full max-w-5xl rounded-lg bg-secondary-bg2-color p-6 shadow-2xl sm:mt-16 sm:p-8 lg:p-10">
                    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                        <div>
                            <h2 className="text-xl font-bold uppercase text-secondary-bg-color sm:text-2xl">
                                Get started: It only takes 10 minutes
                            </h2>
                            <p className="mt-3 max-w-2xl text-sm uppercase leading-6 text-secondary-bg-color/80 sm:text-base">
                                Please keep these documents and details ready for a smooth sign-up
                            </p>
                        </div>

                        <div className="">
                            <ul className="grid gap-3 text-sm text-partner-text2-color sm:grid-cols-2 sm:gap-4 sm:text-base lg:grid-cols-1">
                                <li className="rounded-lg bg-white px-4 py-3 shadow-sm">Pan Card</li>
                                <li className="rounded-lg bg-white px-4 py-3 shadow-sm">GST Number</li>
                                <li className="rounded-lg bg-white px-4 py-3 shadow-sm">FSSAI License</li>
                                <li className="rounded-lg bg-white px-4 py-3 shadow-sm">Bank Account Details</li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="w-full bg-secondary-bg-color">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-partner-text2-color sm:text-4xl lg:text-5xl">
                        Benefits of Partnering With ALMIGHTY
                    </h2>
                </div>

                <div className="grid gap-5 text-center sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    <div className="flex h-full flex-col items-center gap-4 rounded-3xl bg-white/70 p-6 shadow-sm sm:p-8">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-bg2-color text-sbg-secondary-bg2-color sm:h-18 sm:w-18">
                            <BadgePercent size={34} />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <h3 className="text-2xl font-bold text-partner-text2-color">0% Commission</h3>
                            <p className="text-sm leading-6 font-gilroyLight text-partner-text2-color/80 sm:text-base">
                                No commissions and hidden charges for vendors
                            </p>
                        </div>
                    </div>

                    <div className="flex h-full flex-col items-center gap-4 rounded-3xl bg-white/70 p-6 shadow-sm sm:p-8">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-bg2-color text-sbg-secondary-bg2-color sm:h-18 sm:w-18">
                            <BadgeIndianRupee size={34} />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <h3 className="text-2xl font-bold text-partner-text2-color">Instant Payout</h3>
                            <p className="text-sm leading-6 font-gilroyLight text-partner-text2-color/80 sm:text-base">
                                Withdraw your full earnings at any time
                            </p>
                        </div>
                    </div>

                    <div className="flex h-full flex-col items-center gap-4 rounded-3xl bg-white/70 p-6 shadow-sm sm:col-span-2 sm:p-8 lg:col-span-1">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-bg2-color text-sbg-secondary-bg2-color sm:h-18 sm:w-18">
                            <MessageCirclePlus size={30} />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <h3 className="text-2xl font-bold text-partner-text2-color">Onboarding Support</h3>
                            <p className="text-sm leading-6 font-gilroyLight text-partner-text2-color/80 sm:text-base">
                                For any support, email us at support@almighty.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="w-full bg-secondary-bg-color px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
            <FAQ />
        </section>
    </>)
}