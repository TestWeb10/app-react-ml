import { useEffect, useState } from "react";
import { useSicofi } from "../../../context/SicofiContext";
import SelectOption from "../../selects/SelectOption";
import YesNoButton from "../../YesNoButton";

function TemplateFigureTransport({ callbackTemplateClose, callbackTemplateSave, template }) {
    const [tipofigura, setTipofigura] = useState(Object.keys(template).length !== 0 ? template.tipofigura : "");
    const [rfcfigura, setRfcfigura] = useState(Object.keys(template).length !== 0 ? template.rfcfigura : "");
    const [numlicencia, setNumlicencia] = useState(Object.keys(template).length !== 0 ? template.numlicencia : "");
    const [nombrefigura, setNombrefigura] = useState(Object.keys(template).length !== 0 ? template.nombrefigura : "");
    const { catalogCP } = useSicofi()
    const [initialIndexFiguraTransporte, setInitialIndexFiguraTransporte] = useState(null)
    let valuesFiguraTransporte = catalogCP["c_FiguraTransporte"].map((elem) => elem["Clave figura transporte"])
    let contentsFiguraTransporte = catalogCP["c_FiguraTransporte"].map((elem) => `${elem["Clave figura transporte"]} - ${elem["Descripcion"]}`)

    useEffect(() => {
        setTemplate(template)
    }, [template])

    const setTemplate = (obj) => {
        setTipofigura(Object.keys(obj).length !== 0 ? obj.tipofigura : "");
        setRfcfigura(Object.keys(obj).length !== 0 ? obj.rfcfigura : "");
        setNumlicencia(Object.keys(obj).length !== 0 ? obj.numlicencia : "");
        setNombrefigura(Object.keys(obj).length !== 0 ? obj.nombrefigura : "");
        setInitialIndexFiguraTransporte(Object.keys(obj).length !== 0 ? valuesFiguraTransporte.indexOf(template.tipofigura) : null)
    }

    const getTemplate = () => {
        return {
            tipofigura: tipofigura,
            rfcfigura: rfcfigura,
            numlicencia: numlicencia,
            nombrefigura: nombrefigura
        }
    }

    const verifyTemplate = () => {
        let obj = getTemplate()
        if (obj.tipofigura !== "" && obj.rfcfigura !== "" && obj.numlicencia !== "" && obj.nombrefigura !== "") {
            callbackTemplateSave(obj)
        } else {
            callbackTemplateSave(null)
        }
    }

    return (
        <div className="block m-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div className="flex justify-around">
                <div>
                    <YesNoButton callback={verifyTemplate} buttonMessage="Guardar" modalTitle={`Guardar figura transporte (${Object.keys(template).length !== 0 ? "actualizar" : "agregar"})`} modalMessage="¿Esta seguro de guardar el registro?" className="m-2 p-2 font-semibold text-xl bg-blue-500 rounded-md" />
                </div>
                <div>
                    <button type="submit" className="m-2 p-2 font-semibold text-xl bg-red-500 rounded-md" onClick={callbackTemplateClose}>
                        Cerrar
                    </button>
                </div>
            </div>
            <div>
                <h5 className="m-4 p-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Tipo de figura transporte
                </h5>
                <div className="grid grid-cols-1 gap-1">
                    <div>
                        <h5>Tipos de figura</h5>
                        <SelectOption title="Selecciona una opcion" values={valuesFiguraTransporte} contents={contentsFiguraTransporte} defaultValue={""} setValue={setTipofigura} initialIndex={initialIndexFiguraTransporte} className="text-black px-4 py-2 rounded-md my-2 w-96" />
                    </div>
                </div>
            </div>
            <div>
                <h5 className="m-4 p-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Datos fiscales
                </h5>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <div>
                            <h5>RFC figura</h5>
                            <input type="text" value={rfcfigura} placeholder="Ingrese un RFC" className='text-black px-4 py-2 rounded-md my-2 w-96' onChange={(e) => setRfcfigura(e.target.value)} />
                        </div>
                        <div>
                            <h5>Nombre figura</h5>
                            <input type="text" value={nombrefigura} placeholder="Ingrese un nombre" className='text-black px-4 py-2 rounded-md my-2 w-96' onChange={(e) => setNombrefigura(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <h5>Numero de licencia</h5>
                            <input type="text" value={numlicencia} placeholder="Ingrese un numero de licencia" className='text-black px-4 py-2 rounded-md my-2 w-80' onChange={(e) => setNumlicencia(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TemplateFigureTransport