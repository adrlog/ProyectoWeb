import React from 'react'
import { Accordion, Col, Container, Row } from 'react-bootstrap'

const UltimosMovi = () => {
  return (
    <>
    <Container className='mt-5'>
        <Row className='mt-3 Titulo'>
            <Col md={5}>
              <a href="/dashboard" className='btn'>
                <h2>
                  <i className="fa-solid fa-left-long"></i>
                </h2>
              </a>
            </Col>
            <Col>
              <h2>Ultimos movimientos</h2>
            </Col>
        </Row>
        <Row>
        <Col md={4} className="mb-2 mt-5">

        <Accordion defaultActiveKey={0}>
        <Accordion.Item>
            <Accordion.Header>
            <Container>
                <Row>
                <Col>
                    <i className="fa-solid fa-credit-card"></i>
                </Col>
                <Col>Cargo</Col>
                <Col>$14.00</Col>
                {/* <Col>${doc.amount / 100}</Col> */}
                </Row>
            </Container>
            </Accordion.Header>
            <Accordion.Body>
            <Container>
                <Row>
                <Col md={6}>
                    Fecha:
                </Col>
                <Col md={6}>
                    <span>
                    fecha
                    </span>
                </Col>

                <Col md={6}>
                    Estado:
                </Col>
                <Col md={6}>
                    <span className='text-break'
                    style={{ maxWidth: '70vw' }}>
                    {/* {doc.status} */}
                    estado
                    </span>
                </Col>
                </Row>
            </Container>
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        </Col>
         
        </Row>
      </Container>
    </>
  )
}

export default UltimosMovi