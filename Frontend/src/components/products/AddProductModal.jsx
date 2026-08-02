import {ProductForm} from "./ProductForm";

const AddProductModal = ({ close }) => {

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center z-50 border-2">
            <div className="bg-white rounded-lg w-162.5 p-5 border">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold"> Add Product </h1>

                    <button className="bg-primary-bg2-color px-2 py-1 font-black cursor-pointer rounded-lg " onClick={close}>
                        ✕
                    </button>

                </div>

                <ProductForm close={close} />

            </div>

        </div>

    )

}

export default AddProductModal;