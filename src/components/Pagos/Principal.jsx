import React, { useContext, useEffect } from 'react'
import { Accordion, Alert, Col, Container, Row } from 'react-bootstrap'
import avatar from '../../assets/userCorp.png';
import { PagosContext } from '../../context/PanelPagosProvider';
import ProcesarPagos from './ProcesarPagos';

const Principal = () => {

  const {Nombre, Estado}=useContext(PagosContext);
  const { Data, DatosCuenta,}=ProcesarPagos();

  useEffect(()=>{
    DatosCuenta();
  },[])
  // console.log(Data)
  return (
    <Container>
        <Row className='mt-4 Titulo'>
            <Col md={5}>
              <a href="/dashboard" className='btn'>
                <h2>
                  <i className="fa-solid fa-left-long"></i>
                </h2>
              </a>
            </Col>
            <Col>
              <h2>Perfil de Pagos</h2>
            </Col>
        </Row>
        <Row className='mt-5'>
          <Col md={4}>
          <img src={avatar} className='avatarPagos' />
          </Col>
          <Col className='campodetallespago'>
              <center>
            <Row className='mt-5'>
              <Col>Nombre:</Col>
              <Col>{Nombre}</Col>
            </Row>
            <Row className='mt-3'>
              <Col>Balance:</Col>
              <Col>${Data&&Data.Balance}</Col>
            </Row>
            <Row className='mt-3'>
              <Col>Cuenta a transferir:</Col>
              <Col>{Data&&Data.Cuenta}</Col>
            </Row>
            <Row className='mt-3'>
              <Col>Estado del perfil:</Col>
              <Col>{Data&&Data.Estado}</Col>
            </Row>
              </center>
          </Col>
        </Row>

     <Container>
          <center>
              <Col className="mt-4">
                {
                  Estado=='Incompleto'?(
                    <Alert variant='danger'>
                      Completa tu perfil de socio para poder recibir pagos
                    </Alert>
                  ):(
                    <Alert variant='primary'>
                      Tu cuenta esta complet!! ya puedes empezar a cobrar por este medio
                    </Alert>
                  )
                }
              </Col>
          </center>
      <Container>
            <Row>
                <Col md={4}></Col>
                <Col md={4}>
                <Accordion variant="outline-primary">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <i className="fa-solid fa-clock-rotate-left"></i>
                            Actualizar datos
                        </Accordion.Header>
                        <Accordion.Body>
                        <div>
                            Para actualizar tus datos es nesesario envies un
                        </div>
                        <div>
                            Correoelectronico con el asunto "alta socio" a
                            soporte@t-tland.com con los siguientes documentos:
                        </div>
                        <ul>
                            <li>Identificacion oficial</li>
                            <li>Comprobante de domicilio</li>
                            <li>RFC</li>
                            <li>Nombre, domicilio, pagina web,
                                telefono del negocio que estas registrando.
                            </li>
                            <li>Estado de cuenta a depositar</li>
                        </ul>
                        <center>
                            <a href="mailto:soporte@t-tland.com?Subject=alta%20socio"
                            className="btn btn-outline-primary">Enviar por correo</a>
                        </center>
                        
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                </Col>
                <Col md={4}></Col>
            </Row>
        </Container>
      </Container>
    </Container>
    
  )
}

export default Principal