import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Pagination from "../pagination/Pagination";
import InfiniteModal from "../modals/InfiniteModal";
import { useDb } from "../../context/DbContext";
import ErrorsAlert from "../alerts/ErrorsAlert";
import TemplateFigureTransport from "./templates/TemplateFigureTransport";
import YesNoButton from "../YesNoButton";

function FigureTransportTable({ figureTransport, deleteOperation, updateOperation }) {
    return (
        <div className="block m-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Figura transporte
            </h5>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4"></th>
                                    <th scope="col" className="px-6 py-4"></th>
                                    <th scope="col" className="px-6 py-4">Tipo de figura transporte</th>
                                    <th scope="col" className="px-6 py-4">Datos fiscales</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    figureTransport.map((figure, index) => (
                                        <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={index}>
                                            <td className="whitespace-nowrap">
                                                <YesNoButton callback={() => deleteOperation(figureTransport[index].rfcfigura)} buttonMessage="Eliminar" modalTitle="Eliminar figura transporte" modalMessage={`¿Esta seguro de eliminar la figura transporte '${figureTransport[index].nombrefigura}'?`} className="p-1 m-1 font-semibold text-xm bg-red-500 rounded-md" />
                                            </td>
                                            <td className="whitespace-nowrap">
                                                <button type="submit" className="p-1 m-1 font-semibold text-xm bg-yellow-500 rounded-md" onClick={() => {
                                                    updateOperation(figureTransport[index])
                                                }}>
                                                    Modificar
                                                </button>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">{figure.tipofigura}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <table className="min-w-full text-left text-sm font-light">
                                                    <thead className="border-b font-medium dark:border-neutral-500">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-4">RFC figura</th>
                                                            <th scope="col" className="px-6 py-4">Nombre figura</th>
                                                            <th scope="col" className="px-6 py-4">Numero de licencia</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={index}>
                                                            <td className="whitespace-nowrap px-6 py-4">{figure.rfcfigura}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{figure.nombrefigura}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{figure.numlicencia}</td>
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

function FigureTransport() {
    const [currentPage, setCurrentPage] = useState(1);
    const [template, setTemplate] = useState({});
    const [showTemplate, setShowTemplate] = useState(false);
    const [templateIsCorrect, setTemplateIsCorrect] = useState(true)
    const { userFigureTransport, setUserFigureTransport } = useAuth()
    const { addFigureTransport, deleteFigureTransport, errors: dbErrors, isLoading: dbIsLoading, operation: dbOperation } = useDb()
    const elementsPerPage = 2
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const elements = userFigureTransport
    const currentElements = elements.slice(indexOfFirstElement, indexOfLastElement);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const deleteOperation = async (rfcfigura) => {
        deleteFigureTransport(rfcfigura)
        if(rfcfigura === template.rfcfigura){
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
                obj.oldRfcfigura = template.rfcfigura 
            }
            addFigureTransport(obj)
            setShowTemplate(false)
            setTemplateIsCorrect(true)
        } else {
            setTemplateIsCorrect(false)
        }
    }

    return (
        <>
            {
                (dbOperation === "addFigureTransport" || dbOperation === "deleteFigureTransport") ? (
                    <ErrorsAlert errors={dbErrors} />
                ) : null
            }
            {
                (dbIsLoading && (dbOperation === "addFigureTransport" || dbOperation === "deleteFigureTransport")) ? (
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
                <TemplateFigureTransport callbackTemplateClose={callbackTemplateClose} callbackTemplateSave={callbackTemplateSave} template={template} />
            }
            <div className="flex flex-wrap">
                <div className="w-full">
                    <FigureTransportTable figureTransport={currentElements} deleteOperation={deleteOperation} updateOperation={updateOperation} />
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

export default FigureTransport