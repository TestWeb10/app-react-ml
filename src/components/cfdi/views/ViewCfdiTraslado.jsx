import { useSicofi } from "../../../context/SicofiContext";
import InfiniteModal from "../../modals/InfiniteModal";
import Pagination from "../../pagination/Pagination";
import ErrorsAlert from "../../alerts/ErrorsAlert";
import YesNoButton from "../../YesNoButton"
import fileSaver from "file-saver"
import { useState } from "react";
import RoutesTable from "./ViewRoutesTable";

function ConceptsTable({ currentPage, elementsPerPage, concepts }) {
    return (
        <div className="block m-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Conceptos CFDI
            </h5>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">#</th>
                                    <th scope="col" className="px-6 py-4">Cantidad</th>
                                    <th scope="col" className="px-6 py-4">Clave unidad</th>
                                    <th scope="col" className="px-6 py-4">Unidad</th>
                                    <th scope="col" className="px-6 py-4">Clave de producto o servicio</th>
                                    <th scope="col" className="px-6 py-4">Descripcion</th>
                                    <th scope="col" className="px-6 py-4">Objeto de impuesto</th>
                                    <th scope="col" className="px-6 py-4">Valor unitario</th>
                                    <th scope="col" className="px-6 py-4">Importe</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    concepts.map((concept, index) => (
                                        <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={index}>
                                            <td className="whitespace-nowrap px-6 py-4">{(index + 1) + ((currentPage - 1) * elementsPerPage)}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{concept.Cantidad}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{concept.ClaveUnidad}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{concept.Unidad}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{concept.ClaveProdServ}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{concept.Descripcion}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{concept.ObjetoImp}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{concept.ValorUnitario}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{concept.Importe}</td>
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

function ViewCfdiTraslado({ routesShipments, initialDate, finalDate }) {
    const [currentPageConcepts, setCurrentPageConcepts] = useState(1);
    const [currentPageRoutes, setCurrentPageRoutes] = useState(1);
    const { cfdiTraslado, errors: sicofiErrors, isLoading: sicofiIsLoading, operation: sicofiOperation, invoiceXML } = useSicofi()
    let totalRoutes = routesShipments.map((elem) => elem.entity_id)
    let obj = {
        "invoiceInformation": {
            "initialDate": initialDate,
            "finalDate": finalDate,
            "subtotal": "0.00",
            "totalRoutes": totalRoutes
        },
        "DatosCFDI": {
            "Moneda": "XXX", "TipodeComprobante": "T", "LugarDeExpedicion": "44720", "Exportacion": "01", "SubTotal": "0.00", "Total": "0.00"
        },
        // Los datos del receptor deben coincidir con los datos del emisor (los datos del emisor se toman de la cuenta de Sicofi (usuario y contrasena))
        "ReceptorCFDI": {
            "RFC": "DCM991109KR2", "RazonSocial": "DEREMATE.COM DE MEXICO", "UsoCfdi": "G03", "DomicilioFiscalReceptor": "11520", "RegimenFiscalReceptor": "601"
        },
        "ConceptosCFDI": {
            "Conceptos": []
        }
    }
    let badShipments = []
    for (let i = 0; i < routesShipments.length; i++) {
        let routeShipments = routesShipments[i]
        for (let j = 0; j < routeShipments.shipments.length; j++) {
            let shipment = routeShipments.shipments[j]
            if (shipment.shipment.error) {
                // Significa que no hay informacion para dicho envio
                badShipments.push({
                    "routeId": routeShipments.entity_id,
                    "shipmentId": shipment.id
                })
            } else {
                for (let k = 0; k < shipment.shipment.package.items.length; k++) {
                    let item = shipment.shipment.package.items[k]
                    obj.ConceptosCFDI.Conceptos.push({
                        "Cantidad": Number(item.quantity).toFixed(2), "ClaveUnidad": String(item.unit_code), "Unidad": "Pieza", "ClaveProdServ": String(item.category).padStart(8, "0"), "ObjetoImp": "01",
                        "Descripcion": "N. de guia: "+shipment.id+" ID ruta: "+routeShipments.entity_id,
                        "ValorUnitario": "0.00",
                        "Importe": "0.00",
                    })
                }
            }
        }
    }
    const [shipmentErrors, setShipmentErrors] = useState(badShipments)
    const elementsPerPageConcepts = 3
    const indexOfLastElementConcepts = currentPageConcepts * elementsPerPageConcepts;
    const indexOfFirstElementConcepts = indexOfLastElementConcepts - elementsPerPageConcepts;
    const elementsConcepts = obj.ConceptosCFDI.Conceptos
    const currentElementsConcepts = elementsConcepts.slice(indexOfFirstElementConcepts, indexOfLastElementConcepts);
    const elementsPerPageRoutes = 1
    const indexOfLastElementRoutes = currentPageRoutes * elementsPerPageRoutes;
    const indexOfFirstElementRoutes = indexOfLastElementRoutes - elementsPerPageRoutes;
    const elementsRoutes = routesShipments
    const currentElementsRoutes = elementsRoutes.slice(indexOfFirstElementRoutes, indexOfLastElementRoutes);

    const callbackAction = async () => {
        cfdiTraslado(obj)
    }

    const paginateConcepts = (pageNumber) => setCurrentPageConcepts(pageNumber);
    const paginateRoutes = (pageNumber) => setCurrentPageRoutes(pageNumber);

    return (
        <div className="flex flex-col">
            {
                (sicofiOperation === "cfdiTraslado") ? (
                    <ErrorsAlert errors={sicofiErrors} />
                ) : null
            }
            {
                (sicofiIsLoading) ? (
                    <InfiniteModal title="CFDI TRASLADO" message="Espere mientras se lleva a cabo la operacion..." />
                ) : null
            }
            {
                (invoiceXML && sicofiOperation === "cfdiTraslado") ? (
                    <div className="text-center">
                        <button type="submit" className="m-2 p-2 font-semibold text-xm bg-orange-500 rounded-md" onClick={() => {
                            fileSaver.saveAs(invoiceXML, `${initialDate}_${finalDate}.xml`)
                        }}>
                            Descargar XML
                        </button>
                        <p>Del ultimo timbrado</p>
                    </div>
                ) : null
            }
            {
                (shipmentErrors.length !== 0) ? (

                    <div className="m-2 w-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                        <div className="grid grid-cols-1 gap-1 p-6">
                            <h5 className="mb-2 text-xl font-medium leading-tight text-red-400">
                                Envios que no se tomaran en cuenta debido a que Mercado Libre no envío nada de informacion:
                                <br /><br />
                                (ruta ID-envio ID)
                            </h5>
                            <div className="font-serif text-xl">
                                {shipmentErrors.map((elem) => `${elem.routeId}-${elem.shipmentId}`).join(", ")}
                            </div>
                        </div>
                    </div>
                ) : null
            }
            <div className="text-center">
                <YesNoButton callback={callbackAction} buttonMessage="Timbrar CFDI TRASLADO" modalTitle="CFDI Traslado" modalMessage="¿Esta seguro de continuar?" className="m-4 p-4 font-semibold text-xl bg-orange-800 rounded-md" />
            </div>
            <div className="flex flex-col m-2 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
                <div className="flex flex-col justify-start p-6">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        Rutas ({totalRoutes.length})
                    </h5>
                    <div className="font-serif text-xl">
                        {totalRoutes.join(", ")}
                    </div>
                </div>
            </div>
            <div className="block m-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Datos CFDI
                </h5>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Moneda</th>
                                        <th scope="col" className="px-6 py-4">Tipo de comprobante</th>
                                        <th scope="col" className="px-6 py-4">Lugar de expedicion</th>
                                        <th scope="col" className="px-6 py-4">Exportacion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4">{obj.DatosCFDI.Moneda}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{obj.DatosCFDI.TipodeComprobante}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{obj.DatosCFDI.LugarDeExpedicion}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{obj.DatosCFDI.Exportacion}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block m-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Receptor CFDI
                </h5>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">RFC</th>
                                        <th scope="col" className="px-6 py-4">Razon social</th>
                                        <th scope="col" className="px-6 py-4">Uso Cfdi</th>
                                        <th scope="col" className="px-6 py-4">Domicilio fiscal receptor</th>
                                        <th scope="col" className="px-6 py-4">Regimen fiscal receptor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4">{obj.ReceptorCFDI.RFC}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{obj.ReceptorCFDI.RazonSocial}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{obj.ReceptorCFDI.UsoCfdi}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{obj.ReceptorCFDI.DomicilioFiscalReceptor}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{obj.ReceptorCFDI.RegimenFiscalReceptor}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <ConceptsTable currentPage={currentPageConcepts} elementsPerPage={elementsPerPageConcepts} concepts={currentElementsConcepts} />
                    <Pagination
                        elementsPerPage={elementsPerPageConcepts}
                        totalElements={elementsConcepts.length}
                        paginate={paginateConcepts}
                        currentPage={currentPageConcepts}
                    />
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <RoutesTable currentPage={currentPageRoutes} elementsPerPage={elementsPerPageRoutes} routes={currentElementsRoutes} />
                    <Pagination
                        elementsPerPage={elementsPerPageRoutes}
                        totalElements={elementsRoutes.length}
                        paginate={paginateRoutes}
                        currentPage={currentPageRoutes}
                    />
                </div>
            </div>
        </div>
    )
}

export default ViewCfdiTraslado