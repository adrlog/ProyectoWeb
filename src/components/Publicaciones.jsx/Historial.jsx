import React, { useContext } from 'react'
import { PubsContext } from '../../context/PanelPubsProvider'
import { Col, Row } from 'react-bootstrap'
import Muro from './Muro'
import AsidePubs from './AsidePubs'

const Historial = () => {
    const {Publicar, setPublicar}=useContext(PubsContext)
  return (
    <>
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