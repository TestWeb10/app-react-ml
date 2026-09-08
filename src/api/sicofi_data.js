import axios from './axios_configuration/axios'

export const changePasswordRequest = (obj) => {
    let URI = '/sicofiData/changePassword'
    return axios.post(URI, {
        username_sic: obj.username_sic,
        old_password_sic: obj.old_password_sic,
        new_password_sic: obj.new_password_sic
    })
}