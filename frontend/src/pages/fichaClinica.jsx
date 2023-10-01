import React, {useEffect, useState} from 'react'
// import { Layout } from '../components/Layout'
// import { Layout } from '../components/layout'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { InputGroup, InputGroupText, Form, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import '../styles/fichaClinica.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,
    faEdit
} from '@fortawesome/free-solid-svg-icons';

import { useParams } from 'react-router-dom'

const FichaClinica = () => {

    const { id } = useParams();
const [paciente, setPaciente] = useState([]);

const getPaciente = async () => {
    try {
        const response = await fetch(`http://localhost:8000/api/paciente/${id}`, {
            credentials: 'include'
        });

        const datos = await response.json();
        setPaciente(datos);

        // console.log(datos)
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    getPaciente();
}, [id]);

// Asegúrate de verificar si 'paciente' es un array antes de usar 'map'
return (
    <div>
        <table>
            <tbody>
                {/* {
                // Array.isArray(paciente) && paciente.length > 0 ? (
                    
                    paciente.map((pacien, index) => (
                        <tr key={index}>
                            <td>{pacien.nombre}</td>
                        </tr>
                    ))
                // ) : (
                //     <tr>
                //         <td>No se encontraron datos del paciente.</td>
                //     </tr>
                // )
                } */}
            </tbody>
        </table>
    </div>
);




}




export default FichaClinica