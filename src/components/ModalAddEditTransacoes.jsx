import * as React from "react";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/system";
import { useState } from 'react';
import { putTransactions, postUserTransactions } from '../services/api'
import LoadingEffect from './LoadingEffect'
import DatePicker from '../components/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import BasicSelect from "./BasicSelect";
import { reConvertDate } from "../utils/ConvertDate";

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
    const [selectedRadio, setSelectedRadio] = React.useState(props.tipo == 'editar' ? props.data['type'] : 'receita');
    const [selectedInput, setSelectedInput] = React.useState(props.tipo == 'editar' ? props.data['category_id'] : '');
    const [selectedDate, setSelectedDate] = React.useState(props.tipo == 'editar' ? reConvertDate(props.data['date']) : new Date());

    const handleChangeRadioButton = (event) => {
        setSelectedRadio(event.target.value);
    };

    const handlePost = async (input) => {
        let id = JSON.parse(localStorage.getItem('user')).id
        const postData = {
            category_id: selectedInput,
            user_id: id,
            description: input.description,
            date: selectedDate.toLocaleString().substring(0, selectedDate.toLocaleString().indexOf(' ')).replaceAll('/', '-'),
            status: true,
            type: selectedRadio,
            value: input.value,
        }
        setError('');
        setLoading(true);
        await postUserTransactions(id, postData).then(() => {
            props.handleClose();
        }).catch(() => { setError('Falha ao adicionar, tente novamente.') })
        setLoading(false)
    }

    const handleUpdate = async (input) => {
        let id = props.data.id
        const postData = {
            category_id: selectedInput,
            user_id: JSON.parse(localStorage.getItem('user')).id,
            description: input.description == '' ? props.data.description : input.description,
            date: selectedDate.toLocaleString().substring(0, selectedDate.toLocaleString().indexOf(' ')).replaceAll('/', '-'),
            status: true,
            type: selectedRadio,
            value: input.value == '' ? props.data.value : input.value,
        }
        setError('');
        setLoading(true);
        await putTransactions(id, postData).then(() => {
            props.handleClose();
        }).catch(() => { setError('Falha ao editar, tente novamente.') })
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
                            {props.tipo == 'editar' ? "Editar " + props.data['description'] : props.tipo == 'adicionar' ? "Adicionar Transação" : null}
                        </Typography>
                        <IconButton size="small" onClick={props.handleClose} sx={{ color: "gray", "&:hover": { backgroundColor: "#e1dddd97" }, }}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Stack spacing={2} className="w-full p-2">
                        <div className="flex gap-4">
                            <div><label className={styleLabelInput}>Descrição<input {...register("description", (props.tipo == 'adicionar' && { required: true }))} id='description' placeholder={props.data ? props.data['description'] : null} className={styleInput2} /></label>
                                {/* {errors?.descricao?.type && <InputError type={errors.descricao.type} field="nome" />} */}
                            </div>
                            <div><label className={styleLabelInput}>Valor<input {...register("value", (props.tipo == 'adicionar' && { required: true }))} id='value' placeholder={props.data ? props.data['value'] : null} className={styleInput2} /></label></div>
                            {/* <div><label className={styleLabelInput}>Categoria<input {...register("value", (props.tipo == 'adicionar' && { required: true }))} id='descricao' label='nome' placeholder={props.data ? props.data['name'] : null} className={styleInput2} /></label></div> */}
                        </div>
                        <div className="flex gap-2 pt-2">
                            <BasicSelect options={props.categorias} label='Categorias' setSelected={setSelectedInput} selected={selectedInput} />
                            <div className='flex justify-start w-full'><DatePicker selected={selectedDate} setSelected={setSelectedDate} /></div>
                        </div>
                        <FormControl>
                            <label className={styleLabelInput}>Tipo</label>
                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={handleChangeRadioButton}>
                                <FormControlLabel value="receita" checked={selectedRadio === 'receita'} control={<Radio />} label="Receita" />
                                <FormControlLabel value="despesa" checked={selectedRadio === 'despesa'} control={<Radio />} label="Despesa" />
                            </RadioGroup>
                        </FormControl>
                        <p className='text-red-500 text-sm'>{error}</p>
                        <Box>
                            {loading ? <div className="pb-4"><LoadingEffect /></div> : <Button variant="contained" style={{ textTransform: "none", fontWeight: 700 }} type="submit" className="bg-sky-600 hover:bg-sky-700 shadow-lg">{props.tipo == 'editar' ? "Editar" : props.tipo == 'adicionar' ? "Adicionar" : null}</Button>}
                        </Box>
                    </Stack>
                </form>
            </Stack>
        </Modal>
    );
}
