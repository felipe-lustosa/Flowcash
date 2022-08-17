import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCategories } from '../services/api'

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center pt-12 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-lg w-full shadow-lg space-y-8 bg-[#B80099] p-8 rounded-md">
                <div>
                    <img className="mx-auto h-36 w-auto rounded" src="/images/flowcash_main.png" alt="Workflow" />
                    {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">FlowCash</h2> */}
                </div>
                <div className='space-y-4'>
                    <button onClick={() => { navigate("/login") }} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#8a0373] hover:bg-[#58014a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Login
                    </button>
                    <p className='text-white font-semibold'>OU</p>
                    <button onClick={() => { navigate("/registrar") }} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#8a0373] hover:bg-[#58014a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomePage