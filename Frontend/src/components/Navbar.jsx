import { Link } from "react-router-dom"


export const Navbar = () =>{

    return(<>
        <nav className="w-full h-[15vh]  flex flex-col items-center justify-center z-10">
            <div className="w-[90vw] h-[12vh] bg-primary-text2-color rounded-lg flex gap-2">
                <div className="w-[18%] flex justify-center items-center ">
                    {/* <h1 className="font-black text-3xl text-secondary-bg-color">ALMIGHTY</h1> */}
                    <img className="w-40" src="/images/logo.png" alt="" />
                </div>
                <div className="w-full flex justify-center items-center">
                    <input 
                        type="text"
                        placeholder="Search restaurants, dishes..."
                        className="w-full h-[6vh] px-4 py-2 pl-10 rounded-lg
                        bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-bg-color" />
                </div>
                <div className="registrationDiv w-[22%] flex justify-end items-center gap-2 pr-4">
                    <Link to="/almighty/partner" className="w-fit h-10 px-4 bg-primary-bg2-color  text-black rounded-lg cursor-pointer flex justify-center items-center">Partner</Link>
                    {/* <Link to="/login" className="w-fit h-10 px-4 bg-secondary-bg-color text-secondary-bg2-color font-black rounded-lg cursor-pointer flex justify-center items-center">Sign in</Link> */}
                </div>
            </div>

            
        </nav>
    </>)
}