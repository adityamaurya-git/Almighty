import ProductCard from "./ProductCard";
import EmptyProducts from "./EmptyProducts";

const ProductGrid = ({ products, loading }) => {

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-gray-500 text-lg">
                    Loading Products...
                </p>
            </div>
        );
    }

    if (products.length === 0) {
        return <EmptyProducts />;
    }

    return (

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">

            {products.map((product) => (

                <ProductCard
                    key={product.id}
                    product={product}
                />

            ))}

        </div>

    );

};

export default ProductGrid;