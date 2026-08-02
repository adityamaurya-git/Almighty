import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { subscribeProducts , createProduct , updateProduct , deleteProduct , toggleStock  } from "../services/product.service";


export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {

    const { vendor } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!vendor?.id) return;

        const unsubscribe = subscribeProducts(vendor.id, (data) => {
                setProducts(data);
                setLoading(false);
            }
        );

        return unsubscribe;
    }, [vendor]);

    return (

        <ProductsContext.Provider

            value={{ products, loading , createProduct, updateProduct, deleteProduct, toggleStock }}

        >
            {children}

        </ProductsContext.Provider>

    );

};