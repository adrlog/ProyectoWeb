import React, { useContext } from 'react'
import { PubsContext } from '../../context/PanelPubsProvider'
import { Col, Container, Row } from 'react-bootstrap';
import user from '../../assets/defaultuser.jpg';

const AsidePubs = () => {

  const {Detalles}=useContext(PubsContext);


  return (
    
    <Container className="HeaderPublicaciones2 mt-3 targetSolicitudes">
            <Row className="mt-1 pb-1 pt-1 m-1">
              <img
                src={Detalles&&Detalles.image?Detalles.image:user}
                alt=""
                className="rounded-circle p-0 me-1 ms-1 contenedorImgAmigosAside"
              />
              <Col xs={8}>
                <p className="mb-0 fw-bold">
                  {Detalles.Titulo}
                </p>
                <p className="mb-0 fw-light">{Detalles.Vistafecha}</p>
              </Col>
            </Row>
            <Row className=" pb-1 pt-1 m-1">
              <p className="w-100 fw-light">
                {Detalles.descripcion}
              </p>

              <Col xs={7}>
                <p className=" mb-0">
                  Presupuesto: $
                  {Detalles.Presupuesto}
                </p>
              </Col>
            </Row>

            <Row className=" pb-1 pt-1 m-1">
              <center>
              <Col>Postulados</Col>
              </center>
            </Row>
          </Container>
  
  )
}

export default AsidePubs