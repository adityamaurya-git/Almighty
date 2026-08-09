import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
    updateDoc,
    orderBy,
    serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { dispatchToNearestRiders } from "./dispatch.service";
import { STATUS } from "../utils/orderStatus";



export const subscribeOrders = (vendorId, callback) => {

    const q = query(
        collection(db, "orders"),
        where("vendorId", "==", vendorId),
        orderBy("createdAt", "desc")
    );

    return onSnapshot(q, snapshot => {

        const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        callback(orders);

    });

};



export const updateOrderStatus = async (order, status) => {

    const ref = doc(db, "orders", order.id);

    const data = {
        status
    };

    /*
    ==========================
    ACCEPT ORDER
    ==========================
    */

    if (status === STATUS.CONFIRMED) {

        data.acceptedAt = serverTimestamp();

        data.prepTime = 15;

        data.extensionCount = 0;

        data.preparationCompleted = false;

        data.extensionPromptShown = false;
    }

    await updateDoc(ref, data);

    /*
    ==========================
    DISPATCH RIDER
    ==========================
    */

    if (status === STATUS.PACKED) {

        await dispatchToNearestRiders(

            order.id,

            order.vendorId,

            order.vendorLat,

            order.vendorLng,

            order

        );

    }

};



/*
====================================
ADD 5 MINUTES
====================================
*/

export const extendPreparationTime = async (order) => {

    await updateDoc(
        doc(db, "orders", order.id),
        {

            prepTime: (order.prepTime || 15) + 5,

            extensionCount:
                (order.extensionCount || 0) + 1,

            extensionPromptShown: true

        }
    );

};



export const markExtensionPromptShown = async (orderId) => {

    await updateDoc(
        doc(db, "orders", orderId),
        {
            extensionPromptShown: true
        }
    );

};


export const completePreparation = async (order) => {

    await updateDoc(
        doc(db, "orders", order.id),
        {
            preparationCompleted: true,
            status: STATUS.PACKED
        }
    );

    await dispatchToNearestRiders(
        order.id,
        order.vendorId,
        order.vendorLat,
        order.vendorLng,
        order
    );

};