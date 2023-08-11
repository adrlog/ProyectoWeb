import { Button, Col, Container, Row } from 'react-bootstrap'
import user from '../../assets/defaultuser.jpg';
import { PanelContext } from "../../context/PanelTrabajosProvider";
import { useContext, useEffect } from 'react';
import Solicitar from './Solicitar';

const Targetas = () => {

  const { obtenerPublicaciones,
    Publicaciones,} = Solicitar(); 
  const {  setdocUsuario,
     setdocTrabajo } = useContext (PanelContext);

  useEffect(()=>{
    obtenerPublicaciones();
  },[]);

  useEffect(()=>{
      Publicaciones&&console.log(Publicaciones);
  },[Publicaciones]);

  const prev = (us, pub)=>{
    setdocUsuario(us);
    setdocTrabajo(pub)
  }

  return (
    <>
        <Container className='mt-5'>
            <Row>
            {Publicaciones[0]?Publicaciones.map((item, i)=>
            (
                item[0].map((pub)=>(
                <Col className='border targetaspublicas' 
                onClick={()=>prev(item[1], pub)}
                key={i+pub.Titulo} style={{borderRadius:'25px'}}>
                    <Row className='mt-3'>
                        <Col md={4}>
                            <img src={user} alt="" width='100px'/>
                        </Col>
                        <Col>
                        <span>{item[1]&&item[1].nombre}</span>
                        <br />
                        <span>{pub&&pub.Titulo}</span>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>${pub&&pub.Presupuesto} </Col>
                        <Col><Button variant='outline-primary'
                        href='dashboard/panel'>saber mas ...</Button></Col>
                    </Row>
                </Col>
                ))
            )):(
                <h3>Cargando Pubblicaciones ...</h3>
            )
        }
        </Row>
    </Container>

    </>
  )
}

export default Targetas