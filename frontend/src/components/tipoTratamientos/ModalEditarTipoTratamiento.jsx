import React, {useEffect, useState} from 'react'
// import { Layout } from '../components/Layout'
// import { Layout } from '../components/layout'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { InputGroup, InputGroupText, Form, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const ModalEditarTipoTratamiento = (props) => {
    
    const {provider,isOpen,toggle,actualizar} = props
    
    const [editarTipoTratamiento,setEditarTipoTratamiento]= useState(provider||'')
    useEffect(()=>{
        setEditarTipoTratamiento(provider)
    }, [provider])

    const controlarEscribir =(e) =>{
        const {name, value} = e.target;
        setEditarTipoTratamiento({...editarTipoTratamiento, [name]:value})
    }

    const enviarEdicion = (e) =>{
        e.preventDefault()
        fetch(`http://localhost:8000/api/putTipoTratamiento/${provider.idTratamiento}`,{
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editarTipoTratamiento)
        })

        .then(response => response.json())

        .then(data=>{
            toggle()
            actualizar()
        })
        .catch(error=> console.error(error))
    }


    return(
    <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
            Editar
        </ModalHeader>
        <ModalBody>
        <Form className=' mt-3'>
            <div>
                <Label htmlFor="user" className='form-label'>
              Descripción
            </Label>
            <InputGroup>
            <Input onChange={(e)=>controlarEscribir(e)}
            type='text'
            className='form-control'
            id='descripcion'
            name='descripcion'
            value={editarTipoTratamiento.descripcion}
            // invalid={values.password && !isValid}
            />
            </InputGroup></div> 

            <div>
                <Label htmlFor="user" className='form-label'>
              Precio
            </Label>
            <InputGroup>
            <Input onChange={(e)=>controlarEscribir(e)}
            type='text'
            className='form-control'
            id='precio'
            name='precio'
            value={editarTipoTratamiento.precio}
            // invalid={values.password && !isValid}
            />
            </InputGroup></div>      
  
            
        </Form>
        
        </ModalBody>
        <ModalFooter>
            <Button onClick={toggle} color='danger'>Cancelar</Button>
            <Button onClick={enviarEdicion} type='submit' color='primary'>Confirmar</Button></ModalFooter>
        
    </Modal>
    )
}

export default ModalEditarTipoTratamiento