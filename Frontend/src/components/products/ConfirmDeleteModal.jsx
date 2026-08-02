const ConfirmDeleteModal = ({ product, onCancel, onDelete, loading }) => {

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-2xl bg-white p-6">
                <h2 className="text-xl font-bold">
                    Delete Product
                </h2>

                <p className="mt-3 text-slate-600">
                    Are you sure you want to delete
                    <span className="font-semibold">
                        {" "}
                        {product.name}
                    </span>
                    ?
                </p>

                <p className="mt-2 text-sm text-red-500">
                    This action can be undone by an admin.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="rounded-lg border px-5 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onDelete}
                        disabled={loading}
                        className="rounded-lg bg-red-600 px-5 py-2 text-white"
                    >

                        {loading ? "Deleting..." : "Delete"}

                    </button>

                </div>

            </div>

        </div>

    );
};
export default ConfirmDeleteModal;