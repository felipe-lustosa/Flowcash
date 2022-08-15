import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../layouts/Navbar'
import { getTransactions } from '../services/api'
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import LoadingEffect from '../components/LoadingEffect'
import Divider from '@mui/material/Divider';
import { DatePagination } from '../components/DatePagination'

const dashboardStyle = 'flex justify-between px-8'
const loadingStyle = 'flex justify-center content-center min-h-screen'

const TransactionsPage = () => {
    const [transacoes, setTransacoes] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const response = await getTransactions();
            setTransacoes(response.data.data)
            setLoading(false)
        })()
    }, [])

    console.log(transacoes)

    return (
        <Navbar>
            <div className='flex justify-center pt-4'>
                <div className="shadow-lg bg-white w-11/12 rounded-2xl font-bold" sx={{ my: 2, pb: 2, maxWidth: "90%", display: { xs: "inline", sm: "inline", md: "flex" }, }} >
                    <Grid container sx={{ bgcolor: "#2C86EC", borderRadius: "16px", px: 2, py: 1, maxWidth: "100%", justifySelf: "center", }} >
                        <Grid item xs={12} sm={12} md={12} sx={{ px: 1, py: 1 }} >
                            <h2 className='weight-bold text-white' >
                                Transações
                            </h2>
                        </Grid>
                    </Grid>
                    <div className='flex justify-center'>
                        {/* <Paper className='flex flex-col justify-center m-4 py-1 px-1 w-1/3' elevation={2}>
                            <div className='grid grid-cols-5 gap-4'>
                                <div className='col-span-2 grid grid-rows-3 gap-2 justify-start px-8'>
                                    <p>Receita: R$ 100,00</p>
                                    <p>Despesa: R$ 100,00</p>
                                    <p>Saldo:   R$ 100,00</p>
                                </div>
                                <Divider className='justify-self-center p-2' orientation="vertical" />
                                <div className='col-span-2 grid grid-rows-3 gap-2 justify-start'>
                                    <p>Saldo inicial: R$ 100,00</p>
                                    <p>Saldo final: R$ 100,00</p>
                                </div>
                            </div>
                            {loading ? <div className="pb-4"><LoadingEffect /></div> :
                                <div className='py-2'>
                                </div>}
                        </Paper> */}
                        <Paper className='flex flex-col content-center m-4 py-2 px-1 gap-4 w-10/12' elevation={2}>
                            <div className='flex justify-center pb-4'><DatePagination /></div>
                            <div className='flex justify-around'>
                                <p>Receita: R$ 100,00</p>
                                <p>Despesa: R$ 100,00</p>
                                <p>Saldo:   R$ 100,00</p>
                                <Divider className='justify-self-center p-2' orientation="vertical" />
                                <p>Saldo inicial: R$ 100,00</p>
                                <p>Saldo final: R$ 100,00</p>
                            </div>
                            {loading ? <div className="pb-4"><LoadingEffect /></div> :
                                <div className='py-2'>
                                </div>}
                        </Paper>
                    </div>
                </div>
            </div>
        </Navbar>
    )
}

export default TransactionsPage