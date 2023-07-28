import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import user from '../../assets/defaultuser.jpg';

const PanelWorks = () => {
  return (
    
    <>
    <Row>
      <Col className='AsideWorks'
      md={2}>
        <Container>
          <Row>
            <Col>
              <img src={user}  className='imagenPanle'/>
            </Col>
            <center className='mt-3'>
            <Col md={12}>Nombre</Col>
            <Col md={12}>carrera</Col>
            <Col md={12}>escuela</Col>
            <Col md={12}>ciclo escolar</Col>
            <Col md={12}>
              Si tienes la misma carrera esres compatible
              si tienes alguna carrera similar eres medio compatible
            </Col>
            </center>
          </Row>
        </Container>
      </Col>
      <Col md={10} className='mt-2'>
        <Row>
          <Col>
            <a className='btn regresarPanel'
            href='/dashboard'>Regresar</a>
          </Col>
          <Col>
            <center>
            <div className='fechaPanel'>24/07/2013</div>
            </center>
          </Col>
        </Row>
        <Container className='mt-3'>
        <Row className='fondoPanel'>
          <Col md={3} className='mt-2 mb-2'>
          <img src={user} className='imgPanelDescripcion'/>
          </Col>
          <Col className='mt-5' md={8}>
          <Row>
            <Col>
            <h3>Nombre de quien solicita</h3>
            </Col>
          </Row>
          <Row>
            <Col>
            <h1>Titulo</h1>
            </Col>
          </Row>
          </Col>
        </Row>
        </Container>
        <Container className='mt-3'>
          <Row className='fondoPanel'>
            <Col>Descripcion Completa</Col>
          </Row>
        </Container>
      </Col>
    </Row>
    </>
  )
}

export default PanelWorks