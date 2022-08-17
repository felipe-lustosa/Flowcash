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
import { beforeDate, compareDates, sameDate } from '../utils/DateFunctions';
import { convertDate, reConvertDate, reConvertDate2 } from "../utils/ConvertDate";

const dashboardStyle = 'flex justify-between px-8'
const loadingStyle = 'flex justify-center content-center min-h-screen'
const positiveTextStyle = 'text-green-500'
const neutralTextStyle = 'text-orange-300'
const negativeTextStyle = 'text-red-500'

const TransactionsPage = () => {
    const [transacoes, setTransacoes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState({
        date: new Date(),
        key: 5
    })
    const [transactionValue, setTransactionValue] = useState({
        receita: 0,
        despesa: 0,
        saldo: 0,
        saldoInicial: 0,
        saldoFinal: 0,
    })

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

    useEffect(() => {
        let receita = 0, despesa = 0, saldo = 0, saldoInicial = 0, saldoFinal = 0
        transacoes.map((transacao) => {
            if (compareDates(reConvertDate(transacao.date), selectedDate.date)) {
                transacao.type == 'receita' ? receita += transacao.value : despesa += transacao.value
            }
            console.log(compareDates(reConvertDate(transacao.date), selectedDate.date))
            if (beforeDate(reConvertDate(transacao.date), selectedDate.date)) {
                transacao.type == 'receita' ? saldoInicial += transacao.value : saldoInicial -= transacao.value
            }
        })
        saldo = receita - despesa
        saldoFinal = saldo + saldoInicial
        setTransactionValue({
            receita: receita,
            despesa: despesa,
            saldo: saldo,
            saldoInicial: saldoInicial,
            saldoFinal: saldoFinal,
        })
    }, [selectedDate, transacoes])

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
    // console.log(compareDates(new Date(transacoes[0].date.split('T')[0]), selectedDate.date))
    // console.log(compareDates(new Date(transacoes[0].date.split('T')[0]), selectedDate.date))

    return (
        <Navbar>
            <div className='flex justify-center pt-4'>
                <div className="shadow-lg bg-white w-11/12 rounded-2xl font-bold" sx={{ my: 2, pb: 2, maxWidth: "90%", display: { xs: "inline", sm: "inline", md: "flex" }, }} >
                    <Grid container sx={{ bgcolor: "#8a0373", borderRadius: "16px", px: 2, py: 1, maxWidth: "100%", justifySelf: "center", }} >
                        <Grid item xs={12} sm={12} md={12} sx={{ px: 1, py: 1 }} >
                            <h2 className='weight-bold text-white' >
                                Transações
                            </h2>
                        </Grid>
                    </Grid>
                    <div className='flex flex-col justify-items-center items-center'>
                        <Paper className='flex flex-col m-4 py-4 px-1 gap-4 w-11/12 flex-wrap' elevation={2}>
                            <div className='flex justify-around pt-2'>
                                <p className={positiveTextStyle}>Receita: R$ {transactionValue.receita}</p>
                                <p className={negativeTextStyle}>Despesa: {transactionValue.despesa > 0 ? " - R$ " : "R$"} {Math.abs(transactionValue.despesa)}</p>
                                <p className={transactionValue.saldo == 0 ? neutralTextStyle : transactionValue.saldo < 0 ? negativeTextStyle : positiveTextStyle}>Saldo: {transactionValue.saldo < 0 ? " - R$ " : "R$"} {Math.abs(transactionValue.saldo)}</p>
                                <Divider className='justify-self-center p-2' orientation="vertical" />
                                <p className={transactionValue.saldoInicial == 0 ? neutralTextStyle : transactionValue.saldoInicial < 0 ? negativeTextStyle : positiveTextStyle}>Saldo inicial: {transactionValue.saldoInicial < 0 ? " - R$ " : "R$"} {Math.abs(transactionValue.saldoInicial)}</p>
                                <p className={transactionValue.saldoFinal == 0 ? neutralTextStyle : transactionValue.saldoFinal < 0 ? negativeTextStyle : positiveTextStyle}>Saldo final: {transactionValue.saldoFinal < 0 ? " - R$ " : "R$"} {Math.abs(transactionValue.saldoFinal)}</p>
                                <Tooltip title="Adicionar" >
                                    <Fab className='mb-8' color="primary" aria-label="add" size="small" onClick={() => handleOpenModal("adicionar")} >
                                        <AddIcon />
                                    </Fab>
                                </Tooltip>
                            </div>
                            {/*<div className='flex justify-center pt-4'><DatePicker /></div> */}
                        </Paper>
                        <div className='flex justify-center pt-4'><DatePagination selectedDate={selectedDate} setSelectedDate={setSelectedDate} /></div>
                        <div className='grid grid-cols-2 gap-8 content-center m-4 py-4 px-1 w-11/12'>
                            {loading ? <div className="pb-4 col-span-2"><LoadingEffect /></div> : categorias ?
                                transacoes.map((transacao) => {
                                    if (selectedDate.key == 5 || compareDates(reConvertDate(transacao.date), selectedDate.date)) {
                                        return <Paper className='flex flex-col content-center py-2 gap-4 w-full' elevation={2}> < ContainerTransacoes transacoes={transacao} categoria={categorias.find(item => item.id == transacao.category_id)} handleModal={handleOpenModal} /> </Paper>
                                    }
                                }) : null}
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