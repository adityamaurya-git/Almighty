// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// import {
//     subscribeAvailableCoupons,
//     getOutletCoupon
// } from "../../services/coupon.service";

// const toInputDate = (timestamp) => {

//     if (!timestamp) return "";

//     const date =
//         timestamp.toDate
//             ? timestamp.toDate()
//             : new Date(timestamp);

//     const year =
//         date.getFullYear();

//     const month =
//         String(date.getMonth() + 1)
//             .padStart(2, "0");

//     const day =
//         String(date.getDate())
//             .padStart(2, "0");

//     return `${year}-${month}-${day}`;
// };


// const ProductCoupons = ({
//     outlet,
//     productId,
//     selectedCoupons,
//     setSelectedCoupons
// }) => {

//     const [coupons, setCoupons] =
//         useState([]);

//     const [loading, setLoading] =
//         useState(true);


//     // ==========================================
//     // LOAD COUPONS
//     // ==========================================

//     useEffect(() => {

//         if (!outlet) return;


//         const unsubscribe =
//             subscribeAvailableCoupons(
//                 async (availableCoupons) => {

//                     try {

//                         const results =
//                             await Promise.all(

//                                 availableCoupons.map(
//                                     async (coupon) => {

//                                         const outletCoupon =
//                                             await getOutletCoupon(
//                                                 outlet.ownerId,
//                                                 outlet.businessId,
//                                                 outlet.outletId,
//                                                 coupon.id
//                                             );


//                                         // Product is already attached
//                                         // if (
//                                         //     outletCoupon?.productIds
//                                         //         ?.includes(productId)
//                                         // ) {

//                                         if(
//                                             productId &&
//                                             outletCoupon?.productIds?.includes(productId)
//                                         ){
//                                             return {

//                                                 ...coupon,

//                                                 selected: true,

//                                                 selectedStartAt:
//                                                     outletCoupon.startAt,

//                                                 selectedEndAt:
//                                                     outletCoupon.endAt

//                                             };

//                                         }


//                                         return {

//                                             ...coupon,

//                                             selected: false,

//                                             selectedStartAt: null,

//                                             selectedEndAt: null

//                                         };

//                                     }
//                                 )

//                             );


//                         setCoupons(results);

//                     }
//                     catch (error) {

//                         console.error(
//                             "Failed to load vendor coupons:",
//                             error
//                         );

//                         toast.error(
//                             "Failed to load coupons"
//                         );

//                     }
//                     finally {

//                         setLoading(false);

//                     }

//                 }
//             );


//         return () => {

//             if (unsubscribe) {
//                 unsubscribe();
//             }

//         };

//     }, [
//         outlet,
//         productId
//     ]);


//     // ==========================================
//     // TOGGLE COUPON
//     // ==========================================

//     const toggleCoupon = (
//         coupon,
//         checked
//     ) => {

//         if (!checked) {

//             setSelectedCoupons(
//                 prev =>
//                     prev.filter(
//                         c =>
//                             c.couponId !==
//                             coupon.id
//                     )
//             );

//             setCoupons(
//                 prev =>
//                     prev.map(c =>
//                         c.id === coupon.id
//                             ? {
//                                 ...c,
//                                 selected: false
//                             }
//                             : c
//                     )
//             );

//             return;
//         }


//         const today =
//             new Date();


//         const globalStart =
//             coupon.startAt?.toDate
//                 ? coupon.startAt.toDate()
//                 : new Date(coupon.startAt);


//         const globalEnd =
//             coupon.endAt?.toDate
//                 ? coupon.endAt.toDate()
//                 : new Date(coupon.endAt);


//         setSelectedCoupons(
//             prev => [

//                 ...prev,

//                 {

//                     couponId:
//                         coupon.id,

//                     startAt:
//                         coupon.startAt,

//                     endAt:
//                         coupon.endAt

//                 }

//             ]
//         );


//         setCoupons(
//             prev =>
//                 prev.map(c =>
//                     c.id === coupon.id
//                         ? {
//                             ...c,
//                             selected: true
//                         }
//                         : c
//                 )
//         );

//     };


//     // ==========================================
//     // DATE CHANGE
//     // ==========================================

//     const updateDate = (
//         couponId,
//         field,
//         value
//     ) => {

//         setSelectedCoupons(
//             prev =>
//                 prev.map(coupon => {

//                     if (
//                         coupon.couponId !==
//                         couponId
//                     ) {
//                         return coupon;
//                     }


