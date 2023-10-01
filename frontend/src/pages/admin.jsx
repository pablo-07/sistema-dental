import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../pages/register'
import Register from '../pages/register'
// import {
//   fetchProtectedInfo,
//   fetchProtectedInfoAdmin,
//   onLogout,
// } from '../api/auth'
// import Layout from '../components/layout'
import { Container, Table, Button, Modal, ModalBody} from 'reactstrap'
import SearchInput from '../components/Search/InputSearch'
// import TableUsers from '../components/Users/GeneralTable'
import Pagination from '../components/Paginacion'
import TableUsers from '../components/Users/GeneralTable'
import '../styles/admin.css'
// import TablaDinamica from '../components/Users/TablaDianmica'
// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';

const pageSize = 5;
const Admin = () => {
  // const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  const [usuarios, setUsuarios] = useState([])
  const userRole = localStorage.getItem('userRole')
  const { isAuth } = useSelector((state) => state.auth)

  const [filteredUsuarios, setFilteredUsuarios] = useState([])

  /***  INICIO BUSCADOR **** * */
  const handleSearch = (searchTerm) => {
    if (searchTerm === null) {
      setFilteredUsuarios(usuarios)
    } else {
      const filtered = usuarios.filter(
        (usuario) =>
          usuario.users.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usuario.rol.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredUsuarios(filtered)
    }
  }
  /***  FIN BUSCADOR **** * */

  useEffect(() => {
    setLoading(true)
    if (isAuth && userRole === 'admin') {
      const fetchUsuarios = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/get-users', {
            credentials: 'include',
          })
          const data = await response.json()
          setUsuarios(data.users)
          setFilteredUsuarios(data.users)
          setLoading(false)
        } catch (error) {
          console.error(error)
        }
      }

      fetchUsuarios()
    }
  }, [isAuth, userRole])


  const [currentPage, setCurrentPage] = useState(1)

  

  // Lógica de paginación
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredUsuarios.length / itemsPerPage)
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const visibleUsuarios = filteredUsuarios.slice(startIndex, endIndex)


  


  const handleToggleStatus = async (userId, status, index) => {
    try {
      // setUpdatingIndex(index); // Indicar que se está actualizando este usuario

      const response = await fetch(`http://localhost:8000/api/users/${userId}/controlestado`, {
        method: 'PATCH',
        credentials: 'include'
      });

      if (response.ok) {
        // Actualizar el estado local
        const updatedUsuarios = [...filteredUsuarios];
        updatedUsuarios[startIndex + index].status = !status; // Cambiar el estado localmente
        setFilteredUsuarios(updatedUsuarios);

        // const newData = [...filteredUsuarios];
        // newData[startIndex + index].status = !currentStatus;
        // setFilteredUsuarios(newData);

        // Restablecer el índice de actualización
        // setUpdatingIndex(null);
      } else {
        console.error('Error updating status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };



  return loading ? (
    <>
      <h1>No tienes acceso, has violado las configuraciones</h1>
    </>
  ) : (
    <div > 

      <div className='contentUsuarios'>
        <h1 id='titulous'>Usuarios</h1>
        <div className="ModalAgregar">
         <Register/>
         </div>
        {/* <h2>{protectedData}</h2> */}
        {/* <Table striped>
          <thead>
           
            <th>Rol</th>
            <th>Usuario</th>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>{index +1 }</td>
                <td>{usuario.users}</td>
                <td>{usuario.rol}</td>

              </tr>
            ))

            }
          </tbody>


        </Table> */}
        {isAuth && userRole === 'admin' ? (
          <div>
            

            {/* BUSCADOR INICIO */}
            <SearchInput onSearch={handleSearch} />
            {/* BUSCADOR FIN  */}

            {/* <Table>
              <thead>
                <tr>
                <th>No.</th>
                  <th>Usuario</th>
                  <th>Rol</th>
                  <th>Fecha de creacion</th>
                  <th>Fecha de actualizacion</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {visibleUsuarios.map((usuario, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{usuario.users}</td>
                    <td>{usuario.rol}</td>
                    <td>{usuario.createdAt}</td>
                    <td>{usuario.updatedAt}</td>
                    <td>
                      <p
                        style={{
                          color: usuario.status ? 'white' : 'white',
                          borderRadius: '10px',
                          // border: "1px solid",
                          textAlign: 'center',
                          background: usuario.status ? 'green' : 'red',
                        }}
                      >
                        {usuario.status ? 'Activo' : 'Inactivo'}
                      </p>
                    </td>
                    <td>
                      <i>Borrar</i> <i>Editar</i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table> */}

            <div id='tablaUs'>
            <TableUsers
              data={visibleUsuarios}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              status={(userId, status, index) => handleToggleStatus(userId, status, index)}

            /></div>
            {/* Agrega la paginación aquí */}
            {/* <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            /> */}
             {Array.from({ length: Math.ceil(filteredUsuarios.length / pageSize) }).map((_, index) => (
          <Button key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </Button>
        ))}

            {/* <TableUsers updateDate={filteredUsuarios}/> */}

            {/* <TablaDinamica
        url="https://randomuser.me/api/"
        columnas={["nombre", "telefono", "estado"]}
        nombres={["Nombre", "Teléfono", "Estado"]}
      /> */}
          </div>
        ) : (
          <p>No tienes permiso para acceder a esta página.</p>
        )}

        {/* <button onClick={() => logout()} className='btn btn-primary'>
          Logout
        </button> */}</div>
    </div>
  )
}

export default Admin
