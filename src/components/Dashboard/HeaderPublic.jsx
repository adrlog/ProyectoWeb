import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { logout } from "../../config/firebase"
import user from '../../assets/defaultuser.jpg'

const HeaderPublic = () => {

  return (
    <div className='HeaderPublic'>
      <Row>
        <Col md={3}></Col>
        <Col md={1}>
        <Button variant="outline-light" 
        href='/dashboard/publicaciones'
        style={{border:'none'}}>
          Inicio
        </Button>
        </Col>
        <Col md={1}>
        <Button variant="outline-light" 
        href='/dashboard/publicaciones'
        style={{border:'none'}}>
          Pagos
        </Button>
        </Col>
        <Col md={2}>
        <Button variant="outline-light" 
        href='/dashboard/publicaciones'
        style={{border:'none'}}>
          Mis postulaciones
        </Button></Col>
        <Col md={2}>
        <Button variant="outline-light" 
        href='/dashboard/publicaciones'
        style={{border:'none'}}>
          Mis publicaciones
        </Button>
        </Col>
        <Col md={1}>
        <Button variant="outline-light" 
        href='/dashboard/publicaciones'
        style={{border:'none'}}>
          Perfil
        </Button>
        </Col>
        <Col>
        <Button variant="outline-light" 
        onClick={logout}
        style={{border:'none'}}>
          Cerrar sesion
        </Button>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
        <img src={user} className='imagenHeaderPerfil' />
        </Col>
        <Col className='mt-5' md={4}>
        <Row>
          <Col className='titulosHeaderPublic'>
          <h4>Nombre de quien publico</h4>
          </Col>
        </Row>
        <Row>
        <Col className='titulosHeaderPublic mt-3'>
        <h1>Departamento/Materia</h1>
        </Col>
        </Row>
        </Col>
        <Col md={1}></Col>
        <Col>
        <Row>
        <Col md={10}
        className='titulosHeaderPublic mt-5'>
        <ul>
          <center>
            <li><h4>Institucion</h4></li>
            <li><h4>Carrera</h4></li>
            <li><h4>Tipo</h4></li>
          </center>
        </ul>
        </Col>
        </Row>
        </Col>
      </Row>
    </div>
  )
}

export default HeaderPublic