import { collection, query, where, getDocs, updateDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";


export const getVendorByPhone = async (phone) => {

    const q = query(
        collection(db, "vendors"),
        where("phone", "==", phone)
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return null;
    }

    const vendorDoc = snapshot.docs[0];
    return {
        id: vendorDoc.id,
        ...vendorDoc.data()
    };

};


export const getVendorByEmail = async (email) => {
    const q = query(
        collection(db, "vendors"),
        where("email" , "==" , email.toLowerCase().trim())
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return null;
    }

    const vendorDoc = snapshot.docs[0];

    return {
        id: vendorDoc.id,
        ...vendorDoc.data()
    };
}



export const saveVendorUID = async (vendorId, uid) => {

    const ref = doc(db, "vendors", vendorId);

    await updateDoc(ref, {

        uid

    });

};



export const getVendorByUID = async (uid) => {

    const q = query(

        collection(db, "vendors"),

        where("uid", "==", uid)

    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {

        return null;

    }

    const vendorDoc = snapshot.docs[0];

    return {

        id: vendorDoc.id,

        ...vendorDoc.data()

    };

};


export const subscribeVendorByUID = (uid, callback) => {

    const q = query(
        collection(db, "vendors"),
        where("uid", "==", uid)
    );

    return onSnapshot(q, (snapshot) => {

        if (snapshot.empty) {
            callback?.(null);
            return;
        }

        const vendorDoc = snapshot.docs[0];

        callback({
            id: vendorDoc.id,
            ...vendorDoc.data()
        });

    });

};



// previous code

// export const updateAutoAccept = async (vendorId , value) =>{
//     await updateDoc(doc(db , "vendors" , vendorId),{
//         autoAcceptOrders : value
//     });
// };

// outlet based code

