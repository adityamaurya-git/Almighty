import { useRef, useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableImage from "./SortableImage";
import { v4 as uuidv4 } from "uuid";


const ProductImageUpload = ({ images, setImages }) => {

    const inputRef = useRef(null);
    const [dragging, setDragging] = useState(false);

    // const addFiles = (files) => {
    //     const selectedFiles = Array.from(files);

    //     if (!selectedFiles.length) return;

    //     if (images.length + selectedFiles.length > 5) {

    //         toast.error("Maximum 5 images allowed");

    //         return;

    //     }

    //     const allowed = [
    //         "image/jpeg",
    //         "image/png",
    //         "image/webp",
    //         "image/jpg"
    //     ];

    //     for (const file of selectedFiles) {

    //         if (!allowed.includes(file.type)) {

    //             toast.error(`${file.name} is not a valid image`);

    //             return;

    //         }

    //         if (file.size > 5 * 1024 * 1024) {

    //             toast.error("Image size should be less than 5MB");

    //             return;

    //         }

    //     }

    //     const previews = selectedFiles.map(file =>
    //         URL.createObjectURL(file)
    //     );

    //     setImages(prev => [...prev, ...selectedFiles]);

    //     setPreviewImages(prev => [...prev, ...previews]);

    // };


    const addFiles = (files) => {

        const selectedFiles = Array.from(files);

        if (!selectedFiles.length) return;

        if (images.length + selectedFiles.length > 5) {

            toast.error("Maximum 5 images allowed");

            return;

        }

        const allowed = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/jpg"
        ];

        const newImages = [];

        for (const file of selectedFiles) {

            if (!allowed.includes(file.type)) {
                toast.error(`${file.name} is not supported`);
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                toast.error(`${file.name} exceeds 5MB`);
                return;
            }

            newImages.push({
                id: uuidv4(),
                file,
                preview: URL.createObjectURL(file),
                isNew: true
            });

        }

        setImages(prev => [...prev, ...newImages]);

    };

    const removeImage = (id) => {

        setImages(prev => {

            const image = prev.find(img => img.id === id);

            if (image?.isNew) {
                URL.revokeObjectURL(image.preview);
            }

            return prev.filter(img => img.id !== id);

        });

    };

    const handleDrop = (e) => {

        e.preventDefault();

        setDragging(false);

        addFiles(e.dataTransfer.files);

    };


    const handleDragEnd = (event) => {

        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = images.findIndex(image => image.id === active.id);

        const newIndex = images.findIndex(
        image => image.id === over.id);

        setImages(prev => arrayMove(prev, oldIndex, newIndex));

        // setPreviewImages(prev =>
        //     arrayMove(prev, oldIndex, newIndex)
        // );

    };

    return (

        <div className="space-y-4">

            <div
                onClick={() => inputRef.current.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={` flex h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition ${dragging
                    ? "border-red-500 bg-red-50"
                    : "border-slate-300 bg-slate-50"
                    }
                `}
            >

                <FiUploadCloud
                    size={55}
                    className="text-red-500"
                />

                <h2 className="mt-2 text-md font-semibold"> Drag & Drop Images </h2>

                <p className="mt-1 text-sm text-slate-500"> or click to browse </p>

                <p className="mt-3 text-xs text-slate-400"> JPG • PNG • WEBP ||  Maximum 5 images || Max size 5MB
                </p>

            </div>

            <input
                ref={inputRef}
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={(e) => addFiles(e.target.files)}
            />

            {
                images.length > 0 && (
                    <>
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold"> Uploaded Images </h3>

                            <span className="text-sm text-slate-500">
                                {images.length}/5
                            </span>

                        </div>

                        {/* <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                            {
                                previewImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className="group relative"
                                    >
                                        <img
                                            src={image}
                                            className="h-32 w-full rounded-xl object-cover"
                                        />

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();

                                                removeImage(index);

                                            }}

                                            className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white opacity-0 transition group-hover:opacity-100"

                                        >

                                            <FiX />

                                        </button>

                                    </div>

                                ))

                            }

                        </div> */}


                        <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >

                            <SortableContext
                                items={images.map(image => image.id)}
                                strategy={rectSortingStrategy}
                            >

                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">

                                    {images.map((image, index) => (

                                        <SortableImage
                                            key={image.id}
                                            id={image.id}
                                            image={image.isNew ? image.preview : image.url}
                                            index={index}
                                            removeImage={removeImage}
                                        />

                                    ))}

                                </div>

                            </SortableContext>

                        </DndContext>

                    </>

                )

            }

        </div>

    );

};

export default ProductImageUpload;