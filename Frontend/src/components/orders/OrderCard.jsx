import { useEffect, useState } from "react";

import {
    updateOrderStatus,
    extendPreparationTime,
    completePreparation,
    markExtensionPromptShown
} from "../../services/order.service";

import { STATUS } from "../../utils/orderStatus";

import StatusBadge from "./StatusBadge";

import usePreparationTimer from "../../hooks/usePreparationTimer";

import PreparationTimeModal from "./PreparationModal";


const OrderCard = ({ order }) => {

    const { remaining, minutes, seconds, isFinished } = usePreparationTimer(
        order.acceptedAt,
        order.prepTime
    );

    const [showPreparationPopup, setShowPreparationPopup] = useState(false);

    const handleStatus = async (status) => {
        try {

            await updateOrderStatus(order, status);
        }
        catch (error) {
            console.log(error);
        }

    };


    // const remaining = usePreparationTimer(order.acceptedAt, order.prepTime);
    // const [showPreparationModal, setShowPreparationModal] = useState(false);
    // const [timerFinished, setTimerFinished] = useState(false);


    useEffect(() => {

        if (

            order.status !== STATUS.CONFIRMED ||

            !order.acceptedAt ||

            order.extensionPromptShown

        ) return;

        if (

            remaining <= 5 * 60 * 1000 &&

            remaining > 0

        ) {

            setShowPreparationPopup(true);

            markExtensionPromptShown(order.id);

        }

    }, [

        remaining,

        order

    ]);
    // console.log("remaining = ", remaining);


    return (

        <div className="rounded-xl bg-white p-4 shadow sm:p-6 border-primary-bg2-color border hover:shadow-lg transition ">

            {/* ORDER HEADER - NAME , STATUS , PRICE */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="font-bold text-lg">
                        {order.orderId}
                    </h2>

                    <p className="text-gray-500">
                        ₹ {order.subtotal}
                    </p>
                </div>

                <StatusBadge status={order.status} />

                {

                    order.status === STATUS.CONFIRMED && (
                        <div className="mt-5 rounded-xl flex items-center gap-2 bg-blue-50 px-4 py-2">
                            ⏱
                            <h2 className="text-xl font-bold text-blue-600 ">
                                
                                {
                                    String(minutes).padStart(2, "0")
                                }
                                :
                                {
                                    String(seconds).padStart(2, "0")
                                }
                            </h2>
                        </div>
                    )
                }
            </div>

            <hr className="my-5 border-primary-bg2-color" />

            {/* ORDER DETAILS - ID , NAME , QTY , PRICE */}
            <div className="space-y-3">
                {
                    order.items.map(item => (
                        <div key={item.id} className="flex justify-between">
                            <div> {item.name} </div>
                            <div> {item.qty} × ₹{item.price} </div>
                        </div>))

                }
            </div>

            <hr className="my-5 border-primary-bg2-color" />

            {/* ORDER ACTIONS - ACCEPT , REJECT , PACKED , PICKED UP , DELIVERED */}
            <div className="flex flex-wrap gap-3">
                {
                    order.status === STATUS.PLACED &&
                    <>
                        <button className="px-4 py-2 cursor-pointer rounded bg-green-600 text-white"
                            onClick={() => handleStatus(STATUS.CONFIRMED)}
                        > Accept </button>

                        <button className="px-4 py-2 cursor-pointer rounded bg-red-600 text-white"
                            onClick={() => handleStatus(STATUS.REJECTED)}

                        > Reject</button>
                    </>
                }

                {

                    order.status === STATUS.CONFIRMED && (
                        <>
                            {
                                !isFinished ?
                                    (
                                        <button
                                            disabled
                                            className="rounded bg-gray-300 px-5 py-2 text-gray-600"
                                        >
                                            Preparing...
                                        </button>

                                    )
                                    :
                                    (
                                        <button
                                            onClick={async () => {
                                                await completePreparation(order);
                                            }}
                                            className="rounded bg-blue-600 px-5 py-2 text-white"
                                        >
                                            Ready For Pickup
                                        </button>
                                    )
                            }
                        </>
                    )
                }

                {
                    order.status === STATUS.PACKED &&
                    <button disabled
                        className="px-4 py-2 rounded bg-orange-500 text-white"
                    >Waiting for Rider </button>

                }

                {
                    order.status === STATUS.PICKED_UP &&
                    <button disabled
                        className="px-4 py-2 rounded bg-purple-600 text-white"
                    >Picked Up </button>

                }

                {
                    order.status === STATUS.DELIVERED &&
                    <button disabled
                        className="px-4 py-2 rounded bg-green-600 text-white"
                    >Delivered </button>

                }

                {
                    order.status === STATUS.REJECTED &&
                    <button disabled
                        className="px-4 py-2 rounded bg-red-600 text-white"
                    > Rejected </button>

                }

            </div>

            {order.dispatchStatus === "assigned" && (
                <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3">
                    <p className="text-sm font-semibold text-green-700">
                        Delivery Partner Assigned
                    </p>

                    <p className="mt-2">
                        <span className="font-medium">Name:</span> {order.riderName}
                    </p>

                    <p>
                        <span className="font-medium">Phone:</span> {order.riderPhone}
                    </p>
                </div>)}


            {

                showPreparationPopup && (
                    <PreparationTimeModal
                        onYes={async () => {
                            await extendPreparationTime(order);
                            setShowPreparationPopup(false);
                        }}
                        onNo={() => {
                            setShowPreparationPopup(false);
                        }}
                    />
                )
            }
            {
                remaining === 0 &&
                order.status === STATUS.CONFIRMED && (
                    <div className="mt-4 rounded-lg bg-yellow-100 p-3">
                        <p className="font-semibold">
                            Preparation Time Completed
                        </p>
                    </div>
                )
            }

        </div>

    );

};

export default OrderCard;