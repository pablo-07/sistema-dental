import React, {useEffect, useState} from 'react'
// import { Layout } from '../components/Layout'
// import { Layout } from '../components/layout'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { InputGroup, InputGroupText, Form, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const ModalEditarPaciente = (props) => {
    
    const {provider,isOpen,toggle,actualizar} = props
    
    const [editarPaciente,setEditarPaciente]= useState(provider||'')
    useEffect(()=>{
        setEditarPaciente(provider)
    }, [provider])

    const controlarEscribir =(e) =>{
        const {name, value} = e.target;
        setEditarPaciente({...editarPaciente, [name]:value})
    }

    const enviarEdicion = (e) =>{
        e.preventDefault()
        fetch(`http://localhost:8000/api/putPaciente/${provider.idPaciente}`,{
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editarPaciente)
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
              Nombre
            </Label>
            <InputGroup>
            <Input onChange={(e)=>controlarEscribir(e)}
            type='text'
            className='form-control'
            id='nombre'
            name='nombre'
            value={editarPaciente.nombre}
            // invalid={values.password && !isValid}
            />
            </InputGroup>

            <Label htmlFor="user" className='form-label'>
              Edad
            </Label>
            <InputGroup>
            <Input onChange={(e)=>controlarEscribir(e)}
            type='number'
            className='form-control'
            id='edad'
            name='edad'
            value={editarPaciente.edad}
            // invalid={values.password && !isValid}
            />
            </InputGroup>  

            <Label htmlFor="user" className='form-label'>
              Teléfono
            </Label>
            <InputGroup>
            <Input onChange={(e)=>controlarEscribir(e)}
            type='text'
            className='form-control'
            id='telefono'
            name='telefono'
            value={editarPaciente.telefono}
            // invalid={values.password && !isValid}
            />
            </InputGroup>  
            <Label htmlFor="user" className='form-label'>
              Dirección
            </Label>
            <InputGroup>
            <Input onChange={(e)=>controlarEscribir(e)}
            type='text'
            className='form-control'
            id='direccion'
            name='direccion'
            value={editarPaciente.direccion}
            // invalid={values.password && !isValid}
            />
            </InputGroup>  
            <Label htmlFor="user" className='form-label'>
              Ocupación
            </Label>
            <InputGroup>
            <Input onChange={(e)=>controlarEscribir(e)}
            type='text'
            className='form-control'
            id='ocupacion'
            name='ocupacion'
            value={editarPaciente.ocupacion}
            // invalid={values.password && !isValid}
            />
            </InputGroup>  

            <Label htmlFor="user" className='form-label'>
              Estado Civil
            </Label>
            <InputGroup>
            <Input onChange={(e)=>controlarEscribir(e)}
            type='select'
            className='form-control'
            id='estadoCivil'
            name='estadoCivil'
            value={editarPaciente.estadoCivil}
            // invalid={values.password && !isValid}
            >
            <option >Seleccione</option>
                <option value="Soltero">Soltero</option>
                <option value="Casado">Casado</option>
                <option value="Union de hecho">Unión de hecho</option>
                <option value="Viudo">Viudo</option>
            </Input>
            </InputGroup>  

            <Label htmlFor="user" className='form-label'>
              Referido por
            </Label>
            <InputGroup>
            <Input onChange={(e)=>controlarEscribir(e)}
            type='text'
            className='form-control'
            id='referido'
            name='referido'
            value={editarPaciente.referido}
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

export default ModalEditarPaciente