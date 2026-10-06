import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../hooks/useAuth";

import {
    subscribeRestaurantCoupons,
    getOutletCoupons,
    saveCouponActivation
} from "../services/coupon.service";
import Sidebar from "../components/dashboard/Sidebar";




const toLocalInputValue = (date) => {
    if (!date) return "";

    const pad = (n) => String(n).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};


const formatDate = (timestamp) => {

    if (!timestamp) return "—";

    const date =
        timestamp.toDate
            ? timestamp.toDate()
            : new Date(timestamp);

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
};


const formatDateTime = (date) => {

    return date.toLocaleString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );
};


const toDate = (timestamp) => {

    if (!timestamp) return null;

    return timestamp.toDate
        ? timestamp.toDate()
        : new Date(timestamp);
};


const CouponCard = ({
    coupon,
    activation,
    onManage
}) => {

    const isActivated =
        activation?.enabled === true;


    const discountText =
        coupon.couponType === "percentage"
            ? `${coupon.discountValue}% OFF`
            : `₹${coupon.discountValue} OFF`;


    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            {/* HEADER */}

            <div className="flex items-start justify-between gap-4">

                <div>

                    <div className="flex items-center gap-3">

                        <span className="rounded-lg bg-orange-100 px-3 py-1.5 text-sm font-bold text-orange-600">

                            {discountText}

                        </span>

                        <span className="font-mono font-bold text-gray-900">

                            {coupon.code ||
                                coupon.id}

                        </span>

                    </div>


                    <h3 className="mt-3 text-lg font-bold text-gray-900">

                        {coupon.name}

                    </h3>


                    {coupon.description && (

                        <p className="mt-1 text-sm text-gray-500">

                            {coupon.description}

                        </p>

                    )}

                </div>


                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${isActivated
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                        }`}
                >

                    {isActivated
                        ? "Active"
                        : "Not Activated"}

                </span>

            </div>


            {/* DETAILS */}

            <div className="mt-4 space-y-1 text-sm text-gray-500">

                <p>
                    Minimum item value:
                    <span className="font-semibold text-gray-700">
                        {" "}₹{coupon.minimumItemValue || 0}
                    </span>
                </p>


                {coupon.maximumDiscount > 0 && (

                    <p>
                        Maximum discount:
                        <span className="font-semibold text-gray-700">
                            {" "}₹{coupon.maximumDiscount}
                        </span>
                    </p>

                )}


                <p>
                    Admin validity:
                    <span className="font-semibold text-gray-700">
                        {" "}
                        {formatDate(coupon.startAt)}
                        {" → "}
                        {formatDate(coupon.endAt)}
                    </span>
                </p>

            </div>


            {/* VENDOR WINDOW */}

            {isActivated &&
                activation.vendorStartAt &&
                activation.vendorEndAt && (

                    <div className="mt-4 rounded-xl bg-orange-50 p-3">

                        <p className="text-xs font-semibold text-orange-600">
                            Your coupon window
                        </p>

                        <p className="mt-1 text-sm font-semibold text-gray-800">

                            {formatDate(
                                activation.vendorStartAt
                            )}

                            {" → "}

                            {formatDate(
                                activation.vendorEndAt
                            )}

                        </p>

                    </div>

                )}


            {/* BUTTON */}

            <div className="mt-5 flex justify-end">

                <button
                    onClick={() =>
                        onManage(coupon)
                    }
                    className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${isActivated
                        ? "border border-orange-500 bg-white text-orange-600 hover:bg-orange-50"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                        }`}
                >

                    {isActivated
                        ? "Manage"
                        : "Opt In"}

                </button>

            </div>

        </div>

    );

};


