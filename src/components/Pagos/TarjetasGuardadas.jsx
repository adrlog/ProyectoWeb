import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const TarjetasGuardadas = () => {
  return (
    <>
     <Container className='mt-2 bg-light p-2'>
        <Row className='mt-4 Titulo'>
            <Col md={5}>
              <a href="/dashboard" className='btn'>
                <h2>
                  <i className="fa-solid fa-left-long"></i>
                </h2>
              </a>
            </Col>
            <Col>
              <h2>Tarjetas guardadas</h2>
            </Col>
        </Row>
        <Row>
            <Col md={9} xs={12} lg={5}>
                <Container>
                    <Container className='p-3 bg-primary cardPay mt-4'>
                        <Col className='alingrigth'>
                            <i className="fa-solid fa-rss" 
                            style={{fontSize:'30px'}}></i>
                        </Col>
                        <Col>
                            {/* <div style={{fontSize:'30px'}}>**** **** **** {doc.card.last4}</div> */}
                            <div style={{fontSize:'30px'}}>**** **** **** 4545</div>
                        </Col>
                        <Col>
                        {/* <div> Ex data {doc.card.exp_month}/{doc.card.exp_year} </div> */}
                        <div> Ex data 04/25 </div>
                        {/* <div>{data.userName} </div>   */}
                        <div>Arnol Adrian</div>   
                        </Col>
                    </Container>
                </Container>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default TarjetasGuardadas