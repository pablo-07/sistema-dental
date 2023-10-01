import React, {useEffect, useState} from 'react'
// import { Layout } from '../components/Layout'
// import { Layout } from '../components/layout'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { InputGroup, InputGroupText, Form, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const ModalEditarEspecialidad = (props) => {
    
    const {provider,isOpen,toggle,actualizar} = props
    
    const [editarEspecialidad,setEditarEspecialidad]= useState(provider||'')
    useEffect(()=>{
        setEditarEspecialidad(provider)
    }, [provider])

    const controlarEscribir =(e) =>{
        const {name, value} = e.target;
        setEditarEspecialidad({...editarEspecialidad, [name]:value})
    }

    const enviarEdicion = (e) =>{
        e.preventDefault()
        fetch(`http://localhost:8000/api/putEspecialidades/${provider.idEspecialidad}`,{
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editarEspecialidad)
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
                <Label htmlFor="user" className='form-label'>
              Descripción
            </Label>
            <InputGroup>
            <Input onChange={(e)=>controlarEscribir(e)}
            type='text'
            className='form-control'
            id='descripcion'
            name='descripcion'
            value={editarEspecialidad.descripcion}
            // invalid={values.password && !isValid}
            />
  
  
            </InputGroup>       
  
          {/* <div className="mb-3">
            <Label htmlFor='password' className='form-label'>
              Password
            </Label>
            <Input
            onChange={(e) => onChange(e)}
            type='password'
            value={values.password}
            className='form-control'
            id='password'
            name='password'
            placeholder='password'
            required
            />
            </div> */}
            
  
    

            
            
        </Form>
        
        </ModalBody>
        <ModalFooter>
            <Button onClick={toggle} color='danger'>Cancelar</Button>
            <Button onClick={enviarEdicion} type='submit' color='primary'>Confirmar</Button></ModalFooter>
        
    </Modal>
    )
}

export default ModalEditarEspecialidad