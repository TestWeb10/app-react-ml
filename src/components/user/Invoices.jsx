import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Pagination from "../pagination/Pagination";
import InfiniteModal from "../modals/InfiniteModal";
import AskDeleteDate from "../AskDeleteDate";
import { useDb } from "../../context/DbContext";
import ErrorsAlert from "../alerts/ErrorsAlert";

function InvoicesTable({ invoices }) {
    return (
        <div className="block m-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Facturas
            </h5>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Fecha inicial</th>
                                    <th scope="col" className="px-6 py-4">Fecha final</th>
                                    <th scope="col" className="px-6 py-4">Subtotal</th>
                                    <th scope="col" className="px-6 py-4">Rutas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    invoices.map((invoice, index) => (
                                        <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={index}>
                                            <td className="whitespace-nowrap px-6 py-4">{invoice.initial_date}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{invoice.final_date}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{invoice.subtotal}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{invoice.total_routes.join(", ")}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Invoices() {
    const [currentPage, setCurrentPage] = useState(1);
    const { userInvoices } = useAuth()
    const { deleteInvoicesByDate, errors: dbErrors, isLoading: dbIsLoading, operation: dbOperation } = useDb()
    const elementsPerPage = 4
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const elements = userInvoices.sort(function (a, b) {
        return (a.initial_date < b.initial_date) ? 1 : (a.initial_date > b.initial_date) ? -1 : 0
    });
    const currentElements = elements.slice(indexOfFirstElement, indexOfLastElement);

    const callbackDate = async (date) => {
        deleteInvoicesByDate(date)
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="block m-2 rounded-lg bg-white p-6 dark:bg-neutral-700">
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Informacion de las facturas
                </h5>
            </div>
            {
                (dbOperation === "deleteInvoicesByDate") ? (
                    <ErrorsAlert errors={dbErrors} />
                ) : null
            }
            {
                (dbIsLoading && dbOperation === "deleteInvoicesByDate") ? (
                    <InfiniteModal title="Eliminacion de facturas de la base de datos" message="Espere mientras se lleva a cabo la operacion..." />
                ) : null
            }
            <AskDeleteDate callback={callbackDate} title="Eliminar facturas de la base de datos" />
            <div className="flex flex-wrap">
                <div className="w-full">
                    <InvoicesTable invoices={currentElements} />
                    <Pagination
                        elementsPerPage={elementsPerPage}
                        totalElements={elements.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default Invoices