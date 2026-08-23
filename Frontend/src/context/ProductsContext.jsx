import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { subscribeInventory, getProductById, createProduct, updateProduct, deleteProduct, toggleStock } from "../services/product.service";


export const ProductsContext = createContext();


export const ProductsProvider = ({ children }) => {

    const { outlet } = useAuth();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        // =========================================
        // WAIT FOR OUTLET
        // =========================================

        if (
            !outlet?.ownerId ||
            !outlet?.businessId ||
            !outlet?.outletId
        ) {

            setProducts([]);
            setLoading(false);

            return;
        }


        setLoading(true);


        // =========================================
        // SUBSCRIBE ONLY TO OUTLET INVENTORY
        // =========================================

        const unsubscribeInventory =
            subscribeInventory(
                outlet.ownerId,
                outlet.businessId,
                outlet.outletId,

                async (inventoryData) => {

                    try {

                        if (!inventoryData.length) {

                            setProducts([]);
                            setLoading(false);

                            return;
                        }


                        // =========================================
                        // FETCH EACH PRODUCT USING productId
                        // =========================================

                        const productResults =
                            await Promise.all(

                                inventoryData.map(
                                    async (inventory) => {

                                        if (!inventory.productId) {
                                            return null;
                                        }


                                        const product =
                                            await getProductById(
                                                inventory.productId
                                            );


                                        if (!product) {
                                            return null;
                                        }


                                        // =================================
                                        // MERGE
                                        // =================================

                                        return {

                                            // Product collection data
                                            ...product,

                                            // Inventory data overrides
                                            ...inventory

                                        };

                                    }
                                )

                            );


                        // =========================================
                        // REMOVE INVALID PRODUCTS
                        // =========================================

                        const validProducts =
                            productResults.filter(Boolean);


                        // console.log(
                        //     "Outlet Products:",
                        //     validProducts
                        // );


                        setProducts(validProducts);
                        setLoading(false);


                    } catch (error) {

                        console.error(
                            "Error loading outlet products:",
                            error
                        );

                        setProducts([]);
                        setLoading(false);

                    }

                }
            );


        // =========================================
        // CLEANUP
        // =========================================

        return () => {

            unsubscribeInventory();

        };


    }, [
        outlet?.ownerId,
        outlet?.businessId,
        outlet?.outletId
    ]);


    return (

        <ProductsContext.Provider
            value={{
                products,
                loading,

                createProduct,
                updateProduct,
                deleteProduct,
                toggleStock
            }}
        >

            {children}

        </ProductsContext.Provider>

    );

};