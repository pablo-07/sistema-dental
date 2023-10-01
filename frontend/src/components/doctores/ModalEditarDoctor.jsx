import React, {useEffect, useState} from 'react'
// import { Layout } from '../components/Layout'
// import { Layout } from '../components/layout'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { InputGroup, InputGroupText, Form, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const ModalEditarDoctor = (props) => {
    
    const {provider,isOpen,toggle,actualizar} = props
    
    const [editarDoctor,setEditarDoctor]= useState(provider||'')
    useEffect(()=>{
        setEditarDoctor(provider)
    }, [provider])

    const controlarEscribir =(e) =>{
        const {name, value} = e.target;
        setEditarDoctor({...editarDoctor, [name]:value})
    }

    const enviarEdicion = (e) =>{
        e.preventDefault()
        fetch(`http://localhost:8000/api/putDoctores/${provider.idDoctor}`,{
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editarDoctor)
        })

        .then(response => response.json())

        .then(data=>{
            toggle()
            actualizar()
        })
        .catch(error=> console.error(error))
    }


    //get Especialidades
    const [especialidades, setEspecialidades] = useState ([])

    const getEspecialidades = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/getEspecialidades', {
                credentials: 'include'
            })

            const datos = await response.json()
            setEspecialidades (datos)

            console.log(datos)

            

        } catch (error) {
            console.log (error)
        }
    }
    useEffect(() => {
        getEspecialidades()
    }, [])



    return(
    <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
            Editar
        </ModalHeader>
        <ModalBody>
        <Form className=' mt-3'>
            <div>
                <Label htmlFor="user" className='form-label'>
              Nombre
            </Label>
            <InputGroup>
            <Input onChange={(e)=>controlarEscribir(e)}
            type='text'
            className='form-control'
            id='nombre'
            name='nombre'
            value={editarDoctor.nombre}
            // invalid={values.password && !isValid}
            />
            </InputGroup></div>

            <div>
                <Label htmlFor="user" className='form-label'>
              Telefono
            </Label>
            <InputGroup>
            <Input onChange={(e)=>controlarEscribir(e)}
            type='text'
            className='form-control'
            id='telefono'
            name='telefono'
            value={editarDoctor.telefono}
            // invalid={values.password && !isValid}
            />
            </InputGroup></div>

            <div>
                <Label htmlFor="user" className='form-label'>
              Especialidad
            </Label>
            <InputGroup>
            <Input onChange={(e)=>controlarEscribir(e)}
            type='select'
            className='form-control'
            id='especialidad'
            name='especialidad'
            
            value={editarDoctor.especialidad_idEspecialidad}
            
            // invalid={values.password && !isValid}
            >
                <option >Seleccione</option>
            {especialidades.map((especialidad)=>(
                <option
                key={especialidad.idEspecialidad}
                value={especialidad.idEspecialidad}
                >
                    {especialidad.descripcion}
                </option>
            ))}
                
                
                


            </Input>
            
            </InputGroup></div>   
  
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

export default ModalEditarDoctor