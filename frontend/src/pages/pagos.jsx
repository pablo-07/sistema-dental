import React, { useState } from "react"
import { InputGroup, InputGroupText, Form, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ModalAgregar from "../components/especialidades/ModalAgregar"

const Pagos = () => {

    const [modalopen, setModalOpen] = useState(false)
    const toogle =() => setModalOpen(!modalopen) 

    return(
        <div>
            <ModalAgregar/>       
            </div>


    )
}

export default Pagos