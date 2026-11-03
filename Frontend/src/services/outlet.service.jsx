// import { collectionGroup, getDocs, query, where , doc , updateDoc, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase/firebase";


// // ==========================================
// // GET OUTLET BY FIREBASE AUTH UID
// // ==========================================

// export const getOutletByAuthUID = async (uid) => {

//     const q = query(
//         collectionGroup(db, "outlets"),
//         where("authUid", "==", uid)
//     );

//     const snapshot = await getDocs(q);

//     if (snapshot.empty) {
//         return null;
//     }

//     const outletDoc = snapshot.docs[0];

//     return {
//         id: outletDoc.id,
//         ...outletDoc.data(),

//         // Useful for future nested operations
//         ownerId: outletDoc.data().ownerId,
//         businessId: outletDoc.data().businessId,
//         outletId: outletDoc.data().outletId || outletDoc.id
//     };
// };



// // ==========================================
// // REALTIME OUTLET LISTENER
// // ==========================================

// export const subscribeOutletByAuthUID = (uid, callback) => {

//     const q = query(
//         collectionGroup(db, "outlets"),
//         where("authUid", "==", uid)
//     );

//     return onSnapshot(
//         q,
//         (snapshot) => {

//             if (snapshot.empty) {
//                 callback(null);
//                 return;
//             }

//             const outletDoc = snapshot.docs[0];

//             const data = outletDoc.data();

//             callback({
//                 id: outletDoc.id,
//                 ...data,

//                 ownerId: data.ownerId,
//                 businessId: data.businessId,
//                 outletId: data.outletId || outletDoc.id
//             });
//         },
//         (error) => {
//             console.error(
//                 "Realtime outlet listener error:",
//                 error
//             );
//             callback(null);
//         }
//     );
// };



// export const updateAutoAccept = async (ownerId , businessId , outletId , value) => {

//     const outletRef = doc(
//         db,
//         "owners",
//         ownerId,
//         "businesses",
//         businessId,
//         "outlets", 
//         outletId
//     );

//     await updateDoc(outletRef,{
//         autoAcceptOrders : value
//     });

// };


import {
    collection,
    collectionGroup,
    getDocs,
    query,
    where,
    doc,
    updateDoc,
    onSnapshot
} from "firebase/firestore";

import { db } from "../firebase/firebase";


// ==========================================
// GET VENDOR ID FOR OUTLET
// ==========================================

// const getVendorIdForOutlet = async (outletId) => {

//     if (!outletId) {
//         return null;
//     }

//     const q = query(
//         collection(db, "vendors"),
//         where("outletId", "==", outletId)
//     );

//     const snapshot = await getDocs(q);

//     if (snapshot.empty) {
//         console.warn(
//             "No vendor found for outlet:",
//             outletId
//         );

//         return null;
//     }

//     // Prefer approved + active vendor
//     const approvedVendor = snapshot.docs.find(doc => {

//         const data = doc.data();

//         return (
//             data.approvalStatus === "approved" &&
//             data.status === "active"
//         );

//     });

//     const vendorDoc =
//         approvedVendor || snapshot.docs[0];

//     return vendorDoc.id;
// };





const getVendorIdForOutlet = async (outletId, ownerId) => {
    if (!outletId || !ownerId) {
        throw new Error("Outlet ID and Owner ID are required.");
    }

    // Get all vendor documents belonging to this owner.
    const vendorsQuery = query(
        collection(db, "vendors"),
        where("ownerId", "==", ownerId)
    );

    const snapshot = await getDocs(vendorsQuery);

    if (snapshot.empty) {
        throw new Error(
            `No vendor documents found for owner: ${ownerId}`
        );
    }

    // Select the vendor where applicationType is absent.
    const eligibleVendors = snapshot.docs.filter((vendorDoc) => {
        const data = vendorDoc.data();

        return !Object.prototype.hasOwnProperty.call(
            data,
            "applicationType"
        );
    });

    if (eligibleVendors.length === 0) {
        throw new Error(
            `No vendor without applicationType found for owner: ${ownerId}`
        );
    }

    if (eligibleVendors.length > 1) {
        throw new Error(
            `Multiple vendors without applicationType found for owner: ${ownerId}`
        );
    }

    return eligibleVendors[0].id;
};




// ==========================================
// GET OUTLET BY FIREBASE AUTH UID
// ==========================================

export const getOutletByAuthUID = async (uid) => {

    const q = query(
        collectionGroup(db, "outlets"),
        where("authUid", "==", uid)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return null;
    }

    const outletDoc = snapshot.docs[0];

    const data = outletDoc.data();

    const outletId = data.outletId || outletDoc.id;

    const ownerId = data.ownerId;

    // ------------------------------------------
    // Get corresponding vendor ID
    // ------------------------------------------

    const vendorId = await getVendorIdForOutlet(outletId, ownerId);


    return {

        id: outletDoc.id,
        ...data,
        // Useful for future nested operations
        ownerId: data.ownerId,
        businessId: data.businessId,
        outletId,
        // Vendor document ID
        vendorId
    };
};



// ==========================================
// REALTIME OUTLET LISTENER
// ==========================================

export const subscribeOutletByAuthUID = (
    uid,
    callback
) => {

    const q = query(
        collectionGroup(db, "outlets"),
        where("authUid", "==", uid)
    );

    return onSnapshot(
        q,

        async (snapshot) => {

            if (snapshot.empty) {

                callback(null);

                return;
            }

            const outletDoc = snapshot.docs[0];

            const data = outletDoc.data();

            const outletId =
                data.outletId || outletDoc.id;

            const ownerId = data.ownerId;


            // ------------------------------------------
            // Get corresponding vendor ID
            // ------------------------------------------

            const vendorId =
                await getVendorIdForOutlet(outletId, ownerId);


            callback({

                id: outletDoc.id,

                ...data,

                ownerId: data.ownerId,

                businessId: data.businessId,

                outletId,

                // Vendor document ID
                vendorId

            });

        },

        (error) => {

            console.error(
                "Realtime outlet listener error:",
                error
            );

            callback(null);

        }
    );
};



// ==========================================
// UPDATE AUTO ACCEPT
// ==========================================

export const updateAutoAccept = async (
    ownerId,
    businessId,
    outletId,
    value
) => {

    const outletRef = doc(
        db,
        "owners",
        ownerId,
        "businesses",
        businessId,
        "outlets",
        outletId
    );

    await updateDoc(
        outletRef,
        {
            autoAcceptOrders: value
        }
    );

};