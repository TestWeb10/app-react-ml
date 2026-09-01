import { useSicofi } from "../../../context/SicofiContext";
import { useEffect, useState } from "react";
import InfiniteModal from "../../modals/InfiniteModal";
import Pagination from "../../pagination/Pagination";
import ErrorsAlert from "../../alerts/ErrorsAlert";
import YesNoButton from "../../YesNoButton"
import { useAuth } from "../../../context/AuthContext";
import SelectOption from "../../selects/SelectOption";
import dayjs from "dayjs"
import fileSaver from "file-saver"

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
                                    <th scope="col" className="px-6 py-4">ID ubicacion</th>
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
                                            <td className="whitespace-nowrap px-6 py-4">{location.idubicacion}</td>
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
                                    <th scope="col" className="px-6 py-4">Unidad</th>
                                    <th scope="col" className="px-6 py-4">Peso (kg)</th>
                                    <th scope="col" className="px-6 py-4">Material peligroso</th>
                                    <th scope="col" className="px-6 py-4">Guias identificacion</th>
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
                                            <td className="whitespace-nowrap px-6 py-4">{ware.unidad_mercancia}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{ware.pesoenkg}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{ware.materialpeligroso}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <table className="min-w-full text-left text-sm font-light">
                                                    <thead className="border-b font-medium dark:border-neutral-500">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-4">#</th>
                                                            <th scope="col" className="px-6 py-4">Numero</th>
                                                            <th scope="col" className="px-6 py-4">Descripcion</th>
                                                            <th scope="col" className="px-6 py-4">Peso</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            ware.GuiasIdentificacion.GuiaIdentificacion.map((elem, indexGuiaIdentificacion) => (
                                                                <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={indexGuiaIdentificacion}>
                                                                    <td className="whitespace-nowrap px-6 py-4">{indexGuiaIdentificacion + 1}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{elem.numeroguiaidentificacion}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{elem.descripguiaidentificacion}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{elem.pesoguiaidentificacion}</td>
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

function ViewCfdiTrasladoCP({ routesShipments, initialDate, finalDate }) {
    const [totalDistanceTraveled, setTotalDistanceTraveled] = useState(0.0000)
    const [dateHour, setDateHour] = useState(dayjs().format('YYYY-MM-DDTHH:mm:ss'))
    const [autoTransport, setAutoTransport] = useState({})
    const [figureTransport, setFigureTransport] = useState({})
    const [currentPageConcepts, setCurrentPageConcepts] = useState(1);
    const [currentPageLocations, setCurrentPageLocations] = useState(1);
    const [currentPageWares, setCurrentPageWares] = useState(1);
    const { cfdiTrasladoCP, errors: sicofiErrors, isLoading: sicofiIsLoading, operation: sicofiOperation, invoiceXML } = useSicofi()
    const { userAutoTransport, userFigureTransport } = useAuth()
    let totalRoutes = routesShipments.map((elem) => elem.entity_id)
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
            "subtotal": "0.00",
            "totalRoutes": totalRoutes
        },
        "DatosCFDI": {
            "Moneda": "XXX", "TipodeComprobante": "T", "LugarDeExpedicion": "44720", "Exportacion": "01", "SubTotal": "0.00", "Total": "0.00"
        },
        // Los datos del receptor deben coincidir con los datos del emisor (los datos del emisor se toman de la cuenta de Sicofi (usuario y contrasena))
        "ReceptorCFDI": {
            "RFC": "AILF7007204K8", "RazonSocial": "FERNANDO ARIAS LANDIN", "UsoCfdi": "S01", "DomicilioFiscalReceptor": "44720", "RegimenFiscalReceptor": "626"
        },
        "ConceptosCFDI": {
            "Conceptos": [
                {
                    "Cantidad": "1.00", "ClaveUnidad": "XPK", "Unidad": "Paquete", "ClaveProdServ": "31181701", "ObjetoImp": "01",
                    "Descripcion": "PAQUETES",
                    "ValorUnitario": "0.00",
                    "Importe": "0.00",
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
                    "idubicacion": "OR000001",
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
    let countDestino = 0
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
                countDestino += 1
                obj.CartaPorte.Ubicaciones20.ubicaciones.push({
                    "tipoubicacion": "Destino",
                    "idubicacion": `DE${countDestino.toString().padStart(6, '0')}`,
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
                let objMercancia = {
                    "bienestransp": "31181701",
                    "descripcion_mercancia": "Paquetes",
                    "cantidad_mercancia": Number(shipment.shipment.package.items.length).toFixed(2),
                    "claveunidad_mercancia": "XPK",
                    "unidad_mercancia": "Paquete",
                    "pesoenkg": "",
                    "materialpeligroso": "No",
                    "GuiasIdentificacion": {
                        "GuiaIdentificacion": []
                    },
                    "CantidadesTransporta": {
                        "cantidadesTransporta": [
                            {
                                "cantidad_transporta": shipment.shipment.package.items.length.toFixed(2),
                                "idorigen_transporta": obj.CartaPorte.Ubicaciones20.ubicaciones[0].idubicacion,
                                "iddestino_transporta": obj.CartaPorte.Ubicaciones20.ubicaciones.slice(-1)[0].idubicacion,
                            }
                        ]
                    }
                }
                let pesoenkg = 0.0000
                for (let k = 0; k < shipment.shipment.package.items.length; k++) {
                    let item = shipment.shipment.package.items[k]
                    let objGuiaIdentificacion = {
                        "numeroguiaidentificacion": shipment.id,
                        "descripguiaidentificacion": item.description,
                        "pesoguiaidentificacion": Number(Number(item.dimensions.weight) / 1000).toFixed(4)
                    }
                    pesoenkg += Number(objGuiaIdentificacion.pesoguiaidentificacion)
                    objMercancia.GuiasIdentificacion.GuiaIdentificacion.push(objGuiaIdentificacion)
                }
                objMercancia.pesoenkg = Number(pesoenkg).toFixed(4)
                obj.CartaPorte.MercanciasCartaPorte30.Mercancia30.push(objMercancia)
                pesobrutototal += pesoenkg
                numtotalmercancias += 1
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
    const elementsPerPageWares = 3
    const indexOfLastElementWares = currentPageWares * elementsPerPageWares;
    const indexOfFirstElementWares = indexOfLastElementWares - elementsPerPageWares;
    const elementsWares = obj.CartaPorte.MercanciasCartaPorte30.Mercancia30
    const currentElementsWares = elementsWares.slice(indexOfFirstElementWares, indexOfLastElementWares);

    useEffect(() => {
        setDateHour(dayjs().format('YYYY-MM-DDTHH:mm:ss'))
    }, [totalDistanceTraveled])

    const callbackAction = async () => {
        if (countMaterialpeligroso > 0) {
            cfdiTrasladoCP(obj)
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
            cfdiTrasladoCP(newObj)
        }
    }

    const paginateConcepts = (pageNumber) => setCurrentPageConcepts(pageNumber);
    const paginateLocations = (pageNumber) => setCurrentPageLocations(pageNumber);
    const paginateWares = (pageNumber) => setCurrentPageWares(pageNumber);

    return (
        <div className="flex flex-col">
            {
                (sicofiOperation === "cfdiTrasladoCP") ? (
                    <ErrorsAlert errors={sicofiErrors} />
                ) : null
            }
            {
                (sicofiIsLoading) ? (
                    <InfiniteModal title="CFDI TRASLADO CP" message="Espere mientras se lleva a cabo la operacion..." />
                ) : null
            }
            {
                (invoiceXML && sicofiOperation === "cfdiTrasladoCP") ? (
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
                <YesNoButton callback={callbackAction} buttonMessage="Timbrar CFDI TRASLADO CP" modalTitle="CFDI Traslado CP" modalMessage="¿Esta seguro de continuar?" className="m-4 p-4 font-semibold text-xl bg-orange-800 rounded-md" />
            </div>
            <div className="mt-4 mb-4 p-2 font-semibold text-xl text-center">
                Edite los campos requeridos<br />
                (los cambios se ven reflejados inmediatamente)
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

export default ViewCfdiTrasladoCP