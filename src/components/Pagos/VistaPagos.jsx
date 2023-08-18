import React, { useContext, useEffect, useRef, useState } from 'react'
import { Col, Container, ProgressBar, Row } from 'react-bootstrap'
import Principal from './Principal';
import UltimosMovi from './UltimosMovi';
import TarjetasGuardadas from './TarjetasGuardadas';
import { PagosContext } from '../../context/PanelPagosProvider';
import ProcesarPagos from './ProcesarPagos';
import { db } from '../../config/firebase';


const VistaPagos = () => {

    const {Pagos, Correo, setActualizar, setPagos}=useContext(PagosContext);
    const [PrincipalPerfil, setPrincipalPerfil] = useState(true);
    const [segundo, setsegundo] = useState(false);
    const [tercero, settercero] = useState(false);
    const [AddPays,setAddPays]=useState(false);
    const [Carga, setCarga]=useState(null);
    const Contrato = useRef(null);
    const {AceptarContrato}=ProcesarPagos();

    const TyC = () =>{

        if(AddPays===true){
            setAddPays(false);
        }

        if(AddPays===false){
            setAddPays(true);
        }
    }

    const cambiaVista =(panel)=>{
        if(panel=='PrincipalPerfil'){
            setPrincipalPerfil(true);
            setsegundo(false);
            settercero(false);
        }
        if(panel=='segundo'){
            setPrincipalPerfil(false);
            setsegundo(true);
            settercero(false);
        }
        if(panel=='tercero'){
            setPrincipalPerfil(false);
            setsegundo(false);
            settercero(true);
        }
    }

    const Aceptar = async (e)=>{
        e.preventDefault();

        const data = new FormData(Contrato.current);
        const dataObject = Object.fromEntries([...data.entries()]);
        // console.log(dataObject);

        
        if(!dataObject.select.trim()){
            alert("La seleccion esta vacia");
            return false;
        }
        
        if(dataObject.email==undefined){
            alert("Ingresa un correo valido");
            return false;
        }

        if(!dataObject.aceptar){
            alert("No has aceptado terminos y condiciones");
            return false;
        }

        var files = {
            "type": "custom",
            "country": "MX",
            "email": dataObject.email,
            "capabilities[transfers][requested]": 'true'
        };

        
        // funcion ajax para terminos y condiciones
        var Res = await AceptarContrato(files);
        if(Res=='Finally'){
            // console.log('respuesta, actualizando');
            setCarga('Enviando terminos y condiciones a Stripe');
            setActualizar(true);

        }

        setTimeout(async ()=>{
            // console.log('recargando');
            setPagos(true);
        },1500);
    }

  return (
    <>
        <Container className='mt-4'>
            <Row>
                <Col>
                    <div className='botonesPagos'>
                        <center>
                            <h2
                            onClick={()=>cambiaVista('PrincipalPerfil')}>Perfil pagos</h2>
                        </center>
                    </div>
                </Col>
                <Col>
                <div className='botonesPagos'>
                    <center>
                        <h2
                        onClick={()=>cambiaVista('segundo')}>Últimos movimientos</h2>
                    </center>
                </div>
                </Col>
                <Col>
                <div className='botonesPagos'>
                    <center>
                        <h2
                        onClick={()=>cambiaVista('tercero')}>Tarjetas</h2>
                    </center>
                </div>
                </Col>
            </Row>
        </Container>
    {
        Pagos?(
            <Container>
        <Row>
        {
            PrincipalPerfil&&
            <Principal/>
        }
        {
            segundo&&
            <UltimosMovi/>
        }
        {
            tercero&&
            <TarjetasGuardadas/>
        }
        </Row>
    </Container>
        ):(
            <Container className="mt-4">
            <Row>
                {AddPays===false?(

                    <center>
                <Col>
                    <div>
                        <h5>No se encontraron datos de perfil de pago</h5>
                        <button className="btn btn-outline-primary"
                        onClick={TyC}><i className="fa-solid fa-chalkboard-user"></i> Agregar Perfil de pagos</button>
                    </div>
                </Col>
                </center>
                ):(
                    <Container className="mb-5">
                        <button className="btn btn-outline-secondary mt-2"
                        onClick={TyC}><h6>Volver</h6></button>

                        {Carga==null?(

                        <form ref={Contrato} onSubmit={Aceptar}>
                        <Container className="mt-4 bg-light">
                            <Row>
                                <Col md={3}>
                                    <div className="LetrasAzules"><h5>Tipo de negocio</h5></div>
                                </Col>
                                <Col md={3}>  
                                <select className="form-select" name="select">
                                    <option defaultValue value=''>Selecciona una opción</option>
                                    <option value="empresa">Empresa</option>
                                    <option value="negocio">Negocio</option>
                                </select>                                  
                                </Col>
                                <Col md={12} className="mt-3">
                                    <h5>Correo</h5>
                                    <input type="email" className="mt-3 form-control"
                                    defaultValue={Correo}
                                    name="email"/>
                                </Col>
                                <Col className="mt-2">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" name="aceptar"/>
                                    <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                     <h5>Aceptar términos y condiciones de Rapi-Tex y Stripe</h5>
                                    </label>
                                    <Col md={12}>
                                    <span>
                                    Los servicios de procesamiento de pago para el socio de Rapi-Tex son proporcionados por Stripe y están sujetos al Acuerdo de cuentas
                                    conectadas de Stripe(Stripe Connected Account Aggreement), que incluye los Términos de servicio de Stripe (Stripe Terms of Service), en
                                    conjunto, el "Acuerdo de servicio de Stripe" ("Stripe Services Agreement"). Al aceptar estos términos o seguir operando como socio en Rapi-Tex,
                                    usted acepta cumplir las obligaciones del Acuerdo de servicio de Stripe, que puede ser modificado por Stripe de tanto en tanto. Para que Tlati
                                    Digital pueda ofrecer servicios de procesamiento de pagos a través de Stripe, usted acepta proporcionar a Rapi-Tex información completa y
                                    exacta sobre usted y su negocio, y autoriza a Rapi-Tex a compartir dicha información y los datos de las transacciones relacionadas con el uso
                                    de los servicios de procesamiento de pago proporcionados por Stripe.
                                    </span>
                                    </Col>
                                </div>
                                </Col>
                            </Row>
                        </Container>
                        <Container className="mt-3">
                            <Row>
                            <Col md={6}>
                            <center>
                                <a href="https://stripe.com/mx/legal/ssa" className="btn btn-outline-primary">Stripe Services Account Agreement</a>
                            </center>
                            </Col>
                            <Col md={6}>
                            <center>
                                <a href="https://stripe.com/mx/legal/connect-account" className="btn btn-outline-primary">Stripe Connected Account Agreement</a>
                            </center>
                            </Col>
                            <Col className="mt-2">
                            <center>
                                <button type="submit" className="btn btn-outline-primary">Registrar datos de Cuenta Asociado</button>                                
                            </center>
                            </Col>
                            </Row>
                        </Container>
                        </form>
                        ):(
                            <Col md={12}>
                                <h1>{Carga}</h1>
                                <ProgressBar animated now={85} />
                            </Col>
                        )}

                    </Container>
                )}

            </Row>
        </Container>
        )
    }

    </>
  )
}

export default VistaPagos