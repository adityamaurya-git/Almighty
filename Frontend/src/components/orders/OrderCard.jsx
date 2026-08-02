import { updateOrderStatus } from "../../services/order.service";
import { STATUS } from "../../utils/orderStatus";
import StatusBadge from "./StatusBadge";


const OrderCard = ({ order }) => {
    // console.log(order);
    const handleStatus = async (status) => {
        try {
            // await updateOrderStatus( order.id, status );
            await updateOrderStatus( order, status );
        }
        catch (error) {
            console.log(error);
        }

    };

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
            </div>

            <hr className="my-5 border-primary-bg2-color" />

            {/* ORDER DETAILS - ID , NAME , QTY , PRICE */}
            <div className="space-y-3">
                {
                    order.items.map(item => (
                        <div key={item.id} className="flex justify-between">
                            <div> {item.name} </div>
                            <div> {item.qty} × ₹{item.price} </div>
                        </div> ))

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

                    order.status === STATUS.CONFIRMED &&
                    <button
                        className="px-4 py-2 rounded bg-blue-600 text-white"
                        onClick={() => handleStatus(STATUS.PACKED)}
                    >Order Packed</button>

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
                </div>  )}
        </div>

    );

};

export default OrderCard;