//                     const date =
//                         new Date(
//                             `${value}T00:00:00`
//                         );


//                     return {

//                         ...coupon,

//                         [field]:
//                             date

//                     };

//                 })
//         );

//     };


//     if (loading) {

//         return (
//             <div className="mt-5">
//                 <p className="text-sm text-gray-500">
//                     Loading coupons...
//                 </p>
//             </div>
//         );

//     }


//     if (coupons.length === 0) {

//         return (
//             <div className="mt-5 rounded-xl border p-4">
//                 <p className="text-sm text-gray-500">
//                     No active restaurant coupons are available.
//                 </p>
//             </div>
//         );

//     }


//     return (

//         <div className="mt-5">

//             <h3 className="font-semibold text-lg mb-3">
//                 Coupons
//             </h3>


//             <div className="space-y-3">

//                 {coupons.map(coupon => {

//                     const selected =
//                         selectedCoupons.some(
//                             c =>
//                                 c.couponId ===
//                                 coupon.id
//                         );


//                     return (

//                         <div
//                             key={coupon.id}
//                             className={`border rounded-xl p-4 transition ${
//                                 selected
//                                     ? "border-green-500 bg-green-50"
//                                     : "border-gray-200"
//                             }`}
//                         >

//                             <div className="flex items-start gap-3">

//                                 <input
//                                     type="checkbox"
//                                     checked={selected}
//                                     onChange={(e) =>
//                                         toggleCoupon(
//                                             coupon,
//                                             e.target.checked
//                                         )
//                                     }
//                                     className="mt-1"
//                                 />


//                                 <div className="flex-1">

//                                     <div className="flex justify-between">

//                                         <div>

//                                             <p className="font-semibold">
//                                                 {coupon.code}
//                                             </p>

//                                             <p className="text-sm text-gray-600">
//                                                 {coupon.name}
//                                             </p>

//                                         </div>


//                                         <span className="font-bold text-green-600">

//                                             {coupon.couponType === "percentage"

//                                                 ? `${coupon.discountValue}% OFF`

//                                                 : `₹${coupon.discountValue} OFF`

//                                             }

//                                         </span>

//                                     </div>


//                                     <p className="text-xs text-gray-500 mt-1">

//                                         Minimum order:
//                                         ₹{coupon.minimumItemValue || 0}

//                                         {coupon.maximumDiscount
//                                             ? ` • Max ₹${coupon.maximumDiscount}`
//                                             : ""
//                                         }

//                                     </p>


//                                     {selected && (

//                                         <div className="grid grid-cols-2 gap-3 mt-4">

//                                             <div>

//                                                 <label className="text-xs font-medium">
//                                                     Start Date
//                                                 </label>

//                                                 <input
//                                                     type="date"
//                                                     value={
//                                                         toInputDate(
//                                                             selectedCoupons.find(
//                                                                 c =>
//                                                                     c.couponId ===
//                                                                     coupon.id
//                                                             )?.startAt
//                                                         )
//                                                     }
//                                                     min={toInputDate(coupon.startAt)}
//                                                     max={toInputDate(coupon.endAt)}
//                                                     onChange={(e) =>
//                                                         updateDate(
//                                                             coupon.id,
//                                                             "startAt",
//                                                             e.target.value
//                                                         )
//                                                     }
//                                                     className="w-full border rounded-lg p-2 mt-1"
//                                                 />

//                                             </div>


//                                             <div>

//                                                 <label className="text-xs font-medium">
//                                                     End Date
//                                                 </label>

//                                                 <input
//                                                     type="date"
//                                                     value={
//                                                         toInputDate(
//                                                             selectedCoupons.find(
//                                                                 c =>
//                                                                     c.couponId ===
//                                                                     coupon.id
//                                                             )?.endAt
//                                                         )
//                                                     }
//                                                     min={toInputDate(coupon.startAt)}
//                                                     max={toInputDate(coupon.endAt)}
//                                                     onChange={(e) =>
//                                                         updateDate(
//                                                             coupon.id,
//                                                             "endAt",
//                                                             e.target.value
//                                                         )
//                                                     }
//                                                     className="w-full border rounded-lg p-2 mt-1"
//                                                 />

//                                             </div>

//                                         </div>

//                                     )}

//                                 </div>

//                             </div>

//                         </div>

//                     );

//                 })}

//             </div>

//         </div>

//     );

// };


// export default ProductCoupns;
