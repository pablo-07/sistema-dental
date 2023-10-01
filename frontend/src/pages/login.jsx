// import { onLogin } from '../api/auth'
import Layout from '../components/layout'
import React, { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import { authenticateUser, unauthenticateUser } from '../redux/slices/authSlice'
import axios from 'axios'
import {
  Button,
  Label,
  Input,
  Form,
  InputGroup,
  FormFeedback,
} from 'reactstrap'
import { onLogout } from '../api/auth'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useUserRole } from '../redux/contextRol'
import Logo from '../assets/Logo.PNG'


import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';


// import { useDispatch } from 'react-redux'
// import { authenticateUser } from '../redux/slices/authSlice'

// const Login = () => {
//   const [values, setValues] = useState({
//     users: '',
//     password: '',
//   })
//   const [error, setError] = useState(false)

//   const onChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value })
//   }

//   const dispatch = useDispatch()
//   const onSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       await onLogin(values)
//       dispatch(authenticateUser())

//       localStorage.setItem('isAuth', 'true')
//     } catch (error) {
//       console.log(error.response.data.errors[0].msg)
//       setError(error.response.data.errors[0].msg)
//     }
//   }

//   return (
//     <Layout>
//       <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>
//         <h1>Login</h1>

//         <div className='mb-3'>
//           <label htmlFor='email' className='form-label'>
//             User
//           </label>
//           <input
//             onChange={(e) => onChange(e)}
//             type='text'
//             className='form-control'
//             id='users'
//             name='users'
//             value={values.users}
//             placeholder='User'
//             required
//           />
//         </div>

//         <div className='mb-3'>
//           <label htmlFor='password' className='form-label'>
//             Password
//           </label>
//           <input
//             onChange={(e) => onChange(e)}
//             type='password'
//             value={values.password}
//             className='form-control'
//             id='password'
//             name='password'
//             placeholder='passwod'
//             required
//           />
//         </div>

//         <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

//         <button type='submit' className='btn btn-primary'>
//           Submit
//         </button>
//       </form>
//     </Layout>
//   )
// }

// export default Login

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  // const { setUserRole } = useUserRole();

  const [values, setValues] = useState({
    users: '',
    password: '',
  })
  const [error, setError] = useState('')

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()

  // const onSubmit = async (e) => {
  //   e.preventDefault()

  //   try {
  //     const response = await axios.post(
  //       'http://localhost:8000/api/login',
  //       values,
  //     )
  //     if (response.status !== 200) {
  //       // setError('Error al iniciar sesión1');
  //       setError(error.response.data.errors[0].msg)
  //       return
  //     }
  //     dispatch(authenticateUser())

  //     // Guardar la cookie recibida en local storage o en un estado si lo prefieres
  //     // Aquí utilizo localStorage como ejemplo:
  //     // localStorage.setItem('token', response.data.token);
  //     localStorage.setItem('userRole', response.data.rol)
  //     // localStorage.setItem('userRole', data.role);
  //     // Almacena el token en una cookie segura con HttpOnly
  //     document.cookie = `token=${response.data.token}; secure; httpOnly`

  //     // Guarda el rol en el estado del contexto
  //     // setUserRole(response.data.rol);

  //     // También puedes almacenar otros datos necesarios en cookies
  //     // document.cookie = `userRole=${response.data.role}; secure`;
  //     // setUserRole(response.data.role);

  //     localStorage.setItem('isAuth', 'true')
  //   } catch (error) {
  //     console.log(error.message)
  //     // setError('Error al iniciar sesión');
  //     setError(error.response.data.errors[0].msg)
  //   }
  // }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      const data = await response.json()

      if (response.status !== 200) {
        // setError('');
        // setError(error.response.error[0].msg)
        setError(data.errors[0].msg);
        return;
      }
      // const data = await response.json();
      dispatch(authenticateUser());


      localStorage.setItem('userRole', data.rol);
      localStorage.setItem('name', data.user);
      // Almacena el token en una cookie segura con HttpOnly
      // document.cookie = `token=${data.token}; secure; httpOnly`;
      document.cookie = `token=${data.token}`;

      localStorage.setItem('isAuth', 'true')
    } catch (error) {
      console.log(error.message);
      // setError('Error al iniciar sesión');
      // setError(error.response.error[0].msg)
      // setError(error.response.data1.errors[0].msg);

      setError('Error del servidor al iniciar sesión');


    }
  };


  const { isAuth } = useSelector((state) => state.auth)
  const [tokenExpiration, setTokenExpiration] = useState(null) // Estado para almacenar tokenExpiration

  // Función para cerrar sesión
  const logout = () => {
    dispatch(unauthenticateUser())
    localStorage.removeItem('token') // Elimina el token almacenado
    // Puedes realizar otras limpiezas o redireccionar a la página de inicio
  }

  useEffect(() => {
    if (isAuth) {
      const fetchTokenExpiration = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            // Resto de las opciones de la solicitud
          })

          if (response.ok) {
            const data = await response.json()
            const tokenExpirationFromBackend = data.tokenExpiration

            // Convierte la cadena de fecha en un objeto Date
            const tokenExpirationDate = new Date(tokenExpirationFromBackend)
            console.log(tokenExpirationDate)
            //localStorage.setItem('dia', tokenExpirationDate);

            // Establece la fecha de expiración en el estado
            setTokenExpiration(tokenExpirationDate)
          } else {
            // Maneja el error de la solicitud si es necesario
            console.error('Error en la solicitud')
          }
        } catch (error) {
          console.error('Error en la solicitud', error)
        }
      }

      fetchTokenExpiration()
    }
  }, [isAuth])

  // useEffect(() => {
  //   if (isAuth && tokenExpiration) {
  //     // Calcula la diferencia en milisegundos entre la hora actual y la fecha de expiración
  //     const currentTime = new Date().getTime();
  //     const expirationTime = tokenExpiration.getTime();
  //     const timeDifference = expirationTime - currentTime;
  //     console.log(tokenExpiration)

  //     // Si el tiempo de diferencia es menor o igual a 0, cierra la sesión
  //     if (timeDifference <= 0) {
  //       logout();
  //     }
  //   }
  // }, [isAuth, tokenExpiration]);




  return (
    <>
    
    <MDBCard >
        <MDBRow className='g-0'>

        <MDBCol md='6' id='fondo'>
                  <img src={Logo} id='profile' alt='logo' className='rounded-start w-100'/>
                  </MDBCol>

                  <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column' style={{padding:"50px"}}>


            <div className='d-flex flex-row mt-5'>
                <span className="h1 fw-bold mb-0">Bienvenido</span>
              </div>
              

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Ingreso de usuario</h5>

                    <Form onSubmit={(e) => onSubmit(e)}>
                    <MDBInput wrapperClass='mb-4' label='Nombre de usuario' type="text" id="users" name="users" size='lg'
                      value={values.users}
                      onChange={(e) => onChange(e)}
                  />
                  
                  <div>


                    <InputGroup>
                    <MDBInput wrapperClass='mb-1' label='Contraseña'
                        // type="password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        size='lg'
                        value={values.password}
                        onChange={(e) => onChange(e)}
                      />

                      <div>
                        <Button color='tertiary'
                          onClick={handleTogglePassword}
                          style={{ cursor: 'pointer', height: "45px", marginLeft:"10px" }}
                        >
                          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                          </Button>
                      </div>
                    </InputGroup>
                  </div>
                  {error && <div style={{ color: 'red' }}>{error}</div>}
                  {/* {error && <div ><Input invalid value={error} /><FormFeedback valid>{error}</FormFeedback></div>} */}
                  {/* El botón se muestra solo si los dos input tienen algún valor */}
                  {values.users && values.password && (
                    <div id="boton" style={{marginLeft:"20px"}}>
                      <MDBBtn className="mb-4 px-5 btn btn-primary"  type="submit" id='btn-enviar' style={{height:"45px", width:"100%"}}>Ingresar</MDBBtn>

                    </div>
                  )}
                  {/* <div>
                  <Button type="submit">Login</Button>
                  </div> */}
                  </Form>

                

                  </MDBCardBody>
          </MDBCol></MDBRow>
      </MDBCard>

    </>
  )
}

export default Login
