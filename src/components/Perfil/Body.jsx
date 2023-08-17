import React, { useRef } from 'react'
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, InputGroup, Modal, Row, Spinner } from "react-bootstrap";
// import CreateIcon from "@mui/icons-material/Create";
import { actualizaTodo, db, auth } from "../../config/firebase";
import { doc, getDoc } from 'firebase/firestore';
import userDefault from '../../assets/defaultuser.jpg'
import carga from "../../assets/img/loading-cargando.gif"

const Body = () => {

    const user = auth.currentUser.uid.toString();
    const [UserInf, setUserInf]=useState();
    const [mensaje, setMensaje] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState(false);
    
    const form = useRef(null);

    const Today = new Date();  
    const date=Today.toISOString('en-US', { hour12: false })     
    var fecha = date.substr(0, 10);
    let formato1=`${fecha}`;
    useEffect(()=>{
    console.log('esperando');

        const Perfil = async () => {

            const ref = doc(db, 'Usuarios', user);
            const date = await getDoc(ref);
            setUserInf(date.data())
            console.log('buscando perfil',date.data());
        }
        Perfil()
    },[mensaje]);

  
    useEffect(() => {
      if (!selectedFile) {
        setPreview();
        return;
      }
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);
  
    const onSelectFile = (e) => {
      if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined);
        return;
      }
      setSelectedFile(e.target.files[0]);
      handleCloseModalImagen();
    };

    const handleRegister= async(e) =>{
        e.preventDefault();
        setMensaje('Enviando tus datos')
        const data = new FormData(form.current);
        const dataObject = Object.fromEntries([...data.entries()]);
        console.log(dataObject);
        try {
            const url = await actualizaTodo(dataObject, selectedFile);
            // console.log(url);
            if(url){
                setMensaje('cargado correctamente');
            }
            handleCloseModalImagen();
            window.location.reload();
          } catch (error) {
            console.log(error);
          }
    };

    const [showModalImagen, setShowModalImagen] = useState(false);
    const handleCloseModalImagen = () => setShowModalImagen(false);
    const handleShowModalImagen = () => setShowModalImagen(true);

  return (
    <>
    <Container>
        <Row>
            <Col md={8}>
            <Container>
                <Form onSubmit={handleRegister} ref={form}>
                <Row className='mt-5'>
                <Col xs={4}>Foto de perfil</Col>
                <Col xs={5}>
                    {
                        preview?(
                            <center>
                            <img src={preview} className='userPerfil' />
                            </center>
                        ):(
                            <center>
                            <img src={UserInf?UserInf.imagen?UserInf.imagen:userDefault:carga} className='userPerfil' />
                            </center>
                        )
                    }
                </Col>
                <Col xs={3}>
                    <a href="#" onClick={handleShowModalImagen}>
                     <i className="fa-solid fa-pen-to-square"></i>
                    </a>
                </Col>
                </Row>
                    <Form.Group className="mb-3" controlId="register.Nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        name='nombre'
                        style={{backgroundColor:'#4b5866', color:'white'}}
                        defaultValue={UserInf?UserInf.nombre?UserInf.nombre:'':''} 
                        type="text"
                        placeholder="Nombre usuario apellido(opcional)"
                        autoFocus
                    />
                    </Form.Group>
                    <Row>
                        <Col>
                        <Form.Group className="mb-3" controlId="register.Grupo">
                        <Form.Label>Ciclo escolar</Form.Label>
                        <Form.Control
                            name='grupo'
                            style={{backgroundColor:'#4b5866', color:'white'}}
                            defaultValue={UserInf?UserInf.grupo?UserInf.grupo:'':''}
                            type="text"
                            placeholder="(2020 - 2023)"
                            autoFocus
                        />
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group className="mb-3" controlId="register.Escuela">
                        <Form.Label>Escuela</Form.Label>
                        <Form.Control
                            name='escuela'
                            style={{backgroundColor:'#4b5866', color:'white'}}
                            defaultValue={UserInf?UserInf.escuela?UserInf.escuela:'':''}
                            type="text"
                            placeholder="Escuela plantel (lugar)"
                            autoFocus
                        />
                        </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="register.Carrera">
                    <Form.Label>Carrera</Form.Label>
                    <Form.Control
                        name='carrera'
                        style={{backgroundColor:'#4b5866', color:'white'}}
                        defaultValue={UserInf?UserInf.carrera?UserInf.carrera:'':''}
                        type="text"
                        placeholder="Sistemas computacionales"
                        autoFocus
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="register.Mensaje">
                    <Form.Label>Mensaje de presentacion</Form.Label>
                    <Form.Control
                        name='mensaje'
                        style={{backgroundColor:'#4b5866', color:'white'}}
                        defaultValue={UserInf?UserInf.mensaje?UserInf.mensaje:'':''}
                        type="text"
                        placeholder="Escribe un mensaje para que los usuarios puedan verlo"
                        autoFocus
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="register.Correo">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                        name='email'
                        style={{backgroundColor:'#a0a8b2'}}
                        defaultValue={UserInf?UserInf.email?UserInf.email:'':''}
                        type="email"
                        placeholder="name@example.com"
                        autoFocus
                    />
                    </Form.Group>
                    
                   
                    <Form.Group className="mb-3" controlId="register.submit">
                    <div className="d-grid gap-2 mt-2">
                    <Button type="submit" size="lg" style={{backgroundColor:'#006884'}}>Actualizar</Button>
                    </div>
                    </Form.Group>
                </Form>
            </Container>
            </Col>
            <Col>
            <Row className='mt-5' style={{backgroundColor:'#006884', color:'white'}}>
                <Col>
                <center>
                    Configuracion del perfil {formato1}
                </center>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col>
                    {
                        mensaje!=''&&(
                          <Alert variant="info">
                            {mensaje}
                          </Alert>
                        )
                    }
                </Col>
            </Row>
            </Col>
        </Row>
    </Container>

      <Modal show={showModalImagen} onHide={handleCloseModalImagen}>
        <Modal.Header closeButton>
          <Modal.Title>Edita perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-center p-3 ">
            <input
              onChange={onSelectFile}
              type="file"
              className="form-control"
              name="foto"
            />
          </Row>
        </Modal.Body>
      </Modal>
      
    </>
  )
}

export default Body