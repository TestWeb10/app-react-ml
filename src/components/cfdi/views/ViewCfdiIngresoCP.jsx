import { useSicofi } from "../../../context/SicofiContext";
import { useEffect, useLayoutEffect, useState } from "react";
import InfiniteModal from "../../modals/InfiniteModal";
import Pagination from "../../pagination/Pagination";
import ErrorsAlert from "../../alerts/ErrorsAlert";
import YesNoButton from "../../YesNoButton"
import { useAuth } from "../../../context/AuthContext";
import SelectOption from "../../selects/SelectOption";
import dayjs from "dayjs"
import fileSaver from "file-saver"

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

function LocationsTable({ currentPage, elementsPerPage, title, locations }) {
    return (
        <div className="block m-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <h1 className="mb-2 mt-4 text-xm font-semibold leading-tight text-neutral-800 dark:text-neutral-50">
                {title}
            </h1>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">#</th>
                                    <th scope="col" className="px-6 py-4">Tipo ubicacion</th>
                                    <th scope="col" className="px-6 py-4">RFC remitente destinatario</th>
                                    <th scope="col" className="px-6 py-4">Nombre remitente destinatario</th>
                                    <th scope="col" className="px-6 py-4">Distancia recorrida (km)</th>
                                    <th scope="col" className="px-6 py-4">Domicilio ubicacion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    locations.map((location, index) => (
                                        <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={index}>
                                            <td className="whitespace-nowrap px-6 py-4">{(index + 1) + ((currentPage - 1) * elementsPerPage)}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{location.tipoubicacion}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{location.rfcremitentedestinatario}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{location.nombreremitentedestinatario}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {
                                                    (location.tipoubicacion === "Destino") ? (
                                                        location.distanciarecorrida
                                                    ) : "NO APLICA"
                                                }
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <table className="min-w-full text-left text-sm font-light">
                                                    <thead className="border-b font-medium dark:border-neutral-500">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-4">Calle</th>
                                                            <th scope="col" className="px-6 py-4">Numero exterior</th>
                                                            <th scope="col" className="px-6 py-4">Colonia</th>
                                                            <th scope="col" className="px-6 py-4">Localidad</th>
                                                            <th scope="col" className="px-6 py-4">Municipio</th>
                                                            <th scope="col" className="px-6 py-4">Estado</th>
                                                            <th scope="col" className="px-6 py-4">Pais</th>
                                                            <th scope="col" className="px-6 py-4">Codigo postal</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                            <td className="whitespace-nowrap px-6 py-4">{location.DomicilioUbicacion.calle_ubicacion}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{location.DomicilioUbicacion.numeroexterior_ubicacion}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{location.DomicilioUbicacion.colonia_ubicacion}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{location.DomicilioUbicacion.localidad_ubicacion}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{location.DomicilioUbicacion.municipio_ubicacion}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{location.DomicilioUbicacion.estado_ubicacion}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{location.DomicilioUbicacion.pais_ubicacion}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{location.DomicilioUbicacion.codigopostal_ubicacion}</td>
                                                        </tr>
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

function WaresTable({ currentPage, elementsPerPage, wares }) {
    return (
        <div className="block m-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">#</th>
                                    <th scope="col" className="px-6 py-4">Bienes transporte</th>
                                    <th scope="col" className="px-6 py-4">Descripcion</th>
                                    <th scope="col" className="px-6 py-4">Cantidad</th>
                                    <th scope="col" className="px-6 py-4">Clave unidad</th>
                                    <th scope="col" className="px-6 py-4">Peso (kg)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    wares.map((ware, index) => (
                                        <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={index}>
                                            <td className="whitespace-nowrap px-6 py-4">{(index + 1) + ((currentPage - 1) * elementsPerPage)}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{ware.bienestransp}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{ware.descripcion_mercancia}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{ware.cantidad_mercancia}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{ware.claveunidad_mercancia}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{ware.pesoenkg}</td>
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

function ViewCfdiIngresoCP({ routesShipments, initialDate, finalDate }) {
    const [subtotal, setSubtotal] = useState(0.00);
    const [conceptDescription, setConceptDescription] = useState("")
    const [totalDistanceTraveled, setTotalDistanceTraveled] = useState(0.0000)
    const [dateHour, setDateHour] = useState(dayjs().format('YYYY-MM-DDTHH:mm:ss'))
    const [autoTransport, setAutoTransport] = useState({})
    const [figureTransport, setFigureTransport] = useState({})
    const [currentPageConcepts, setCurrentPageConcepts] = useState(1);
    const [currentPageLocations, setCurrentPageLocations] = useState(1);
    const [currentPageWares, setCurrentPageWares] = useState(1);
    const { cfdiIngresoCP, errors: sicofiErrors, isLoading: sicofiIsLoading, operation: sicofiOperation, invoiceXML } = useSicofi()
    const { userAutoTransport, userFigureTransport } = useAuth()
    let totalRoutes = routesShipments.map((elem) => elem.entity_id)
    let tasaTraslados = 0.160000
    let impuestoTraslados = "002"
    let tasaRetenciones = 0.012500
    let impuestoRetenciones = "001"
    let costByConcept = 0.01
    let distByLocation = 0.0100
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
        "CartaPorte": {
            "version": "3.0",
            "transpinternac": "No",
            "totaldistrec": totalDistanceTraveled.toFixed(4),
            "Ubicaciones20": {
                "ubicaciones": [{
                    "tipoubicacion": "Origen",
                    "rfcremitentedestinatario": "DCM991109KR2",
                    "nombreremitentedestinatario": "DEREMATE.COM DE MEXICO",
                    "fechahorasalidallegada": dateHour,
                    "DomicilioUbicacion": {
                        "calle_ubicacion": "Calz. Lazaro Cardenas",
                        "numeroexterior_ubicacion": "1001",
                        "colonia_ubicacion": "0176",
                        "localidad_ubicacion": "03",
                        "municipio_ubicacion": "039",
                        "estado_ubicacion": "JAL",
                        "pais_ubicacion": "MEX",
                        "codigopostal_ubicacion": "44440"
                    }
                }]
            },
            "MercanciasCartaPorte30": {
                "pesobrutototal": "0.0000",
                "unidadpeso": "KGM",
                "numtotalmercancias": "0",
                "Mercancia30": [],
                "Autotransporte30": autoTransport
            },
            "FiguraTransporte20": {
                "TiposFigura": [
                    figureTransport
                ]
            }
        }
    }
    let pesobrutototal = 0.0000
    let numtotalmercancias = 0
    let badShipments = []
    let countMaterialpeligroso = 0
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
                obj.CartaPorte.Ubicaciones20.ubicaciones.push({
                    "tipoubicacion": "Destino",
                    "rfcremitentedestinatario": shipment.shipment.destination.fiscal_information.rfc,
                    "nombreremitentedestinatario": shipment.shipment.destination.fiscal_information.full_name,
                    "fechahorasalidallegada": dateHour,
                    "distanciarecorrida": "",
                    "DomicilioUbicacion": {
                        "calle_ubicacion": shipment.shipment.destination.address.street_name,
                        "numeroexterior_ubicacion": shipment.shipment.destination.address.street_number,
                        "colonia_ubicacion": shipment.shipment.destination.address.catalogKey.colonia,
                        "localidad_ubicacion": shipment.shipment.destination.address.catalogKey.localidad,
                        "municipio_ubicacion": shipment.shipment.destination.address.catalogKey.municipio,
                        "estado_ubicacion": shipment.shipment.destination.address.catalogKey.estado,
                        "pais_ubicacion": shipment.shipment.destination.address.catalogKey.pais,
                        "codigopostal_ubicacion": shipment.shipment.destination.address.zip_code
                    }
                })
                for (let k = 0; k < shipment.shipment.package.items.length; k++) {
                    let item = shipment.shipment.package.items[k]
                    let objMercancia = {
                        "bienestransp": item.category_sat,
                        "descripcion_mercancia": item.description,
                        "cantidad_mercancia": Number(item.quantity).toFixed(2),
                        "claveunidad_mercancia": item.unit_code,
                        "pesoenkg": Number(Number(item.dimensions.weight) / 1000).toFixed(4)
                    }
                    if (item.dangerous_material === "1") {
                        countMaterialpeligroso += 1
                        objMercancia.materialpeligroso = "Sí"
                        objMercancia.cvematerialpeligroso = item.dangerous_material_key
                        objMercancia.embalaje = item.package_key
                        objMercancia.descripembalaje = item.package_description
                    }
                    if (item.dangerous_material === "0,1") {
                        if (item.dangerous_material_key) {
                            countMaterialpeligroso += 1
                            objMercancia.materialpeligroso = "Sí"
                            objMercancia.cvematerialpeligroso = item.dangerous_material_key
                            objMercancia.embalaje = item.package_key
                            objMercancia.descripembalaje = item.package_description
                        } else {
                            objMercancia.materialpeligroso = "No"
                        }
                    }
                    obj.CartaPorte.MercanciasCartaPorte30.Mercancia30.push(objMercancia)
                    pesobrutototal += Number(objMercancia.pesoenkg)
                    numtotalmercancias += 1
                }
            }
        }
    }
    const [shipmentErrors, setShipmentErrors] = useState(badShipments)
    obj.CartaPorte.MercanciasCartaPorte30.pesobrutototal = Number(pesobrutototal).toFixed(4)
    obj.CartaPorte.MercanciasCartaPorte30.numtotalmercancias = Number(numtotalmercancias).toFixed(0)
    for (let i = 1; i < obj.CartaPorte.Ubicaciones20.ubicaciones.length; i++) {
        obj.CartaPorte.Ubicaciones20.ubicaciones[i].distanciarecorrida = (i === 1) ? Number(totalDistanceTraveled - distByLocation * (obj.CartaPorte.Ubicaciones20.ubicaciones.length - 2)).toFixed(4) : Number(distByLocation).toFixed(4)
    }
    const elementsPerPageConcepts = 3
    const indexOfLastElementConcepts = currentPageConcepts * elementsPerPageConcepts;
    const indexOfFirstElementConcepts = indexOfLastElementConcepts - elementsPerPageConcepts;
    const elementsConcepts = obj.ConceptosCFDI.Conceptos
    const currentElementsConcepts = elementsConcepts.slice(indexOfFirstElementConcepts, indexOfLastElementConcepts);
    const elementsPerPageLocations = 3
    const indexOfLastElementLocations = currentPageLocations * elementsPerPageLocations;
    const indexOfFirstElementLocations = indexOfLastElementLocations - elementsPerPageLocations;
    const elementsLocations = obj.CartaPorte.Ubicaciones20.ubicaciones
    const currentElementsLocations = elementsLocations.slice(indexOfFirstElementLocations, indexOfLastElementLocations);
    const elementsPerPageWares = 5
    const indexOfLastElementWares = currentPageWares * elementsPerPageWares;
    const indexOfFirstElementWares = indexOfLastElementWares - elementsPerPageWares;
    const elementsWares = obj.CartaPorte.MercanciasCartaPorte30.Mercancia30
    const currentElementsWares = elementsWares.slice(indexOfFirstElementWares, indexOfLastElementWares);

    useEffect(() => {
        setDateHour(dayjs().format('YYYY-MM-DDTHH:mm:ss'))
    }, [subtotal, totalDistanceTraveled])

    const callbackAction = async () => {
        if (countMaterialpeligroso > 0) {
            cfdiIngresoCP(obj)
        } else {
            // Debemos eliminar de 'Seguros' los campos 'aseguramedambiente' y 'polizamedambiente'
            let newObj = (({ invoiceInformation, DatosCFDI, ReceptorCFDI, ConceptosCFDI }) => ({ invoiceInformation, DatosCFDI, ReceptorCFDI, ConceptosCFDI }))(obj)
            let newCartaPorte = (({ version, transpinternac, totaldistrec, Ubicaciones20, FiguraTransporte20 }) => ({ version, transpinternac, totaldistrec, Ubicaciones20, FiguraTransporte20 }))(obj["CartaPorte"])
            let newMercanciasCartaPorte30 = (({ pesobrutototal, unidadpeso, numtotalmercancias, Mercancia30 }) => ({ pesobrutototal, unidadpeso, numtotalmercancias, Mercancia30 }))(obj["CartaPorte"]["MercanciasCartaPorte30"])
            let newAutotransporte30 = (({ name, permsct, numpermisosct, IdentificacionVehicularCartaPorte30 }) => ({ name, permsct, numpermisosct, IdentificacionVehicularCartaPorte30 }))(obj["CartaPorte"]["MercanciasCartaPorte30"]["Autotransporte30"])
            let newSeguros = !("Seguros" in obj["CartaPorte"]["MercanciasCartaPorte30"]["Autotransporte30"]) ? {} : (({ asegurarespcivil, polizarespcivil }) => ({ asegurarespcivil, polizarespcivil }))(obj["CartaPorte"]["MercanciasCartaPorte30"]["Autotransporte30"]["Seguros"])
            newAutotransporte30["Seguros"] = newSeguros
            newMercanciasCartaPorte30["Autotransporte30"] = newAutotransporte30
            newCartaPorte["MercanciasCartaPorte30"] = newMercanciasCartaPorte30
            newObj["CartaPorte"] = newCartaPorte
            cfdiIngresoCP(newObj)
        }
    }

    const paginateConcepts = (pageNumber) => setCurrentPageConcepts(pageNumber);
    const paginateLocations = (pageNumber) => setCurrentPageLocations(pageNumber);
    const paginateWares = (pageNumber) => setCurrentPageWares(pageNumber);

    return (
        <div className="flex flex-col">
            {
                (sicofiOperation === "cfdiIngresoCP") ? (
                    <ErrorsAlert errors={sicofiErrors} />
                ) : null
            }
            {
                (sicofiIsLoading) ? (
                    <InfiniteModal title="CFDI INGRESO CP" message="Espere mientras se lleva a cabo la operacion..." />
                ) : null
            }
            {
                (invoiceXML && sicofiOperation === "cfdiIngresoCP") ? (
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
                <YesNoButton callback={callbackAction} buttonMessage="Timbrar CFDI INGRESO CP" modalTitle="CFDI Ingreso CP" modalMessage="¿Esta seguro de continuar?" className="m-4 p-4 font-semibold text-xl bg-orange-800 rounded-md" />
            </div>
            <div className="mt-4 mb-4 p-2 font-semibold text-xl text-center">
                Edite los campos requeridos<br />
                (los cambios se ven reflejados inmediatamente)
            </div>
            <div className="text-center">
                <h5 className="mb-2 mt-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Subtotal
                </h5>
                <input type="text" className='bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Subtotal' onChange={(e) => {
                    setSubtotal(Number(Number(e.target.value).toFixed(2)))
                }} />
            </div>
            <div className="text-center">
                <h5 className="mb-2 mt-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Total distancia recorrida (km)
                </h5>
                <input type="text" className='bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Total distancia recorrida' onChange={(e) => {
                    setTotalDistanceTraveled(Number(Number(e.target.value).toFixed(2)))
                }} />
            </div>
            <div className="m-2 w-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div className="grid grid-cols-2 gap-2 p-6">
                    <div className="mb-2 leading-tight text-neutral-800 dark:text-neutral-50">
                        <p className="text-xl font-semibold ">Auto transporte</p>
                        <SelectOption title="Selecciona una opcion" values={userAutoTransport} contents={userAutoTransport.map((elem) => elem.name)} defaultValue={{}} setValue={setAutoTransport} changeValues={true} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="mb-2 leading-tight text-neutral-800 dark:text-neutral-50">
                        <p className="text-xl font-semibold ">Figura transporte</p>
                        <SelectOption title="Selecciona una opcion" values={userFigureTransport} contents={userFigureTransport.map((elem) => `${elem.rfcfigura} - ${elem.nombrefigura}`)} defaultValue={{}} setValue={setFigureTransport} changeValues={true} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                </div>
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
            <div className="block m-2 rounded-lg bg-gray-500 p-6">
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Carta Porte
                </h5>
                <div className="block m-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className="min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Version</th>
                                        <th scope="col" className="px-6 py-4">Transporte internacional</th>
                                        <th scope="col" className="px-6 py-4">Total distancia recorrida (km)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4">{obj.CartaPorte.version}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{obj.CartaPorte.transpinternac}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{obj.CartaPorte.totaldistrec}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <h5 className="mb-2 mt-4 text-xm font-semibold leading-tight text-neutral-800 dark:text-neutral-50">
                    Ubicaciones
                </h5>
                <div className="flex flex-wrap m-4 p-4">
                    <div className="w-full">
                        <LocationsTable currentPage={currentPageLocations} elementsPerPage={elementsPerPageLocations} title="Origen / Destino" locations={currentElementsLocations} />
                        <Pagination
                            elementsPerPage={elementsPerPageLocations}
                            totalElements={elementsLocations.length}
                            paginate={paginateLocations}
                            currentPage={currentPageLocations}
                        />
                    </div>
                </div>
                <h5 className="mb-2 mt-4 text-xm font-semibold leading-tight text-neutral-800 dark:text-neutral-50">
                    Mercancias
                </h5>
                <div className="block m-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className="min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Peso bruto total</th>
                                        <th scope="col" className="px-6 py-4">Unidad peso</th>
                                        <th scope="col" className="px-6 py-4">Numero total de mercancias</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4">{obj.CartaPorte.MercanciasCartaPorte30.pesobrutototal}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{obj.CartaPorte.MercanciasCartaPorte30.unidadpeso}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{obj.CartaPorte.MercanciasCartaPorte30.numtotalmercancias}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap m-4 p-4">
                    <div className="w-full">
                        <WaresTable currentPage={currentPageWares} elementsPerPage={elementsPerPageWares} wares={currentElementsWares} />
                        <Pagination
                            elementsPerPage={elementsPerPageWares}
                            totalElements={elementsWares.length}
                            paginate={paginateWares}
                            currentPage={currentPageWares}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCfdiIngresoCP