function Pagination({ elementsPerPage, totalElements, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='py-2'>
            <div>
                <p className='mb-5 text-sm text-white font-bold'>
                    Total de resultados: {totalElements}
                </p>
            </div>
            <nav className='block'>
                <ul className='flex pl-0 rounded list-none flex-wrap'>
                    <li>
                        {
                            pageNumbers.map((number, index) => (
                                <a
                                    onClick={() => {
                                        paginate(number);
                                    }}
                                    className={
                                        currentPage === number
                                            ? "m-1 rounded-md bg-green-200 text-gray-800 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                            : "m-1 rounded-md bg-red-200 border-gray-800 text-gray-500 hover:bg-gray-400 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                    }
                                    key={index}
                                >
                                    {number}
                                </a>
                            ))
                        }
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination