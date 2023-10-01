import React, {useEffect, useState} from 'react'
// import { Layout } from '../components/Layout'
// import { Layout } from '../components/layout'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { InputGroup, InputGroupText, Form, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ModalEditarEspecialidad from '../components/especialidades/ModalEditarEspecialidad'
import SearchInput from '../components/Search/InputSearch';
import Searchbar from '../components/buscador';
import '../styles/especialidades.css'
import ModalAgregar from '../components/especialidades/ModalAgregar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,
    faEdit
} from '@fortawesome/free-solid-svg-icons';


const Especialidades = () => {

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
    ? especialidades
    : // Si se ha ingresado información al input, que la compare a los criterios y los filtre
      especialidades.filter((item) =>
        item.descripcion.toLowerCase().includes(search.toLocaleLowerCase()),
      );

        /* ----- fin  Buscador */





    //Eliminar Especialidades
    

    
    


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
            const response = await fetch(`http://localhost:8000/api/deleteEspecialidades/${id}`, {
                method: 'DELETE',
                Credential: 'include'
            }
            )

            const data = await response.json()
            console.log(data)
            toogle()
            getEspecialidades()

        } catch (error) {
            console.log(error)
        }
    }


{/***Inicio Editar */}
const [isOpen, setOpen] = useState(false)

const [selectEspecialidad, setSelectEspecialidad] = useState({})

const toggle = () => setOpen (!isOpen)

const obtenerEspecialidad = (especialidad) => {
    setSelectEspecialidad (especialidad)
    toggle()
}





    return (
      <>
        <div>
        <div className='contentEspecialidades'>
        <h1 id='tituloEspecialidades' >Especialidades</h1>
        <div className='ModalAgregar'>
        <ModalAgregar actualizar={getEspecialidades}/></div>

        <div> <Searchbar searcher={searcher}/> </div>
        <div> {/***Para formulario */}
    


        


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


            <ModalEditarEspecialidad 
            provider={selectEspecialidad}
            isOpen={isOpen}
            toggle={toggle}
            actualizar={getEspecialidades}
            />

        </div> {/***Para tabla */}
        <div id='tabla'>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {results.map((especialidad, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{especialidad.descripcion}</td>
                        <td><FontAwesomeIcon icon={faEdit} id='btn-editar' onClick={() => obtenerEspecialidad (especialidad)}/>
                        <FontAwesomeIcon icon={faTrash} id='btn-eliminar' onClick={() => idEliminar (especialidad.idEspecialidad)}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>

        <div>

        </div>
        
        </div>
        
        </div>
      </>
      
    )
  }
  
  
  export default Especialidades
  