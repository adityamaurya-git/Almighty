import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const subscribeOrdersAnalytics = (vendorId, callback) => {

    const q = query(
        collection(db, "orders"),
        where("vendorId", "==", vendorId)
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


export const subscribeProductsAnalytics = (vendorId, callback) => {

    const q = query(
        collection(db, "products"),
        where("vendorId", "==", vendorId),
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