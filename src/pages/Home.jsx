import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../context/auth'
import { getCategories } from '../services/api'
import Navbar from '../layouts/Navbar'

const HomePage = () => {
    const { authenticated, logout } = useContext(AuthContext)
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const response = await getCategories();
            setCategorias(response.data.data)
            setLoading(false)
        })()
    }, [])

    const handleLogout = () => {
        logout();
    };

    if (loading) {
        return <div className="loading">Carregando dados...</div>
    }

    return (
        <Navbar>
            <div id="dashboard">
                <h1 className='py-20'>Home Page</h1>
                <button className='logout' onClick={handleLogout}>logout</button>
            </div>
        </Navbar>

    )
}

export default HomePage