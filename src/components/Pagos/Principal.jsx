import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import avatar from '../../assets/userCorp.png';

const Principal = () => {
  return (
    <Container>
        <Row className='mt-4 Titulo'>
            <Col md={5}><h2>
                <i className="fa-solid fa-left-long"></i>
                </h2>
            </Col>
            <Col><h2>Perfil de Pagos</h2></Col>
        </Row>
        <Row className='mt-5'>
          <Col md={4}>
          <img src={avatar} className='avatarPagos' />
          </Col>
          <Col className='campodetallespago'>
              <center>
            <Row className='mt-5'>
              <Col>Nombre:</Col>
              <Col>Arnol</Col>
            </Row>
            <Row className='mt-3'>
              <Col>Balance:</Col>
              <Col>$0.0</Col>
            </Row>
            <Row className='mt-3'>
              <Col>Cuenta a transferir:</Col>
              <Col>**** **** **** 7320</Col>
            </Row>
            <Row className='mt-3'>
              <Col>Estado del perfil:</Col>
              <Col>Incompleto</Col>
            </Row>
              </center>
          </Col>
        </Row>
    </Container>
  )
}

export default Principal