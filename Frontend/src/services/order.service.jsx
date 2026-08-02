import { collection, query, where, onSnapshot, doc, updateDoc, setDoc, orderBy, serverTimestamp,} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { dispatchToNearestRiders } from "./dispatch.service";

export const subscribeOrders = (vendorId, callback) => {

    const q = query(
        collection(db, "orders"),
        where("vendorId", "==", vendorId),
        orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {

        const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        callback(orders);

    });

};



export const updateOrderStatus = async (order, status) => {
    const ref = doc(db, "orders", order.id);

    await updateDoc(ref, {
        status: status,
    });

    // Dispatch riders only when order is packed
    if (status === "order packed") {
        await dispatchToNearestRiders(
            order.id,
            order.vendorId,
            order.vendorLat,
            order.vendorLng,
            order
        );
    }
};
