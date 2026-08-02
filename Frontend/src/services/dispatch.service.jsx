import { db } from "../firebase/firebase";


import {collection, getDocs, getDoc, doc, setDoc, updateDoc, serverTimestamp, arrayUnion, } from "firebase/firestore";


// -------------------------------
// Distance Calculation
// -------------------------------

const deg2rad = (deg) => deg * (Math.PI / 180);

const getDistanceKm = (lat1, lng1, lat2, lng2) => {
  const R = 6371;

  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// -------------------------------------------------------
// Dispatch nearest riders
// -------------------------------------------------------

export const dispatchToNearestRiders = async (
  orderId,
  vendorId,
  vendorLat,
  vendorLng,
  orderData
) => {
  try {
    const ridersSnapshot = await getDocs(collection(db, "riders"));

    const ridersWithDistance = [];

    ridersSnapshot.forEach((docSnap) => {
      const rider = docSnap.data();

      if (!rider.isOnline) return;

      const location = rider.currentLocation;

      if (!location) return;

      let lat = 0;
      let lng = 0;

      // GeoPoint
      if (location.latitude !== undefined) {
        lat = location.latitude;
        lng = location.longitude;
      }

      // Map
      else {
        lat = Number(location.lat || 0);
        lng = Number(location.lng || 0);
      }

      if (lat === 0 || lng === 0) return;

      const distance = getDistanceKm(
        vendorLat,
        vendorLng,
        lat,
        lng
      );

      ridersWithDistance.push({
        riderId: docSnap.id,
        distance,
      });
    });

    if (ridersWithDistance.length === 0) return;

    ridersWithDistance.sort(
      (a, b) => a.distance - b.distance
    );

    const nearest = ridersWithDistance.slice(0, 5);

    const eligibleIds = nearest.map((r) => r.riderId);

    //------------------------------------------------
    // Create order_dispatches document
    //------------------------------------------------

    await setDoc(doc(db, "order_dispatches", orderId), {
      orderId,
      vendorId,

      shopName: orderData.shopName || "",
      total: orderData.total || 0,
      deliveryFee: orderData.deliveryFee || 30,
      items: orderData.items || [],
      deliveryAddress: orderData.deliveryAddress || "",

      vendorLat,
      vendorLng,

      status: "searching",

      eligibleRiders: eligibleIds,

      createdAt: serverTimestamp(),
    });

    console.log("Dispatched to", eligibleIds.length, "riders");

    //------------------------------------------------
    // Retry after 2 minutes
    //------------------------------------------------

    setTimeout(async () => {
      try {
        const dispatchRef = doc(db, "order_dispatches", orderId);

        const dispatchSnap = await getDoc(dispatchRef);

        if (!dispatchSnap.exists()) return;

        const data = dispatchSnap.data();

        if (data.status === "assigned") return;

        const currentEligible = data.eligibleRiders || [];

        const retrySnapshot = await getDocs(collection(db, "riders"));

        const retryRiders = [];

        retrySnapshot.forEach((docSnap) => {
          const rider = docSnap.data();

          if (!rider.isOnline) return;

          if (currentEligible.includes(docSnap.id)) return;

          const location = rider.currentLocation;

          if (!location) return;

          let lat = 0;
          let lng = 0;

          if (location.latitude !== undefined) {
            lat = location.latitude;
            lng = location.longitude;
          } else {
            lat = Number(location.lat || 0);
            lng = Number(location.lng || 0);
          }

          if (lat === 0 || lng === 0) return;

          const distance = getDistanceKm(
            vendorLat,
            vendorLng,
            lat,
            lng
          );

          retryRiders.push({
            riderId: docSnap.id,
            distance,
          });
        });

        retryRiders.sort(
          (a, b) => a.distance - b.distance
        );

        const newEligible = retryRiders
          .slice(0, 5)
          .map((r) => r.riderId);

        if (newEligible.length === 0) return;

        await updateDoc(dispatchRef, {
        //   eligibleRiders: FieldValue.arrayUnion(...newEligible),
        eligibleRiders: arrayUnion(...newEligible),
        });

        console.log("Retry dispatch completed");
      } catch (e) {
        console.log(e);
      }
    }, 120000);
  } catch (e) {
    console.log(e);
  }
};