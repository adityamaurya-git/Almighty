import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CategoryDropdown from "./CategoryDropdown";
import { useProducts } from "../../hooks/useProducts";
import { useAuth } from "../../hooks/useAuth";
import ProductImageUpload from "./ProductImageUpload";
import { v4 as uuidv4 } from "uuid";




export const ProductForm = ({ close, product = null, editMode = false }) => {

    const { outlet } = useAuth();

    const [formData, setFormData] = useState({

        name: product?.name || "",
        description: product?.description || "",
        // category: outlet?.category || "",
        price: product?.price || "",
        discountPrice: product?.discountPrice || "",
        stock: product?.stock || "",
        unit: product?.unit || "piece",
        status: product?.status || "active"

    });

    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const { createProduct, updateProduct } = useProducts();
    // console.log("outlet in product form : ", outlet);


    useEffect(() => {
        if (!product) {
            setImages([]);
            return;
        }

        setImages(
            (product.images || []).map(url => ({
                id: uuidv4(),
                url,
                isNew: false
            }))
        );
    }, [product]);



    // Handle form input changes

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: 
                name === "price" ||
                name === "discountPrice" ||
                name === "stock"
                    ? value === "" 
                        ? "" 
                        : Number(value)
                    : value
        }));

    }


    // Handle image selection
    const handleImages = (e) => {

        const files = Array.from(e.target.files);

        if (!files.length) return;
        if (images.length + files.length > 5) {
            toast.error("Maximum 5 images allowed");
            return;
        }

        const newPreviews = files.map(file =>
            URL.createObjectURL(file)
        );

        setImages(prev => [
            ...prev,
            ...files
        ]);
    };


    // Remove image from selection
    const removeImage = (id) => {

        setImages(prev => {

            const image = prev.find(item => item.id === id);

            if (image) {

                URL.revokeObjectURL(image.preview);

            }

            return prev.filter(item => item.id !== id);

        });

    };


    // Validate form data
    const validate = () => {

        const newErrors = {};
        if (!formData.name.trim())
            newErrors.name = "Product name is required";


        // if (!formData.category)
        //     newErrors.category = "Category is required";


        if (!formData.description.trim())
            newErrors.description = "Description is required";


        if (!formData.price)
            newErrors.price = "Price is required";


        if (Number(formData.price) <= 0)
            newErrors.price = "Price must be greater than zero";


        if (formData.discountPrice) {
            if (
                Number(formData.discountPrice) >
                Number(formData.price)
            ) {
                newErrors.discountPrice =
                    "Discount price cannot exceed selling price";
            }
        }

        if (!formData.stock)
            newErrors.stock = "Stock is required";


        if (Number(formData.stock) < 0)
            newErrors.stock = "Invalid stock";


        if (images.length === 0)
            newErrors.images =
                "Upload at least one image";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    };

    // Handle form submission
    const handleSubmit = async (e) => {

        e.preventDefault();

        // console.log("formData in product form : ", formData);

        if (!validate()) return;

        try {
            setLoading(true);
            if (editMode) {
                console.log("images state : ", images);
                await updateProduct(product.id,
                    {
                        ...formData,
                        outletId: outlet.id,
                        shopName: outlet.shopName,
                        ownerId: outlet.ownerId,
                        businessId: outlet.businessId,
                        category: outlet.category,
                        images: images
                            .filter(image => !image.isNew)
                            .map(image => image.url)
                    },
                    images
                        .filter(image => image.isNew)
                        .map(image => image.file)

                );
            }
            else {
                await createProduct(
                    {
                        ...formData,
                        outletId: outlet.id,
                        shopName: outlet.shopName,
                        ownerId: outlet.ownerId,
                        businessId: outlet.businessId,
                        category: outlet.category
                    },
                    images.map(img => img.file)
                );
            }

            toast.success(
                editMode ? "Product Updated Successfully" : "Product Added Successfully");
            close();
        }
        catch (err) {
            console.log(err);
            toast.error("Failed to add product");
        }
        finally {
            setLoading(false);
        }
    };


    const handleDragEnd = (event) => {

        const { active, over } = event;

        if (!over) return;

        if (active.id === over.id) return;

        const oldIndex = images.findIndex(

            img => img.id === active.id

        );

        const newIndex = images.findIndex(

            img => img.id === over.id

        );

        setImages(

            arrayMove(

                images,

                oldIndex,

                newIndex

            )

        );

    };

    return (

        <form onSubmit={handleSubmit}
            className="" >


            <div className="grid grid-cols-2 gap-5">

                {/* name */}
                <div className="">
                    <label> Product Name </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-2"
                    />

                    <p className="text-red-500 text-sm"> {errors.name}</p>

                </div>


                {/* category */}
                {/* <div>
                    <label> Category </label>

                    <CategoryDropdown
                        value={formData.category}
                        onChange={(e) =>
                            setFormData(prev => ({
                                ...prev,
                                category: e.target.value
                            }))
                        }
                    />

                    <p className="text-red-500 text-sm"> {errors.category} </p>
                </div> */}

                <div>
                    <label> Description </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={2}
                        className="w-full border rounded-xl p-2"
                    />

                    <p className="text-red-500 text-sm"> {errors.description} </p>

                </div>
            </div>






            <div className="grid grid-cols-4 gap-5 mt-2">

                {/* <div className="grid grid-cols-4 gap-5"> */}
                <div>
                    <label>Price</label>

                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <p className="text-red-500 text-sm"> {errors.price}</p>

                </div>



                <div>
                    <label>Discount Price </label>

                    <input
                        type="number"
                        name="discountPrice"
                        value={formData.discountPrice}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <p className="text-red-500 text-sm"> {errors.discountPrice}</p>

                </div>

                {/* </div> */}



                {/* <div className="grid grid-cols-4 gap-5"> */}

                {/* stock */}
                {/* { */}
                    {/* outlet?.category !== "Food Delivery" && ( */}
                        <div>
                            <label> Stock </label>

                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="w-full border rounded-xl p-3"
                            />

                            <p className="text-red-500 text-sm"> {errors.stock} </p>

                        </div>
                    {/* )
                } */}

                {/* unit */}

                {/* {
                    outlet?.category !== "Food Delivery" && ( */}

                        <div>
                            <label> Unit </label>

                            <select
                                name="unit"
                                value={formData.unit}
                                onChange={handleChange}
                                className="w-full border rounded-xl p-3"
                            >
                                <option value="piece"> Piece </option>

                                <option value="kg"> Kg </option>

                                <option value="gram"> Gram </option>

                                <option value="litre"> Litre </option>

                                <option value="packet"> Packet </option>

                            </select>

                        </div>
                    {/* )
                }

                </div> */}

            </div>

            <div>
                <label className="mb-2 block font-medium"> Product Images </label>

                <ProductImageUpload
                    images={images}
                    setImages={setImages}

                />

                {
                    errors.images && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.images}
                        </p>
                    )
                }

            </div>

            <div className="flex justify-end gap-4 pt-4">

                <button
                    type="button"
                    onClick={close}
                    className="rounded-xl border px-5 py-3 cursor-pointer"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className={`rounded-xl px-6 py-3 cursor-pointer transition ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-primary-bg2-color"
                        }`}
                >
                    {editMode ? "Update Product" : "Save Product"}
                </button>

            </div>

        </form>
    )
};