const Coupons = () => {

    const { outlet } = useAuth();

    const [coupons, setCoupons] =
        useState([]);

    const [activations, setActivations] =
        useState({});

    const [loading, setLoading] =
        useState(true);

    const [selectedCoupon, setSelectedCoupon] =
        useState(null);

    const [saving, setSaving] =
        useState(false);


    // =================================================
    // LOAD COUPONS
    // =================================================

    useEffect(() => {

        if (!outlet) return;


        const unsubscribe =
            subscribeRestaurantCoupons(
                setCoupons
            );


        return () => {

            unsubscribe?.();

        };

    }, [outlet]);


    // =================================================
    // LOAD OUTLET ACTIVATIONS
    // =================================================

    useEffect(() => {

        if (!outlet) return;


        const load = async () => {

            try {

                setLoading(true);

                const data =
                    await getOutletCoupons(
                        outlet.ownerId,
                        outlet.businessId,
                        outlet.outletId
                    );


                const map = {};

                data.forEach(
                    item => {
                        map[item.id] = item;
                    }
                );


                setActivations(map);

            }
            catch (error) {

                console.error(error);

                toast.error(
                    "Failed to load coupon settings"
                );

            }
            finally {

                setLoading(false);

            }

        };


        load();

    }, [outlet]);


    // =================================================
    // MANAGE COUPON
    // =================================================

    const openManage = (coupon) => {

        setSelectedCoupon(coupon);

    };


    if (loading) {

        return (<>

            <div className="flex min-h-100 items-center justify-center">
                <p className="text-gray-500">
                    Loading coupons...
                </p>
            </div>
        </>);

    }


    return (

        <div className="w-full h-full flex">
            <Sidebar />

            <div className="p-2">


                {/* PAGE HEADER */}

                <div className="mb-6">

                    <h1 className="text-2xl font-bold text-gray-900">
                        Restaurant Coupons
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Choose coupons for your outlet and set when they should run.
                    </p>

                </div>


                {/* EMPTY */}

                {coupons.length === 0 ? (

                    <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">

                        <p className="text-gray-500">
                            No coupons available right now.
                        </p>

                    </div>

                ) : (

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                        {coupons.map(coupon => (

                            <CouponCard
                                key={coupon.id}
                                coupon={coupon}
                                activation={
                                    activations[coupon.id]
                                }
                                onManage={
                                    openManage
                                }
                            />

                        ))}

                    </div>

                )}
            </div>


            {/* MODAL */}

            {selectedCoupon && (

                <CouponModal
                    coupon={selectedCoupon}
                    activation={
                        activations[
                        selectedCoupon.id
                        ]
                    }
                    outlet={outlet}
                    saving={saving}
                    setSaving={setSaving}
                    close={() =>
                        setSelectedCoupon(null)
                    }
                    onSaved={async () => {

                        const data =
                            await getOutletCoupons(
                                outlet.ownerId,
                                outlet.businessId,
                                outlet.outletId
                            );


                        const map = {};

                        data.forEach(
                            item => {
                                map[item.id] =
                                    item;
                            }
                        );


                        setActivations(map);

                        setSelectedCoupon(null);

                    }}
                />

            )}

        </div>

    );

};


const endOfDay = (date) => {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
};


const toLocalDateTimeInput = (date) => {
    if (!date) return "";

    const pad = (number) =>
        String(number).padStart(2, "0");

    return (
        `${date.getFullYear()}-` +
        `${pad(date.getMonth() + 1)}-` +
        `${pad(date.getDate())}T` +
        `${pad(date.getHours())}:` +
        `${pad(date.getMinutes())}`
    );
};


