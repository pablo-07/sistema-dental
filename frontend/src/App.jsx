import { useState } from 'react'
// import './App.css'


import{ BrowserRouter , Route, Routes, Outlet, Navigate } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Register from './pages/register'
import Login from './pages/login'
import Especialidades from './pages/especialidades'
import Doctores from './pages/doctores'
import TipoTratamiento from './pages/tipoTratamiento'
import Paciente from './pages/paciente'
import FichaClinica from './pages/fichaClinica'
import Pagos from './pages/pagos'
import Home from './pages/home'
import Navba from './components/navbar'
import Sidebars from './components/Sidebar/Sidebar'


// import { Navba } from './components/navbar'
import { useSelector } from 'react-redux'
import Admin from './pages/admin'
import { Nav } from 'reactstrap'


const userRole = localStorage.getItem('userRole');

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}


const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/dashboard' />}</>
}

const AdminRouteGuard = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth)

  if (isAuth && userRole === 'admin') {
    return children; // Muestra el contenido del componente si es un administrador
  } else {
    return <Navigate to='/dashboard' />; // Redirige a /dashboard si no es un administrador
  }
}


const App = () => {
  
  return (

    <div>


    <BrowserRouter >
    <Sidebars/>
      <Routes>
      {/*<Route path='/' element={ <Home />}/>*/}

        <Route element={<PrivateRoutes/>}>
          <Route path='/dashboard' element={ <Dashboard />}/>
          {/* <Route path='/admin' element={ <Admin />}/> */}
          <Route path='/admin' element={<AdminRouteGuard><Admin /></AdminRouteGuard>} />
          <Route path='/register' element={ <AdminRouteGuard> <Register /> </AdminRouteGuard>}/>
          <Route path='/especialidades' element={ <Especialidades />}/>
          <Route path='/doctores' element={ <Doctores />}/>
          <Route path= '/tipoTratamiento' element={<TipoTratamiento/>} />
          <Route path='/paciente' element={<Paciente/>}/>
          <Route path='/fichaClinica/:id' element={<FichaClinica/>}/>

        </Route>
        
        <Route element={<RestrictedRoutes/>}>
          <Route path='/' element={ <Login />}/>
          <Route path='/login' element={<Login />}></Route>
          </Route>
   
      </Routes>
    
    </BrowserRouter>
    </div>
  )

}

export default App
