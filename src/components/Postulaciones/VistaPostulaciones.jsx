import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Procesamiento from '../Publicaciones.jsx/Procesamiento'
import { logout } from "../../config/firebase"
import user from '../../assets/defaultuser.jpg'


const VistaPostulaciones = () => {

    const { Perfil, UserInf,} = Procesamiento();

    useEffect(()=>{
        Perfil();
    },[])

  return (
<>
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
      {
        UserInf&&(

      <Row>
        <Col md={3}>
        <img src={UserInf.imagen?UserInf.imagen:user} className='imagenHeaderPerfil' />
        </Col>
        <Col className='mt-5' md={4}>
        <Row>
          <Col className='titulosHeaderPublic'>
          <h4>{UserInf.nombre} </h4>
          </Col>
        </Row>
        <Row>
          <Col className='titulosHeaderPublic mt-3'>
          <h4>{UserInf.grupo} </h4>
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
            <li><h4>{UserInf.escuela} </h4></li>
            <li><h4>{UserInf.carrera}</h4></li>
          </center>
        </ul>
        </Col>
        </Row>
        </Col>
      </Row>
        )
      }
    </div>
    <Container>
        <Row>
            <Col className='bg-dark mt-3'>jola</Col>
        </Row>
    </Container>
</>
  )
}

export default VistaPostulaciones