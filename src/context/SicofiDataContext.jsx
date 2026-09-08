import { createContext, useContext, useEffect, useState } from "react";
import { changePasswordRequest } from "../api/sicofi_data";

export const SicofiDataContext = createContext()

export const useSicofiData = () => {
    const context = useContext(SicofiDataContext)
    if (!context) {
        throw new Error("useSicofiData must be used within an SicofiDataProvider")
    } else {
        return context
    }
}

export const SicofiDataProvider = ({ children }) => {
    const [errors, setErrors] = useState({
        status: null,
        error: null,
        message: null
    })
    const [isOk, setIsOk] = useState(false)
    const [operation, setOperation] = useState("")

    const clearErrors = () => {
        setErrors({
            status: null,
            error: null,
            message: null
        })
        setOperation("")
    }

    const changePassword = async (obj) => {
        setOperation("changePassword")
        setIsOk(false)
        try {
            const res = await changePasswordRequest(obj)
            setIsOk(true)
            clearErrors()
        } catch (error) {
            setErrors({
                status: !error.response ? 400 : error.response.status,
                error: !error.response ? "" : error.response.data.error,
                message: !error.response ? error.message ? error.message : "Ha ocurrido un problema inesperado" : error.response.data.message,
            })
            setIsOk(false)
        }
    }

    return (
        <SicofiDataContext.Provider value={{
            clearErrors,
            changePassword,
            errors,
            isOk,
            operation,
        }}>
            {children}
        </SicofiDataContext.Provider>
    )
}