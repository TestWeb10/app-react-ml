import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Pagination from "../pagination/Pagination";
import InfiniteModal from "../modals/InfiniteModal";
import { useDb } from "../../context/DbContext";
import ErrorsAlert from "../alerts/ErrorsAlert";
import TemplateAutoTransport from "./templates/TemplateAutoTransport";
import YesNoButton from "../YesNoButton";

function AutoTransportTable({ autoTransport, deleteOperation, updateOperation }) {
    return (
        <div className="block m-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Auto transporte
            </h5>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4"></th>
                                    <th scope="col" className="px-6 py-4"></th>
                                    <th scope="col" className="px-6 py-4">Nombre del auto transporte</th>
                                    <th scope="col" className="px-6 py-4">Tipo de permiso SCT</th>
                                    <th scope="col" className="px-6 py-4">Numero de permiso SCT</th>
                                    <th scope="col" className="px-6 py-4">Identificacion vehicular</th>
                                    <th scope="col" className="px-6 py-4">Seguros</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    autoTransport.map((auto, index) => (
                                        <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={index}>
                                            <td className="whitespace-nowrap">
                                                <YesNoButton callback={() => deleteOperation(autoTransport[index].name)} buttonMessage="Eliminar" modalTitle="Eliminar auto transporte" modalMessage={`¿Esta seguro de eliminar el auto transporte '${autoTransport[index].name}'?`} className="p-1 m-1 font-semibold text-xm bg-red-500 rounded-md" />
                                            </td>
                                            <td className="whitespace-nowrap">
                                                <button type="submit" className="p-1 m-1 font-semibold text-xm bg-yellow-500 rounded-md" onClick={() => {
                                                    updateOperation(autoTransport[index])
                                                }}>
                                                    Modificar
                                                </button>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">{auto.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{auto.permsct}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{auto.numpermisosct}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <table className="min-w-full text-left text-sm font-light">
                                                    <thead className="border-b font-medium dark:border-neutral-500">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-4">Configuracion vehicular</th>
                                                            <th scope="col" className="px-6 py-4">Numero de placa</th>
                                                            <th scope="col" className="px-6 py-4">Año</th>
                                                            <th scope="col" className="px-6 py-4">Peso bruto vehicular (kg)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={index}>
                                                            <td className="whitespace-nowrap px-6 py-4">{auto.IdentificacionVehicularCartaPorte30.configvehicular}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{auto.IdentificacionVehicularCartaPorte30.placavm}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{auto.IdentificacionVehicularCartaPorte30.aniomodelovm}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{auto.IdentificacionVehicularCartaPorte30.PesoBrutoVehicular}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <table className="min-w-full text-left text-sm font-light">
                                                    <thead className="border-b font-medium dark:border-neutral-500">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-4">AseguraRespCivil</th>
                                                            <th scope="col" className="px-6 py-4">PolizaRespCivil</th>
                                                            <th scope="col" className="px-6 py-4">AseguraMedAmbiente</th>
                                                            <th scope="col" className="px-6 py-4">PolizaMedAmbiente</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={index}>
                                                            <td className="whitespace-nowrap px-6 py-4">{auto.Seguros.asegurarespcivil}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{auto.Seguros.polizarespcivil}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{auto.Seguros.aseguramedambiente}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{auto.Seguros.polizamedambiente}</td>
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

function AutoTransport() {
    const [currentPage, setCurrentPage] = useState(1);
    const [template, setTemplate] = useState({});
    const [showTemplate, setShowTemplate] = useState(false);
    const [templateIsCorrect, setTemplateIsCorrect] = useState(true)
    const { userAutoTransport } = useAuth()
    const { addAutoTransport, deleteAutoTransport, errors: dbErrors, isLoading: dbIsLoading, operation: dbOperation } = useDb()
    const elementsPerPage = 2
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const elements = userAutoTransport
    const currentElements = elements.slice(indexOfFirstElement, indexOfLastElement);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const deleteOperation = async (name) => {
        deleteAutoTransport(name)
        if(name === template.name){
            callbackTemplateClose()
        }
    }

    const updateOperation = (obj) => {
        setTemplate(obj)
        setShowTemplate(true)
    }

    const callbackTemplateClose = () => {
        setTemplate({})
        setShowTemplate(false)
        setTemplateIsCorrect(true)
    }

    const callbackTemplateSave = async (obj) => {
        if (obj !== null) {
            if (Object.keys(template).length !== 0) {
                // Registro existente (para actualizar)
                obj.oldName = template.name
            }
            addAutoTransport(obj)
            setShowTemplate(false)
            setTemplateIsCorrect(true)
        } else {
            setTemplateIsCorrect(false)
        }
    }

    return (
        <>
            {
                (dbOperation === "addAutoTransport" || dbOperation === "deleteAutoTransport") ? (
                    <ErrorsAlert errors={dbErrors} />
                ) : null
            }
            {
                (dbIsLoading && (dbOperation === "addAutoTransport" || dbOperation === "deleteAutoTransport")) ? (
                    <InfiniteModal title="Base de datos" message="Espere mientras se lleva a cabo la operacion..." />
                ) : null
            }
            {
                !templateIsCorrect &&
                <div className={"mt-5 text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500"} >
                    <p className="text-xl text-center">
                        Asegurese de completar los campos antes de guardar
                    </p>
                </div>
            }
            <div className="text-center">
                <button type="submit" className="m-2 p-2 font-semibold text-xl bg-green-500 rounded-md" onClick={() => {
                    setTemplate({})
                    setShowTemplate(true)
                }}>
                    Agregar
                </button>
            </div>
            {
                showTemplate &&
                <TemplateAutoTransport callbackTemplateClose={callbackTemplateClose} callbackTemplateSave={callbackTemplateSave} template={template} />
            }
            <div className="flex flex-wrap">
                <div className="w-full">
                    <AutoTransportTable autoTransport={currentElements} deleteOperation={deleteOperation} updateOperation={updateOperation} />
                    <Pagination
                        elementsPerPage={elementsPerPage}
                        totalElements={elements.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </>
    )
}

export default AutoTransport