import {
    collection,
    doc,
    getDocs,
    onSnapshot,
    query,
    where,
    writeBatch,
    Timestamp,
    serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/firebase";


// =====================================================
// GET ACTIVE RESTAURANT COUPONS
// =====================================================

export const subscribeRestaurantCoupons = (callback) => {

    const couponsRef = collection(
        db,
        "coupons"
    );

    const q = query(
        couponsRef,
        where("status", "==", "active")
    );

    return onSnapshot(
        q,
        (snapshot) => {

            const now = new Date();

            const coupons = [];

            snapshot.forEach((couponDoc) => {

                const data = couponDoc.data();

                // Same condition as Flutter
                if (
                    (data.couponCategory || "restaurant")
                    !== "restaurant"
                ) {
                    return;
                }

                const end =
                    data.endAt?.toDate
                        ? data.endAt.toDate()
                        : null;

                // Ignore expired coupons
                if (
                    end &&
                    end < now
                ) {
                    return;
                }

                coupons.push({
                    id: couponDoc.id,
                    ...data
                });

            });

            callback(coupons);
        },
        (error) => {

            console.error(
                "Failed to subscribe restaurant coupons:",
                error
            );

            callback([]);

        }
    );
};


// =====================================================
// GET OUTLET COUPON ACTIVATIONS
// =====================================================

export const getOutletCoupons = async (
    ownerId,
    businessId,
    outletId
) => {

    const couponsRef = collection(
        db,
        "owners",
        ownerId,
        "businesses",
        businessId,
        "outlets",
        outletId,
        "coupons"
    );

    const snapshot =
        await getDocs(couponsRef);

    return snapshot.docs.map(
        (couponDoc) => ({
            id: couponDoc.id,
            ...couponDoc.data()
        })
    );
};


// =====================================================
// SAVE OUTLET COUPON ACTIVATIONS
// =====================================================

export const saveCouponActivation = async ({
    ownerId,
    businessId,
    outletId,
    coupon,
    enabled,
    vendorStart,
    vendorEnd,
    existing
}) => {

    const couponId =
        coupon.id.toString();

    const couponRef = doc(
        db,
        "owners",
        ownerId,
        "businesses",
        businessId,
        "outlets",
        outletId,
        "coupons",
        couponId
    );

    // --------------------------------------------------
    // ENABLE
    // --------------------------------------------------

    if (enabled) {

        const data = {

            couponId,

            enabled: true,

            scope: "selected",

            ownerId,
            businessId,
            outletId,

            fundedBy:
                coupon.fundedBy ||
                "restaurant",

            restaurantShare:
                coupon.restaurantShare ??
                100,

            almightyShare:
                coupon.almightyShare ??
                0,

            vendorStartAt:
                Timestamp.fromDate(
                    vendorStart
                ),

            vendorEndAt:
                Timestamp.fromDate(
                    vendorEnd
                ),

            updatedAt:
                serverTimestamp()

        };


        // Same as Flutter:
        // only write optedIn fields when
        // this is the first activation.

        if (!existing) {

            data.optedInAt =
                serverTimestamp();

            data.optedInBy =
                ownerId;

        }


        await writeBatch(db)
            .set(
                couponRef,
                data,
                { merge: true }
            )
            .commit();

        return;
    }


    // --------------------------------------------------
    // DISABLE
    // --------------------------------------------------
    //
    // IMPORTANT:
    // Flutter does NOT delete the document.
    // It sets enabled:false.
    //

    await writeBatch(db)
        .set(
            couponRef,
            {
                enabled: false,
                updatedAt:
                    serverTimestamp()
            },
            {
                merge: true
            }
        )
        .commit();
};