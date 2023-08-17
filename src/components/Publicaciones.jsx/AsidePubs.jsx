import React, { useContext, useState } from 'react'
import { PubsContext } from '../../context/PanelPubsProvider'
import { Button, ButtonGroup, Col, Container, Modal, Row } from 'react-bootstrap';
import user from '../../assets/defaultuser.jpg';

const AsidePubs = () => {

  const {Detalles, setFunsion, Vista, setVista, setforaneo}=useContext(PubsContext);
  const [modalShow, setModalShow] = useState(false);
  const [Tarjet, setTarjet] = useState(false);
  const [Pubs, setPubs] = useState(false);


  const accion=(us, action)=>{
    setFunsion([us, action, Pubs]);
  }

  function MyVerticallyCenteredModal(props) {

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='tarjetmodal'
      >
        <Modal.Header closeButton className='HedreModal'>
          <Modal.Title id="contained-modal-title-vcenter">
            <Row>
              <Col md={5}> 
                <img src={Tarjet.imagen?Tarjet.imagen:user} className='imgMuroPerfil' />
              </Col>
              <Col>
              <Row>
                <Col md={12}>{Tarjet.nombre}</Col>
                <Col>{Tarjet.mensaje?Tarjet.mensaje:''}</Col>
              </Row>
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>Carrera: {Tarjet.carrera}</Col>
            <Col md={6}>Escuela: {Tarjet.escuela}</Col>
            <Col md={6}>Ciclo Escolar: {Tarjet.grupo}</Col>
            <Col md={12}>{Tarjet.pagos?'Esta persona puede recibir pagos por la aplicacion'
            :'Esta persona no puede recibir pagos por la aplicacion'}</Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary" onClick={()=>accion(Tarjet,'aceptar')}>Aceptar</Button>
          <Button variant="secondary" onClick={()=>accion(Tarjet,'descartar')}>Descartar</Button>
          <Button variant="secondary" onClick={props.onHide}>Cancelar</Button>
        </ButtonGroup>
        </Modal.Footer>
      </Modal>
    );
  }

  const Tarjets = async (DocContent, pub) => {
    console.log(DocContent, pub)
    if(pub.Estado){
      setforaneo(DocContent);
      setVista(!Vista)
    }else{
      //console.log(respuesta);
      setModalShow(true);
      setTarjet(DocContent);
      setPubs(pub)
      // console.log('me diste click', DocContent)
    }
  };


  return (
    <>
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
          {
            Detalles.Postulados&&Detalles.Postulados.map((item)=>(
            <Row key={item.id}>
              <Col md={2} className='mb-2'>
                <img src={item.imagen?item.imagen:user} className='imgPostulados' />
              </Col>
              <Col md={4}>{item.nombre}</Col>
              <Col md={4}>{item.escuela}</Col>
              <Col md={2}>
                <Button variant='outline'
                onClick={() => Tarjets(item, Detalles)}>...</Button>
              </Col>
            </Row>
            ))
          }
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Container>
    </>
  )
}

export default AsidePubs