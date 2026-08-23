import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const subscribeOrdersAnalytics = (outletId , callback) => {

    const q = query(
        collection(db, "orders"),
        where("outletId", "==", outletId)
    );

    return onSnapshot(q, snapshot => {
        callback(
            snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
        );
    });

};


export const subscribeProductsAnalytics = (outletId, callback) => {

    const q = query(
        collection(db, "products"),
        where("outletId", "==", outletId),
        where("deleted", "==", false)
    );

    return onSnapshot(q, snapshot => {
        callback(
            snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
        );
    });
};