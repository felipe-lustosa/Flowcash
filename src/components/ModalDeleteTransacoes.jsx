import * as React from "react";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import { useState } from 'react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { deleteTransactions } from '../services/api'
import LoadingEffect from './LoadingEffect'


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

export default function ModalDelete(props) {

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleDelete = async (id) => {
        setError('')
        setLoading(true)
        await deleteTransactions(id).then(() => {
            props.handleClose();
        }).catch(() => { setError('Falha ao deletar, tente novamente.') })
        setLoading(false)
    }

    console.log(props.data)

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Stack sx={style}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Remover {props.data['description']}
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Você tem certeza que deseja remover {props.data['description']}? Esses dados serão permanentemente removidos.
                                </p>
                            </div>
                            <p className='text-red-500 text-sm pt-2'>{error}</p>
                        </div>
                    </div>
                </div>
                {loading ? <div className="pb-4"><LoadingEffect /></div> :
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => handleDelete(props.data['id'])} >
                            Confirmar
                        </button>
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={props.handleClose} >
                            Cancelar
                        </button>
                    </div>}
            </Stack>
        </Modal>
    );

}

