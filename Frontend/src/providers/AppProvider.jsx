import { AuthProvider } from "../context/AuthContext";
import { OrdersProvider } from "../context/OrdersContext";
import { ProductsProvider } from "../context/ProductsContext";

const AppProvider = ({ children }) => {

    return (

        <AuthProvider>

            <OrdersProvider>

                <ProductsProvider>

                    {children}

                </ProductsProvider>

            </OrdersProvider>

        </AuthProvider>

    );

};

export default AppProvider;