import { Button, Col, Container, Row } from 'react-bootstrap'
import user from '../../assets/defaultuser.jpg';
import { PanelContext } from "../../context/PanelTrabajosProvider";
import { useContext } from 'react';

const Targetas = () => {

  const { docUsuario, Publicaciones } = useContext (PanelContext);

  if(Publicaciones){
    console.log(Publicaciones)
  }

  return (
    <>
        <Container className='mt-5'>
            <Row>
            {Publicaciones[0]&&Publicaciones.map((item, i)=>
            (
                item[0].map((pub)=>(
                <Col className='border targetaspublicas' 
                key={i} style={{borderRadius:'25px'}}>
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
            ))
        }
        </Row>
    </Container>

    </>
  )
}

export default Targetas