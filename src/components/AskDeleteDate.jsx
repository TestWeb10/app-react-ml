import { useState } from "react";
import YesNoModal from "./modals/YesNoModal";

// DatePicker
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

// moment.js
import moment from "moment";

function AskDeleteDate({ callback, title }) {
    const [startDate, setStartDate] = useState(new Date());
    const [showYesNoModal, setShowYesNoModal] = useState(false)

    const callbackYesNo = (band) => {
        setShowYesNoModal(false)
        if (band) {
            let date = moment(startDate).format("YYYY-MM-DD")
            callback(date)
        }
    }

    return (
        <>
            <div className="block m-2 rounded-lg bg-white p-6 dark:bg-neutral-700">
                <div
                    className="border-b-2 text-xl border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                    {title}
                </div>
                <div className="p-6">
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                        Seleccione hasta que fecha desea eliminar (Mes/Dia/Año).
                    </p>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                        Se eliminara de la base de datos desde lo mas antiguo hasta la fecha indicada.
                    </p>
                    <div className="flex">
                        <ReactDatePicker
                            wrapperClassName="react-datepicker"
                            locale="es"
                            selected={startDate}
                            onChange={(date) => { setStartDate(date) }}
                            placeholderText="Seleccione una fecha"
                        />
                        <button
                            type="button"
                            className="inline-block m-2 p-2 font-semibold text-xs bg-red-500 rounded-md"
                            onClick={() => setShowYesNoModal(true)}>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
            {
                showYesNoModal &&
                <YesNoModal callback={callbackYesNo} title={title} message={`¿Esta seguro de eliminar hasta la fecha '${moment(startDate).format("DD/MM/YYYY")}'?`} />
            }
        </>
    )
}

export default AskDeleteDate