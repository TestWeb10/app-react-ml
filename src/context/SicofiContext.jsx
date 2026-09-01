import { createContext, useContext, useEffect, useState } from "react";
import { cfdiTrasladoRequest, cfdiIngresoRequest, cfdiTrasladoCPRequest, cfdiIngresoCPRequest } from "../api/sicofi";
// import Cookies from "js-cookie";
import { useAuth } from "./AuthContext";

export const SicofiContext = createContext()

export const useSicofi = () => {
    const context = useContext(SicofiContext)
    if (!context) {
        throw new Error("useSicofi must be used within an SicofiProvider")
    } else {
        return context
    }
}

export const SicofiProvider = ({ children }) => {
    const [errors, setErrors] = useState({
        status: null,
        error: null,
        message: null
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isOk, setIsOk] = useState(false)
    const [operation, setOperation] = useState("")
    const { setUserInvoices } = useAuth()
    const [catalogCP, setCatalogCP] = useState({
        "c_TipoPermiso": [],
        "c_ConfigAutotransporte": [],
        "c_FiguraTransporte": []
    })
    const [invoiceXML, setInvoiceXML] = useState(null)

    useEffect(() => {
        let folderName = "CatalogosCartaPorte30"
        let fileName = "CatalogosCartaPorte30.json"
        fetch(`${folderName}/${fileName}`).then((res) => res.json()).then((data) => {
            let obj = {
                "c_TipoPermiso": [],
                "c_ConfigAutotransporte": [],
                "c_FiguraTransporte": []
            }
            obj["c_TipoPermiso"] = data["c_TipoPermiso"]["data"]
            obj["c_ConfigAutotransporte"] = data["c_ConfigAutotransporte"]["data"]
            obj["c_FiguraTransporte"] = data["c_FiguraTransporte"]["data"]
            setCatalogCP(obj)
        })
    }, [])

    const clearErrors = () => {
        setErrors({
            status: null,
            error: null,
            message: null
        })
        setOperation("")
        setIsOk(false)
        setInvoiceXML(null)
    }

    const cfdiTraslado = async (obj) => {
        setOperation("cfdiTraslado")
        const jwtTokenString=window.localStorage.getItem("jwtToken")
        if (jwtTokenString) {
            const jwtToken=JSON.parse(jwtTokenString)
            setIsLoading(true)
            setIsOk(false)
            try {
                const res = await cfdiTrasladoRequest(obj, jwtToken)
                const data = res.data
                setErrors({
                    status: 200,
                    error: "",
                    message: data.message,
                })
                setIsOk(true)
                setUserInvoices(data.invoices)
                setInvoiceXML(new Blob([data.invoiceText], {type: "text/xml"}))
                if(data.jwtToken){
                    window.localStorage.setItem("jwtToken", JSON.stringify(data.jwtToken))
                }
            } catch (error) {
                setErrors({
                    status: error.response.status,
                    error: error.response.data.error,
                    message: error.response.data.message,
                })
                setIsOk(false)
                setInvoiceXML(null)
                if(error.response.data.jwtToken){
                    window.localStorage.setItem("jwtToken", JSON.stringify(error.response.data.jwtToken))
                }
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors({
                status: 401,
                error: "",
                message: "No se cuenta con autorizacion. Favor de volver a iniciar sesion en la aplicacion.",
            })
            setInvoiceXML(null)
        }
    }

    const cfdiIngreso = async (obj) => {
        setOperation("cfdiIngreso")
        const jwtTokenString=window.localStorage.getItem("jwtToken")
        if (jwtTokenString) {
            const jwtToken=JSON.parse(jwtTokenString)
            setIsLoading(true)
            setIsOk(false)
            try {
                const res = await cfdiIngresoRequest(obj, jwtToken)
                const data = res.data
                setErrors({
                    status: 200,
                    error: "",
                    message: data.message,
                })
                setIsOk(true)
                setUserInvoices(data.invoices)
                setInvoiceXML(new Blob([data.invoiceText], {type: "text/xml"}))
                if(data.jwtToken){
                    window.localStorage.setItem("jwtToken", JSON.stringify(data.jwtToken))
                }
            } catch (error) {
                setErrors({
                    status: error.response.status,
                    error: error.response.data.error,
                    message: error.response.data.message,
                })
                setIsOk(false)
                setInvoiceXML(null)
                if(error.response.data.jwtToken){
                    window.localStorage.setItem("jwtToken", JSON.stringify(error.response.data.jwtToken))
                }
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors({
                status: 401,
                error: "",
                message: "No se cuenta con autorizacion. Favor de volver a iniciar sesion en la aplicacion.",
            })
            setInvoiceXML(null)
        }
    }

    const cfdiTrasladoCP = async (obj) => {
        setOperation("cfdiTrasladoCP")
        const jwtTokenString=window.localStorage.getItem("jwtToken")
        if (jwtTokenString) {
            const jwtToken=JSON.parse(jwtTokenString)
            setIsLoading(true)
            setIsOk(false)
            try {
                const res = await cfdiTrasladoCPRequest(obj, jwtToken)
                const data = res.data
                setErrors({
                    status: 200,
                    error: "",
                    message: data.message,
                })
                setIsOk(true)
                setUserInvoices(data.invoices)
                setInvoiceXML(new Blob([data.invoiceText], {type: "text/xml"}))
                if(data.jwtToken){
                    window.localStorage.setItem("jwtToken", JSON.stringify(data.jwtToken))
                }
            } catch (error) {
                setErrors({
                    status: error.response.status,
                    error: error.response.data.error,
                    message: error.response.data.message,
                })
                setIsOk(false)
                setInvoiceXML(null)
                if(error.response.data.jwtToken){
                    window.localStorage.setItem("jwtToken", JSON.stringify(error.response.data.jwtToken))
                }
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors({
                status: 401,
                error: "",
                message: "No se cuenta con autorizacion. Favor de volver a iniciar sesion en la aplicacion.",
            })
            setInvoiceXML(null)
        }
    }

    const cfdiIngresoCP = async (obj) => {
        setOperation("cfdiIngresoCP")
        const jwtTokenString=window.localStorage.getItem("jwtToken")
        if (jwtTokenString) {
            const jwtToken=JSON.parse(jwtTokenString)
            setIsLoading(true)
            setIsOk(false)
            try {
                const res = await cfdiIngresoCPRequest(obj, jwtToken)
                const data = res.data
                setErrors({
                    status: 200,
                    error: "",
                    message: data.message,
                })
                setIsOk(true)
                setUserInvoices(data.invoices)
                setInvoiceXML(new Blob([data.invoiceText], {type: "text/xml"}))
                if(data.jwtToken){
                    window.localStorage.setItem("jwtToken", JSON.stringify(data.jwtToken))
                }
            } catch (error) {
                setErrors({
                    status: error.response.status,
                    error: error.response.data.error,
                    message: error.response.data.message,
                })
                setIsOk(false)
                setInvoiceXML(null)
                if(error.response.data.jwtToken){
                    window.localStorage.setItem("jwtToken", JSON.stringify(error.response.data.jwtToken))
                }
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors({
                status: 401,
                error: "",
                message: "No se cuenta con autorizacion. Favor de volver a iniciar sesion en la aplicacion.",
            })
            setInvoiceXML(null)
        }
    }

    return (
        <SicofiContext.Provider value={{
            clearErrors,
            cfdiTraslado,
            cfdiIngreso,
            cfdiTrasladoCP,
            cfdiIngresoCP,
            errors,
            isLoading,
            isOk,
            operation,
            catalogCP,
            invoiceXML
        }}>
            {children}
        </SicofiContext.Provider>
    )
}