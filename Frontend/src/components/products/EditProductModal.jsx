import {ProductForm} from "./ProductForm";

export const EditProductModal = ({ product, close }) => {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-3xl rounded-lg bg-white p-8">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold"> Edit Product </h2>

                    <button
                        onClick={close}
                        className="text-xl bg-primary-bg2-color font-black py-1 px-2 rounded-lg"
                    > ✕ </button>

                </div>

                <ProductForm
                    product={product}
                    close={close}
                    editMode={true}
                />
            </div>
        </div>
    );
};