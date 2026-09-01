import { useSicofi } from "../../../context/SicofiContext";
import InfiniteModal from "../../modals/InfiniteModal";
import Pagination from "../../pagination/Pagination";
import ErrorsAlert from "../../alerts/ErrorsAlert";
import YesNoButton from "../../YesNoButton"
import fileSaver from "file-saver"
import { useState } from "react";
import RoutesTable from "./ViewRoutesTable";

function ConceptsTable({ currentPage, elementsPerPage, concepts, setConceptDescription }) {
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
                                    <th scope="col" className="px-6 py-4">Clave de producto o servicio</th>
                                    <th scope="col" className="px-6 py-4">Descripcion</th>
                                    <th scope="col" className="px-6 py-4">Objeto de impuesto</th>
                                    <th scope="col" className="px-6 py-4">Valor unitario</th>
                                    <th scope="col" className="px-6 py-4">Importe</th>
                                    <th scope="col" className="px-6 py-4">Traslados</th>
                                    <th scope="col" className="px-6 py-4">Retenciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    concepts.map((concept, index) => (
                                        <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={index}>
                                            <td className="whitespace-nowrap px-6 py-4">{(index + 1) + ((currentPage - 1) * elementsPerPage)}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{concept.Cantidad}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{concept.ClaveUnidad}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{concept.ClaveProdServ}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {
                                                    (currentPage === 1) ? (
                                                        (index === 0) ? (
                                                            <input type="text" name="" className='bg-white-700 text-black px-4 py-2 w-full rounded-md my-2' placeholder='Ingrese una descripcion' onChange={(e) => {
                                                                setConceptDescription(e.target.value)
                                                            }} />
                                                        ) : (
                                                            concept.Descripcion
                                                        )
                                                    ) : (
                                                        concept.Descripcion
                                                    )

                                                }
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">{concept.ObjetoImp}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{concept.ValorUnitario}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{concept.Importe}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <table className="min-w-full text-left text-sm font-light">
                                                    <thead className="border-b font-medium dark:border-neutral-500">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-4">Base</th>
                                                            <th scope="col" className="px-6 py-4">Impuesto</th>
                                                            <th scope="col" className="px-6 py-4">Tipo de factor</th>
                                                            <th scope="col" className="px-6 py-4">Tasa o cuota</th>
                                                            <th scope="col" className="px-6 py-4">Importe</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            concept.Traslados.map((elem, indexTraslados) => (
                                                                <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={indexTraslados}>
                                                                    <td className="whitespace-nowrap px-6 py-4">{elem.Base}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{elem.Impuesto}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{elem.TipoFactor}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{elem.TasaOCuota}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{elem.Importe}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <table className="min-w-full text-left text-sm font-light">
                                                    <thead className="border-b font-medium dark:border-neutral-500">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-4">Base</th>
                                                            <th scope="col" className="px-6 py-4">Impuesto</th>
                                                            <th scope="col" className="px-6 py-4">Tipo de factor</th>
                                                            <th scope="col" className="px-6 py-4">Tasa o cuota</th>
                                                            <th scope="col" className="px-6 py-4">Importe</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            concept.Retenciones.map((elem, indexRetenciones) => (
                                                                <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={indexRetenciones}>
                                                                    <td className="whitespace-nowrap px-6 py-4">{elem.Base}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{elem.Impuesto}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{elem.TipoFactor}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{elem.TasaOCuota}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{elem.Importe}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
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

function ViewCfdiIngreso({ routesShipments, initialDate, finalDate }) {
    const [isChecked, setIsChecked] = useState(false);
    const [relationshipType, setRelationshipType] = useState("07");
    const [taxFolioUUID, setTaxFolioUUID] = useState("");
    const [subtotal, setSubtotal] = useState(0.00);
    const [conceptDescription, setConceptDescription] = useState("")
    const [currentPageConcepts, setCurrentPageConcepts] = useState(1);
    const [currentPageRoutes, setCurrentPageRoutes] = useState(1);
    const { cfdiIngreso, errors: sicofiErrors, isLoading: sicofiIsLoading, operation: sicofiOperation, invoiceXML } = useSicofi()
    let totalRoutes = routesShipments.map((elem) => elem.entity_id)
    let tasaTraslados = 0.160000
    let impuestoTraslados = "002"
    let tasaRetenciones = 0.012500
    let impuestoRetenciones = "001"
    let costByConcept = 0.01
    let totalConecpts = 0
    routesShipments.forEach((routeShipments) => {
        for (let j = 0; j < routeShipments.shipments.length; j++) {
            let shipment = routeShipments.shipments[j]
            if (!shipment.shipment.error) {
                totalConecpts += 1
            }
        }
    })
    let obj = {
        "invoiceInformation": {
            "initialDate": initialDate,
            "finalDate": finalDate,
            "subtotal": subtotal.toFixed(2),
            "totalRoutes": totalRoutes
        },
        "DatosCFDI": {
            "Moneda": "MXN", "TipodeComprobante": "I", "FormaDePago": "99", "MetodoPago": "PPD", "LugarDeExpedicion": "44720", "Exportacion": "01",
            "SubTotal": subtotal.toFixed(2),
            "Total": (Number(subtotal.toFixed(2)) - 0.00 + Number((subtotal * tasaTraslados).toFixed(2)) - Number((subtotal * tasaRetenciones).toFixed(2))).toFixed(2)
        },
        "CFDIRelacion": [{
            "TipoRelacion": relationshipType,
            "Relacionados": [{
                "UUID": taxFolioUUID
            }]
        }],
        "ReceptorCFDI": {
            "RFC": "DCM991109KR2", "RazonSocial": "DEREMATE.COM DE MEXICO", "UsoCfdi": "G03", "DomicilioFiscalReceptor": "11520", "RegimenFiscalReceptor": "601"
        },
        "ConceptosCFDI": {
            "Conceptos": [
                {
                    "Cantidad": "1.00", "ClaveUnidad": "E48", "ClaveProdServ": "78102200", "ObjetoImp": "02",
                    "Descripcion": conceptDescription,
                    "ValorUnitario": (subtotal - (totalConecpts * costByConcept)).toFixed(2),
                    "Importe": (subtotal - (totalConecpts * costByConcept)).toFixed(2),
                    "Traslados": [{ "Base": subtotal.toFixed(2), "Impuesto": impuestoTraslados, "TipoFactor": "Tasa", "TasaOCuota": tasaTraslados.toFixed(6), "Importe": (subtotal * tasaTraslados).toFixed(2) }],
                    "Retenciones": [{ "Base": subtotal.toFixed(2), "Impuesto": impuestoRetenciones, "TipoFactor": "Tasa", "TasaOCuota": tasaRetenciones.toFixed(6), "Importe": (subtotal * tasaRetenciones).toFixed(2) }]
                }
            ]
        },
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
                obj.ConceptosCFDI.Conceptos.push(
                    {
                        "Cantidad": "1.00", "ClaveUnidad": "E48", "ClaveProdServ": "78102200", "ObjetoImp": "02",
                        "Descripcion": `SERVICIOS POSTALES DE PAQUETEO Y COURRIER No. de Identificacion: ${shipment.id}`,
                        "ValorUnitario": costByConcept.toFixed(2),
                        "Importe": costByConcept.toFixed(2),
                        "Traslados": [{ "Base": costByConcept.toFixed(2), "Impuesto": "002", "TipoFactor": "Tasa", "TasaOCuota": tasaTraslados.toFixed(6), "Importe": "0.00" }],
                        "Retenciones": [{ "Base": costByConcept.toFixed(2), "Impuesto": "001", "TipoFactor": "Tasa", "TasaOCuota": tasaRetenciones.toFixed(6), "Importe": "0.00" }]
                    }
                )
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
        if(!isChecked){
            obj["CFDIRelacion"]=[];
        }
        cfdiIngreso(obj)
    }

    const paginateConcepts = (pageNumber) => setCurrentPageConcepts(pageNumber);
    const paginateRoutes = (pageNumber) => setCurrentPageRoutes(pageNumber);

    return (
        <div className="flex flex-col">
            {
                (sicofiOperation === "cfdiIngreso") ? (
                    <ErrorsAlert errors={sicofiErrors} />
                ) : null
            }
            {
                (sicofiIsLoading) ? (
                    <InfiniteModal title="CFDI INGRESO" message="Espere mientras se lleva a cabo la operacion..." />
                ) : null
            }
            {
                (invoiceXML && sicofiOperation === "cfdiIngreso") ? (
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
                <YesNoButton callback={callbackAction} buttonMessage="Timbrar CFDI INGRESO" modalTitle="CFDI Ingreso" modalMessage="¿Esta seguro de continuar?" className="m-4 p-4 font-semibold text-xl bg-orange-800 rounded-md" />
            </div>
            <div className="mt-4 mb-4 p-2 font-semibold text-xl text-center">
                Edite los campos requeridos<br />
                (los cambios se ven reflejados inmediatamente)
            </div>
            <div className="flex items-center justify-center">
                <input
                    type="checkbox"
                    className="w-8 h-8 border border-default-medium rounded-lg bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                    checked={isChecked}
                    onChange={(e) => {
                        setIsChecked(e.target.checked)
                    }}
                />
                <label className="select-none ms-2 text-lg font-medium text-heading">Relacionar factura</label>
            </div>
            {
                (isChecked) ? (
                    <div className="text-center">
                        <h5 className="mb-2 mt-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            Tipo de relacion
                        </h5>
                        <input type="text" className='bg-zinc-700 text-white px-4 py-2 rounded-md my-2 text-center' placeholder='' value={relationshipType} onChange={(e) => {
                            setRelationshipType(e.target.value)
                        }} />
                        <h5 className="mb-2 mt-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            Folio fiscal (UUID)
                        </h5>
                        <input type="text" className='w-96 bg-zinc-700 text-white px-4 py-2 rounded-md my-2 text-center' placeholder='' value={taxFolioUUID} onChange={(e) => {
                            setTaxFolioUUID(e.target.value)
                        }} />
                    </div>
                ) : null
            }
            <div className="text-center">
                <h5 className="mb-2 mt-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Subtotal
                </h5>
                <input type="text" className='bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Subtotal' onChange={(e) => {
                    setSubtotal(Number(Number(e.target.value).toFixed(2)))
                }} />
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
            <div className="flex flex-col m-2 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
                <div className="flex flex-col justify-start p-6">
                    <p className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        Subtotal: {obj.DatosCFDI.SubTotal}
                    </p>
                    <p className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        Total: {obj.DatosCFDI.Total}
                    </p>
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
                                        <th scope="col" className="px-6 py-4">Forma de pago</th>
                                        <th scope="col" className="px-6 py-4">Metodo pago</th>
                                        <th scope="col" className="px-6 py-4">Lugar de expedicion</th>
                                        <th scope="col" className="px-6 py-4">Exportacion</th>
                                        <th scope="col" className="px-6 py-4">SubTotal</th>
                                        <th scope="col" className="px-6 py-4">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4">{obj.DatosCFDI.Moneda}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{obj.DatosCFDI.TipodeComprobante}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{obj.DatosCFDI.FormaDePago}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{obj.DatosCFDI.MetodoPago}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{obj.DatosCFDI.LugarDeExpedicion}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{obj.DatosCFDI.Exportacion}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{obj.DatosCFDI.SubTotal}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{obj.DatosCFDI.Total}</td>
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
                    <ConceptsTable currentPage={currentPageConcepts} elementsPerPage={elementsPerPageConcepts} concepts={currentElementsConcepts} setConceptDescription={setConceptDescription} />
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

export default ViewCfdiIngreso