import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo, fetchProtectedInfoAdmin, onLogout } from '../api/auth'
import Layout from '../components/layout'
import { unauthenticateUser } from '../redux/slices/authSlice'
import { Table } from 'reactstrap'
import { useUserRole } from '../redux/contextRol'
import LogoInicio from '../assets/LogoInicio.PNG'
import '../styles/dashboard.css'


// import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedData, setProtectedData] = useState(null)
  // const { userRole } = useUserRole();
  // const { userRole } = useUserRole();

  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
      localStorage.removeItem('token')
    } catch (error) {
      console.log(error.response)
    }
  }

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo()

      setProtectedData(data.info)

      setLoading(false)
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    protectedInfo()
  }, [])



  const [usuarios, setUsuarios] = useState([])
  const userRole = localStorage.getItem('userRole')
  const { isAuth } = useSelector((state) => state.auth)

  const [filteredUsuarios, setFilteredUsuarios] = useState([]);



  // useEffect(() => {
  //   // Realizar la solicitud GET a la URL
  //   fetch('https://randomuser.me/api/', {
  //     credentials: 'include'
  //   })
  //     .then(response => response.json()) // Convertir la respuesta a JSON
  //     .then(data => {
  //       const results = data.results; // Array de resultados
  //       setUsuarios(results); // Establecer los resultados en el estado
  //     })
  //     .catch(error => {
  //       console.error('Error al realizar la solicitud:', error);
  //     });
  // }, []);


 
//   // Realizar la solicitud GET a la URL
// fetch('https://randomuser.me/api/')
// .then(response => response.json()) // Convertir la respuesta a JSON
// .then(data => {
//   // Manejar los datos recibidos aquí
//   const results = data.results; // Array de resultados
//   // console.log(results)

//   // Puedes hacer lo que necesites con los datos
//   // Por ejemplo, recorrer el array de resultados y mostrar información
//   results.forEach(user => {
//     console.log('Nombre:', user.name.first, user.name.last);
//     console.log('Género:', user.gender);
//     console.log('Ubicación:', user.location.city, user.location.state, user.location.country);
//     // ... y así sucesivamente para los otros campos
//   });
// })
// .catch(error => {
//   console.error('Error al realizar la solicitud:', error);
// });



  return loading ? (
    <>
      <h1>Loading...</h1>
    </>
  ) : (
    <div id='containerDashboard'>
      <div className='contentDashboard'>
      <h1>BIENVENIDO</h1>
        <h2>CLÍNICA DENTAL IXMUKANÉ</h2>
        <div className="imgs">
          
          <img src={LogoInicio} alt='Logo' className='Logo'/>

        </div>


        {/* <h3>Tu rol es : {userRole}</h3> */}

        
        

        {/* <button onClick={() => logout()} className='btn btn-primary'>
          Logout
        </button> */}
      </div>
        
    </div>
  )
}

export default Dashboard






