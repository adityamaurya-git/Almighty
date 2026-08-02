import { useState,useEffect } from "react";

const OTPInput = ({ otp, setOTP, verifyOTP, resendOTP })=>{

    const [seconds,setSeconds]=useState(30);

    useEffect(()=>{
        if(seconds===0){
            return;
        }

        const timer=setInterval(()=>{
            setSeconds((prev)=>prev-1);
        },1000);

        return () => clearInterval(timer);

    },[seconds]);

    return(

        <div className="flex flex-col ">
            <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e)=>setOTP(e.target.value)}
                className="border border-gray-500 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary-bg-color"
            />

            <button type="button" className="bg-primary-bg-color px-2 py-2 rounded-lg" onClick={verifyOTP}>Verify OTP</button>

            {
                seconds===0 ?
                <button type="button" className="bg-partner-primary-bg-color" onClick={resendOTP}>Resend OTP</button>

                :

                <p>Resend in {seconds}s</p>

            }

        </div>

    );

};

export default OTPInput;