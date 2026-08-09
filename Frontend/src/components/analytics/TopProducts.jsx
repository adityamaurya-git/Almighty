import { useAnalytics } from "../../hooks/useAnalytics";

const TopProducts = () => {

    const { topProducts } = useAnalytics();

    return (

        <div className="rounded-lg bg-white shadow border border-primary-bg2-color p-6">

            <h2 className="text-xl font-bold mb-6">

                Top Selling Products

            </h2>

            <div className="space-y-4">

                {

                    topProducts.map((product, index) => (

                        <div
                            key={product.id}
                            className="flex justify-between items-center border-b pb-3"
                        >

                            <div>

                                <p className="font-semibold">

                                    {index + 1}. {product.name}

                                </p>

                                <p className="text-sm text-gray-500">

                                    {product.sold} Sold

                                </p>

                            </div>

                            <p className="font-bold">

                                ₹{product.revenue}

                            </p>

                        </div>

                    ))

                }

            </div>

        </div>

    );

};

export default TopProducts;