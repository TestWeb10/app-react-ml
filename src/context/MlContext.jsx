import { createContext, useContext, useEffect, useState } from "react";
import { getShipmentsRequest } from "../api/ml";
import Cookies from "js-cookie";

export const MlContext = createContext()

export const useMl = () => {
    const context = useContext(MlContext)
    if (!context) {
        throw new Error("useMl must be used within an MlProvider")
    } else {
        return context
    }
}

export const MlProvider = ({ children }) => {
    const [errors, setErrors] = useState({
        status: null,
        error: null,
        message: null
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isOk, setIsOk] = useState(false)
    const [operation, setOperation] = useState("")
    const [shipments, setShipments] = useState([])

    const clearErrors=() => {
        setErrors({
            status: null,
            error: null,
            message: null
        })
        setOperation("")
        setIsOk(false)
    }
    
    const getShipments = async (routes, tabName) => {
        setOperation(`getShipments${tabName}`)
        const jwtTokenString=window.localStorage.getItem("jwtToken")
        if (jwtTokenString) {
            const jwtToken=JSON.parse(jwtTokenString)
            setIsLoading(true)
            setIsOk(false)
            try {
                const res = await getShipmentsRequest(routes, jwtToken)
                const data = res.data
                setErrors({
                    status: 200,
                    error: "",
                    message: data.message,
                })
                setIsOk(true)
                setShipments(data.shipments)
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
                setShipments([])
                if(error.response.data.jwtToken){
                    window.localStorage.setItem("jwtToken", JSON.stringify(error.response.data.jwtToken))
                }
            } finally {
                setIsLoading(false)
            }
        }else{
            setErrors({
                status: 401,
                error: "",
                message: "No se cuenta con autorizacion. Favor de volver a iniciar sesion en la aplicacion.",
            })
        }
    }

    return (
        <MlContext.Provider value={{
            clearErrors,
            setShipments,
            getShipments,
            errors,
            isLoading,
            isOk,
            operation,
            shipments
        }}>
            {children}
        </MlContext.Provider>
    )
}