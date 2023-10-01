import React, {useEffect, useState} from 'react'
// import { Layout } from '../components/Layout'
// import { Layout } from '../components/layout'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { InputGroup, InputGroupText, Form, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ModFichaDos = () => {

    const [modalopen, setModalOpen] = useState(false)
    const toogle =() => setModalOpen(!modalopen) 

return (

    <div>
                <Modal isOpen={modalopen} toggle={toogle}>
                    <ModalHeader toggle={toogle}>
                        Referencias
                    </ModalHeader>
                    <ModalBody>
                    <div>  
                    <Label htmlFor="referencias" className='form-label'>
                    Médico personal
                    </Label>
                    <InputGroup>
                    <Input 
                    // onChange={escribir}
                    type='text'
                    className='form-control'
                    id='medicoPersonal'
                    name='medicoPersonal'
                    />
                    </InputGroup>
                    </div>

                    <div>  
                    <Label htmlFor="referencias" className='form-label'>
                    Teléfono
                    </Label>
                    <InputGroup>
                    <Input 
                    // onChange={escribir}
                    type='number'
                    className='form-control'
                    id='telefonomedpersonal'
                    name='telefonomedpersonal'
                    />
                    </InputGroup>
                    </div>  

                    <div>  
                    <Label htmlFor="referencias" className='form-label'>
                    Odontólogo anterior
                    </Label>
                    <InputGroup>
                    <Input 
                    // onChange={escribir}
                    type='text'
                    className='form-control'
                    id='odontologoAnterior'
                    name='odontologoAnterior'
                    />
                    </InputGroup>
                    </div>

                    <div>  
                    <Label htmlFor="referencias" className='form-label'>
                    Teléfono
                    </Label>
                    <InputGroup>
                    <Input 
                    // onChange={escribir}
                    type='number'
                    className='form-control'
                    id='telefonoodonanterior'
                    name='telefonoodonanterior'
                    />
                    </InputGroup>
                    </div>

                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                    </Modal>
            </div>
)
    
}

export default ModFichaDos