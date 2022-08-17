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
        const token = localStorage.getItem('token');

        if (recoveredUser && token) {
            setUser(JSON.parse(recoveredUser));
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }

        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setError('')
        await createSession(email, password).then((response) => {
            // const loggedUser = response.data.user;
            console.log(response)
            const token = response.data.token.substring(response.data.token.indexOf('|') + 1);

            const loggedUser = {
                id: '15',
                email,
            }

            localStorage.setItem('user', JSON.stringify(loggedUser))
            localStorage.setItem('token', token)

            api.defaults.headers.Authorization = `Bearer ${token}`;

            setUser(loggedUser);
            navigate("/categorias")
        }).catch(() => { setError('Erro ao realizar o login. Tente novamente.') })



    }

    const register = async (name, email, password) => {
        setError('')
        await createUser(name, email, password).then(() => {
            setUser(null);
            navigate("/login")
        }).catch(() => { setError('Erro ao realizar o registro. Tente novamente.') })
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