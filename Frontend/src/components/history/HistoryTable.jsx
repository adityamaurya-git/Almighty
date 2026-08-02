import HistoryRow from "./HistoryRow";
import EmptyHistory from "./EmptyHistory";

const HistoryTable = ({ loading, orders }) => {

    if (loading)
        return <p>Loading...</p>;

    if (orders.length===0)
        return <EmptyHistory/>;

    return (

        <div className="bg-white rounded-lg shadow overflow-hidden">

            <table className="w-full">

                <thead className="sticky top-0 bg-primary-bg2-color z-10">
                    <tr className="">
                        <th className="px-4 py-4">Order</th>
                        <th className="px-4 py-4">Total</th>
                        {/* <th className="px-4 py-4">Payment</th> */}
                        <th className="px-4 py-4">Status</th>
                        <th className="px-4 py-4">Rider</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orders.map(order=>(
                            <HistoryRow
                                key={order.id}
                                order={order}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );

};

export default HistoryTable;