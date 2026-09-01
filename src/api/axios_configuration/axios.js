import axios from "axios";

// DESARROLLO
// const API = 'http://localhost:4000/api'
// PRODUCCION
const API = 'https://api-node-ml.onrender.com/api'

const instance = axios.create({
    baseURL: API,
    withCredentials: true
})

export default instance