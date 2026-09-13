import { useState } from "react"
import { Link } from "react-router-dom"


export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/almighty/contact-us", label: "Contact Us" },
        { to: "/almighty/about-us", label: "About Us" },
    ]

    return (<>
        <nav className="w-full z-10 px-4 py-3 sm:px-6 lg:px-0 ">
            <div className="mx-auto w-full max-w-8xl rounded-lg lg:w-[90vw]">
                <div className="flex items-center justify-between gap-3 lg:gap-2">
                    <div className="flex flex-1 items-center justify-start lg:w-[18%] lg:flex-none lg:justify-center lg:items-center">
                        <div className="flex items-center">
                            <img className="w-7 lg:w-10" src="/images/almighty-logo.png" />
                            <h1 className="pl-0 text-2xl font-black sm:text-3xl lg:pl-4 lg:text-4xl">ALMIGHTY</h1>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M4 6h16" />
                                <path d="M4 12h16" />
                                <path d="M4 18h16" />
                            </svg>
                        )}
                    </button>

                    <div className="hidden flex-1 items-center justify-center lg:flex lg:w-full lg:justify-center">
                        <ul className="flex w-full items-center justify-center gap-5">
                            {navLinks.map((link) => (
                                <Link key={link.label} to={link.to} className="text-xl">
                                    {link.label}
                                </Link>
                            ))}
                        </ul>
                    </div>

                    <div className="hidden flex-1 justify-end lg:flex lg:w-[22%] lg:flex-none lg:pr-4">
                        <Link to="/almighty/partner" className="flex h-11 w-fit items-center justify-center rounded-lg bg-primary-bg2-color px-5 py-2 text-xl text-black cursor-pointer">Partner</Link>
                    </div>
                </div>

                <div className={`lg:hidden bg-secondary-bg-color border-4 border-white rounded-lg shadow-[] overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "mt-4 max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="flex flex-col items-center gap-4 rounded-lg px-4 py-4 text-center">
                        <ul className="flex w-full flex-col items-center justify-center gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-base sm:text-lg"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </ul>
                        <Link
                            to="/almighty/partner"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex h-10 w-full max-w-xs items-center justify-center rounded-lg bg-primary-bg2-color px-5 py-2 text-base text-black cursor-pointer"
                        >
                            Partner
                        </Link>
                    </div>
                </div>
            </div>


        </nav>
    </>)
}