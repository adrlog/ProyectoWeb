import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Image, Row } from 'react-bootstrap'
import Procesamiento from '../Publicaciones.jsx/Procesamiento'
import { logout } from "../../config/firebase"
import userDefault from '../../assets/defaultuser.jpg'
import { PostContext } from '../../context/PanelPostuladoProvider'
import ProgressBar from 'react-bootstrap/ProgressBar';
import CarouselPanel from './CarouselPanel'
import Chat from './Chat'
import carga from '../../assets/img/loading-cargando.gif'

const VistaPostulaciones = () => {

    const {user, post, setActualizar, docUsuario, docTrabajo,
        setdocUsuario, setdocTrabajo}=useContext(PostContext);  
    
    const[Detalles,setDetalles]=useState(false)

        useEffect(()=>{
            if(post){
                console.log(post)
            }
        },[post])
    
    const PanelView =(us, pub)=>{
        setActualizar(true);
        setdocUsuario(us);
        setdocTrabajo(pub);
        setDetalles(!Detalles);
    }

    const Regresar=()=>{
      setDetalles(!Detalles);
    }

    console.log(post);

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
      {
        user&&(

      <Row>
        <Col md={2}>
        <img src={user?user.imagen?user.imagen:userDefault:carga} height='200px' className='imagenHeaderPerfil' />
        </Col>
        <Col className='mt-5' md={4}>
        <Row>
          <Col className='titulosHeaderPublic'>
          <h4>{user.nombre} </h4>
          </Col>
        </Row>
        <Row>
          <Col className='titulosHeaderPublic mt-3'>
          <h4>{user.grupo} </h4>
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
            <li><h4>{user.escuela} </h4></li>
            <li><h4>{user.carrera}</h4></li>
          </center>
        </ul>
        </Col>
        </Row>
        </Col>
      </Row>
        )
      }
    </div>

    <Container className='mt-5'>
      {
        Detalles?(
          <Row>
            <Row className="p-1  rounded justify-content-center mt-2">
              <Col xs={10} className="p-1 ">
                <button
                  onClick={Regresar}
                  style={{ fontSize: "12px" }}
                  className="w-100 btn btn-outline-secondary btn-sm"
                >
                  Regresar al panel "Mis Postulaciones"
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
                        <h6>{docTrabajo.Vistafecha}</h6>
                      </Col>
                      <Col md={12} lg={12} className='mt-4'>
                        <h6>{docTrabajo.descripcion}</h6>
                        <h6>${docTrabajo.Presupuesto}</h6>
                      </Col>
                    </Row>
                  </Container>
                </Col>
                {
                  docTrabajo.Imagenes.length>0?(
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
                  docTrabajo.Estado?(
                    <Chat/>
                  ):(
                    <Alert variant='info'>
                      <center>
                      esperando confirmacion
                      </center>
                    </Alert>
                  )
                }
              </Row>
            </Container>
          </Row>

          
          

          ):(

        <Row>
        {
            post?post.map((item, i)=>
            (
                <Col className='border  mb-2' md={3}
                key={i+item[0].Titulo} style={{borderRadius:'25px'}}>
                    <Row className='mt-3'>
                        <Col md={4}>
                            <img src={item[1]&&item[1].imagen?item[1].imagen:userDefault} alt="" width='100px' height='102px'/>
                        </Col>
                        <Col>
                        <span>{item[1]&&item[1].nombre}</span>
                        <br />
                        <span>{item[0]&&item[0].Titulo}</span>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>${item[0]&&item[0].Presupuesto} </Col>
                        <Col><Button variant='outline-primary'
                        onClick={()=>PanelView(item[1], item[0])}>saber mas ...</Button></Col>
                    </Row>
                </Col>
            )):(
              <Row>
                <h3>Cargando Pubblicaciones ...</h3>
                <ProgressBar animated now={75} />
              </Row>
            )
        }
        </Row>
        )
      }
    </Container>

</>
  )
}

export default VistaPostulaciones