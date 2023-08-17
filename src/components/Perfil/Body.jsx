import React from 'react'
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import CreateIcon from "@mui/icons-material/Create";
import { actualizaTodo, db, auth } from "../../config/firebase";
import { doc, getDoc } from 'firebase/firestore';
import userDefault from '../../assets/defaultuser.jpg'


const Body = () => {

    const user = auth.currentUser.uid.toString();
    const [UserInf, setUserInf]=useState();

    useEffect(()=>{
    console.log('esperando');

        const Perfil = async () => {

            const ref = doc(db, 'Usuarios', user);
            const date = await getDoc(ref);
            setUserInf(date.data())
            console.log('buscando perfil',date.data());
        }
        Perfil()
    },[])


  return (
    <>
    <Container>
        <Row>
            <Col md={8}>
            <Container>
                <Row className='mt-5'>
                    <center>
                    <img src={UserInf.imagen?UserInf.imagen:userDefault} className='userPerfil' />
                    </center>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-end mb-2'><h2>Nombre</h2></Col>
                    <Col>Arnol</Col>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-end mb-2'><h2>Correo</h2></Col>
                    <Col>Arnol</Col>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-end mb-2'><h2>Carrera</h2></Col>
                    <Col>Arnol</Col>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-end mb-2'><h2>Ciclo escolar</h2></Col>
                    <Col>Arnol</Col>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-end mb-2'><h2>Mensaje</h2></Col>
                    <Col>Arnol</Col>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-end mb-2'><h2>Escuela</h2></Col>
                    <Col>Arnol</Col>
                </Row>
            </Container>
            </Col>
            <Col>
            <Row className='bg-danger mt-5'>
                <Col>
                j
                </Col>
            </Row>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default Body