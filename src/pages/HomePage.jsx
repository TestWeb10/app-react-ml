import TabsCdfi from "../components/TabsCfdi";
import Invoices from "../components/user/Invoices";
import Calendar from "../components/user/Calendar";
import AutoTransport from "../components/user/AutoTransport";
import FigureTransport from "../components/user/FigureTransport";
import { useEffect } from "react";
import { useDb } from "../context/DbContext";
import { useMl } from "../context/MlContext";
import { useSicofi } from "../context/SicofiContext";

function HomePage() {
    const { clearErrors: clearDbErrors } = useDb()
    const { clearErrors: clearMlErrors, setShipments } = useMl()
    const { clearErrors: clearSicofiErrors } = useSicofi()

    useEffect(() => {
        // Para limpiar mensajes
        clearDbErrors()
        clearMlErrors()
        clearSicofiErrors()
        // Para limpiar todo de Mercado Libre
        setShipments([])
    }, [])

    return (
        <div>
            <div className="row-auto mt-5 p-2 m-auto bg-gray-500 rounded-md">
                <AutoTransport />
            </div>
            <div className="row-auto mt-5 p-2 m-auto bg-gray-500 rounded-md">
                <FigureTransport />
            </div>
            <div className="row-auto mt-5 p-2 m-auto bg-gray-500 rounded-md">
                <Calendar />
            </div>
            <div className="row-auto mt-5 p-2 m-auto bg-gray-500 rounded-md">
                <TabsCdfi />
            </div>
            <div className="row-auto mt-5 p-2 m-auto bg-gray-500 rounded-md">
                <Invoices />
            </div>
        </div>
    )
}

export default HomePage

