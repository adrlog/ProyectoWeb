import React, { useContext } from 'react'
import { PubsContext } from '../../context/PanelPubsProvider'
import { Col, Row } from 'react-bootstrap'
import Muro from './Muro'
import AsidePubs from './AsidePubs'

const Historial = () => {
    const {Publicar, setPublicar}=useContext(PubsContext);

    const PublicarPanel = ()=>{
      setPublicar(!Publicar)
    }

  return (
    <>
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
    </>
  )
}

export default Historial