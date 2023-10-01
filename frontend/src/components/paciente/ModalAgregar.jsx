import React, { useState } from "react"
import { InputGroup, InputGroupText, Form, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ModalAgregar = (props) => {
    const {actualizar} = props
    const [modalopen, setModalOpen] = useState(false)
    const toogle =() => setModalOpen(!modalopen) 


    const [valor, setValor] = useState ({
        nombre: '',
        edad: '',
        telefono: '',
        direccion: '',
        ocupacion: '',
        estadoCivil: '',
        referido: '',
    })
    
    const escribir = (e) => {
        const {name, value} = e.target
        setValor({...valor, 
        [name]: value,
    })

    }

    const enviarDatos = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:8000/api/postPaciente', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                credentials : 'include',
                body : JSON.stringify({
                    nombre : valor.nombre,
                    edad : valor.edad,
                    telefono : valor.telefono,
                    direccion : valor.direccion,
                    ocupacion : valor.ocupacion,
                    estadoCivil : valor.estadoCivil,
                    referido : valor.referido
                })

            })
        

            if(!response.ok){
                console.log('No se puede ingresar el dato')

            }
            setValor({nombre:'', edad:'', telefono:'', direccion:'', ocupacion:'', estadoCivil:'', referido:''})
            toogle()
            actualizar()
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <div>
            <Button onClick={toogle} color="success">Registrar paciente</Button>
                <Modal isOpen={modalopen} toggle={toogle}>
                    <ModalHeader toggle={toogle}>
                        Nuevo paciente
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
            // value={valor.descripcion}
            // invalid={values.password && !isValid}
            />
  
  
            </InputGroup>
            <Label htmlFor="user" className='form-label'>
              Edad
            </Label>
            <InputGroup>
            <Input 
            onChange={escribir}
            type='number'
            className='form-control'
            id='edad'
            name='edad'
            // value={valor.descripcion}
            // invalid={values.password && !isValid}
            />
  
  
            </InputGroup>
            <Label htmlFor="user" className='form-label'>
              Teléfono
            </Label>
            <InputGroup>
            <Input 
            onChange={escribir}
            type='text'
            className='form-control'
            id='telefono'
            name='telefono'
            // value={valor.descripcion}
            // invalid={values.password && !isValid}
            />
  
  
            </InputGroup>
            <Label htmlFor="user" className='form-label'>
              Dirección
            </Label>
            <InputGroup>
            <Input 
            onChange={escribir}
            type='text'
            className='form-control'
            id='direccion'
            name='direccion'
            // value={valor.descripcion}
            // invalid={values.password && !isValid}
            />
  
  
            </InputGroup>
            <Label htmlFor="user" className='form-label'>
              Ocupación
            </Label>
            <InputGroup>
            <Input 
            onChange={escribir}
            type='text'
            className='form-control'
            id='ocupacion'
            name='ocupacion'
            // value={valor.descripcion}
            // invalid={values.password && !isValid}
            />
  
  
            </InputGroup>
            <Label htmlFor="user" className='form-label'>
              Estado Civil
            </Label>
            <InputGroup>
            <Input 
            onChange={escribir}
            type='select'
            className='form-control'
            id='estadoCivil'
            name='estadoCivil'
            // value={valor.descripcion}
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
            <Input 
            onChange={escribir}
            type='text'
            className='form-control'
            id='referido'
            name='referido'
            // value={valor.descripcion}
            // invalid={values.password && !isValid}
            />
  
  
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

export default ModalAgregar