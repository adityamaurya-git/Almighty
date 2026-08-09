const PreparationTimeModal = ({

    onYes,

    onNo

}) => {

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-md rounded-2xl bg-white p-6">

                <h2 className="text-xl font-bold">

                    Preparation Time

                </h2>

                <p className="mt-4 text-slate-600">

                    Only

                    <span className="font-semibold">

                        {" "}5 minutes{" "}

                    </span>

                    are remaining.

                </p>

                <p className="mt-2 text-slate-600">

                    Do you want to extend the preparation

                    time by another

                    <span className="font-semibold">

                        {" "}5 minutes?

                    </span>

                </p>

                <div className="mt-6 flex justify-end gap-3">

                    <button

                        onClick={onNo}

                        className="rounded-lg border px-5 py-2"

                    >

                        Continue

                    </button>

                    <button

                        onClick={onYes}

                        className="rounded-lg bg-red-600 px-5 py-2 text-white"

                    >

                        +5 Minutes

                    </button>

                </div>

            </div>

        </div>

    );

};

export default PreparationTimeModal;