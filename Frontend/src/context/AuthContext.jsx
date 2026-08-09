import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../firebase/firebase";
import { subscribeVendorByUID } from "../services/vendor.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [vendor, setVendor] = useState(null);
    const [ user , setUser ] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        let unsubscribeVendor = null;

        const unsubscribe = onAuthStateChanged(auth, (user) => {

            if (user) {

                setUser(user);
                unsubscribeVendor = subscribeVendorByUID(
                    user.uid,
                    (vendorData) => {
                        setVendor(vendorData);
                        setLoading(false);
                    }
                );
            }
            else {
                setVendor(null);
                setUser(null);
                setLoading(false);
            }
        });

        return () => {
            unsubscribe();
            if(unsubscribeVendor) unsubscribeVendor();
        }

    }, []);

    const loginVendor = (vendorData) => {
        setVendor(vendorData);
    }

    // const refreshVendor = async () => {

    //     if (!auth.currentUser) return;
    //     const vendorData = await getVendorByUID(auth.currentUser.uid);
    //     setVendor(vendorData);
    // };


    const logoutVendor = async () => {

        await signOut(auth);
        setUser(null);
        setVendor(null);
    }

    const value = {user , vendor, loginVendor, logoutVendor, loading};

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

};