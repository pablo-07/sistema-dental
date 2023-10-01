import React, {useEffect, useState} from 'react'
import { InputGroup, InputGroupText, Form, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ModalAgregarDoctores from '../components/doctores/ModalAgregar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalEditarDoctor from '../components/doctores/ModalEditarDoctor';
import '../styles/doctores.css'

import { faTrash,
    faEdit
} from '@fortawesome/free-solid-svg-icons';
import Searchbar from '../components/buscador';

const Doctores = () => {

    const [doctores, setDoctores] = useState ([])

    const getDoctores = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/getDoctores', {
                credentials: 'include'
            })

            const datos = await response.json()
            setDoctores (datos)

            console.log(datos)

        } catch (error) {
            console.log (error)
        }
    }
    useEffect(() => {
        getDoctores()
    }, [])


    /* ----- Buscador */
  // state para buscador
  const [search, setSearch] = useState("");
  // buscador, captura de datos
  const searcher = (e) => {
    setSearch(e.target.value);
  };
  //metodo de filtrado del buscador
  // Si state search es null (no sea ha ingresado nada en el input) results = dataApi
  const results = !search
    ? doctores
    : // Si se ha ingresado información al input, que la compare a los criterios y los filtre
      doctores.filter((item) =>
        item.nombre.toLowerCase().includes(search.toLocaleLowerCase()),
        
      );

        /* ----- fin  Buscador */

    


    //Eliminar
    const [modalopen, setmodalopen] = useState(false)
    const [descEliminar, setdescEliminar] = useState(null)
    
    const toogle = () => {
        setmodalopen(!modalopen)
    }
    const idEliminar = async (id) => {
        setdescEliminar (id)
        toogle()
    }
    const confirmarEliminar = async() =>{
        const id= descEliminar
        try {
            const response = await fetch(`http://localhost:8000/api/deleteDoctores/${id}`, {
                method: 'DELETE',
                Credential: 'include'
            }
            )

            const data = await response.json()
            console.log(data)
            toogle()
            getDoctores()

        } catch (error) {
            console.log(error)
        }
    }


{/***Inicio Editar */}
const [isOpen, setOpen] = useState(false)

const [selectDoctor, setSelectDoctor] = useState({})

const toggle = () => setOpen (!isOpen)

const obtenerDoctor = (doctor) => {
    setSelectDoctor (doctor)
    toggle()
}



return(
<>
<div>
    <div className='contentDoctores'>
    <h1 id='tituloDoctores'>Doctores</h1>
    <div className="ModalAgregar">
    <ModalAgregarDoctores actualizar={getDoctores}/></div>
    <Searchbar searcher={searcher}/>



    <div>
                <Modal isOpen={modalopen} toggle={toogle}>
                    <ModalHeader toggle={toogle}>
                        Eliminar
                    </ModalHeader>
                    <ModalBody>
                        Estás seguro de eliminar este registro?
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={toogle} color='danger'>Cancelar</Button>
                        <Button onClick={confirmarEliminar} color='primary'>Confirmar</Button>
                    </ModalFooter>
                </Modal>
            </div>


            <ModalEditarDoctor 
            provider={selectDoctor}
            isOpen={isOpen}
            toggle={toggle}
            actualizar={getDoctores}
            />


    <div id='tabla'>
    <Table>
    <thead>
                <tr>
                    <th>No.</th>
                    <th>Nombre</th>
                    <th>Telefono</th>
                    <th>Especialidad</th>
                    <th>Acciones</th>

                </tr>
                
            </thead>
            <tbody>
                    {results.map((doctor, index) => (
                        <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{doctor.nombre}</td>
                        <td>{doctor.telefono}</td> 
                        <td>{doctor.Especialidad.descripcion}</td>
                        <td><FontAwesomeIcon icon={faEdit} id='btn-editar' onClick={() => obtenerDoctor (doctor)} color='primary'/>
                        <FontAwesomeIcon icon={faTrash} id='btn-eliminar' onClick={() => idEliminar (doctor.idDoctor)}/>
                        </td>
                        </tr>
                    ))}
                </tbody>
    </Table>
    </div></div></div>
    </>
)
}

export default Doctores