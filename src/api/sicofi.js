import axios from './axios_configuration/axios'

export const cfdiTrasladoRequest = (obj, jwtToken) => {
    let URI = '/sicofi/cfdiTraslado'
    return axios.post(URI, {
        invoiceInformation: obj.invoiceInformation,
        DatosCFDI: obj.DatosCFDI,
        ReceptorCFDI: obj.ReceptorCFDI,
        ConceptosCFDI: obj.ConceptosCFDI
    },{
        headers: { Authorization: `Bearer ${jwtToken}` }
    })
}

export const cfdiIngresoRequest = (obj, jwtToken) => {
    let URI = '/sicofi/cfdiIngreso'
    return axios.post(URI, {
        invoiceInformation: obj.invoiceInformation,
        DatosCFDI: obj.DatosCFDI,
        CFDIRelacion: obj.CFDIRelacion,
        ReceptorCFDI: obj.ReceptorCFDI,
        ConceptosCFDI: obj.ConceptosCFDI
    }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
    })
}

export const cfdiTrasladoCPRequest = (obj, jwtToken) => {
    let URI = '/sicofi/cfdiTrasladoCP'
    return axios.post(URI, {
        invoiceInformation: obj.invoiceInformation,
        DatosCFDI: obj.DatosCFDI,
        ReceptorCFDI: obj.ReceptorCFDI,
        ConceptosCFDI: obj.ConceptosCFDI,
        CartaPorte: obj.CartaPorte
    }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
    })
}

export const cfdiIngresoCPRequest = (obj, jwtToken) => {
    let URI = '/sicofi/cfdiIngresoCP'
    return axios.post(URI, {
        invoiceInformation: obj.invoiceInformation,
        DatosCFDI: obj.DatosCFDI,
        ReceptorCFDI: obj.ReceptorCFDI,
        ConceptosCFDI: obj.ConceptosCFDI,
        CartaPorte: obj.CartaPorte
    }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
    })
}