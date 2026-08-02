import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../firebase/firebase";
import { getVendorByUID } from "../services/vendor.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [vendor, setVendor] = useState(null);
    const [ user , setUser ] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            if (user) {

                setUser(user);
                const vendorData = await getVendorByUID(user.uid);

                if (vendorData) {
                    setVendor(vendorData);
                }
                else {
                    setVendor(null);
                }

            }
            else {
                setVendor(null);
                setUser(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();

    }, []);

    const loginVendor = (vendorData) => {
        setVendor(vendorData);
    }

    const refreshVendor = async () => {

        if (!auth.currentUser) return;
        const vendorData = await getVendorByUID(auth.currentUser.uid);
        setVendor(vendorData);
    };

    const logoutVendor = async () => {

        await signOut(auth);
        setUser(null);
        setVendor(null);
    }

    const value = {user , vendor, loginVendor, logoutVendor, loading , refreshVendor};

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

};