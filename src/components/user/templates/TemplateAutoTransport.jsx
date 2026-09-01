import { useEffect, useState } from "react";
import { useSicofi } from "../../../context/SicofiContext";
import SelectOption from "../../selects/SelectOption";
import YesNoButton from "../../YesNoButton";

function TemplateAutoTransport({ callbackTemplateClose, callbackTemplateSave, template }) {
    const [name, setName] = useState(Object.keys(template).length !== 0 ? template.name : "");
    const [permsct, setPermsct] = useState(Object.keys(template).length !== 0 ? template.permsct : "");
    const [numpermisosct, setNumpermisosct] = useState(Object.keys(template).length !== 0 ? template.numpermisosct : "");
    const [configvehicular, setConfigvehicular] = useState(Object.keys(template).length !== 0 ? template.IdentificacionVehicularCartaPorte30.configvehicular : "");
    const [placavm, setPlacavm] = useState(Object.keys(template).length !== 0 ? template.IdentificacionVehicularCartaPorte30.placavm : "");
    const [aniomodelovm, setAniomodelovm] = useState(Object.keys(template).length !== 0 ? template.IdentificacionVehicularCartaPorte30.aniomodelovm : "");
    const [PesoBrutoVehicular, setPesoBrutoVehicular] = useState(Object.keys(template).length !== 0 ? template.IdentificacionVehicularCartaPorte30.PesoBrutoVehicular : "");
    const [Seguros, setSeguros] = useState({
        asegurarespcivil: Object.keys(template).length !== 0 ? template.Seguros.asegurarespcivil : "",
        polizarespcivil: Object.keys(template).length !== 0 ? template.Seguros.polizarespcivil : "",
        aseguramedambiente: Object.keys(template).length !== 0 ? template.Seguros.aseguramedambiente : "aseguramedambiente",
        polizamedambiente: Object.keys(template).length !== 0 ? template.Seguros.polizamedambiente : "polizamedambiente"
    });
    const { catalogCP } = useSicofi()
    const [initialIndexTipoPermiso, setInitialIndexTipoPermiso] = useState(null)
    const [initialIndexConfigAutotransporte, setInitialIndexConfigAutotransporte] = useState(null)
    let valuesTipoPermiso = catalogCP["c_TipoPermiso"].map((elem) => elem["Clave"])
    let contentsTipoPermiso = catalogCP["c_TipoPermiso"].map((elem) => `${elem["Clave"]} - ${elem["Descripcion"]}`)
    let valuesConfigAutotransporte = catalogCP["c_ConfigAutotransporte"].map((elem) => elem["Clave nomenclatura"])
    let contentsConfigAutotransporte = catalogCP["c_ConfigAutotransporte"].map((elem) => `${elem["Clave nomenclatura"]} - ${elem["Descripcion"]}`)

    useEffect(() => {
        setTemplate(template)
    }, [template])

    const setTemplate = (obj) => {
        setName(Object.keys(obj).length !== 0 ? obj.name : "");
        setPermsct(Object.keys(obj).length !== 0 ? obj.permsct : "");
        setNumpermisosct(Object.keys(obj).length !== 0 ? obj.numpermisosct : "");
        setConfigvehicular(Object.keys(obj).length !== 0 ? obj.IdentificacionVehicularCartaPorte30.configvehicular : "");
        setPlacavm(Object.keys(obj).length !== 0 ? obj.IdentificacionVehicularCartaPorte30.placavm : "");
        setAniomodelovm(Object.keys(obj).length !== 0 ? obj.IdentificacionVehicularCartaPorte30.aniomodelovm : "");
        setPesoBrutoVehicular(Object.keys(obj).length !== 0 ? obj.IdentificacionVehicularCartaPorte30.PesoBrutoVehicular : "");
        setSeguros({
            asegurarespcivil: Object.keys(obj).length !== 0 ? obj.Seguros.asegurarespcivil : "",
            polizarespcivil: Object.keys(obj).length !== 0 ? obj.Seguros.polizarespcivil : "",
            aseguramedambiente: Object.keys(obj).length !== 0 ? obj.Seguros.aseguramedambiente : "aseguramedambiente",
            polizamedambiente: Object.keys(obj).length !== 0 ? obj.Seguros.polizamedambiente : "polizamedambiente"
        });
        setInitialIndexTipoPermiso(Object.keys(obj).length !== 0 ? valuesTipoPermiso.indexOf(template.permsct) : null)
        setInitialIndexConfigAutotransporte(Object.keys(obj).length !== 0 ? valuesConfigAutotransporte.indexOf(template.IdentificacionVehicularCartaPorte30.configvehicular) : null)
    }

    const getTemplate = () => {
        return {
            name: name,
            permsct: permsct,
            numpermisosct: numpermisosct,
            IdentificacionVehicularCartaPorte30: {
                configvehicular: configvehicular,
                placavm: placavm,
                aniomodelovm: aniomodelovm,
                PesoBrutoVehicular: PesoBrutoVehicular
            },
            Seguros: Seguros
        }
    }

    const verifyTemplate = () => {
        let obj = getTemplate()
        if (obj.name !== "") {
            callbackTemplateSave(obj)
        } else {
            callbackTemplateSave(null)
        }
    }

    return (
        <div className="block m-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div className="flex justify-around">
                <div>
                    <YesNoButton callback={verifyTemplate} buttonMessage="Guardar" modalTitle={`Guardar auto transporte (${Object.keys(template).length !== 0 ? "actualizar" : "agregar"})`} modalMessage="¿Esta seguro de guardar el registro?" className="m-2 p-2 font-semibold text-xl bg-blue-500 rounded-md" />
                </div>
                <div>
                    <button type="submit" className="m-2 p-2 font-semibold text-xl bg-red-500 rounded-md" onClick={callbackTemplateClose}>
                        Cerrar
                    </button>
                </div>
            </div>
            <div>
                <h5 className="m-4 p-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Datos auto transporte
                </h5>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <div>
                            <h5>Nombre del auto transporte</h5>
                            <input type="text" value={name} placeholder="Ingrese un nombre" className='text-black px-4 py-2 rounded-md my-2 w-96' onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <h5>Tipo de permiso SCT</h5>
                            <SelectOption title="Selecciona una opcion" values={valuesTipoPermiso} contents={contentsTipoPermiso} defaultValue={""} setValue={setPermsct} initialIndex={initialIndexTipoPermiso} className="text-black px-4 py-2 rounded-md my-2 w-96" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <h5>Numero de permiso SCT</h5>
                            <input type="text" value={numpermisosct} placeholder="Ingrese un numero de permiso SCT" className='text-black px-4 py-2 rounded-md my-2 w-80' onChange={(e) => setNumpermisosct(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h5 className="m-4 p-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Identificacion vehicular
                </h5>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <div>
                            <h5>Configuracion vehicular</h5>
                            <SelectOption title="Selecciona una opcion" values={valuesConfigAutotransporte} contents={contentsConfigAutotransporte} defaultValue={""} setValue={setConfigvehicular} initialIndex={initialIndexConfigAutotransporte} className="text-black px-4 py-2 rounded-md my-2 w-96" />
                        </div>
                        <div>
                            <h5>Numero de placa</h5>
                            <input type="text" value={placavm} placeholder="Ingrese un numero de placa" className='text-black px-4 py-2 rounded-md my-2 w-96' onChange={(e) => setPlacavm(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <h5>Año</h5>
                            <input type="text" value={aniomodelovm} placeholder="Ingrese un año" className='text-black px-4 py-2 rounded-md my-2 w-80' onChange={(e) => setAniomodelovm(e.target.value)} />
                        </div>
                        <div>
                            <h5>Peso bruto vehicular (kg)</h5>
                            <input type="text" value={PesoBrutoVehicular} placeholder="Ingrese un peso bruto vehicular (en kg)" className='text-black px-4 py-2 rounded-md my-2 w-80' onChange={(e) => setPesoBrutoVehicular(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h5 className="m-4 p-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Seguros
                </h5>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <div>
                            <h5>AseguraRespCivil</h5>
                            <input type="text" value={Seguros.asegurarespcivil} placeholder="Ingrese lo que se pide" className='text-black px-4 py-2 rounded-md my-2 w-96' onChange={(e) => {
                                setSeguros((prevState) => ({
                                    ...prevState,
                                    asegurarespcivil: e.target.value,
                                }));
                            }} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <h5>PolizaRespCivil</h5>
                            <input type="text" value={Seguros.polizarespcivil} placeholder="Ingrese lo que se pide" className='text-black px-4 py-2 rounded-md my-2 w-80' onChange={(e) => {
                                setSeguros((prevState) => ({
                                    ...prevState,
                                    polizarespcivil: e.target.value,
                                }));
                            }} />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <div>
                            <h5>AseguraMedAmbiente</h5>
                            <input type="text" value={Seguros.aseguramedambiente} placeholder="Ingrese lo que se pide" className='text-black px-4 py-2 rounded-md my-2 w-96' onChange={(e) => {
                                setSeguros((prevState) => ({
                                    ...prevState,
                                    aseguramedambiente: e.target.value,
                                }));
                            }} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <h5>PolizaMedAmbiente</h5>
                            <input type="text" value={Seguros.polizamedambiente} placeholder="Ingrese lo que se pide" className='text-black px-4 py-2 rounded-md my-2 w-80' onChange={(e) => {
                                setSeguros((prevState) => ({
                                    ...prevState,
                                    polizamedambiente: e.target.value,
                                }));
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TemplateAutoTransport