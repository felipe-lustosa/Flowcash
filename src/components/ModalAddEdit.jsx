import * as React from "react";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/system";
import { useState } from 'react';
import { putCategories, postCategories } from '../services/api'
import LoadingEffect from '../components/LoadingEffect'

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 1,
    border: "1px solid #D2D4C8",
    boxShadow: 24,
    p: 1,
};

const styleInput1 = "rounded border border-gray-500 w-full m-auto px-4 py-2";
const styleInput2 = "bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500";
const styleLabelInput = "block text-gray-700 text-sm font-bold"

export default function ModalAddEdit(props) {

    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handlePost = async (input) => {
        setError('')
        setLoading(true)
        await postCategories(input).then(() => {
            props.handleClose();
        }).catch(() => { setError('Falha ao deletar, tente novamente.') })
        setLoading(false)
    }

    const handleUpdate = async (input) => {
        setError('')
        setLoading(true)
        if (input.name == '')
            input.name = props.data['name']
        console.log(input)
        await putCategories(props.data['id'], input).then(() => {
            props.handleClose();
        }).catch(() => { setError('Falha ao deletar, tente novamente.') })
        setLoading(false)
    }

    //use o crtl + F e procure por props.tipo para ver as diferecas entre o de adicionar e editar
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Stack sx={style}>
                <form onSubmit={handleSubmit((input) => (props.tipo == 'adicionar' ? handlePost(input) : props.tipo == 'editar' ? handleUpdate(input) : null))}>
                    <Stack direction="row" spacing={1} sx={{ justifyContent: "space-between", borderRadius: 1, borderBottom: "1px solid #D2D4C8", opacity: 2, fontWeight: "bold", pb: 1 }} >
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ alignSelf: "center", ml: 2 }} >
                            {props.tipo == 'editar' ? "Editar " + props.data['name'] : props.tipo == 'adicionar' ? "Adicionar Setor" : null}
                        </Typography>
                        <IconButton size="small" onClick={props.handleClose} sx={{ color: "gray", "&:hover": { backgroundColor: "#e1dddd97" }, }}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Stack spacing={2} className="w-full p-2">
                        <div><label className={styleLabelInput}>Nome<input {...register("name", (props.tipo == 'adicionar' && { required: true }))} id='descricao' label='nome' placeholder={props.data ? props.data['name'] : null} className={styleInput2} /></label>
                            {/* {errors?.descricao?.type && <InputError type={errors.descricao.type} field="nome" />} */}
                        </div>
                        <p className='text-red-500 text-sm pt-2'>{error}</p>
                        <Box>
                            {loading ? <div className="pb-4"><LoadingEffect /></div> : <Button variant="contained" style={{ textTransform: "none", fontWeight: 700 }} type="submit" className="bg-sky-600 hover:bg-sky-700 shadow-lg">{props.tipo == 'editar' ? "Editar" : props.tipo == 'adicionar' ? "Adicionar" : null}</Button>}
                        </Box>
                    </Stack>
                </form>
            </Stack>
        </Modal>
    );
}
