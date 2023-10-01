import React, {useEffect, useState} from 'react'
// import { Layout } from '../components/Layout'
// import { Layout } from '../components/layout'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { InputGroup, InputGroupText, Form, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ModalEditarTipoTratamiento from '../components/tipoTratamientos/ModalEditarTipoTratamiento';
import '../styles/tipoTratamiento.css'
import Searchbar from '../components/buscador';
import ModalAgregar from '../components/tipoTratamientos/ModalAgregar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,
    faEdit
} from '@fortawesome/free-solid-svg-icons';


const TipoTratamiento = () => {

    const [tipoTratamiento, setTipoTratamiento] = useState ([])

    const getTipoTratamiento = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/getTipoTratamiento', {
                credentials: 'include'
            })

            const datos = await response.json()
            setTipoTratamiento (datos)

            console.log(datos)

        } catch (error) {
            console.log (error)
        }
    }
    useEffect(() => {
        getTipoTratamiento()
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
    ? tipoTratamiento
    : // Si se ha ingresado información al input, que la compare a los criterios y los filtre
      tipoTratamiento.filter((item) =>
        item.descripcion.toLowerCase().includes(search.toLocaleLowerCase()),
      );

        /* ----- fin  Buscador */



//Eliminar Tratamiento
    
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
        const response = await fetch(`http://localhost:8000/api/deleteTipoTratamiento/${id}`, {
            method: 'DELETE',
            Credential: 'include'
        }
        )

        const data = await response.json()
        console.log(data)
        toogle()
        getTipoTratamiento()

    } catch (error) {
        console.log(error)
    }
}







    {/***Inicio Editar */}
const [isOpen, setOpen] = useState(false)

const [selectTipoTratamiento, setSelectTipoTratamiento] = useState({})

const toggle = () => setOpen (!isOpen)

const obtenerTipoTratamiento = (especialidad) => {
    setSelectTipoTratamiento (especialidad)
    toggle()
}





    return(

        <>
        <div>
            <div className="contentTratamiento">
        <h1 id='tituloTratamientos' >Tratamientos</h1>
        <div className="ModalAgregar">
        <ModalAgregar actualizar={getTipoTratamiento}/></div>
        <div> <Searchbar searcher={searcher}/> </div>

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


        <ModalEditarTipoTratamiento 
            provider={selectTipoTratamiento}
            isOpen={isOpen}
            toggle={toggle}
            actualizar={getTipoTratamiento}
            />



        <div id='tabla'>
        <Table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {results.map((tipoTrata, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{tipoTrata.descripcion}</td>
                        <td>{tipoTrata.precio}</td>
                        <td><FontAwesomeIcon icon={faEdit} id='btn-editar' onClick={() => obtenerTipoTratamiento (tipoTrata)}/>
                        <FontAwesomeIcon icon={faTrash} id='btn-eliminar' onClick={() => idEliminar (tipoTrata.idTratamiento)}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>

        </div>
        </div>
        </>
    )




}

export default TipoTratamiento