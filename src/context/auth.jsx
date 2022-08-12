import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { api, createSession, createUser } from '../services/api'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');

        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
        }

        setLoading(false);
    }, []);

    // console.log(!!user)

    const login = async (email, password) => {
        setError('')
        const response = await createSession(email, password).then().catch(() => { setError('Erro ao realizar o login. Tente novamente.') })
        console.log(response)
        console.log('login auth', response.data);

        // const loggedUser = response.data.user;
        const token = response.data.token.substring(response.data.token.indexOf('|') + 1);

        const loggedUser = {
            id: '123',
            email,
        }

        console.log(JSON.stringify(loggedUser))
        localStorage.setItem('user', JSON.stringify(loggedUser))
        localStorage.setItem('token', token)

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(loggedUser);
        navigate("/categorias")

    }
    console.log(error)

    const register = async (name, email, password) => {
        setError('')
        const response = await createUser(name, email, password).then().catch(() => { setError('Erro ao realizar o registro. Tente novamente.') })

        console.log('login auth', response);

        setUser(null);
        navigate("/login")
    }

    const logout = () => {
        console.log('logout')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = null;
        setUser(null)
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, error, login, register, logout }} >
            {children}
        </AuthContext.Provider>
    )
}