import React, { useContext, useEffect, useRef, useState } from 'react'
import { Alert, Button, Carousel, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import GuardarEntregas from './GuardarEntregas';
import { PostContext } from '../../context/PanelPostuladoProvider'

const Entregas = () => {

    const { docUsuario, docTrabajo}=useContext(PostContext); 

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const form = useRef(null);
    const {guardarEntregables, resetEntregas}=GuardarEntregas();


    // Imagenes
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [MultipleView, setMultipleView]=useState('');
    const [ArrayFiles, setArrayFiles]= useState(null);
    const [hidden, sethidden]= useState(false);
    const [DatosWork, setDatosWork]= useState(false);
    const prev = [];

  
    useEffect(() => {
    
        if (!selectedFile) {
          setPreview('');
          return;
        }

        // guardar elementos dentro de un array
        if(ArrayFiles!=null){
            if (ArrayFiles.length>1){
                setArrayFiles(prevState=>[...prevState,selectedFile]);
                // console.log(ArrayFiles, ' destrozado');
            } else {
                setArrayFiles(prevState=>[...prevState,selectedFile]);
                // console.log(ArrayFiles);
            }

        } 
        else{
            setArrayFiles([selectedFile]);
            // console.log('es null');
        }
        // console.log(ArrayFiles, ' fuera del if');
        
        // generar las url para vista previa
        if(ArrayFiles!=null){  

            if(ArrayFiles.length>1){

                ArrayFiles.map((element)=>{
                    const objectUrl = URL.createObjectURL(element);
                    prev.push([objectUrl, element.name]);
                })
            }   
            
            setMultipleView(prev);
        }

        // generar url para un solo elemento
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);

        
    }, [selectedFile]);

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile('');
          return;
        }
        setSelectedFile(e.target.files[0]);
    };
    // Imagenes

    const send = async (e) => {
        e.preventDefault();

        sethidden(true);
        const data = new FormData(form.current);
        const dataObject = Object.fromEntries([...data.entries()]);
        console.log(dataObject)
        
        var res= await guardarEntregables(docTrabajo, ArrayFiles, dataObject.mensaje);

        form.current.reset();
        setSelectedFile();
        setArrayFiles(null);
        setMultipleView(''); 
        setPreview(''); 
        handleClose();
    };


  return (
    <>
        <Container>
            <Row className='border'>
                <Col>
                <Row>
                    <Col>
                    {
                    docTrabajo?docTrabajo.aentregas&&docTrabajo.aentregas.map((entrega, i)=>(
                        <Container key={i}>
                            <Row>
                                <Col className='bgentregassub mt-4 mb-3 contentEntregas' style={{borderRadius:'15px'}}>
                                    <center>
                                    <div>Entrega {i+1}</div>
                                    <div className='mt-2'>{entrega.descripcion} </div>
                                    </center>
                                    {
                                        entrega.imagenes!=''?(
                                            <Container className='mb-3 ImagenEntregaResponsive'> 
                                                <Row>
                                                    <Col className='responsiveSolis'></Col>
                                                    <Col>
                                                <center>
                                                <Carousel className='ImagenEntregas'>

                                            {
                                                entrega.imagenes.map((img, i)=>(
                                                    <Carousel.Item key={i} className='imgImg'>
                                                        <img
                                                        className="d-block w-100"
                                                        src={img}
                                                        alt="First slide"
                                                        width='50px'
                                                        />
                                                    </Carousel.Item>
                                                )
                                                )
                                            }

                                                </Carousel>
                                                </center>
                                                    </Col>
                                                    <Col className='responsiveSolis'></Col>
                                                </Row>
                                            </Container>
                                        ):('')
                                    }
                                    {
                                        entrega.documento!=''?(
                                            <Container className='mb-3 mt-3'>
                                            <center>
                                                <a href={entrega.documento} target="_blank"
                                                className="btn btn-primary">
                                                <i className="fa-solid fa-file-pdf"></i>
                                                {' '}{entrega.nombreDocumento}
                                                </a>
                                            </center>
                                            </Container>
                                            ):('')
                                    }
                                    {
                                        entrega.video!=''?(
                                            <center>
                                                <video
                                                src={entrega.video}
                                                className="d-block w-100 mb-3"
                                                controls
                                                ></video>
                                            </center>
                                        ):('')
                                    }
                                    {
                                        entrega.entregado!=true?(
                                        <Alert variant='danger'>
                                            <center>
                                                Esperando confirmacion de entrega
                                            </center>
                                        </Alert>
                                        ):(
                                        <Container className='mt-3'>
                                            <Alert variant='success'>
                                                <center>
                                                    Entrega confirmada
                                                </center>
                                            </Alert>
                                        </Container>
                                        )
                                    } 
                
                                </Col>
                            </Row>
                        
                            </Container>
                        )):('')
                    }
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {
                        docTrabajo&&docTrabajo.aentregas?(
                        <center>
                            <Alert variant='success'>
                                Entrega realizada
                            </Alert>
                        </center>
                        ):(
                        <center>
                            <Button onClick={handleShow}>Hacer entrega</Button>
                        </center>
                        )
                    }

                    </Col>
                </Row>
                </Col>
            </Row>
        </Container>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Realizar entrega</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <form ref={form} onSubmit={send}>
            
                
            
            { MultipleView != ''?(MultipleView.map((item, i)=>(

                
                
                /\.(jpe?g|png|jpg||)$/i.test(item[1])?(

                    <img
                    key={i}
                    src={item[0]}
                    className="imgModalEntrega border border-light rounded"
                    alt=""
                    />

                ):(/\.(pdf||)$/i.test(item[1])?( 

                    <a
                    key={i}
                        href={item[0]}
                        target="_blank"
                        className="btn btn-outline-primary"
                    >
                        <i className="fa-solid fa-file-pdf"> </i>
                        {selectedFile.name}
                    </a>

                ):(/\.(mp4||)$/i.test(item[1])?(  
                    <center>
                        <video
                        key={i}
                            src={item[0]}
                            className="imgModalEntrega border mb-3
                            border-light rounded"
                            controls
                        ></video>
                    </center>
            
                ):('')))
            ))):(
                preview?(/\.(jpe?g|png|jpg||)$/i.test(selectedFile.name)?(
                    <center>
                        <img
                        src={preview}
                        className="imgModalPerfil border 
                        border-light rounded"
                        alt=""
                        />
                    </center>
                ):(/\.(pdf||)$/i.test(selectedFile.name)?(
                    <Container>
                    <Row>
                        <Col>
                        <center>
                        <a
                        href={preview}
                        target="_blank"
                        className="btn btn-outline-primary"
                        >
                        <i className="fa-solid fa-file-pdf"> </i>
                        {selectedFile.name}
                        </a>
                        </center>
                        </Col>
                    </Row>
                </Container>
                ):(/\.(mp4||)$/i.test(selectedFile.name)?(
                    <Container>
                    <Row>
                        <Col>  
                        <center>
                        <video
                            src={preview}
                            className="filesChat"
                            controls
                        ></video>                           
                        </center>                                               
                        </Col>
                    </Row>
                </Container>
                ):('')))
                ):('')
            )}
                    
                
            


            <center>
            <label htmlFor="imagen"
                style={{color:'blue' }}><i className="fa-solid fa-camera"
            style={{color:'blue' }}></i> imagen, video
            o documento de referencia</label>
            <input type="file" id='imagen' multiple name='file'
            className="custom-file-input" onChange={onSelectFile}
            style={{display:'none'}}/>
            </center>


            <span>Descripcion</span>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-pen-to-square"
                style={{color:'blue'}}></i> 
                </span>
                <input type="text" className="form-control responsiveInpEntregas" name='mensaje'
                placeholder="Descripcion" />
            </div>

            {
                !hidden?(
                    <button type='submit' className='btn btn-success'>subir</button>
                ):(
                    <button className='btn btn-success' disabled>subir</button>
                )
            }

            </form>
            </Modal.Body>
        </Modal>
    </>
  )
}

export default Entregas