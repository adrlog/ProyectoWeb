import React, { useEffect } from 'react'
import ProcesarPagos from './ProcesarPagos';
import { Accordion, Alert, Col, Container, Row } from 'react-bootstrap';

const UltimosMovi = () => {

  const { Movimientos, movimientos } = ProcesarPagos();

  useEffect(() => {
    Movimientos()
  }, []);


  var fechas = [];
  if (movimientos) {
    for (var i = 0; i < movimientos.length; i++) {
      var date;
      var tmp = movimientos[i].created;
      var str = tmp.toString();
      if (str.length == 10) {
        date = str + '000'
      }
      var fecha = new Date(Number(date));
      const dia = (fecha.getDate());
      const mes = (fecha.getMonth() + 1);
      const año = (fecha.getFullYear());

      fechas.push(`${dia}/${mes}/${año}`);

    }
  }

  return (
    <>
      <Container className='mt-5'>
        <Row>
          {
            movimientos ? movimientos.map((doc, i) => (
              <Col md={4} className="mb-2" key={doc.created}>

                <Accordion defaultActiveKey={0}>
                  <Accordion.Item eventKey={i}>
                    <Accordion.Header>
                      <Container>
                        <Row>
                          <Col>
                            <i className="fa-solid fa-credit-card"></i>
                          </Col>
                          <Col>Cargo</Col>
                          <Col>${doc.amount / 100}</Col>
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
                              {fechas[i]}
                            </span>
                          </Col>

                          <Col md={6}>
                            Estado:
                          </Col>
                          <Col md={6}>
                            <span className='text-break'
                              style={{ maxWidth: '70vw' }}>
                              {doc.status}
                            </span>
                          </Col>
                        </Row>
                      </Container>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            )) : (
              <center>
                <Alert variant='danger'>
                  No se encontraron movimientos
                </Alert>
              </center>
            )
          }
        </Row>
      </Container>
    </>
  )
}

export default UltimosMovi