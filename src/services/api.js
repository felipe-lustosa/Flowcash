import axios from "axios";

export const api = axios.create({
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    baseURL: 'https://teste.flowcash.app/api',
})

//login
export const createSession = async (email, password) => {
    return api.post('/login', { email, password })
}

export const createUser = async (name, email, password) => {
    return api.post('/register', { name, email, password })
}

//user
export const getUsers = async () => {
    return api.get('/users')
}

//categories
export const getCategories = async () => {
    return api.get('/categories')
}

export const postCategories = async (data) => {
    return api.post('/categories', {
        name: data.name,
    })
}

export const putCategories = async (id, data) => {
    return api.put('/categories/' + id, {
        name: data.name,
    })
}

export const deleteCategories = async (id) => {
    return api.delete('/categories/' + id)
}

//transactions
export const getTransactions = async () => {
    return api.get('/transactions')
}

export const postTransactions = async (data) => {
    return api.post('/transactions', {
        category_id: data.category_id,
        user_id: data.user_id,
        description: data.description,
        date: data.date,
        status: data.status,
        type: data.type,
        value: data.value,
    })
}

export const putTransactions = async (id, data) => {
    return api.put('/transactions/' + id, {
        category_id: data.category_id,
        user_id: data.user_id,
        description: data.description,
        date: data.date,
        status: data.status,
        type: data.type,
        value: data.value,
    })
}

export const deleteTransactions = async (id) => {
    return api.delete('/transactions/' + id)
}