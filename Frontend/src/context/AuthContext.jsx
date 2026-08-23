// import { createContext, useEffect, useState } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "../firebase/firebase";
// import { subscribeVendorByUID } from "../services/vendor.service";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {

//     const [vendor, setVendor] = useState(null);
//     const [ user , setUser ] = useState(null);
//     const [loading, setLoading] = useState(true);


//     useEffect(() => {
//         let unsubscribeVendor = null;

//         const unsubscribe = onAuthStateChanged(auth, (user) => {

//             if (user) {

//                 setUser(user);
//                 unsubscribeVendor = subscribeVendorByUID(
//                     user.uid,
//                     (vendorData) => {
//                         setVendor(vendorData);
//                         setLoading(false);
//                     }
//                 );
//             }
//             else {
//                 setVendor(null);
//                 setUser(null);
//                 setLoading(false);
//             }
//         });

//         return () => {
//             unsubscribe();
//             if(unsubscribeVendor) unsubscribeVendor();
//         }

//     }, []);

//     const loginVendor = (vendorData) => {
//         setVendor(vendorData);
//     }


//     const logoutVendor = async () => {

//         await signOut(auth);
//         setUser(null);
//         setVendor(null);
//     }

//     const value = {user , vendor, loginVendor, logoutVendor, loading};

//     return (

//         <AuthContext.Provider value={value}>

//             {children}

//         </AuthContext.Provider>

//     );

// };











// outlet basded

import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../firebase/firebase";
import { getOutletByAuthUID, subscribeOutletByAuthUID } from "../services/outlet.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [outlet, setOutlet] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let unsubscribeOutlet = null;

        const unsubscribeAuth = onAuthStateChanged(
            auth,
            async (firebaseUser) => {

                // ==============================
                // LOGGED OUT
                // ==============================

                if (!firebaseUser) {

                    if (unsubscribeOutlet) {
                        unsubscribeOutlet();
                        unsubscribeOutlet = null;
                    }

                    setUser(null);
                    setOutlet(null);
                    setLoading(false);

                    return;
                }

                // ==============================
                // LOGGED IN
                // ==============================

                try {

                    setUser(firebaseUser);
                    setLoading(true);

                    // console.log(
                    //     "Firebase Auth UID:",
                    //     firebaseUser.uid
                    // );

                    if (unsubscribeOutlet) {
                        unsubscribeOutlet();
                        unsubscribeOutlet = null;
                    }

                    // --------------------------------
                    // Initial outlet fetch
                    // --------------------------------

                    const outletData = await getOutletByAuthUID(
                        firebaseUser.uid
                    );

                    if (!outletData) {

                        console.error(
                            "No outlet found for Auth UID:",
                            firebaseUser.uid
                        );

                        setOutlet(null);
                        setLoading(false);

                        return;
                    }

                    // console.log(
                    //     "Logged in outlet:",
                    //     outletData
                    // );

                    setOutlet(outletData);

                    setLoading(false);

                    // --------------------------------
                    // REALTIME LISTENER
                    // --------------------------------

                    unsubscribeOutlet =
                        subscribeOutletByAuthUID(
                            firebaseUser.uid,
                            (updatedOutlet) => {

                                // console.log(
                                //     "Outlet updated:",
                                //     updatedOutlet
                                // );

                                setOutlet(updatedOutlet);
                            }
                        );

                } catch (error) {

                    console.error(
                        "Failed to load outlet:",
                        error
                    );

                    setOutlet(null);
                    setLoading(false);
                }
            }
        );

        return () => {

            unsubscribeAuth();

            if (unsubscribeOutlet) {
                unsubscribeOutlet();
            }

        };

    }, []);


    const loginOutlet = (outletData) => {
        setOutlet(outletData);
    };


    const logoutOutlet = async () => {

        await signOut(auth);

        setUser(null);
        setOutlet(null);

    };


    const value = {
        user,
        outlet,
        loginOutlet,
        logoutOutlet,
        loading
    };


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

};