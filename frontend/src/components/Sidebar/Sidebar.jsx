import "../../styles/side.css";
import Logo from "../../assets/LogoInicio.PNG"
import React, { useState } from "react";
import{ BrowserRouter , Route, Routes, Outlet, Navigate } from 'react-router-dom'
import Dashboard from "../../pages/dashboard";
import { useSelector, useDispatch } from "react-redux";
import { unauthenticateUser } from "../../redux/slices/authSlice";
import {Link} from 'react-router-dom'
import App from "../../App";
import{
  BsPersonVcardFill,
  BsFillCalendarDateFill,
  BsCashCoin,
  BsFillGearFill,
  BsPersonCircle
} from "react-icons/bs";

import{
  FaTooth,
  FaUserDoctor
} from "react-icons/fa6"

import {
  RiBarChartHorizontalFill,
  RiCalendar2Line,
  RiFirstAidKitFill
} from "react-icons/ri";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi/";


import {
  Sidebar,
  SubMenu,
  Menu,
  MenuItem
  //useProSidebar
} from "react-pro-sidebar";
import { Router } from "react-router-dom";
import { Button } from "reactstrap";
function Sidebars() {

  const dispatch = useDispatch()
  const userRole = localStorage.getItem('userRole');

    const {isAuth} = useSelector ((state) => state.auth)
  //const { collapseSidebar } = useProSidebar();
  const [collapsed, setCollapsed] = useState(false);

  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };


const onLogout = async () => {
        const response = await fetch('http://localhost:8000/api/logout', {
          method: 'GET',
          credentials: 'include',
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



  return (
    
    <>
    
    {isAuth ? (
<Sidebar

  className={`app ${toggled ? "toggled" : ""}`}
  style={{ height: "100%", position: "absolute", backgroundColor:"#114CA0"}}
  collapsed={collapsed}
  toggled={toggled}
  handleToggleSidebar={handleToggleSidebar}
  handleCollapsedChange={handleCollapsedChange}
>
<div className="contenedor d-flex flex-column justify-content-space-between vh-100">
  <main>
  <div className="cont-logo">
  <div id="LogoSidebar"> <img src={Logo} alt='LogoSide' className="LogoSide"/> </div></div>
    <Menu>
      
      {collapsed ? (
        <MenuItem
          icon={<FiChevronsRight />}
          onClick={handleCollapsedChange}
          
        ></MenuItem>
      ) : (
        <MenuItem
          suffix={<FiChevronsLeft />}
          onClick={handleCollapsedChange}
        >
          <div
            style={{
              padding: "9px",
              // textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px"
            }}
          >
          
          </div>
        </MenuItem>
      )}
    </Menu>

    <Menu className="texto">
    <Link to='/paciente' className="links"><MenuItem icon={<BsPersonVcardFill className="icono"/>}>
        Pacientes
      </MenuItem></Link>
      <SubMenu defaultOpen label={"Agenda/citas"}  icon={<BsFillCalendarDateFill className="icono"/> }>
      <Link to='/register' className="links"><MenuItem icon={<RiCalendar2Line />} >
          Agendar
        </MenuItem></Link>
        <MenuItem icon={<RiBarChartHorizontalFill/>}>Lista de citas </MenuItem>
      </SubMenu>
      <MenuItem defaultOpen label={"Pagos"} icon={<BsCashCoin className="icono"/>}>Pagos</MenuItem>
      <SubMenu defaultOpen label={"Administración"} icon={<BsFillGearFill className="icono"/>}>
      <Link to='/tipoTratamiento' className="links"><MenuItem icon={<FaTooth/>}>
        Tratamientos           
      </MenuItem></Link> 
      <Link to='/especialidades' className="links"><MenuItem icon={<RiFirstAidKitFill/>}>
            Especialidades
      </MenuItem></Link>
      <Link to='/doctores' className="links"><MenuItem icon={<FaUserDoctor/>}>
            Doctores
      </MenuItem></Link>
      </SubMenu>
      <Link to='/admin' className="links">
      <MenuItem icon={<BsPersonCircle className="icono"/>}>
        Usuarios
      </MenuItem></Link>
      <MenuItem icon={<BsPersonCircle className="icono"/>}>
      <Button onClick={() => logout()}></Button>
      </MenuItem>
    </Menu>
  </main></div>
</Sidebar>


    ): <></>}
    </>
  );
}
export default Sidebars;