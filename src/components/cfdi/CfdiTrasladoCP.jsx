import { useMl } from '../../context/MlContext';
import { useAuth } from '../../context/AuthContext';
import LoadingBar from "../LoadingBar";
import ViewCfdiTrasladoCP from "./views/ViewCfdiTrasladoCP";
import ErrorsAlert from "../alerts/ErrorsAlert";
import { useSicofi } from "../../context/SicofiContext";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import dayjs from "dayjs";

function CfdiTrasladoCP() {
    const [initialDate, setInitialDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState(new Date());
    const { getShipments, errors: mlErrors, isLoading: mlIsLoading, operation: mlOperation, shipments, setShipments } = useMl()
    const { userCalendar } = useAuth()
    const { clearErrors: clearSicofiErrors } = useSicofi()
    const formatDate = "YYYY-MM-DD"

    const onClickConsult = () => {
        clearSicofiErrors()
        setShipments([])
        let initial = dayjs(initialDate).format(formatDate)
        let final = dayjs(finalDate).format(formatDate)
        let filteredCalendar = userCalendar.filter((elem) => (elem.date >= initial && elem.date <= final))
        let totalRoutes = []
        filteredCalendar.forEach((elem) => {
            totalRoutes = totalRoutes.concat(elem.routes)
        })
        getShipments(totalRoutes, "CfdiTrasladoCP")
    }

    return (
        <div className=''>
            <div className='row-auto m-auto bg-zinc-800 w-full p-10 rounded-md'>
                {
                    (mlOperation === "getShipmentsCfdiTrasladoCP") ? (
                        <ErrorsAlert errors={mlErrors} />
                    ) : null
                }
                <div className="mt-4 mb-4 p-2 font-semibold text-4xl text-center">
                    CFDI TRASLADO CP
                </div>
                <div className="mt-4 mb-4 p-2 font-semibold text-xl text-center">
                    Elija un rango de fechas <br />
                    (en base en el calendario)
                </div>
                <div className="flex justify-around">
                    <div className="text-center">
                        <h5 className="mb-2 pb-2 text-xl text-center font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            Fecha inicial (Mes/Dia/Año)
                        </h5>
                        <ReactDatePicker
                            wrapperClassName="react-datepicker"
                            locale="es"
                            selected={initialDate}
                            onChange={(date) => setInitialDate(date)}
                            placeholderText="Fecha inicio"
                        />
                    </div>
                    <div className="text-center">
                        <h5 className="mb-2 pb-2 text-xl text-center font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            Fecha final (Mes/Dia/Año)
                        </h5>
                        <ReactDatePicker
                            wrapperClassName="react-datepicker"
                            locale="es"
                            selected={finalDate}
                            onChange={(date) => setFinalDate(date)}
                            placeholderText="Fecha fin"
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="m-4 p-4 w-40 font-semibold text-xl bg-green-500 rounded-md" onClick={onClickConsult}>
                        Consultar
                    </button>
                </div>
            </div>
            {
                (mlOperation === "getShipmentsCfdiTrasladoCP") ? (
                    (mlIsLoading) ? (
                        <div className="row-auto mt-5 m-auto bg-zinc-800 max-w-md w-full p-10 rounded-md'">
                            <LoadingBar />
                        </div>
                    ) : null
                ) : null
            }
            {
                (mlOperation === "getShipmentsCfdiTrasladoCP") ? (
                    (shipments.length !== 0) ? (
                        <div className="row-auto mt-5 m-auto bg-zinc-800 p-5 rounded-md'">
                            <ViewCfdiTrasladoCP routesShipments={shipments} initialDate={dayjs(initialDate).format(formatDate)} finalDate={dayjs(finalDate).format(formatDate)} />
                        </div>
                    ) : null
                ) : null
            }
        </div>
    )
}

export default CfdiTrasladoCP