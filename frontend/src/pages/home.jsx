//rfc: PARA CREAR ESTRUCTURA
import React from 'react'
// import { Layout } from '../components/Layout'
import Layout from '../components/layout'
import logo from '../assets/react.svg'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
// import "./app.css"
// import './App.css'
// import './App.css'
import '../styles/App.css'

const Home = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      {/* <Layout>Home</Layout> */}

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div
              className="card p-5"
              style={{
                borderRadius: '15%',
                border: '2px solid black',
                // height: '400px', // Agregar esta línea
                height: "130%",
                display: 'flex', // Agregar esta línea
                alignItems: 'center', // Agregar esta línea
                justifyContent: 'center', // Agregar esta línea
                textAlign: 'center',
              }}
            >
              <div className="logo"></div>

              {/* <h3 className="text-center">Iniciar sesión</h3> */}
              <Form>
                <FormGroup>
                  <Label for="text">Usuario</Label>
                  <Input
                    type="text"
                    name="users"
                    id="users"
                    placeholder="Usuario"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Contraseña</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Contraseña"
                  />
                </FormGroup>
                <Button
                  color="#615e5"
                  block
                  style={{
                    background: '#ffdab9',
                    // color: "#615E5"
                  }}
                >
                  Iniciar Sesión
                </Button>
              </Form>
            </div>
            <p
              style={{
                // Agregar este elemento
                fontSize: '12px',
                color: 'gray',
                marginTop: '10px',
                textAlign: "center"
              }}
            >
              © {currentYear} Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
