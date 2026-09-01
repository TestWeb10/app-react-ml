import { useState } from "react"
import { useMl } from "../context/MlContext";
import { useSicofi } from "../context/SicofiContext";
import CfdiTraslado from "./cfdi/CfdiTraslado";
import CfdiIngreso from "./cfdi/CfdiIngreso";
import CfdiTrasladoCP from "./cfdi/CfdiTrasladoCP";
import CfdiIngresoCP from "./cfdi/CfdiIngresoCP";

function TabsCdfi() {
    const [openTab, setOpenTab] = useState(1)
    const { clearErrors: clearMlErrors, setShipments } = useMl()
    const { clearErrors: clearSicofiErrors } = useSicofi()

    return (
        <div>
            <div className="block m-2 rounded-lg bg-white p-6 dark:bg-neutral-700">
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Timbrado
                </h5>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a className={
                                "text-xm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 1
                                    ? "text-white bg-orange-600"
                                    : "text-orange-600 bg-white")
                            }
                                onClick={e => {
                                    e.preventDefault();
                                    clearMlErrors()
                                    clearSicofiErrors()
                                    setShipments([])
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                                CFDI TRASLADO
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a className={
                                "text-xm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 2
                                    ? "text-white bg-orange-600"
                                    : "text-orange-600 bg-white")
                            }
                                onClick={e => {
                                    e.preventDefault();
                                    clearMlErrors()
                                    clearSicofiErrors()
                                    setShipments([])
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                CFDI INGRESO
                            </a>
                        </li>
                    </ul>
                    <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a className={
                                "text-xm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 3
                                    ? "text-white bg-orange-600"
                                    : "text-orange-600 bg-white")
                            }
                                onClick={e => {
                                    e.preventDefault();
                                    clearMlErrors()
                                    clearSicofiErrors()
                                    setShipments([])
                                    setOpenTab(3);
                                }}
                                data-toggle="tab"
                                href="#link3"
                                role="tablist"
                            >
                                CFDI TRASLADO CP
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a className={
                                "text-xm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 4
                                    ? "text-white bg-orange-600"
                                    : "text-orange-600 bg-white")
                            }
                                onClick={e => {
                                    e.preventDefault();
                                    clearMlErrors()
                                    clearSicofiErrors()
                                    setShipments([])
                                    setOpenTab(4);
                                }}
                                data-toggle="tab"
                                href="#link4"
                                role="tablist"
                            >
                                CFDI INGRESO CP
                            </a>
                        </li>
                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
                        <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    <CfdiTraslado />
                                </div>
                            </div>
                            <div className="tab-content tab-space">
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <CfdiIngreso />
                                </div>
                            </div>
                            <div className="tab-content tab-space">
                                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                    <CfdiTrasladoCP />
                                </div>
                            </div>
                            <div className="tab-content tab-space">
                                <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                                    <CfdiIngresoCP />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabsCdfi