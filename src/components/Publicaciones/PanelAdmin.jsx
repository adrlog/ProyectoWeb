import { useContext } from 'react'
import { Col, Row, Container, Image } from 'react-bootstrap';
import { PubsContext } from '../../context/PanelPubsProvider'
import CarouselPanel from './CarouselPanel'
import userDefault from '../../assets/defaultuser.jpg';
import Chat from './Chat';

const PanelAdmin = () => {

  const {Detalles, Vista, setVista,docUsuario, Funsion}=useContext(PubsContext);

  // console.log(docUsuario, 'panel admin')

  const Regresar=()=>{
    setVista(!Vista);
  }
  return (
    <>
    {
         Detalles&&(
            <Row>
              <Row className="p-1  rounded justify-content-center mt-2">
                <Col xs={10} className="p-1 ">
                  <button
                    onClick={Regresar}
                    style={{ fontSize: "12px" }}
                    className="w-100 btn btn-outline-secondary btn-sm"
                  >
                    Regresar al panel Principal
                  </button>
                </Col>
              </Row>
              <Container className='mt-4 HeaderPublicaciones2 p-3'>
                <Row>
                  <Col className='ColInfSolicitudes'>
                    <Container>
                      <Row>
                        <Col md={5} lg={3} className='colImgSolicitudes'>
                          <Image src={docUsuario.imagen?docUsuario.imagen:userDefault} className='imagenAmigos'/>
                        </Col>
                        <Col md={1} lg={6} className='FechaNombreResponsive'>
                          <h5>{docUsuario.nombre}</h5>
                          <h6>{Detalles.Vistafecha}</h6>
                        </Col>
                        {
                          Detalles.Tipo!='Curso'?(
                            <Row>
                              <Col md={12} lg={12} className='mt-4'>
                                <h6>Departamento de tramite: {Detalles.Departamento}</h6>
                                <h6>Descripcion: {Detalles.descripcion}</h6>
                                <h6>Presupuesto: ${Detalles.Presupuesto}</h6>
                              </Col>
                            </Row>
                            ):(
                            <Row>
                              <Col md={12} lg={12} className='mt-4'>
                                <h6>Solicita los dias: {Detalles.Dias}</h6>
                                <h6>Descripcion: {Detalles.descripcion}</h6>
                                <h6>Horas al dia: {Detalles.Horas}</h6>
                                <h6>Materia: {Detalles.Materia}</h6>
                                <h6>Presupuesto: ${Detalles.Presupuesto}</h6>
                              </Col>
                            </Row>
                        )}
                      </Row>


                    </Container>
                  </Col>
                  {
                    Detalles.Imagenes.length>0?(
                      <Col className='CaruselSolisResp'>
                        <CarouselPanel/>
                      </Col>
                    ):(
                      <Col></Col>
                    )
                  }
                </Row>
              </Container>
              <Container className='mt-5'>
                <Row>
                  {
                    Detalles.Estado?(
                      <Chat/>
                    ):('esperando confirmacion')
                  }
                </Row>
              </Container>
            </Row>
            )
    }
    </>
  )
}

export default PanelAdmin