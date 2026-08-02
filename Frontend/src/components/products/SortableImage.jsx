import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FiMove, FiX } from "react-icons/fi";

const SortableImage = ({
    id,
    image,
    index,
    removeImage,
}) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group relative overflow-hidden rounded-xl"
        >
            {index === 0 && (
                <span className="absolute left-2 top-2 z-20 rounded bg-green-600 px-2 py-1 text-xs text-white">
                    Cover
                </span>
            )}

            <img
                src={image}
                alt="Product"
                className="h-36 w-full object-cover"
            />

            <button
                type="button"
                {...attributes}
                {...listeners}
                className="absolute bottom-2 left-2 rounded bg-black/70 p-2 text-white hover:bg-black"
            >
                <FiMove />
            </button>

            <button
                type="button"
                onClick={() => removeImage(id)}
                className="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-white opacity-0 transition group-hover:opacity-100"
            >
                <FiX />
            </button>
        </div>
    );
};

export default SortableImage;