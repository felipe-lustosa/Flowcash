import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../context/auth'
import { getCategories } from '../services/api'
import LoadingEffect from '../components/LoadingEffect'
import Navbar from '../layouts/Navbar'

export default function CategoriesPage() {
    // const { authenticated } = useContext(AuthContext)
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const response = await getCategories();
            setCategorias(response.data.data)
            setLoading(false)
        })()
    }, [])

    if (loading) {
        return <LoadingEffect />
    }

    return (
        <Navbar>
            <div>

            </div>
        </Navbar>

    )
}
