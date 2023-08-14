import React, { useContext, useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import user from '../../assets/defaultuser.jpg';
import { PanelContext } from "../../context/PanelTrabajosProvider";
import Procesamiento from '../Publicaciones.jsx/Procesamiento';
import Comentarios from './Comentario';

const PanelWorks = () => {

  const { docUsuario, docTrabajo, setState, State } = useContext (PanelContext);
  const { Perfil,
    UserInf,} = Procesamiento();

    useEffect(()=>{
      Perfil();
    },[])

  // console.log(docUsuario);
  // console.log(docTrabajo);

  const regresar =()=>{
    setState(!State)
  }

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
            <Col md={12}>{UserInf&&UserInf.nombre}</Col>
            <Col md={12}>{UserInf&&UserInf.carrera}</Col>
            <Col md={12}>{UserInf&&UserInf.escuela}</Col>
            <Col md={12}>{UserInf&&UserInf.grupo}</Col>
            <Col md={12}>
              El usuario Autor de esta publicacion requiere 
              como preferencia: 
              {docTrabajo.Preferencias}
            </Col>
            </center>
          </Row>
        </Container>
      </Col>
      <Col md={10} className='mt-2'>
        <Row>
          <Col>
            <Button className='btn regresarPanel'
            onClick={regresar}>Regresar</Button>
          </Col>
          <Col>
            <center>
            <div className='fechaPanel'>{docTrabajo.Vistafecha}</div>
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
            <h3>{docUsuario.nombre}</h3>
            </Col>
          </Row>
          <Row>
            <Col>
            <h1>{docTrabajo.Titulo}</h1>
            </Col>
          </Row>
          </Col>
        </Row>
        </Container>
        <Container className='mt-3'>
            {
              docTrabajo.Tipo!='Curso'?(
                <Row className='fondoPanel'>
                  <Col md={12}>Departamento de tramite: {docTrabajo.Departamento}</Col>
                  <Col md={12}>Descripcion completa: {docTrabajo.descripcion}</Col>
                  <Col md={12}>Presupuesto: {docTrabajo.Presupuesto}</Col>
                </Row>
                ):(
                <Row className='fondoPanel'>
                  <Col md={12}>Solicita los dias: {docTrabajo.Dias}</Col>
                  <Col md={12}>Descripcion completa: {docTrabajo.descripcion}</Col>
                  <Col md={12}>Horas al dia: {docTrabajo.Horas}</Col>
                  <Col md={12}>Materia: {docTrabajo.Materia}</Col>
                </Row>
              )
            }
        </Container>
      </Col>
    </Row>
    <Container>
      <Row>
        <Col>
            {/* <Comentarios/> */}
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default PanelWorks