import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import { getCategories } from '../services/api'
import LoadingEffect from '../components/LoadingEffect'
import Navbar from '../layouts/Navbar'
import AddIcon from "@mui/icons-material/Add";
import { Fab, Paper, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid";
import ChipsCategorias from '../components/ChipsCategorias'
import ModalAddEdit from '../components/ModalAddEditCategorias'
import ModalDelete from '../components/ModalDeleteCategorias'

export default function CategoriesPage() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true)

    const [openModal, setOpenModal] = useState(false)
    const [tipo, setTipo] = useState('');
    const [idSelected, setIdSelected] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await getCategories();
            setCategorias(response.data.data)
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
                    <Grid container sx={{ bgcolor: "#8a0373", borderRadius: "16px", px: 2, py: 1, maxWidth: "100%", justifySelf: "center", }} >
                        <Grid item xs={12} sm={12} md={12} sx={{ px: 1, py: 1 }} >
                            <h2 className='weight-bold text-white' >
                                Categorias
                            </h2>
                        </Grid>
                    </Grid>
                    <Paper className='flex flex-col justify-center m-4 py-1 px-1' elevation={2}>
                        {loading ? <div className="pb-4"><LoadingEffect /></div> :
                            <div>
                                {categorias != [] && <ChipsCategorias chipData={categorias} handleOpenModal={handleOpenModal} />}
                            </div>}
                        <div className='py-2'>
                            <Tooltip title="Adicionar" className='justify-self-center'>
                                <Fab className='mb-8' aria-label="add" size="small" onClick={() => handleOpenModal("adicionar")} >
                                    <AddIcon />
                                </Fab>
                            </Tooltip>
                        </div>

                    </Paper>
                    {openModal && (tipo == 'adicionar' || tipo == 'editar') && <ModalAddEdit tipo={tipo} open={openModal} handleClose={handleCloseModal} data={categorias.find(item => item.id == idSelected)} />}
                    {(openModal && tipo == 'excluir') ? <ModalDelete open={openModal} handleClose={handleCloseModal} data={categorias.find(item => item.id == idSelected)} /> : null}
                </div>
            </div>
        </Navbar>

    )
}
