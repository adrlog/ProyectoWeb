import React, { useContext, useState } from 'react'
import HacerPub from './HacerPub'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Historial from './Historial'
import { PubsContext } from '../../context/PanelPubsProvider'

const VistaPublicaciones = () => {

  const {Publicar}=useContext(PubsContext);

  return (
    <>        
    <Row className='bg-light p-3'>
        <Col>
        <Container>
        <h1>
          <a href="/dashboard">
            <i className="fa-solid fa-left-long headerPublic"></i>
          </a>
        </h1>
        </Container>
        </Col>
        <Col>
        <h1>Publicaciones</h1>
        </Col>
        <Col>
        </Col>
    </Row>
    {
      Publicar?(
        <HacerPub/>
      ):(
        <Historial/>
      )
    }
    </>
  )
}

export default VistaPublicaciones