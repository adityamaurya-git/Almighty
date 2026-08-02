import { Link , useNavigate } from "react-router-dom"
import { useState } from "react";
import { sendOTP, verifyOTP } from "../services/auth.service";
import { getVendorByPhone , getVendorByUID, saveVendorUID } from "../services/vendor.service";
import { useAuth } from "../hooks/useAuth";
import PhoneInput from "../components/auth/PhoneInput";
import OTPInput from "../components/auth/OTPInput";
import Recaptcha from "../components/auth/Recaptcha";
import toast from "react-hot-toast";

export const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();
  const { loginVendor } = useAuth();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {

      if(phone.length !== 10) {
        toast.error("Please enter a valid 10-digit phone number.");
        return;
      }

      await sendOTP("+91" + phone);
      toast.success("OTP sent successfully!");
      setOtpSent(true);

    } catch (err) {

      console.error(err);
      toast.error(err.message);

    }

  };

//   const handleVerifyOTP = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await verifyOTP(otp);

//       console.log(result.user);

//       alert("Login Successful");
//     } catch (err) {
//       console.error(err);
//       alert("Invalid OTP");
//     }
//   };

const handleVerifyOTP = async (e) => {
  e.preventDefault();
  try {
    const result = await verifyOTP(otp);

    // Firebase Auth User
    const firebaseUser = result.user;
    // console.log("Firebase User:", firebaseUser);

   const vendor = await getVendorByPhone(phone);

   if(!vendor){
    toast.error("Vendor not found. Please register first.");
    return;
   }

   if(!vendor.uid){
    await saveVendorUID(vendor.id , firebaseUser.uid);
    vendor.uid = firebaseUser.uid; // Update the vendor object with the new UID
   }

   loginVendor(vendor);
   navigate("/almighty/partner/dashboard");

  } catch (err) {
    console.error(err);
    toast.error("Invalid OTP");
  }
};

  return (
    <>
            <section className="w-full min-h-[105vh] flex justify-end">
            <div className="w-1/2 bg-primary-bg-color h-full px-10 py-35">
                <div className="w-full h-full bg-secondary-bg-color p-15">
                    <h1 className="text-4xl">Login</h1>
                    <p>or <Link className="text-primary-bg-color text-sm" to="/register">create an account</Link></p>
                    <form 
                    className="w-full h-full flex flex-col">
                          {!otpSent ? (
                            <PhoneInput 
                                phone={phone}
                                setPhone={setPhone}
                                sendOTP={handleSendOTP}
                            />
                          ) : (
                            <OTPInput 
                                otp={otp}
                                setOTP={setOtp}
                                verifyOTP={handleVerifyOTP}
                                resendOTP={handleSendOTP}
                            />
                          )}

                        <p className="text-sm text-gray-600">By clicking on Login, I accept the <Link to="/almighty/policies" className="text-primary-bg-color">Terms & Conditions</Link> & <Link to="/almighty/policies" className="text-primary-bg-color">Privacy Policy</Link> </p>
                    </form>
                    <Recaptcha />
                </div>
            </div>
            {/* <div id="recaptcha-container"></div> */}
        </section>

    </>
  );
};