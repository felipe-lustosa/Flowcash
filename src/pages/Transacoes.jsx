import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../layouts/Navbar'
import { getCategories, getUserTransactions } from '../services/api'
import { Fab, Paper, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid";
import LoadingEffect from '../components/LoadingEffect'
import Divider from '@mui/material/Divider';
import { DatePagination } from '../components/DatePagination'
import DatePicker from '../components/DatePicker';
import AddIcon from "@mui/icons-material/Add";
import ModalAddEdit from '../components/ModalAddEditTransacoes';
import ModalDelete from '../components/ModalDeleteTransacoes';
import ContainerTransacoes from '../components/ContainerTransacoes';

const dashboardStyle = 'flex justify-between px-8'
const loadingStyle = 'flex justify-center content-center min-h-screen'

const TransactionsPage = () => {
    const [transacoes, setTransacoes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true)

    const [openModal, setOpenModal] = useState(false)
    const [tipo, setTipo] = useState('');
    const [idSelected, setIdSelected] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                await getUserTransactions(JSON.parse(localStorage.getItem('user')).id).then((response) => {
                    setTransacoes(response.data.data)
                })
            } catch {
                setLoading(false)
            }
            await getCategories().then((response) => {
                setCategorias(response.data.data)
            });
            setLoading(false)
        })()
    }, [openModal])

    function handleOpenModal(tipo, id) {
        if (id)
            setIdSelected(id)
        setTipo(tipo)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setIdSelected(null)
        setTipo('')
        setOpenModal(false)
    }

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
                    <div className='flex flex-col justify-items-center items-center'>
                        <Paper className='flex flex-col m-4 py-4 px-1 gap-4 w-11/12' elevation={2}>
                            <div className='flex justify-around pt-2'>
                                <p>Receita: R$ 100,00</p>
                                <p>Despesa: R$ 100,00</p>
                                <p>Saldo:   R$ 100,00</p>
                                <Divider className='justify-self-center p-2' orientation="vertical" />
                                <p>Saldo inicial: R$ 100,00</p>
                                <p>Saldo final: R$ 100,00</p>
                                <Tooltip title="Adicionar" >
                                    <Fab className='mb-8' color="primary" aria-label="add" size="small" onClick={() => handleOpenModal("adicionar")} >
                                        <AddIcon />
                                    </Fab>
                                </Tooltip>
                            </div>
                            {/* <div className='flex justify-center pt-4'><DatePagination /></div>
                            <div className='flex justify-center pt-4'><DatePicker /></div> */}
                        </Paper>
                        <div className='grid grid-cols-2 gap-8 content-center m-4 py-4 px-1 w-11/12'>
                            {loading ? <div className="pb-4 col-span-2"><LoadingEffect /></div> : categorias ? transacoes.map((transacao) => (
                                <Paper className='flex flex-col content-center py-2 gap-4 w-full' elevation={2}>
                                    < ContainerTransacoes transacoes={transacao} categoria={categorias.find(item => item.id == transacao.category_id)} handleModal={handleOpenModal} />
                                </Paper>
                            )) : null}
                        </div>
                        {openModal && (tipo == 'adicionar' || tipo == 'editar') && <ModalAddEdit tipo={tipo} open={openModal} handleClose={handleCloseModal} data={tipo == 'editar' ? transacoes.find(item => item.id == idSelected) : transacoes} categorias={categorias} />}
                        {(openModal && tipo == 'excluir') ? <ModalDelete open={openModal} handleClose={handleCloseModal} data={transacoes.find(item => item.id == idSelected)} /> : null}
                    </div>
                </div>
            </div>
        </Navbar>
    )
}

export default TransactionsPage