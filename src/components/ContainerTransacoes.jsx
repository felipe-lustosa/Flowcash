import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fab, Tooltip } from "@mui/material";
import { ConvertDate } from "../utils/ConvertDate";

export default function ContainerTransacoes(props) {

    function ContainerDados(titulo, texto) {
        return (
            <div className="flex flex-col">
                <dt className="font-medium text-gray-500">{titulo}</dt>
                <dd className="mt-1 text-gray-900 sm:mt-0 col-span-2">{texto}</dd>
            </div>
        )
    }

    return (
        <dl>
            {/* <div className="bg-gray-50 px-4 py-3 rounded shadow"> */}
            <div className="grid grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 md:grid-cols-3 gap-4 justify-center content-center">
                {ContainerDados("Descrição", props.transacoes.description)}
                {ContainerDados("Categoria", props.transacoes.description)}
                {ContainerDados("Tipo", props.transacoes.type)}
                {ContainerDados("Valor", "R$" + props.transacoes.value)}
                {ContainerDados("Data", ConvertDate(props.transacoes.date))}
            </div>
            <div className="flex content-center justify-center gap-4 pt-4 sm:px-16 md:px-0">
                <Tooltip title="Editar"><Fab color="primary" aria-label="editar" size="small" onClick={() => props.handleModal('editar', props.transacoes.id)}><EditIcon /></Fab></Tooltip>
                <Tooltip title="Excluir"><Fab aria-label="excluir" size="small" color="error" onClick={() => props.handleModal('excluir', props.transacoes.id)}><DeleteIcon /></Fab></Tooltip>
            </div>
            {/* </div> */}
        </dl>
    )
}
