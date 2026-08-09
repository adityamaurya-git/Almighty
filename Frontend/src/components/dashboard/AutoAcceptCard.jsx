import { useState } from "react";
import AutoAcceptModal from "./AutoAcceptModal";
import { updateAutoAccept } from "../../services/vendor.service";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";


const AutoAcceptCard = () => {

    const { vendor } = useAuth();
    const [showModal, setShowModal] = useState(false);

    const handleToggle = async () => {

        // Turning OFF
        if (vendor.autoAcceptOrders) {
            await updateAutoAccept(
                vendor.id,
                false
            );

            toast.success("Auto Accept Disabled");
            return;
        }

        // Turning ON
        setShowModal(true);

    };

    return (

        <>
            <div className="rounded-2xl bg-white p-6 shadow">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold">
                            Auto Accept Orders
                        </h2>

                        <p className="text-sm text-slate-500">
                            Automatically accepts incoming orders.
                        </p>
                    </div>

                    <button
                        onClick={handleToggle}
                        className={` h-7 w-14 rounded-full transition
                        ${vendor.autoAcceptOrders
                            ? "bg-green-500"
                            : "bg-gray-300"}
                    `}
                    >

                    </button>
                </div>
            </div>

            {
                showModal &&
                <AutoAcceptModal
                    close={() => setShowModal(false)}
                />
            }
        </>
    );
};

export default AutoAcceptCard;