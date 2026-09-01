import { useAuth } from "../../context/AuthContext";
import dayjs from "dayjs";
import { useDb } from "../../context/DbContext";
import { days, generateDate, months } from "../../utils/calendar";
import cn from "../../utils/cn"
import { createRef, useEffect, useRef, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr"
import ErrorsAlert from "../alerts/ErrorsAlert";
import InfiniteModal from "../modals/InfiniteModal";
import AskDeleteDate from "../AskDeleteDate";
import { useForm } from "react-hook-form";
import YesNoButton from "../YesNoButton";

function RoutesTable({ date }) {
    const { addRoutesByDate, deleteRoutesBySpecificDate } = useDb()
    const { userCalendar } = useAuth()
    let filteredCalendar = userCalendar.filter((elem) => elem.date === date)
    let inputRef = useRef([])
    inputRef.current = Array.from({ length: filteredCalendar.length === 0 ? 0 : filteredCalendar[0].routes.length }, (_, i) => createRef())

    useEffect(() => {
        if (filteredCalendar.length !== 0) {
            let routeIds = filteredCalendar[0].routes
            for (let i = 0; i < routeIds.length; i++) {
                inputRef.current[i].current.value = routeIds[i]
            }
        }
    })

    const callbackSaveChanges = async () => {
        let routes = inputRef.current.map((elem) => elem.current.value)
        let obj = {
            replace: true,
            date: date,
            routes: routes
        }
        addRoutesByDate(obj)
    }

    const callbackDeleteAll = async () => {
        deleteRoutesBySpecificDate(date)
    }

    const onClickDelete = async (index) => {
        let filteredRoutes = inputRef.current.filter((elem, i) => i !== index).map((elem) => elem.current.value)
        if (filteredRoutes.length !== 0) {
            let obj = {
                replace: true,
                date: date,
                routes: filteredRoutes
            }
            addRoutesByDate(obj)
        } else {
            deleteRoutesBySpecificDate(date)
        }
    }

    return (
        <div>
            {
                filteredCalendar.length !== 0 ? (
                    <div className="">
                        <div className="flex justify-between">
                            <h5 className="m-2 p-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                Rutas ({date})
                            </h5>
                            <div>
                                <div><YesNoButton callback={callbackSaveChanges} buttonMessage="Guardar cambios" modalTitle="Guardar cambios" modalMessage="¿Esta seguro de continuar?" className="m-2 p-2 w-40 bg-blue-500 rounded-md" /></div>
                                <div><YesNoButton callback={callbackDeleteAll} buttonMessage="Eliminar todas las rutas" modalTitle={`Eliminar todas las rutas del dia '${date}'`} modalMessage="¿Esta seguro de continuar?" className="m-2 p-2 w-40 bg-red-500 rounded-md" /></div>
                            </div>
                        </div>
                        <div className="">
                            {
                                filteredCalendar[0].routes.map((routeId, index) => (
                                    <div key={index} className="flex">
                                        <input className="text-black px-4 py-2 rounded-md my-2" type="text" ref={inputRef.current[index]} defaultValue={routeId}></input>
                                        <YesNoButton callback={() => onClickDelete(index)} buttonMessage="Eliminar" modalTitle={`Eliminar ruta '${routeId}'`} modalMessage="¿Esta seguro de continuar?" className="m-2 p-2 bg-red-500 rounded-md" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) : (
                    <div className="">
                        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            No hay rutas registradas para la fecha '{date}'
                        </h5>
                    </div>
                )
            }
        </div>
    )
}

function Calendar() {
    let currentDate = dayjs()
    const [today, setToday] = useState(currentDate)
    const [selectedDate, setSelectedDate] = useState(currentDate)
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm()
    const { userCalendar } = useAuth()
    const { addRoutesByDate, deleteRoutesByDate, errors: dbErrors, isLoading: dbIsLoading, operation: dbOperation } = useDb()
    const dateFormat = "YYYY-MM-DD"
    const onlyDatesCalendar = userCalendar.map((elem) => elem.date)

    const callbackDate = async (date) => {
        deleteRoutesByDate(date)
    }

    const onSubmitRouteIds = handleSubmit(async (values) => {
        let date = selectedDate.format(dateFormat)
        let routes = values.routeIds.split(",").map((routeId) => routeId.trim())
        let obj = {
            replace: false,
            date: date,
            routes: routes
        }
        addRoutesByDate(obj)
    })

    const validationRouteIds = (value) => {
        if (value.length === 0) {
            return "Debe de ingresar al menos una ruta"
        } else {
            let array = value.split(",")
            for (let i = 0; i < array.length; i++) {
                let routeId = array[i].trim()
                if (isNaN(parseInt(routeId))) {
                    return 'Las rutas deben ser numeros validos separadas por comas. Ejemplo: 59240834,59241415,59244950,59245342'
                }
                // if (routeId.length != 8) {
                //     return "Las rutas deben estar separadas por comas. Ejemplo: 59240834,59241415,59244950,59245342"
                // }
            }
            return true
        }
    }

    return (
        <div>
            <div className="block m-2 rounded-lg bg-white p-6 dark:bg-neutral-700">
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Calendario
                </h5>
            </div>
            <div>
                {
                    (dbOperation === "addRoutesByDate" || dbOperation === "deleteRoutesByDate" || dbOperation === "deleteRoutesBySpecificDate") ? (
                        <ErrorsAlert errors={dbErrors} />
                    ) : null
                }
                {
                    (dbIsLoading && dbOperation === "addRoutesByDate") ? (
                        <InfiniteModal title="Rutas" message="Espere mientras se lleva a cabo la operacion..." />
                    ) : null
                }
                {
                    (dbIsLoading && dbOperation === "deleteRoutesByDate") ? (
                        <InfiniteModal title="Eliminacion de rutas de la base de datos" message="Espere mientras se lleva a cabo la operacion..." />
                    ) : null
                }
                <AskDeleteDate callback={callbackDate} title="Eliminar rutas de la base de datos" />
            </div>
            <div className="block m-2 rounded-lg bg-white p-6 dark:bg-neutral-700">
                <div className="flex mx-auto divide-x-2 gap-10">
                    <div className="">
                        <div className="flex justify-between">
                            <h1 className="font-semibold">{months[today.month()]}, {today.year()}</h1>
                            <div className="flex items-center gap-5">
                                <GrFormPrevious className="w-5 h-5 cursor-pointer" onClick={() => {
                                    setToday(today.month(today.month() - 1))
                                }} />
                                <h1 className="cursor-pointer" onClick={() => {
                                    setToday(currentDate)
                                }}>Hoy</h1>
                                <GrFormNext className="w-5 h-5 cursor-pointer" onClick={() => {
                                    setToday(today.month(today.month() + 1))
                                }} />
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-7 text-gray-400">
                            {
                                days.map((day, index) => {
                                    return (
                                        <h1 className="h-14 grid place-content-center text-sm" key={index}>{day}</h1>
                                    )
                                })
                            }
                        </div>
                        <div className="w-full grid grid-cols-7">
                            {
                                generateDate(today.month(), today.year()).map(({ currentMonth, date, today }, index) => {
                                    return (
                                        <div className="h-14 border-t grid place-content-center text-sm" key={index}>
                                            <h1 className={cn(
                                                currentMonth ? "" : "text-gray-400",
                                                today ? "bg-red-600 text-white" : "",
                                                onlyDatesCalendar.includes(date.format(dateFormat)) ? "border-4 border-green-500" : "",
                                                selectedDate.toDate().toDateString() === date.toDate().toDateString() ? "bg-black text-white" : "",
                                                "m-6 h-10 w-10 grid place-content-center rounded-full hover:bg-black hover:text-white transition-all cursor-pointer"
                                            )} onClick={() => {
                                                setSelectedDate(date)
                                            }}>{date.date()}</h1>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="px-5 w-full grid grid-cols-1 divide-y-2">
                        <div className="p-2">
                            <ul>
                                <li className="flex"><p className="bg-red-600 m-1 h-5 w-5 rounded-full"></p><p className="m-1 h-5 text-xm">Dia actual</p></li>
                                <li className="flex"><p className="bg-black m-1 h-5 w-5 rounded-full"></p><p className="m-1 h-5 text-xm">Dia seleccionado</p></li>
                                <li className="flex"><p className="bg-transparent m-1 h-5 w-5 rounded-full border-4 border-green-500"></p><p className="m-1 h-5 text-xm">Dia con rutas</p></li>
                            </ul>
                        </div>
                        <div className="p-2">
                            <div className=''>
                                <h1 className='text-xl font-bold'>Agregar rutas</h1>
                                <form onSubmit={onSubmitRouteIds}>
                                    <input type="text" {...register('routeIds', { validate: validationRouteIds })} className='w-full text-black px-4 py-2 rounded-md my-2' placeholder='Rutas separadas por comas' />
                                    {
                                        formErrors.routeIds &&
                                        <p className='text-red-500'>{formErrors.routeIds.message}</p>
                                    }
                                    <div className="items-center justify-center text-center">
                                        <button type="submit" className="m-2 p-2 w-40 bg-green-500 rounded-md">
                                            Agregar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="p-2">
                            <RoutesTable date={selectedDate.format(dateFormat)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar