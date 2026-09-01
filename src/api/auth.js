import axios from './axios_configuration/axios'

export const signInRequest = (obj) => {
    let URI = '/auth/signIn'
    return axios.post(URI, {
        username: obj.username,
        password: obj.password
    })
}

export const verifyJwtTokenRequest = (jwtToken) => {
    let URI = '/auth/verifyJwtToken'
    return axios.post(URI, {}, {
        headers: { Authorization: `Bearer ${jwtToken}` }
    })
}