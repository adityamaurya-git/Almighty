const isToday = (timestamp) => {

    if (!timestamp) return false;
    const orderDate = timestamp.toDate();

    return (
        orderDate.toDateString() === new Date().toDateString()
    );
};


export const calculateDashboardStats = (orders) => {

    const todayOrders = orders
    const revenue = todayOrders.reduce((sum, order) => {
        
        if (order.paymentStatus === "paid" && order.status.toLowerCase() === "delivered") {
            return sum + Number(order.vendorNetSubtotal || 0);
        }
        return sum;
    }, 0);

    const pending = orders.filter(order =>
        [
            "order placed",
            "confirmed",
            "order packed"
        ].includes(order.status.toLowerCase())
    ).length;

    const completed = orders.filter(order =>
        order.status.toLowerCase() === "delivered"
    ).length;

    const rejected = orders.filter(order =>
        order.status.toLowerCase() === "rejected"
    ).length;

    return {

        revenue,
        todayOrders: todayOrders.length,
        pending,
        completed,
        rejected

    };

};