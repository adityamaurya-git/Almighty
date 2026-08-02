const categories = [

    "Burger",
    "Pizza",
    "Beverages",
    "Chinese",
    "Dessert",
    "South Indian"

];

const CategoryDropdown = ({ value, onChange }) => {

    return (

        <select
            value={value}
            onChange={onChange}
            className="border rounded-xl p-3 w-full"
        >

            <option> Select Category </option>
            {
                categories.map(item => (
                    <option
                        key={item}
                        value={item}
                    >
                        {item}
                    </option>
                ))
            }
        </select>

    )

}

export default CategoryDropdown;