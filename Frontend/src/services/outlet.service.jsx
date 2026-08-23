import { collectionGroup, getDocs, query, where , doc , updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";


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

    return {
        id: outletDoc.id,
        ...outletDoc.data(),

        // Useful for future nested operations
        ownerId: outletDoc.data().ownerId,
        businessId: outletDoc.data().businessId,
        outletId: outletDoc.data().outletId || outletDoc.id
    };
};



// ==========================================
// REALTIME OUTLET LISTENER
// ==========================================

export const subscribeOutletByAuthUID = (uid, callback) => {

    const q = query(
        collectionGroup(db, "outlets"),
        where("authUid", "==", uid)
    );

    return onSnapshot(
        q,
        (snapshot) => {

            if (snapshot.empty) {
                callback(null);
                return;
            }

            const outletDoc = snapshot.docs[0];

            const data = outletDoc.data();

            callback({
                id: outletDoc.id,
                ...data,

                ownerId: data.ownerId,
                businessId: data.businessId,
                outletId: data.outletId || outletDoc.id
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



export const updateAutoAccept = async (ownerId , businessId , outletId , value) => {

    const outletRef = doc(
        db,
        "owners",
        ownerId,
        "businesses",
        businessId,
        "outlets", 
        outletId
    );

    await updateDoc(outletRef,{
        autoAcceptOrders : value
    });

};