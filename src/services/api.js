import axios from "axios";

export const api = axios.create({
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    baseURL: 'https://teste.flowcash.app/api',
})

export const createSession = async (email, password) => {
    return api.post('/login', { email, password })
}

export const createUser = async (name, email, password) => {
    return api.post('/register', { name, email, password })
}

export const getUsers = async () => {
    return api.get('/users')
}

export const getCategories = async () => {
    return api.get('/categories')
}

export const getTransactions = async () => {
    return api.get('/transactions')
}