import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { EditProductModal } from "./EditProductModal";
import { useProducts } from "../../hooks/useProducts";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import StockToggle from "./StockToggle";

import toast from "react-hot-toast";
import { Availability } from "./ProductCard/Availability";
import { requiresInventory } from "../../utils/productRules";

const ProductCard = ({ product }) => {

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const { deleteProduct } = useProducts();
    const { toggleStock } = useProducts();

    const inventoryRequired = requiresInventory(product.category);

    const handleDelete = async () => {

        try {
            setLoadingDelete(true);
            await deleteProduct(product.id);
            toast.success("Product Deleted");
        }

        catch {
            toast.error("Unable to delete product");
        }

        finally {
            setLoadingDelete(false);
            setShowDelete(false);
        }
    };

    // const handleToggle = async () => {

    //     try {

    //         const newAvailable = !product.available;

    //         await toggleStock(
    //             product.ownerId,
    //             product.businessId,
    //             product.outletId,
    //             product.productId,
    //             newAvailable
    //         )

    //         toast.success(
    //             newAvailable
    //                 ? "Product is now available"
    //                 : "Product is now unavailable"
    //         );

    //     } catch (err) {
    //         console.error("Failed to update availability:", err);
    //         toast.error("Unable to update availability");
    //     }

    // };


    const handleToggle = async () => {

        try {

            console.log("🔥 PRODUCT BEFORE TOGGLE:", product);

            console.log("🔥 ownerId:", product.ownerId);
            console.log("🔥 businessId:", product.businessId);
            console.log("🔥 outletId:", product.outletId);
            console.log("🔥 productId:", product.productId);

            const newAvailable = !product.available;

            await toggleStock(
                product.ownerId,
                product.businessId,
                product.outletId,
                product.productId,
                newAvailable
            );

            toast.success(
                newAvailable
                    ? "Product is now available"
                    : "Product is now unavailable"
            );

        } catch (err) {

            console.error(
                "Failed to update availability:",
                err
            );

            toast.error(
                "Unable to update availability"
            );

        }
    };

    return (

        <div className="overflow-hidden rounded-xl  shadow transition hover:shadow-lg border border-primary-bg2-color">
            <div className="relative">
                <img
                    src={product.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
                    alt={product.name}
                    className="h-36 w-full object-cover"
                />
                <StockToggle
                    product={product}
                    onToggle={handleToggle}
                />

                {inventoryRequired && (
                    <Availability stock={product.stock} />
                )}

            </div>

            <div className="p-4 border-t border-primary-bg2-color">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold"> {product.name}</h2>

                    <span
                        className={`rounded-lg px-3 py-1 text-xs font-semibold
                        ${product.available
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                    >

                        {product.available
                            ? "Available"
                            : "Unavailable"}

                    </span>

                </div>

                <p className="text-sm text-gray-500">{product.category}</p>

                <div className="mt-4 flex items-center justify-between">
                    {/* PRICE */}
                    <div className="flex items-baseline gap-2">

                        {product.discountPrice ? (
                            <>
                                {/* Discounted price */}
                                <span className="text-2xl font-bold text-black">
                                    ₹{product.discountPrice}
                                </span>

                                {/* Original price */}
                                <span className="text-sm font-medium text-gray-400 line-through">
                                    ₹{product.price}
                                </span>
                            </>
                        ) : (
                            /* Normal price when there is no discount */
                            <span className="text-2xl font-bold text-black">
                                ₹{product.price}
                            </span>
                        )}

                    </div>
                    {/* ACTION BUTTONS */}
                    <div className="flex gap-4">

                        <div
                            className="flex"
                            onClick={() => setShowEdit(true)}
                        >
                            <button className="rounded-lg bg-primary-bg2-color p-2 text-black cursor-pointer">
                                <FiEdit2 />
                            </button>
                        </div>

                        <div
                            className="flex"
                            onClick={() => setShowDelete(true)}
                        >
                            <button
                                className="rounded-lg bg-primary-bg2-color p-2 text-black cursor-pointer"
                            >
                                <FiTrash2 />
                            </button>
                        </div>

                    </div>

                </div>
            </div>

            {
                showEdit && (
                    <EditProductModal
                        product={product}
                        close={() => setShowEdit(false)}
                    />
                )
            }
            {
                showDelete && (
                    <ConfirmDeleteModal
                        product={product}
                        onCancel={() => setShowDelete(false)}
                        onDelete={handleDelete}
                        loading={loadingDelete}
                    />
                )
            }
        </div>

    );

};

export default ProductCard;