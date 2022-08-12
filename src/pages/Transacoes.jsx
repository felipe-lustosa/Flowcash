import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../context/auth'
import Navbar from '../layouts/Navbar'
import { getTransactions } from '../services/api'

const dashboardStyle = 'flex justify-between px-8'
const loadingStyle = 'flex justify-center content-center min-h-screen'

const TransactionsPage = () => {
    const { authenticated, logout } = useContext(AuthContext)
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const response = await getTransactions();
            setCategorias(response.data.data)
            setLoading(false)
        })()
    }, [])

    const handleLogout = () => {
        logout();
    };

    if (loading) {
        return <div className={loadingStyle}>Carregando dados...</div>
    }

    return (
        <Navbar>
            <div id="dashboard" className={dashboardStyle}>
                <h1>Transactions Page</h1>
                <button className='logout' onClick={handleLogout}>logout</button>
            </div>
        </Navbar>
    )
}

export default TransactionsPage