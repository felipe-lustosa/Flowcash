import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth';


const inputStyle = "bg-gray-10 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-300";
const labelStyle = "block text-white font-semibold pb-1"
const boxRegisterStyle = "flex flex-col items-start py-2"

export default function RegisterPage() {

    const { register, error } = useContext(AuthContext)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    // const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema), });

    const handleRegister = (e) => {
        // Prevenir o browser de fazer o evento padrao de recarregar a página
        e.preventDefault();
        register(name, email, password)
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-lg w-full shadow-lg space-y-8 bg-[#B80099] p-8 rounded-md">
                <div>
                    <img className="mx-auto h-36 w-auto rounded" src="/images/flowcash_main.png" alt="Workflow" />
                    {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">FlowCash</h2> */}
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className={boxRegisterStyle}>
                            <label htmlFor="name" className={labelStyle}>Nome</label>
                            <input id="name" name="name" type="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required className={inputStyle} />
                        </div>
                        <div className={boxRegisterStyle}>
                            <label htmlFor="email-address" className={labelStyle}>Email</label>
                            <input id="email-address" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required className={inputStyle} />
                        </div>
                        <div className={boxRegisterStyle}>
                            <label htmlFor="password" className={labelStyle}>Password</label>
                            <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className={inputStyle} />
                        </div>
                        <p className='text-red-500'>{error}</p>
                    </div>
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#8a0373] hover:bg-[#58014a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
        </div>)
}


