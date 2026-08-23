import OrderCard from "./OrderCard";
import EmptyState from "../dashboard/EmptyState";

const OrderList = ({ orders }) => {

    // console.log("orders in OrderList", orders);

    if (orders.length === 0) {
        return <EmptyState/>;
    }

    return (
        <div className="space-y-4">
            {
                orders.map(order=>(
                    <OrderCard key={order.id} order={order} />
                ))

            }

        </div>

    );

};

export default OrderList;