import React, {useEffect, useState} from 'react'
// import { Layout } from '../components/Layout'
// import { Layout } from '../components/layout'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { InputGroup, InputGroupText, Form, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ModFichaCuatro = (props) => {

    const {actualizar} = props
    const [modalopen, setModalOpen] = useState(false)
    const toogle =() => setModalOpen(!modalopen) 

return (

    <div>
                <Modal isOpen={modalopen} toggle={toogle}>
                    <ModalHeader toggle={toogle}>
                        Ejemplo
                    </ModalHeader>
                    <ModalBody>
                    Ejemplo    
                </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
            </div>
)
    
}

export default ModFichaCuatro