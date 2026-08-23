import { useState } from "react";
import { updateAutoAccept } from "../../services/outlet.service";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

const AutoAcceptModal = ({ close }) => {

    const { outlet } = useAuth();
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);


    const enableAutoAccept = async () => {
        try {
            setLoading(true);

            await updateAutoAccept(
                outlet.ownerId,
                outlet.businessId,
                outlet.outletId,
                true
            );

            toast.success("Auto Accept Enabled");
            close();

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6">
                <h2 className="text-xl font-bold">
                    Enable Auto Accept?
                </h2>

                <ul className="mt-4 list-disc space-y-2 pl-6 text-sm">
                    <li>Every order will be accepted automatically.</li>
                    <li>You cannot manually reject orders.</li>
                    <li>Preparation should begin immediately.</li>
                    <li>You are responsible for stock availability.</li>
                    <li>Customers receive instant confirmation.</li>
                    <li>Almighty is not responsible for issues caused after enabling this feature.</li>
                </ul>

                <label className="mt-5 flex items-start gap-2">

                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e)=>setChecked(e.target.checked)}
                    />

                    <span className="text-sm">
                        I have read and agree to the above terms.
                    </span>

                </label>
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={close}
                        className="rounded border px-5 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={!checked || loading}
                        onClick={enableAutoAccept}
                        className="rounded bg-red-600 px-5 py-2 text-white disabled:opacity-50"
                    >
                        Enable
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AutoAcceptModal;