import { useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Header from "../components/dashboard/Header";
import ProductHeader from "../components/products/ProductHeader";
import ProductFilters from "../components/products/ProductFilter";
import ProductGrid from "../components/products/ProductGrid";
import { useProducts } from "../hooks/useProducts";
import Sidebar from "../components/dashboard/Sidebar";
import AddProductModal from "../components/products/AddProductModal";

const Products = () => {

    const { products, loading } = useProducts();
    
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [ showAdd , setShowAdd ] = useState(false);


    const filteredProducts = useMemo(() => {

        let data = [...products];

        if (filter === "Available") {
            data = data.filter(
                p => p.available === true
            );
        }

        if (filter === "Unavailable") {
            data = data.filter(
                p => p.available === false
            );
        }

        if (search.trim()) {
            data = data.filter(product =>
                product.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
            );
        }
        return data;
        
    }, [products, filter, search]);

    return (<>

        <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
            <Sidebar />

            <div className="flex flex-col w-full">
                <Header />

                <div className="w-full h-[90vh] overflow-auto p-6">

                    <div className="flex justify-between">
                        <ProductFilters
                            filter={filter}
                            setFilter={setFilter}
                        />

                        <ProductHeader
                            search={search}
                            setSearch={setSearch}
                            openModal={() => setShowAdd(true)}
                        />
                    </div>

                    <ProductGrid
                        loading={loading}
                        products={filteredProducts}
                    />

                    {
                        showAdd &&
                        <AddProductModal 
                            close={() => setShowAdd(false)}
                        />
                    }

                </div>


            </div>

        </div>
    </>);

};

export default Products;