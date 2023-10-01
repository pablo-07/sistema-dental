import React, {useState, useEffect} from 'react'
// import { Layout } from '../components/Layout'
// import { Layout } from '../components/layout'
import Layout from '../components/layout'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { InputGroup, InputGroupText, Form, Label, Input, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { onRegistration } from '../api/auth'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import '../styles/register.css'

const Register = (props) => {

  const {actualizar} = props
    const [modalopen, setModalOpen] = useState(false)
    const toogle =() => setModalOpen(!modalopen)


  const [loading, setLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false);
  // const [isValid, setIsValid] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };




  const [values, setValues] = useState({
    users: '',
    password: '',
    rol: '',
  })
  const tooggle = () => {
    setValues(!values  )
}

const [error, setError] = useState(false);
const [success, setSuccess] = useState(false);
const onChange = (e) => {
  const newPassword = e.target.value;
  setValues({ ...values, [e.target.name]: newPassword})
  // setIsValid(newPassword.length >= 9 && newPassword.length <= 15);
}

const isValidUs = 
// /[A-Z]/.test(values.users) && // al menos una mayúscula
/[a-z]/.test(values.users) && // al menos una minúscula
/\d/.test(values.users); // al menos un dígito numérico

const UsuValidacion = 'El nombre de usuario debe tener'
+' letras y numeros'


const isValidPass = 
values.password.length >= 6 &&
values.password.length <= 15 &&
/[A-Z]/.test(values.password) && // al menos una mayúscula
/[a-z]/.test(values.password) && // al menos una minúscula
/\d/.test(values.password); // al menos un dígito numérico

const PassValidacion = 'La contraseña debe tener entre 9 y 15 caracteres'
+' y contener al menos una letra mayúscula, una letra minúscula '
+'y un dígito numérico'


// const onSubmit = async (e) => {
//   e.preventDefault()

//   try {
//     const {data} = await onRegistration(values);
//     setError('')
//     setSuccess(data.message)
//     setValues({users: '', password: '', rol: '',})
    
//   } catch (error) {
//     console.log(error.response.data.errors[0].msg);
//     setError(error.response.data.errors[0].msg)
//     setSuccess('') 
//   }
// }

const onSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify(values)
    })

    const data = await res.json()
    if (res.ok) {
      setError('')
      setSuccess(data.message)
      setValues({users: '', password: '', rol: '',})

      setLoading(false)
      
    }
   else {
    setError(data.error)
    setSuccess('')
   }
   toogle()
   actualizar()
    
  } catch (error) {
    console.log(error)
    
  }

}


  return (
    <>        <Button color='success' onClick={toogle}>Registrar nuevo usario</Button>
      <div className="container">
      <Modal isOpen={modalopen} toggle={toogle}>
                    <ModalHeader toggle={toogle}>
                        Nuevo Usuario
                    </ModalHeader>
                    <ModalBody>


      <Form onSubmit={(e) => onSubmit(e)} >
        <div className='user'> 
          <Label htmlFor="user" className='form-label'>
            User Name
          </Label>
          <InputGroup>
          <Input
          onChange={(e) => onChange(e)}
          type='text'
          className='form-control'
          id='users'
          name='users'
          value={values.users}
          placeholder='example123'
          valid={isValidUs}
          // invalid={values.password && !isValid}
          invalid={!!(values.users && !isValidUs)} // Aquí usamos !! para convertir a booleano
          required
          />

        {values.users && !isValidUs && (
          <div className="invalid-feedback">
            {UsuValidacion}
          </div>
        )}

          </InputGroup>       
        </div>

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
          <div className='pass'>
      <Label htmlFor="password" className="form-label">
        Password
      </Label>
      <InputGroup>
        <Input
          onChange={(e) => onChange(e)}
          // type='password'
          type={showPassword ? 'text' : 'password'}
          value={values.password}
          className='form-control'
          id='password'
          name='password'
          placeholder='password'
          valid={isValidPass}
          // invalid={values.password && !isValid}
          invalid={!!(values.password && !isValidPass)} // Aquí usamos !! para convertir a booleano
          required
        />
        {values.password && !isValidPass && (
          <div className="invalid-feedback">
            {PassValidacion}
          </div>
        )}

        <div className="input-group-append">
          
          <Button
            onClick={handleTogglePassword}
            style={{ cursor: 'pointer' }}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye/>}
          </Button>
  
        </div>
      </InputGroup>
    </div>

          <div className="mb-3">
          
          <Label htmlFor='rol' className='form-label'>
            Rol
          </Label>
          <Input
            bsSize="sm"
            className="mb-3"
            type="select"
            id='rol'
            name='rol'
            value={values.rol} 
            onChange={(e) => onChange(e)}
          >
            <option>Small Select</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Input>
          </div>
          <div style={{color:'red', margin:'10px 0'}}>{error}</div>
          <div style={{color:'green', margin:'10px 0'}}>{success}</div>
      
      </Form>
      </ModalBody>
                    <ModalFooter>
                        <Button onClick={toogle} color='danger'>Cancelar</Button>
                        <Button onClick={onSubmit} type='submit' color='primary' disabled={!isValidPass || !isValidUs}>
          Registrar
        </Button>                    </ModalFooter>
                </Modal>

      </div>
    </>
    
  )
}


export default Register
