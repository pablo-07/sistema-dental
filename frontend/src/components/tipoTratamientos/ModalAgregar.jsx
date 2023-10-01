import React, { useState } from "react"
import { InputGroup, InputGroupText, Form, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ModalAgregar = (props) => {
    const {actualizar} = props
    const [modalopen, setModalOpen] = useState(false)
    const toogle =() => setModalOpen(!modalopen) 


    const [valor, setValor] = useState ({
        descripcion: '',
        precio: '',
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
            const response = await fetch('http://localhost:8000/api/postTipoTratamiento', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                credentials : 'include',
                body : JSON.stringify({
                    descripcion : valor.descripcion,
                    precio : valor.precio
                })

            })
        

            if(!response.ok){
                console.log('No se puede ingresar el dato')

            }
            setValor({descripcion:'', precio:''})
            toogle()
            actualizar()
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <div>
            <Button onClick={toogle} color="success">Registrar Tratamiento</Button>
                <Modal isOpen={modalopen} toggle={toogle}>
                    <ModalHeader toggle={toogle}>   
                        Nuevo Tratamiento
                    </ModalHeader>
                    <ModalBody>
                    <Form 
                    >
          <div className='mb-3'> 
            <Label htmlFor="user" className='form-label'>
              Descripción
            </Label>
            <InputGroup>
            <Input 
            onChange={escribir}
            type='text'
            className='form-control'
            id='descripcion'
            name='descripcion'
            // value={valor.descripcion}
            // invalid={values.password && !isValid}
            />
            </InputGroup>       
          </div>
          <div className='mb-3'> 
            <Label htmlFor="user" className='form-label'>
              Precio
            </Label>
            <InputGroup>
            <Input 
            onChange={escribir}
            type='text'
            className='form-control'
            id='precio'
            name='precio'
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