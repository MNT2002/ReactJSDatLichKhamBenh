import axios from "../axios"

const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    console.log('check data from service', data)
    return axios.post('/api/create-new-user', data)
}

export {
    handleLogin,
    getAllUsers,
    createNewUserService,
 }