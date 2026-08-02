import { useProducts } from "../../../hooks/useProducts";


export const Availability = ({stock}) => {

    const { products } = useProducts();

    return(<>
        {
            products.map((product) =>{
                if(stock <= 5){
                    return(
                        <span key={product.id} className="absolute top-2 left-2 bg-primary-bg-color text-white p-1 rounded-lg animate-bounce text-xs font-semibold">
                            Low Stock
                        </span>
                    )
                }
            })
        }        
    </>)
}