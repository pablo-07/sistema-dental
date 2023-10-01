import React, { useState, useEffect } from "react"
import { InputGroup, InputGroupText, Form, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ModalAgregarDoctores = (props) => {
    const {actualizar} = props
    const [modalopen, setModalOpen] = useState(false)
    const toogle =() => setModalOpen(!modalopen) 


    const [valor, setValor] = useState ({
        nombre: '',
        telefono: '',
        especialidadId: ''
    })
    
    const escribir = (e) => {
        const {name, value} = e.target
        setValor({...valor, 
        [name]: value,
    })

    }

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





    const enviarDatos = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:8000/api/postDoctores', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                credentials : 'include',
                body : JSON.stringify({
                    nombre : valor.nombre,
                    telefono : valor.telefono,
                    especialidad_idEspecialidad : valor.especialidadId
                })

            })
        

            if(!response.ok){
                console.log('No se puede ingresar el dato')

            }
            setValor({nombre:'', telefono:'', especialidad_idEspecialidad:''})
            toogle()
            actualizar()
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <div>
            <Button onClick={toogle} color="success">Registrar doctor</Button>
                <Modal isOpen={modalopen} toggle={toogle}>
                    <ModalHeader toggle={toogle}>
                        Nuevo doctor
                    </ModalHeader>
                    <ModalBody>
                    <Form 
                    >
          <div className='mb-3'> 
            <Label htmlFor="user" className='form-label'>
              Nombre
            </Label>
            <InputGroup>
            <Input 
            onChange={escribir}
            type='text'
            className='form-control'
            id='nombre'
            name='nombre'
            />
            </InputGroup>       
          </div>
          <div className='mb-3'> 
            <Label htmlFor="user" className='form-label'>
              Telefono
            </Label>
            <InputGroup>
            <Input 
            onChange={escribir}
            type='text'
            className='form-control'
            id='telefono'
            name='telefono'
            />
            </InputGroup>       
          </div>
          <div className='mb-3'> 
            <Label htmlFor="user" className='form-label'>
              Especialidad
            </Label>
            <InputGroup>
            <Input 
            onChange={escribir}
            type='select'
            className='form-control'
            id='especialidadId'
            name='especialidadId'
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
            </InputGroup>       
          </div>

        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={toogle} color='danger'>Cancelar</Button>
                        <Button onClick={enviarDatos} color='primary'>Confirmar</Button>
                    </ModalFooter>
                </Modal>
            </div>


    )
}

export default ModalAgregarDoctores