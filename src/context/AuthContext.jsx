import { createContext, useContext, useEffect, useState } from "react";
import { signInRequest, verifyJwtTokenRequest } from "../api/auth";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    } else {
        return context
    }
}

export const AuthProvider = ({ children }) => {
    const [errors, setErrors] = useState({
        status: null,
        error: null,
        message: null
    })
    const [isLoading, setIsLoading] = useState(false)
    const [operation, setOperation] = useState("")
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userUsername, setUserUsername] = useState("")
    const [userCalendar, setUserCalendar] = useState([])
    const [userInvoices, setUserInvoices] = useState([])
    const [userAutoTransport, setUserAutoTransport] = useState([])
    const [userFigureTransport, setUserFigureTransport] = useState([])

    // Solo se ejecute una vez después del renderizado inicial y no en renderizados posteriores
    useEffect(() => {
        async function verifyJwtToken() {
            const jwtTokenString = window.localStorage.getItem("jwtToken")
            if (jwtTokenString) {
                const jwtToken = JSON.parse(jwtTokenString)
                try {
                    const res = await verifyJwtTokenRequest(jwtToken)
                    const data = res.data
                    setErrors({
                        status: 200,
                        error: "",
                        message: data.message,
                    })
                    setUserUsername(data.username)
                    setUserCalendar(data.calendar)
                    setUserInvoices(data.invoices)
                    setUserAutoTransport(data.auto_transport)
                    setUserFigureTransport(data.figure_transport)
                    setIsAuthenticated(true)
                } catch (error) {
                    if (error.response) {
                        setErrors({
                            status: error.response.status,
                            error: error.response.data.error,
                            message: error.response.data.message,
                        })
                    }
                    setUserUsername("")
                    setUserCalendar([])
                    setUserInvoices([])
                    setUserAutoTransport([])
                    setUserFigureTransport([])
                    setIsAuthenticated(false)
                }
            } else {
                setUserUsername("")
                setUserCalendar([])
                setUserInvoices([])
                setUserAutoTransport([])
                setUserFigureTransport([])
                setIsAuthenticated(false)
            }
        }
        verifyJwtToken()
    }, [])

    const clearErrors = () => {
        setErrors({
            status: null,
            error: null,
            message: null
        })
        setOperation("")
    }

    const signIn = async (obj) => {
        setOperation("signIn")
        setIsLoading(true)
        try {
            const res = await signInRequest(obj)
            const data = res.data
            setUserUsername(data.username)
            setUserCalendar(data.calendar)
            setUserInvoices(data.invoices)
            setUserAutoTransport(data.auto_transport)
            setUserFigureTransport(data.figure_transport)
            setIsAuthenticated(true)
            window.localStorage.setItem("jwtToken", JSON.stringify(data.jwtToken))
        } catch (error) {
            setErrors({
                status: !error.response ? 400 : error.response.status,
                error: !error.response ? "" : error.response.data.error,
                message: !error.response ? error.message ? error.message : "Ha ocurrido un problema inesperado" : error.response.data.message,
            })
            setUserUsername("")
            setUserCalendar([])
            setUserInvoices([])
            setUserAutoTransport([])
            setUserFigureTransport([])
            setIsAuthenticated(false)
        } finally {
            setIsLoading(false)
        }
    }

    const logOut = () => {
        setOperation("logOut")
        window.localStorage.removeItem("jwtToken")
        setUserUsername("")
        setUserCalendar([])
        setUserInvoices([])
        setUserAutoTransport([])
        setUserFigureTransport([])
        setIsAuthenticated(false)
        // Limpiamos mensajes
        clearErrors()
    }

    return (
        <AuthContext.Provider value={{
            clearErrors,
            signIn,
            logOut,
            errors,
            isLoading,
            operation,
            isAuthenticated,
            userUsername,
            userCalendar,
            userInvoices,
            userAutoTransport,
            userFigureTransport,
            setUserUsername,
            setUserCalendar,
            setUserInvoices,
            setUserAutoTransport,
            setUserFigureTransport
        }}>
            {children}
        </AuthContext.Provider>
    )
}