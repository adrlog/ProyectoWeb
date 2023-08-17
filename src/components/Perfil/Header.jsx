import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { logout } from "../../config/firebase"

const Header = () => {
  return (
    <>
    <div className='HeaderPublic'>
      <Row>
        <Col md={3}></Col>
        <Col md={1}>
        <Button variant="outline-light" 
        href='/dashboard'
        style={{border:'none'}}>
          Inicio
        </Button>
        </Col>
        <Col md={1}>
        <Button variant="outline-light" 
        href='/dashboard/pagos'
        style={{border:'none'}}>
          Pagos
        </Button>
        </Col>
        <Col md={2}>
        <Button variant="outline-light" 
        href='/dashboard/postulaciones'
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
        href='/dashboard/perfil'
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
    </div>
    </>
  )
}

export default Header