const CouponModal = ({
    coupon,
    activation,
    outlet,
    saving,
    setSaving,
    close,
    onSaved
}) => {

    const now = new Date();


    const adminStart =
        toDate(coupon.startAt);


    const adminEnd =
        toDate(coupon.endAt);


    // Same principle as Flutter:
    // vendor cannot start before admin validity.

    const earliest =
        adminStart &&
            adminStart > now
            ? adminStart
            : now;


    const existingStart =
        toDate(
            activation?.vendorStartAt
        );


    const existingEnd =
        toDate(
            activation?.vendorEndAt
        );


    const [vendorStart, setVendorStart] =
        useState(
            existingStart || earliest
        );


    const [vendorEnd, setVendorEnd] =
        useState(
            existingEnd ||
            (() => {
                const defaultEnd = endOfDay(
                    existingStart || earliest
                );

                if (
                    adminEnd &&
                    defaultEnd > adminEnd
                ) {
                    return adminEnd;
                }

                return defaultEnd;
            })()
        );


    const [enabled, setEnabled] =
        useState(
            activation?.enabled === true
        );


    const handleSave = async () => {

        if (
            enabled &&
            !vendorStart
        ) {

            toast.error(
                "Start date is required"
            );

            return;

        }


        if (
            enabled &&
            !vendorEnd
        ) {

            toast.error(
                "End date is required"
            );

            return;

        }


        if (
            enabled &&
            !vendorStart ||
            enabled &&
            !vendorEnd ||
            vendorStart >= vendorEnd
        ) {

            toast.error(
                "Start must be before end"
            );

            return;

        }


        if (
            enabled &&
            adminStart &&
            vendorStart < adminStart
        ) {

            toast.error(
                "Start cannot be before admin coupon validity"
            );

            return;

        }


        if (
            enabled &&
            adminEnd &&
            vendorEnd > adminEnd
        ) {

            toast.error(
                "End cannot exceed admin coupon validity"
            );

            return;

        }


        try {

            setSaving(true);


            await saveCouponActivation({

                ownerId:
                    outlet.ownerId,

                businessId:
                    outlet.businessId,

                outletId:
                    outlet.outletId,

                coupon,

                enabled,

                vendorStart,

                vendorEnd,

                existing:
                    Boolean(activation)

            });


            toast.success(
                enabled
                    ? "Coupon settings saved"
                    : "Coupon disabled"
            );


            await onSaved();

        }
        catch (error) {

            console.error(
                "SAVE COUPON ERROR:",
                error
            );

            toast.error(
                "Failed to save coupon"
            );

        }
        finally {

            setSaving(false);

        }

    };


    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

                {/* HEADER */}

                <div className="flex items-start justify-between">

                    <div>

                        <h2 className="text-lg font-bold">

                            {coupon.name}

                        </h2>

                        <p className="mt-1 font-mono text-sm text-orange-500">

                            {coupon.code ||
                                coupon.id}

                        </p>

                    </div>


                    <button
                        onClick={close}
                        className="text-xl text-gray-400 hover:text-gray-700"
                    >
                        ×
                    </button>

                </div>


                {/* INFO */}

                <div className="mt-5 rounded-xl bg-gray-50 p-4">

                    <p className="text-sm text-gray-600">
                        Discount
                    </p>

                    <p className="font-bold text-green-600">

                        {coupon.couponType === "percentage"
                            ? `${coupon.discountValue}% OFF`
                            : `₹${coupon.discountValue} OFF`
                        }

                    </p>


                    <p className="mt-2 text-xs text-gray-500">

                        Admin validity:
                        {" "}
                        {formatDate(coupon.startAt)}
                        {" → "}
                        {formatDate(coupon.endAt)}

                    </p>

                </div>


                {/* ENABLE */}

                <div className="mt-5 flex items-center justify-between rounded-xl border p-4">

                    <div>

                        <p className="font-semibold">
                            Enable Coupon
                        </p>

                        <p className="text-xs text-gray-500">
                            Allow this coupon for your outlet
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            setEnabled(
                                prev => !prev
                            )
                        }
                        className={`relative h-6 w-11 rounded-full transition ${enabled
                            ? "bg-green-500"
                            : "bg-gray-300"
                            }`}
                    >

                        <span
                            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${enabled
                                ? "left-6"
                                : "left-1"
                                }`}
                        />

                    </button>

                </div>


                {/* WINDOW */}

                {enabled && (

                    <div className="mt-5">

                        <h3 className="font-semibold">
                            Run this coupon
                        </h3>


                        <p className="mt-1 text-xs text-gray-500">

                            Must stay within:

                            {" "}

                            {formatDateTime(
                                earliest
                            )}

                            {" → "}

                            {formatDateTime(
                                adminEnd
                            )}

                        </p>


                        <div className="mt-4 grid grid-cols-2 gap-4">

                            <div>

                                <label className="text-sm font-medium">
                                    Starts
                                </label>

                                <input
                                    type="datetime-local"

                                    value={toLocalDateTimeInput(vendorStart)}

                                    min={toLocalDateTimeInput(earliest)}

                                    max={toLocalDateTimeInput(adminEnd)}

                                    onChange={(e) => {

                                        const newStart =
                                            new Date(e.target.value);

                                        setVendorStart(newStart);

                                        // Default end = 23:59:59
                                        // of the selected start day
                                        let newEnd =
                                            endOfDay(newStart);

                                        // Never exceed admin coupon validity
                                        if (
                                            adminEnd &&
                                            newEnd > adminEnd
                                        ) {
                                            newEnd = adminEnd;
                                        }

                                        setVendorEnd(newEnd);
                                    }}

                                    className="mt-1 w-full rounded-lg border p-2"
                                />

                            </div>


                            <div>

                                <label className="text-sm font-medium">
                                    Ends
                                </label>

                                <input
                                    type="datetime-local"

                                    value={toLocalDateTimeInput(vendorEnd)}

                                    min={toLocalDateTimeInput(vendorStart)}

                                    max={toLocalDateTimeInput(adminEnd)}

                                    onChange={(e) =>
                                        setVendorEnd(
                                            new Date(e.target.value)
                                        )
                                    }

                                    className="mt-1 w-full rounded-lg border p-2"
                                />

                            </div>

                        </div>

                    </div>

                )}


                {/* ACTIONS */}

                <div className="mt-6 flex gap-3">

                    <button
                        onClick={close}
                        className="flex-1 rounded-xl border px-4 py-3"
                    >
                        Cancel
                    </button>


                    <button
                        disabled={saving}
                        onClick={handleSave}
                        className="flex-1 rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white disabled:opacity-50"
                    >

                        {saving
                            ? "Saving..."
                            : "Save"}

                    </button>

                </div>

            </div>

        </div>

    );

};





export default Coupons;