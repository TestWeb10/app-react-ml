import axios from './axios_configuration/axios'

export const getShipmentsRequest = (routes, jwtToken) => {
    let URI = '/ml/getShipments'
    return axios.post(URI, {
        routes: routes,
    },{
        headers: { Authorization: `Bearer ${jwtToken}` }
    })
}

