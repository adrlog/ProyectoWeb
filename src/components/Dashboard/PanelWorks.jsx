import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import user from '../../assets/defaultuser.jpg';
import { PanelContext } from "../../context/PanelTrabajosProvider";
import Procesamiento from '../Publicaciones/Procesamiento';
import Comentarios from './Comentario';
import CaruzelPanelPublic from './CaruzelPanelPublic';
import carga from "../../assets/img/loading-cargando.gif"

const PanelWorks = () => {

  const { docUsuario, docTrabajo, setState, State } = useContext (PanelContext);
  const { Perfil,
    UserInf, Postularme} = Procesamiento();
  const [Cantidato,setCantidato]=useState(false);
  const [Activefunction,setActivefunction]=useState(false);
  const [Message,setMessage]=useState(false);


    useEffect(()=>{
      Perfil();
    },[Activefunction]);

    useEffect(()=>{
      if(UserInf){
        if(docTrabajo.Postulados){
          // console.log(UserInf.id)
          var candidatos=docTrabajo.Postulados
          for(var i=0; i<candidatos.length; i++){
            if(candidatos[i]==UserInf.id){
              setCantidato(true);
            }
          }
        }
      }
    },[UserInf]);

  // console.log(docUsuario);
  // console.log(docTrabajo);

  const regresar =()=>{
    setState(!State)
  }

  const postularse =async ()=>{
    setMessage(!Message);
    var res=await Postularme(docTrabajo);
    if(res=='Postulado'){
      setActivefunction(!Activefunction);
    }
  }

  return (
    
    <>
    <Row>
      <Col className='AsideWorks'
      md={2}>
        <Container>
          <Row>
            <Col>
              <img src={UserInf?UserInf.imagen?UserInf.imagen:user:carga}  className='imagenPanle'/>
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
          <Col md={2} className='mt-2 mb-2'>
          <img src={docUsuario?docUsuario.imagen?docUsuario.imagen:user:carga} className='imgPanelDescripcion'/>
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
                  {
                    Cantidato?(
                      <Button variant='outline-info' disabled>Ya te has postulado</Button>
                    ):(
                      Message?(
                        <Button variant='outline-info' disabled>Ya te has postulado</Button>
                      ):(
                        <Button variant='outline-info' onClick={postularse}>Postularme</Button>
                      )
                    )
                  }
                </Row>
                ):(
                <Row className='fondoPanel'>
                  <Col md={12}>Solicita los dias: {docTrabajo.Dias}</Col>
                  <Col md={12}>Descripcion completa: {docTrabajo.descripcion}</Col>
                  <Col md={12}>Horas al dia: {docTrabajo.Horas}</Col>
                  <Col md={12}>Materia: {docTrabajo.Materia}</Col>
                  {
                    Cantidato?(
                      <Button variant='outline-info' disabled>Ya te has postulado</Button>
                    ):(
                      Message?(
                        <Button variant='outline-info' disabled>Ya te has postulado</Button>
                      ):(
                        <Button variant='outline-info' onClick={postularse}>Postularme</Button>
                      )
                    )
                  }
                </Row>
              )
            }
        </Container>
        {
          docTrabajo.Imagenes.length>0&&(
          <Container className='mt-2'>
            <Row>
              <Col>
              <center>
                <CaruzelPanelPublic/>
              </center>
              </Col>
            </Row>
          </Container>
          )
        }
      </Col>
    </Row>
    </>
  )
}

export default PanelWorks