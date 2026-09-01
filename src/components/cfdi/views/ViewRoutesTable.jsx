import Pagination from "../../pagination/Pagination";
import { useState } from "react";

function OriginDestinationTable({ obj }) {
    return (
        <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                    <th scope="col" className="px-2 py-1">Informacion fiscal</th>
                    <th scope="col" className="px-2 py-1">Direccion</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                    <td className="whitespace-nowrap px-2 py-1">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-2 py-1">RFC</th>
                                    <th scope="col" className="px-2 py-1">Residencia fiscal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                    <td className="whitespace-nowrap px-2 py-1">{obj.fiscal_information.rfc}</td>
                                    <td className="whitespace-nowrap px-2 py-1">{obj.fiscal_information.fiscal_residence}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td className="whitespace-nowrap px-2 py-1">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-2 py-1">Direccion</th>
                                    <th scope="col" className="px-2 py-1">Nombre calle</th>
                                    <th scope="col" className="px-2 py-1">Numero calle</th>
                                    <th scope="col" className="px-2 py-1">Codigo postal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                    <td className="whitespace-nowrap px-2 py-1">{obj.address.address_line}</td>
                                    <td className="whitespace-nowrap px-2 py-1">{obj.address.street_name}</td>
                                    <td className="whitespace-nowrap px-2 py-1">{obj.address.street_number}</td>
                                    <td className="whitespace-nowrap px-2 py-1">{obj.address.zip_code}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

function ItemsTable({ items }) {
    return (
        <table className="table-fixed text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                    <th scope="col" className="px-2 py-1">Categoria</th>
                    <th scope="col" className="px-2 py-1">Descripcion</th>
                    <th scope="col" className="px-2 py-1 w-12 text-wrap">Codigo unidad</th>
                    <th scope="col" className="px-2 py-1 w-12 text-wrap">Clave paquete</th>
                    <th scope="col" className="px-2 py-1">Cantidad</th>
                    <th scope="col" className="px-2 py-1">Dimensiones</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item, index) => (
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={index}>
                            <td className="whitespace-nowrap px-2 py-1">{item.category_sat}</td>
                            <td className="whitespace-nowrap px-2 py-1 w-40 text-wrap">{item.description}</td>
                            <td className="whitespace-nowrap px-2 py-1">{item.unit_code}</td>
                            <td className="whitespace-nowrap px-2 py-1">{item.package_key}</td>
                            <td className="whitespace-nowrap px-2 py-1">{item.quantity}</td>
                            <td className="whitespace-nowrap px-2 py-1">
                                <table className="text-left text-sm font-light">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-2 py-1">Alto</th>
                                            <th scope="col" className="px-2 py-1">Ancho</th>
                                            <th scope="col" className="px-2 py-1">Largo</th>
                                            <th scope="col" className="px-2 py-1">Peso</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                            <td className="whitespace-nowrap px-2 py-1">{item.dimensions.height}</td>
                                            <td className="whitespace-nowrap px-2 py-1">{item.dimensions.width}</td>
                                            <td className="whitespace-nowrap px-2 py-1">{item.dimensions.length}</td>
                                            <td className="whitespace-nowrap px-2 py-1">{item.dimensions.weight}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}


function ShipmentsTable({ currentPage, elementsPerPage, shipments }) {
    return (
        <div className="block m-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-2 py-1">#</th>
                                    <th scope="col" className="px-2 py-1">ID envio</th>
                                    <th scope="col" className="px-2 py-1">Paquetes</th>
                                    <th scope="col" className="px-2 py-1">Origen</th>
                                    <th scope="col" className="px-2 py-1">Destino</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    shipments.map((shipment, index) => (
                                        <tr className="border-4 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={index}>
                                            <td className="align-text-top whitespace-nowrap px-2 py-1">{(index + 1) + ((currentPage - 1) * elementsPerPage)}</td>
                                            <td className="align-text-top whitespace-nowrap px-2 py-1">{shipment.id}</td>
                                            <td className="align-text-top whitespace-nowrap px-2 py-1">
                                                {
                                                    (!shipment.shipment.error) ? (
                                                        <ItemsTable items={shipment.shipment.package.items} />
                                                    ) : <p>SIN INFORMACION</p>
                                                }
                                            </td>
                                            <td className="align-text-top whitespace-nowrap px-2 py-1">
                                                {
                                                    (!shipment.shipment.error) ? (
                                                        <OriginDestinationTable obj={shipment.shipment.origin} />
                                                    ) : <p>SIN INFORMACION</p>
                                                }
                                            </td>
                                            <td className="align-text-top whitespace-nowrap px-2 py-1">
                                                {
                                                    (!shipment.shipment.error) ? (
                                                        <OriginDestinationTable obj={shipment.shipment.destination} />
                                                    ) : <p>SIN INFORMACION</p> 
                                                }
                                            </td>
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

function RoutesTable({ currentPage, elementsPerPage, routes }) {
    const [currentPageShipments, setCurrentPageShipments] = useState(1);
    const elementsPerPageShipments = 4
    const indexOfLastElementShipments = currentPageShipments * elementsPerPageShipments;
    const indexOfFirstElementShipments = indexOfLastElementShipments - elementsPerPageShipments;
    const elementsShipments = routes[0].shipments
    const currentElementsShipments = elementsShipments.slice(indexOfFirstElementShipments, indexOfLastElementShipments);

    const paginateShipments = (pageNumber) => setCurrentPageShipments(pageNumber);

    return (
        <div className="block m-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Informacion rutas
            </h5>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-2 py-1">#</th>
                                    <th scope="col" className="px-2 py-1">ID ruta</th>
                                    <th scope="col" className="px-2 py-1">Envios</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    routes.map((route, index) => (
                                        <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={index}>
                                            <td className="align-text-top whitespace-nowrap px-2 py-1">{(index + 1) + ((currentPage - 1) * elementsPerPage)}</td>
                                            <td className="align-text-top whitespace-nowrap px-2 py-1">{route.entity_id}</td>
                                            <td className="whitespace-nowrap px-2 py-1">
                                                <div className="flex flex-wrap">
                                                    <div className="w-full">
                                                        <ShipmentsTable currentPage={currentPageShipments} elementsPerPage={elementsPerPageShipments} shipments={currentElementsShipments} />
                                                        <Pagination
                                                            elementsPerPage={elementsPerPageShipments}
                                                            totalElements={elementsShipments.length}
                                                            paginate={paginateShipments}
                                                            currentPage={currentPageShipments}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
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

export default RoutesTable