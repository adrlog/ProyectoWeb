import React, { useContext } from 'react'
import { PubsContext } from '../../context/PanelPubsProvider'
import { Col, Row } from 'react-bootstrap'
import Muro from './Muro'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import AsidePubs from './AsidePubs'
const KEYS =import.meta.env.VITE_STRIPPE_PUBLIC_KEY;
const stripePromise = loadStripe(KEYS)

const Historial = () => {
    const {Publicar, setPublicar}=useContext(PubsContext);

    const PublicarPanel = ()=>{
      setPublicar(!Publicar)
    }

  return (
    <>
    <Elements stripe={stripePromise}>

    <Row className="bg-light p-1  rounded justify-content-center mt-2">
      <Col xs={10} className="p-1 ">
        <button
          onClick={PublicarPanel}
          style={{ fontSize: "12px" }}
          className="w-100 btn btn-outline-secondary btn-sm"
        >
          Crear una publicación
        </button>
      </Col>
    </Row>
    
    <Row className=" bodyContenido ms-auto me-auto sizeHeaderBiografia ">
    <Col xs={12} sm={12} md={8}>
        <Muro />
    </Col>
    <Col xs={4} className="d-none d-sm-none d-md-block scrollAside">
        <AsidePubs></AsidePubs>
    </Col>
    </Row>

    </Elements>

    </>
  )
}

export default Historial