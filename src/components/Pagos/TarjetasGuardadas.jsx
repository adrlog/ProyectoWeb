import React, { useEffect } from 'react'
import { Col, Container, Row, Alert } from 'react-bootstrap'
import Procesamiento from "../Publicaciones/Procesamiento"
const TarjetasGuardadas = () => {

  const {tarjetas, Tarjetas, Perfil, UserInf,}=Procesamiento();

  useEffect(()=>{
    Tarjetas();
    Perfil();
  },[])

  return (
    <>
         <Container className='mt-5 bg-light p-2'>
        <Row>
            <Col>
                <center>
                    <div className='Subtitulos'>Tarjetas Guardadas</div>
                </center>
            </Col>
        </Row>
    </Container>

    {tarjetas!=undefined?tarjetas.map((doc)=>(

    <Container className='mt-2 bg-light p-2' key={UserInf.userName}>
        <Row>
            <Col md={9} xs={12} lg={5}>
                <Container>
                    <Container className='p-3 bg-primary cardPay'>
                        <Col className='alingrigth'>
                            <i className="fa-solid fa-rss" 
                            style={{fontSize:'30px'}}></i>
                        </Col>
                        <Col>
                            <div style={{fontSize:'30px'}}>**** **** **** {doc.card.last4}</div>
                        </Col>
                        <Col>
                        <div> Ex data {doc.card.exp_month}/{doc.card.exp_year} </div>
                        <div>{UserInf.userName} </div>   
                        </Col>
                    </Container>
                </Container>
            </Col>
        </Row>
    </Container>
)
    ):(
        <center>
         <Alert variant='danger'>
            crea un metodo de pago en El perfil de pagos
         </Alert>
        </center>
    )}
    </>
  )
}

export default TarjetasGuardadas