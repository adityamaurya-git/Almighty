const HistoryRow = ({ order }) => {

    // console.log(order);

    return (
        <tr className="border-b border-primary-bg2-color text-center">
            <td className="p-4"> {order.orderId} </td>

            <td className="p-4"> ₹{order.subtotal} </td>

            {/* <td className="p-4"> {order.paymentStatus} </td> */}

            <td className="p-4"> {order.status} </td>

            <td className="p-4">
                {
                    order.riderName
                    ?
                    order.riderName
                    :
                    "-"
                }
            </td>
        </tr>

    );

};

export default HistoryRow;