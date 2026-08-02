const Pagination = ({ total, pageSize, currentPage, setCurrentPage }) => {

    const pages = Math.ceil(total / pageSize);

    return (

        <div className="flex justify-center gap-3 mt-8">
            {
                Array.from({ length: pages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 rounded
                        ${currentPage === index + 1
                                ?
                                "bg-primary-bg2-color text-black"
                                :
                                "border"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))
            }
        </div>
    );
}

export default Pagination;