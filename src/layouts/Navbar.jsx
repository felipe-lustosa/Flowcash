import React, { useState, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth";

const selectedPageButtonStyle = "bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
const pageButtonStyle = "text-gray-100 hover:bg-gray-100 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
const selectedMobileButtonStyle = "bg-[#B80099] text-white block px-3 py-2 rounded-md text-base font-medium"
const mobileButtonStyle = "text-gray-800 hover:bg-[#740060] hover:text-white block px-3 py-2 rounded-md text-base font-medium"

export default function Navbar({ children }) {

    const { authenticated, logout } = useContext(AuthContext)
    const [openMobile, setOpenMobile] = useState(false)

    const location = useLocation()

    const handleLogout = () => {
        logout();
    };

    return (
        <div>
            <nav className="">
                <div className="w-11/12 rounded-lg shadow-lg mx-auto px-2 sm:px-6 lg:px-8 bg-[#B80099]">
                    <div className="relative flex items-center justify-between h-20">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" onClick={() => { setOpenMobile(!openMobile) }}>
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center">
                                <img className="block lg:hidden h-8 w-auto" src="/images/flowcash_logo.png" alt="Workflow" />
                                <img className="hidden lg:block h-8 w-auto" src="/images/flowcash_logo.png" alt="Workflow" />
                            </div>
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    <NavLink to='/categorias'>
                                        <p className={location.pathname == "/categorias" ? selectedPageButtonStyle : pageButtonStyle}>Categorias</p>
                                    </NavLink>
                                    <NavLink to='/transacoes'>
                                        <p className={location.pathname == "/transacoes" ? selectedPageButtonStyle : pageButtonStyle}>Transações</p>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 text-white">
                            <button className='logout' onClick={handleLogout}>logout</button>
                        </div>
                    </div>
                </div>

                <div className="sm:hidden" id="mobile-menu">

                    {openMobile && <div className="px-2 pt-2 pb-3 space-y-1">
                        <NavLink to='/categorias'>
                            <p className={location.pathname == "/categorias" ? selectedMobileButtonStyle : mobileButtonStyle}>Categorias</p>
                        </NavLink>
                        <NavLink to='/transacoes'>
                            <p className={location.pathname == "/transacoes" ? selectedMobileButtonStyle : mobileButtonStyle}>Transações</p>
                        </NavLink>
                    </div>}
                </div>
            </nav>
            <main>{children}</main>
        </div>
    );
}
