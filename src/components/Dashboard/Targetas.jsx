import { Button, Col, Container, Row } from 'react-bootstrap'
import user from '../../assets/defaultuser.jpg';
import { PanelContext } from "../../context/PanelTrabajosProvider";
import { useContext } from 'react';

const Targetas = () => {

  const { docUsuario } = useContext (PanelContext);

  return (
    <>
        <Container className='mt-5'>
            <Row>
                <Col className='border targetaspublicas' style={{borderRadius:'25px'}}>
                    <Row className='mt-3'>
                        <Col md={4}>
                            <img src={user} alt="" width='100px'/>
                        </Col>
                        <Col>
                        <span>Nombre del usuario</span>
                        <br />
                        <span>Titulo del trabajo</span>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>$50</Col>
                        <Col><Button variant='outline-primary'
                        href='dashboard/panel'>saber mas ...</Button></Col>
                    </Row>
                </Col>
                <Col className='border targetaspublicas' style={{borderRadius:'25px'}}>
                    <Row className='mt-3'>
                        <Col md={4}>
                            <img src={user} alt="" width='100px'/>
                        </Col>
                        <Col>
                        <span>Nombre del usuario</span>
                        <br />
                        <span>Titulo del trabajo</span>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>$50</Col>
                        <Col><Button variant='outline-primary'
                        href='dashboard/panel'>saber mas ...</Button></Col>
                    </Row>
                </Col>
                <Col className='border targetaspublicas' style={{borderRadius:'25px'}}>
                    <Row className='mt-3'>
                        <Col md={4}>
                            <img src={user} alt="" width='100px'/>
                        </Col>
                        <Col>
                        <span>Nombre del usuario</span>
                        <br />
                        <span>Titulo del trabajo</span>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>$50</Col>
                        <Col><Button variant='outline-primary'
                        href='dashboard/panel'>saber mas ...</Button></Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Targetas