import React, {useEffect, useState} from 'react'
// import { Layout } from '../components/Layout'
// import { Layout } from '../components/layout'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { InputGroup, InputGroupText, Form, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ModalEditarPaciente from '../components/paciente/ModalEditarPaciente';
import SearchInput from '../components/Search/InputSearch';
import Searchbar from '../components/buscador';
// import '../styles/especialidades.css'
import ModalAgregar from '../components/paciente/ModalAgregar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,
    faEdit,
    faFileContract
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';


const Paciente = () => {

    const navigate = useNavigate();

    const [paciente, setPaciente] = useState ([])
    

    const getPaciente = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/getPaciente', {
                credentials: 'include'
            })

            const datos = await response.json()
            setPaciente (datos)

            console.log(datos)

        } catch (error) {
            console.log (error)
        }
    }
    useEffect(() => {
        getPaciente()
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
    ? paciente
    : // Si se ha ingresado información al input, que la compare a los criterios y los filtre
      paciente.filter((item) =>
        item.nombre.toLowerCase().includes(search.toLocaleLowerCase()),
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
            const response = await fetch(`http://localhost:8000/api/deletePaciente/${id}`, {
                method: 'DELETE',
                Credential: 'include'
            }
            )

            const data = await response.json()
            console.log(data)
            toogle()
            getPaciente()

        } catch (error) {
            console.log(error)
        }
    }


{/***Inicio Editar */}
const [isOpen, setOpen] = useState(false)

const [selectPaciente, setSelectPaciente] = useState({})

const toggle = () => setOpen (!isOpen)

const obtenerPaciente = (paciente) => {
    setSelectPaciente (paciente)
    toggle()
}


const [isOpen1, setOpen1] = useState(false)


const toggle1 = () => setOpen1 (!isOpen1)

const [selectPac, setSelectPac] = useState(null);
// const [modalPac]
const selectedPaciente = (prod)=>{
    setSelectPac(prod);
    toggle1()
}


console.log(selectPac)

    return (
      <>
        <div>
        <div className='contentEspecialidades'>
        <h1 id='tituloPacientes' >Pacientes</h1>
        <div className='ModalAgregar'>
        <ModalAgregar actualizar={getPaciente}/></div>

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

            <div>
                <Modal isOpen={isOpen1} size='lg' toggle={toggle1}>
                    <ModalHeader >
                       <div className="container">
                       <div className="row d-flex justify-content-center">
                        <div className="col-6">
                            <Button color='danger' style={{width:"7rem", fontSize:"10px"}}>Tratamiento</Button>
                        </div>
                        <div className="col-6">
                            <Button color='info' style={{width:"7rem", fontSize:"10px"}}>Historial</Button>
                        </div>
                       </div>
                       <div className="row">
                        <div className="col-6 mt-3">
                            <h2>Ficha Clínica</h2>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-end">
                            <Button onClick={() => obtenerPaciente (selectPac)}>Editar</Button>
                        </div>
                       </div>
                       </div>
                    </ModalHeader>
                    <ModalBody>
                        {selectPac && (
                            <>
                            <div className="row">
                                <div className="col-4">
                                <p>Nombre: {selectPac.nombre}</p>
                                </div>
                                <div className="col-4">
                                <p>Edad: {selectPac.edad}</p>
                                </div>
                                <div className="col-4">
                                <p>Fecha de exámen: {selectPac.createdAt}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                <p>Dirección: {selectPac.direccion}</p>
                                </div>
                                <div className="col-4">
                                <p>Teléfono: {selectPac.telefono}</p>
                                </div>
                                <div className="col-4">
                                <p>Ocupación: {selectPac.ocupacion}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                <p>Estado Civil: {selectPac.estadoCivil}</p>
                                </div>
                                <div className="col-4">
                                <p>Referido por: {selectPac.referido}</p>
                                </div>
                            </div>
                            <br />
                            <h4>Datos del responsable</h4>
                            <div className="row mt-4">
                                <div className="col-4">
                                <p>Nombre:</p>
                                </div>
                                <div className="col-4">
                                <p>Teléfono: </p>
                                </div>
                                <div className="col-4">
                                <p>Dirección:</p>
                                </div>
                            </div>
                            <br />
                            <h4>Referencias Médicas</h4>
                            <div className="row mt-4">
                                <h5>Médico personal</h5>
                                <div className="col-4">
                                <p>Nombre:</p>
                                </div>
                                <div className="col-4">
                                <p>Teléfono: </p>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <h5>Odontólogo anterior</h5>
                                <div className="col-4">
                                <p>Nombre:</p>
                                </div>
                                <div className="col-4">
                                <p>Teléfono: </p>
                                </div>
                            </div>
                            </>

                        )
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={toggle1} color='danger'>Cancelar</Button>
                        {/* <Button onClick={confirmarEliminar} color='primary'>Confirmar</Button> */}
                    </ModalFooter>
                </Modal>
            </div>


            <ModalEditarPaciente 
            provider={selectPaciente}
            isOpen={isOpen}
            toggle={toggle}
            actualizar={getPaciente}
            />

        </div> {/***Para tabla */}
        <div id='tabla'>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Id.</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Telefono</th>
                    <th>Dirección</th>
                    <th>Ocupación</th>
                    <th>Estado Civil</th>
                    <th>Referido por</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {results.map((paciente, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{paciente.nombre}</td>
                        <td>{paciente.edad}</td>
                        <td>{paciente.telefono}</td>
                        <td>{paciente.direccion}</td>
                        <td>{paciente.ocupacion}</td>
                        <td>{paciente.estadoCivil}</td>
                        <td>{paciente.referido}</td>
                        <td>
                            {/* <FontAwesomeIcon icon={faEdit} id='btn-editar' onClick={() => obtenerPaciente (paciente)}/> */}
                        <FontAwesomeIcon icon={faTrash} id='btn-eliminar' onClick={() => idEliminar (paciente.idPaciente)}/>
                        {/* <Link to='/fichaClinica'><FontAwesomeIcon icon={faFileContract} id='btn-detalles'/></Link> */}
                        <button
                        // onClick={() => selectedPaciente(paciente.idPaciente)}
                        // onClick={()=> navigate(`/fichaClinica/${paciente.idPaciente}`)}
                        onClick={()=> selectedPaciente(paciente)}
                        >
                            Detalles
                        </button>
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
  
  
  export default Paciente