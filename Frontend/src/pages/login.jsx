import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { loginWithEmail } from "../services/auth.service";
import { getOutletByAuthUID } from "../services/outlet.service";

import { useAuth } from "../hooks/useAuth";

import toast from "react-hot-toast";
import { registerWebPush } from "../services/webPush.service";


export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { loginOutlet } = useAuth();


    // ==========================================
    // LOGIN
    // ==========================================

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email.");
            return;
        }

        if (!password) {
            toast.error("Please enter your password.");
            return;
        }


        try {

            setLoading(true);


            // ------------------------------------------
            // 1. Firebase Authentication
            // ------------------------------------------

            const firebaseUser = await loginWithEmail(
                email,
                password
            );


            // console.log(
            //     "Firebase Auth UID:",
            //     firebaseUser.uid
            // );


            // ------------------------------------------
            // 2. Find outlet using authUid
            // ------------------------------------------

            const outlet = await getOutletByAuthUID(
                firebaseUser.uid
            );


            if (!outlet) {

                toast.error(
                    "This account is not registered as an outlet."
                );

                return;
            }


            console.log(
                "Outlet:",
                outlet
            );


            // ------------------------------------------
            // 3. Check outlet status
            // ------------------------------------------

            if (outlet.role !== "outlet") {

                toast.error(
                    "This account is not an outlet account."
                );

                return;
            }


            if (outlet.status !== "approved") {

                toast.error(
                    "Your outlet account is not approved yet."
                );

                return;
            }


            if (outlet.loginEnabled !== true) {

                toast.error(
                    "Login is currently disabled for this outlet."
                );

                return;
            }


            if (outlet.outletActive !== true) {

                toast.error(
                    "This outlet is currently inactive."
                );

                return;
            }



            // ------------------------------------------
            // 4. Register web FCM token
            // ------------------------------------------

            console.log("OUTLET LOGIN DATA:", {
                vendorId: outlet?.vendorId,
                outletId: outlet?.outletId,
            });

            try {
                const result = await registerWebPush({
                    vendorId: outlet.vendorId,
                    outletId: outlet.outletId,
                    role: "outlet",
                });

                if (result.skipped) {
                    console.log(
                        "FCM registration skipped:",
                        result.reason
                    );
                } else {
                    console.log(
                        "Web FCM token registered successfully."
                    );
                }

                console.log("WEB PUSH REGISTRATION RESULT:", result);

            } catch (notificationError) {
                // Notification setup failure should not block login.
                console.error(
                    "Web FCM registration failed:",
                    notificationError
                );
            }


            // ------------------------------------------
            // 4.2. Store outlet in AuthContext
            // ------------------------------------------

            loginOutlet(outlet);



            // ------------------------------------------
            // 5. Dashboard
            // ------------------------------------------

            toast.success("Login successful!");

            navigate(
                "/almighty/partner/dashboard"
            );


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            switch (error.code) {

                case "auth/invalid-credential":
                    toast.error(
                        "Invalid email or password."
                    );
                    break;

                case "auth/user-not-found":
                    toast.error(
                        "No account found with this email."
                    );
                    break;

                case "auth/wrong-password":
                    toast.error(
                        "Incorrect password."
                    );
                    break;

                case "auth/too-many-requests":
                    toast.error(
                        "Too many attempts. Please try again later."
                    );
                    break;

                case "auth/invalid-email":
                    toast.error(
                        "Please enter a valid email."
                    );
                    break;

                default:
                    toast.error(
                        error.message || "Login failed."
                    );
            }

        } finally {

            setLoading(false);

        }

    };


    return (

        <section className="w-full min-h-screen flex justify-end">

            <div className="w-full md:w-1/2 bg-primary-bg2-color min-h-screen px-6 md:px-10 py-20">

                <div className="w-full h-full bg-secondary-bg-color p-8 md:p-15 rounded-xl">

                    <h1 className="text-4xl font-bold">
                        Outlet Login
                    </h1>


                    <p className="mt-2 text-gray-600">

                        Login to manage your outlet

                    </p>


                    <form
                        onSubmit={handleLogin}
                        className="mt-10 w-full flex flex-col gap-5"
                    >


                        {/* EMAIL */}

                        <div className="flex flex-col gap-2">

                            <label className="font-medium">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter your outlet email"
                                autoComplete="email"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary-bg-color"
                            />

                        </div>


                        {/* PASSWORD */}

                        <div className="flex flex-col gap-2">

                            <label className="font-medium">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary-bg-color"
                            />

                        </div>


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-3 rounded-lg bg-primary-bg2-color px-5 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            {loading
                                ? "Logging in..."
                                : "Login"
                            }

                        </button>


                        <p className="text-sm text-gray-600">

                            By clicking on Login, I accept the{" "}

                            <Link
                                to="/almighty/policies"
                                className="text-primary-bg-color"
                            >
                                Terms & Conditions
                            </Link>

                            {" "}and{" "}

                            <Link
                                to="/almighty/policies"
                                className="text-primary-bg-color"
                            >
                                Privacy Policy
                            </Link>

                        </p>

                    </form>

                </div>

            </div>

        </section>

    );
};


export default Login;