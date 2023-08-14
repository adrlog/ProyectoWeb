import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Principal from './Principal';

const VistaPagos = () => {


    const [PrincipalPerfil, setPrincipalPerfil] = useState(true);
    const [segundo, setsegundo] = useState(false);
    const [tercero, settercero] = useState(false);

  return (
    <>
    <Container className='mt-4'>
        <Row>
            <Col>
                <div className='botonesPagos'>
                    <center>
                        <h2>Perfil pagos</h2>
                    </center>
                </div>
            </Col>
            <Col>
            <div className='botonesPagos'>
                <center>
                    <h2>Ultimos movimientos</h2>
                </center>
            </div>
            </Col>
            <Col>
            <div className='botonesPagos'>
                <center>
                    <h2>Tarjetas</h2>
                </center>
            </div>
            </Col>
        </Row>
    </Container>
    <Container>
        <Row>
        {
            PrincipalPerfil&&
            <Principal/>
        }
        </Row>
    </Container>
    </>
  )
}

export default VistaPagos