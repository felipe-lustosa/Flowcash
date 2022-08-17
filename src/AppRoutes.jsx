import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { AuthProvider, AuthContext } from "./context/auth";


import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';
import HomePage from './pages/Home';
import CategoriesPage from './pages/Categorias';
import TransactionsPage from './pages/Transacoes';


const AppRoutes = () => {

    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext)

        if (loading) {
            return <div className="loading">Carregando...</div>
        }

        if (!authenticated) {
            return <Navigate to="/login" />
        }

        return children
    }

    // user == null -> authenticated = false

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exatct path="/login" element={<LoginPage />} />
                    <Route exatct path="/registrar" element={<RegisterPage />} />
                    <Route exatct path="/" element={<HomePage />} />
                    <Route exatct path="/categorias" element={<Private><CategoriesPage /></Private>} />
                    <Route exatct path="/transacoes" element={<Private><TransactionsPage /></Private>} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes;