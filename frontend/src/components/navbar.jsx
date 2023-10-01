// rafc: para crear estrucuta de constante
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onLogout } from '../api/auth';
import { unauthenticateUser } from '../redux/slices/authSlice'
import { useUserRole } from '../redux/contextRol';
// import jwt from 'jsonwebtoken'; // Importa la librería para decodificar el token
// import { jwt } from "react-jwt";
// import { NavLink } from 'react-router-dom'
import { Col, Nav, NavItem, NavLink } from 'reactstrap';




const Navba = () => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const userRole = localStorage.getItem('userRole');
    // const { userRole } = useUserRole();
    const { isAuth } = useSelector((state) => state.auth)
    // const [tokenExpiration, setTokenExpiration] = useState(0);

      // Función para cerrar sesión
//   const logoutAuto = () => {
//     dispatch(unauthenticateUser());
//     localStorage.removeItem('isAuth')
//     localStorage.removeItem('token')
//     localStorage.removeItem('userRole')
//   };

//   useEffect(() => {
//     if (isAuth) {
//       // Decodifica el token y obtén su fecha de expiración
//       const token = localStorage.getItem('token');
//       if (token) {
//         const decodedToken = jwt.decode(token);
//         const expirationTime = decodedToken.exp * 1000; // Convierte a milisegundos

//         // Calcula el tiempo restante de expiración del token
//         const currentTime = new Date().getTime();
//         const remainingTime = expirationTime - currentTime;

//         // Establece el tiempo restante de expiración
//         setTokenExpiration(remainingTime);

//         // Configura el temporizador para cerrar sesión cuando el token expire
//         const logoutTimer = setTimeout(() => {
//           logoutAuto();
//         }, remainingTime);

//         // Limpia el temporizador cuando el componente se desmonte o cuando el token se renueve
//         return () => clearTimeout(logoutTimer);
//       }
//     }
//   }, [isAuth]);


    // const logout = async () => {
    //     try {
    //       await onLogout()
    
    //       dispatch(unauthenticateUser())
    //       localStorage.removeItem('isAuth')
    //       localStorage.removeItem('userRole')

    //     } catch (error) {
    //       console.log(error.response)
    //     }
      // }

      const onLogout = async () => {
        const response = await fetch('http://localhost:8000/api/logout', {
          method: 'GET',
          // credentials: 'include', // Incluir las cookies en la solicitud
        });
    
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error during logout');
        }
      };
    
      const logout = async () => {
        try {
          await onLogout();
    
          dispatch(unauthenticateUser());
          localStorage.removeItem('isAuth');
          localStorage.removeItem('userRole');
        } catch (error) {
          console.log(error.message);
        }
      };

//   const toggle = () => setIsOpen(!isOpen);

  return (
    // <nav className='navbar navbar-light bg-light'>
    //   <div className='container'>
    //     <div>
    //       <NavLink to='/'>
    //         <span className='navbar-brand mb-0 h1'>Home</span>
    //       </NavLink>
    //     </div>

    //     {isAuth ? (
    //       <div>
    //         <NavLink to='/dashboard' className='mx-3'>
    //           <span>Dashboard</span>
    //         </NavLink>
    //       </div>
    //     ) : (
    //       <div >
    //         <NavLink to='/login' >
    //           <span>Login</span>
    //         </NavLink>

    //         <NavLink to='/register' >
    //           <span>Register</span>
    //         </NavLink>
    //       </div>
    //     )}
    //   </div>
    // </nav>

    <div>
            <Navbar color="primary" light expand='md'>
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
                    
                        
                    
                </Collapse>
            </Navbar>
            <Col md={3} className="bg-light">
      
    </Col>
    </div>

  )
}

export default Navba; 
