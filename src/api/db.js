import axios from './axios_configuration/axios'

export const addRoutesByDateRequest = (obj, jwtToken) => {
    let URI = '/db/calendar/addRoutesByDate'
    return axios.post(URI, {
        replace: obj.replace,
        date: obj.date,
        routes: obj.routes
    }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
    })
}

export const deleteRoutesByDateRequest = (date, jwtToken) => {
    let URI = '/db/calendar/deleteRoutesByDate'
    return axios.post(URI, {
        date: date,
    }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
    })
}

export const deleteRoutesBySpecificDateRequest = (date, jwtToken) => {
    let URI = '/db/calendar/deleteRoutesBySpecificDate'
    return axios.post(URI, {
        date: date,
    }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
    })
}

export const deleteInvoicesByDateRequest = (date, jwtToken) => {
    let URI = '/db/invoices/deleteInvoicesByDate'
    return axios.post(URI, {
        date: date,
    }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
    })
}

export const addAutoTransportRequest = (obj, jwtToken) => {
    let URI = '/db/autoTransport/addAutoTransport'
    return axios.post(URI, {
        oldName: obj.oldName,
        name: obj.name,
        permsct: obj.permsct,
        numpermisosct: obj.numpermisosct,
        IdentificacionVehicularCartaPorte30: obj.IdentificacionVehicularCartaPorte30,
        Seguros: obj.Seguros
    }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
    })
}

export const deleteAutoTransportRequest = (name, jwtToken) => {
    let URI = '/db/autoTransport/deleteAutoTransport'
    return axios.post(URI, {
        name: name,
    }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
    })
}

export const addFigureTransportRequest = (obj, jwtToken) => {
    let URI = '/db/figureTransport/addFigureTransport'
    return axios.post(URI, {
        oldRfcfigura: obj.oldRfcfigura,
        name: obj.name,
        tipofigura: obj.tipofigura,
        rfcfigura: obj.rfcfigura,
        numlicencia: obj.numlicencia,
        nombrefigura: obj.nombrefigura
    }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
    })
}

export const deleteFigureTransportRequest = (rfcfigura, jwtToken) => {
    let URI = '/db/figureTransport/deleteFigureTransport'
    return axios.post(URI, {
        rfcfigura: rfcfigura,
    }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
    })
}

