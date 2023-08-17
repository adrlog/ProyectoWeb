import React, { useContext, useEffect, useState } from 'react'
import { PubsContext } from '../../context/PanelPubsProvider'
import { Alert, Button, ButtonGroup, Carousel, Col, Container, Modal, Row } from 'react-bootstrap';
import user from '../../assets/defaultuser.jpg';
import carga from "../../assets/img/loading-cargando.gif"
import PagoPorEntrega from './PagoPorEntrega';

const AsidePubs = () => {

  const {Detalles, setFunsion, Vista, setVista, setforaneo, setDetalles}=useContext(PubsContext);
  const [modalShow, setModalShow] = useState(false);
  const [Tarjet, setTarjet] = useState(false);
  const [Pubs, setPubs] = useState(false);
  const [hidden, sethidden]=useState(false);
  const {CalcularMontoPago, message,status, StateCancel} = PagoPorEntrega();
  const {pagado, setpagado}=useState(false);

  const accion=(us, action)=>{
    setFunsion([us, action, Pubs]);
  }

  useEffect(()=>{
    return
  },[pagado])
  
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
      setFunsion(true);
      setVista(!Vista)
    }else{
      //console.log(respuesta);
      setModalShow(true);
      setTarjet(DocContent);
      setPubs(pub)
      // console.log('me diste click', DocContent)
    }
  };

  // console.log(Detalles);

  const ConfirmarEntrega = (entrega, i)=>{
    sethidden(true);
    var numentregas=Detalles.aentregas.length;
    var presupuesto=Detalles.Presupuesto;
    var cantidad=(presupuesto-(presupuesto*5)/100)/numentregas;
    const Evidencias = Detalles.aentregas;
    var i=0;
    var evi=[];
    // console.log(numentregas);
    Evidencias.map((item)=>{
        if(item.entregado===true){
            i++;
            evi.push(item)
        } 
        // console.log(i);
    })

    if(i<=numentregas){
        Swal.fire({
            title: 'Aceptar entrega',
            text:`Al aceptar la propuesta se transferira un cargo 
            por la cantidad de $${cantidad.toFixed(2)} al trabajador
             `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar'
          }).then(async (result) => {  
            if (result.isConfirmed) {
                
                entrega.entregado=true;
                setpagado(true);
                // var res= await CalcularMontoPago(Detalles);
                StateCancel(Detalles, 'Finalizado', entrega);
                
            let timerInterval;
                Swal.fire({
                title: 'Confirmando entrega!',
                html: 'transfiriendo al trabajador <b></b> Agradecemos su pasciencia.',
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                    b.textContent = message;
                    }, 20)
                }, 
                willClose: () => {
                    clearInterval(timerInterval)
                }
                }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    // console.log('I was closed by the timer')
                }
                })
                // setShow(true);
            }
          })
    }
}


  return (
    <>
      <Container className="HeaderPublicaciones2 mt-3 targetSolicitudes">
        <Row className="mt-1 pb-1 pt-1 m-1">
          <img
            src={Detalles&&Detalles.Postulados?Detalles.Postulados[0].imagen?Detalles.Postulados[0].imagen:user:carga}
            alt=""
            height='500px'
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

    {
      Vista&&(
      <Container className="HeaderPublicaciones2 mt-3 targetSolicitudes">
        <Row className="mt-1 pb-1 pt-1 m-1">
          <Col>
          {
            Detalles?Detalles.aentregas.map((entrega, i)=>(
            <Container key={i}> 
                <Row>
                    <Col className='bgentregassub mt-4 mb-3 contentEntregas' 
                    style={{borderRadius:'15px'}}>
                        <center>
                        <div>Entrega {i+1}  </div>
                        <div className='mt-2'>{entrega.descripcion} </div>
                        </center>
                        {
                            entrega.imagenes!=''
                            &&(
                                <Container className='mb-3 ImagenEntregaResponsive'> 
                                    <Row>
                                        <Col className='responsiveSolis'></Col>
                                        <Col>
                                    
                                    <Carousel className='ImagenEntregas'>

                                {
                                    entrega.imagenes.map((img, i)=>(
                                        <Carousel.Item key={i} className='imgImg'>
                                            
                                            <img
                                            className="d-block w-100"
                                            src={img}
                                            alt="First slide"
                                            width='50px'
                                            />
                                            
                                        </Carousel.Item>
                                    )
                                    )
                                }

                                    </Carousel>
                                  
                                        </Col>
                                        <Col className='responsiveSolis'></Col>
                                    </Row>
                                </Container>
                            )
                            
                        }
                        {
                            entrega.documento!=''&&(
                                <Container className='mb-3 mt-3'>
                                    <center>
                                    <a href={entrega.documento} target="_blank"
                                    className="btn btn-primary">
                                    <i className="fa-solid fa-file-pdf"></i>
                                    {' '}{entrega.nombreDocumento}
                                    </a>
                                    </center>
                                </Container>
                            )
                        }
                        {
                            entrega.video!=''&&(
                                <video
                                    src={entrega.video}
                                    className="d-block w-100 mb-3"
                                    controls
                                ></video>
                            )
                        }
                        {
                            entrega.entregado!=true?(
                                <div className="d-grid gap-2">
                                <center>
                                    {
                                        !hidden?(
                                            <Button variant='outline-success' size="lg"
                                            onClick={()=> ConfirmarEntrega(entrega, i)}
                                            className='mb-3'>
                                                Confirmar entrega
                                            </Button>
                                        ):(
                                            <Button variant='outline-success' size="lg"
                                            disabled
                                            className='mb-3'>
                                                Confirmar entrega
                                            </Button>
                                        )
                                    }
                                </center>
                              </div>
                            ):(
                            <Container className='mt-3'>
                                <Alert variant='success'>
                                    <center>
                                        Entrega confirmada
                                    </center>
                                </Alert>
                            </Container>
                            )
                        }
                    </Col>
                </Row>
                
            </Container>
            )):('')
            }
          </Col>
        </Row>
          
      </Container>
      )
    }
    </>
  )
}

export default AsidePubs