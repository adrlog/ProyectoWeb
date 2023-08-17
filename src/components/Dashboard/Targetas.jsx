import { Button, Col, Container, Row } from 'react-bootstrap'
import user from '../../assets/defaultuser.jpg';
import { PanelContext } from "../../context/PanelTrabajosProvider";
import { useContext, useEffect } from 'react';
import Solicitar from './Solicitar';

const Targetas = () => {

  const { obtenerPublicaciones,
    Publicaciones,} = Solicitar(); 
  const {  setdocUsuario,
     setdocTrabajo, setState, State } = useContext (PanelContext);

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

  const PanelView =(us, pub)=>{
    setState(!State);
    setdocUsuario(us);
    setdocTrabajo(pub);
    // console.log('cambiar vista');
  }

  return (
    <>
        <Container className='mt-5'>
            <Row>
            {Publicaciones[0]?Publicaciones.map((item, i)=>
            (
              <Col className='border targetaspublicas mb-2' 
                onClick={()=>prev(item[1], item[0])} 
                key={i+item[0].Titulo} style={{borderRadius:'25px'}}>
                    <Row className='mt-3'>
                        <Col md={4}>
                            <img src={item[1]&&item[1].imagen?item[1].imagen:user} alt="" width='100px' height='102px'/>
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
                <h3>Cargando Pubblicaciones ...</h3>
            )
        }
        </Row>
    </Container>

    </>
  )
}

export default Targetas