import { createContext, useContext, useEffect, useState } from "react";
import { addRoutesByDateRequest, deleteRoutesByDateRequest, deleteRoutesBySpecificDateRequest, deleteInvoicesByDateRequest, addAutoTransportRequest, deleteAutoTransportRequest, addFigureTransportRequest, deleteFigureTransportRequest } from "../api/db"
import Cookies from "js-cookie";
import { useAuth } from "./AuthContext";

export const DbContext = createContext()

export const useDb = () => {
    const context = useContext(DbContext)
    if (!context) {
        throw new Error("useDb must be used within an DbProvider")
    } else {
        return context
    }
}

export const DbProvider = ({ children }) => {
    const [errors, setErrors] = useState({
        status: null,
        error: null,
        message: null
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isOk, setIsOk] = useState(false)
    const [operation, setOperation] = useState("")
    const { setUserCalendar, setUserInvoices, setUserAutoTransport, setUserFigureTransport } = useAuth()

    const clearErrors = () => {
        setErrors({
            status: null,
            error: null,
            message: null
        })
        setOperation("")
        setIsOk(false)
    }

    const addRoutesByDate = async (obj) => {
        setOperation("addRoutesByDate")
        const jwtTokenString=window.localStorage.getItem("jwtToken")
        if (jwtTokenString) {
            const jwtToken=JSON.parse(jwtTokenString)
            setIsLoading(true)
            setIsOk(false)
            try {
                const res = await addRoutesByDateRequest(obj, jwtToken)
                const data = res.data
                setErrors({
                    status: 200,
                    error: "",
                    message: data.message,
                })
                setIsOk(true)
                setUserCalendar(data.calendar)
            } catch (error) {
                setErrors({
                    status: error.response.status,
                    error: error.response.data.error,
                    message: error.response.data.message,
                })
                setIsOk(false)
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors({
                status: 401,
                error: "",
                message: "No se cuenta con autorizacion. Favor de volver a iniciar sesion en la aplicacion.",
            })
        }
    }

    const deleteRoutesByDate = async (date) => {
        setOperation("deleteRoutesByDate")
        const jwtTokenString=window.localStorage.getItem("jwtToken")
        if (jwtTokenString) {
            const jwtToken=JSON.parse(jwtTokenString)
            setIsLoading(true)
            setIsOk(false)
            try {
                const res = await deleteRoutesByDateRequest(date, jwtToken)
                const data = res.data
                setErrors({
                    status: 200,
                    error: "",
                    message: data.message,
                })
                setIsOk(true)
                setUserCalendar(data.calendar)
            } catch (error) {
                setErrors({
                    status: error.response.status,
                    error: error.response.data.error,
                    message: error.response.data.message,
                })
                setIsOk(false)
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors({
                status: 401,
                error: "",
                message: "No se cuenta con autorizacion. Favor de volver a iniciar sesion en la aplicacion.",
            })
        }
    }

    const deleteRoutesBySpecificDate = async (date) => {
        setOperation("deleteRoutesBySpecificDate")
        const jwtTokenString=window.localStorage.getItem("jwtToken")
        if (jwtTokenString) {
            const jwtToken=JSON.parse(jwtTokenString)
            setIsLoading(true)
            setIsOk(false)
            try {
                const res = await deleteRoutesBySpecificDateRequest(date, jwtToken)
                const data = res.data
                setErrors({
                    status: 200,
                    error: "",
                    message: data.message,
                })
                setIsOk(true)
                setUserCalendar(data.calendar)
            } catch (error) {
                setErrors({
                    status: error.response.status,
                    error: error.response.data.error,
                    message: error.response.data.message,
                })
                setIsOk(false)
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors({
                status: 401,
                error: "",
                message: "No se cuenta con autorizacion. Favor de volver a iniciar sesion en la aplicacion.",
            })
        }
    }

    const deleteInvoicesByDate = async (date) => {
        setOperation("deleteInvoicesByDate")
        const jwtTokenString=window.localStorage.getItem("jwtToken")
        if (jwtTokenString) {
            const jwtToken=JSON.parse(jwtTokenString)
            setIsLoading(true)
            setIsOk(false)
            try {
                const res = await deleteInvoicesByDateRequest(date, jwtToken)
                const data = res.data
                setErrors({
                    status: 200,
                    error: "",
                    message: data.message,
                })
                setIsOk(true)
                setUserInvoices(data.invoices)
            } catch (error) {
                setErrors({
                    status: error.response.status,
                    error: error.response.data.error,
                    message: error.response.data.message,
                })
                setIsOk(false)
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors({
                status: 401,
                error: "",
                message: "No se cuenta con autorizacion. Favor de volver a iniciar sesion en la aplicacion.",
            })
        }
    }

    const addAutoTransport = async (obj) => {
        setOperation("addAutoTransport")
        const jwtTokenString=window.localStorage.getItem("jwtToken")
        if (jwtTokenString) {
            const jwtToken=JSON.parse(jwtTokenString)
            setIsLoading(true)
            setIsOk(false)
            try {
                const res = await addAutoTransportRequest(obj, jwtToken)
                const data = res.data
                setErrors({
                    status: 200,
                    error: "",
                    message: data.message,
                })
                setIsOk(true)
                setUserAutoTransport(data.auto_transport)
            } catch (error) {
                setErrors({
                    status: error.response.status,
                    error: error.response.data.error,
                    message: error.response.data.message,
                })
                setIsOk(false)
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors({
                status: 401,
                error: "",
                message: "No se cuenta con autorizacion. Favor de volver a iniciar sesion en la aplicacion.",
            })
        }
    }

    const deleteAutoTransport = async (name) => {
        setOperation("deleteAutoTransport")
        const jwtTokenString=window.localStorage.getItem("jwtToken")
        if (jwtTokenString) {
            const jwtToken=JSON.parse(jwtTokenString)
            setIsLoading(true)
            setIsOk(false)
            try {
                const res = await deleteAutoTransportRequest(name, jwtToken)
                const data = res.data
                setErrors({
                    status: 200,
                    error: "",
                    message: data.message,
                })
                setIsOk(true)
                setUserAutoTransport(data.auto_transport)
            } catch (error) {
                setErrors({
                    status: error.response.status,
                    error: error.response.data.error,
                    message: error.response.data.message,
                })
                setIsOk(false)
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors({
                status: 401,
                error: "",
                message: "No se cuenta con autorizacion. Favor de volver a iniciar sesion en la aplicacion.",
            })
        }
    }

    const addFigureTransport = async (obj) => {
        setOperation("addFigureTransport")
        const jwtTokenString=window.localStorage.getItem("jwtToken")
        if (jwtTokenString) {
            const jwtToken=JSON.parse(jwtTokenString)
            setIsLoading(true)
            setIsOk(false)
            try {
                const res = await addFigureTransportRequest(obj, jwtToken)
                const data = res.data
                setErrors({
                    status: 200,
                    error: "",
                    message: data.message,
                })
                setIsOk(true)
                setUserFigureTransport(data.figure_transport)
            } catch (error) {
                setErrors({
                    status: error.response.status,
                    error: error.response.data.error,
                    message: error.response.data.message,
                })
                setIsOk(false)
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors({
                status: 401,
                error: "",
                message: "No se cuenta con autorizacion. Favor de volver a iniciar sesion en la aplicacion.",
            })
        }
    }

    const deleteFigureTransport = async (rfcfigura) => { 
        setOperation("deleteFigureTransport")
        const jwtTokenString=window.localStorage.getItem("jwtToken")
        if (jwtTokenString) {
            const jwtToken=JSON.parse(jwtTokenString)
            setIsLoading(true)
            setIsOk(false)
            try {
                const res = await deleteFigureTransportRequest(rfcfigura, jwtToken)
                const data = res.data
                setErrors({
                    status: 200,
                    error: "",
                    message: data.message,
                })
                setIsOk(true)
                setUserFigureTransport(data.figure_transport)
            } catch (error) {
                setErrors({
                    status: error.response.status,
                    error: error.response.data.error,
                    message: error.response.data.message,
                })
                setIsOk(false)
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors({
                status: 401,
                error: "",
                message: "No se cuenta con autorizacion. Favor de volver a iniciar sesion en la aplicacion.",
            })
        }
    }

    return (
        <DbContext.Provider value={{
            clearErrors,
            addRoutesByDate,
            deleteRoutesByDate,
            deleteRoutesBySpecificDate,
            deleteInvoicesByDate,
            addAutoTransport,
            deleteAutoTransport,
            addFigureTransport,
            deleteFigureTransport,
            errors,
            isLoading,
            isOk,
            operation
        }}>
            {children}
        </DbContext.Provider>
    )
}