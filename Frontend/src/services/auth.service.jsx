import { RecaptchaVerifier, signInWithPhoneNumber , signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

let confirmationResult = null;

export const initializeRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
      }
    );

    window.recaptchaVerifier.render();
  }
};

export const sendOTP = async (phoneNumber) => {
  const appVerifier = window.recaptchaVerifier;

  confirmationResult = await signInWithPhoneNumber(
    auth,
    phoneNumber,
    appVerifier
  );

  return confirmationResult;
};

export const verifyOTP = async (otp) => {
  if (!confirmationResult) {
    throw new Error("OTP has not been sent yet.");
  }

  return await confirmationResult.confirm(otp);
};

export const logout = async () => {

  await signOut(auth);

};