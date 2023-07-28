import { useEffect, useState } from "react";
import { login, registered } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Alert, Col, Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import logo from '../assets/logo.png';
import { SubmitDataRegister } from "../config/firebase";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const [nombre, setNombre] = useState("");
    const [grupo, setGrupo]= useState("");
    const [escuela, setEscuela]= useState("");
    const [carrera, setCarrera] = useState("");
    const [password2, setPassword2]= useState("");
    const [show, setShow] = useState(false);
    const [register, setRegister] = useState(false);
    const [mensaje, setMensaje] = useState('');

    const handleClose2 = () => {
      setRegister(false);
      setMensaje('');
    }
    const handleClose = () => {
      setShow(false);
      setMensaje('');
    }
    
    const handleShow = () => setShow(true);
    const navigate=useNavigate();
    const {user} = useUserContext();

    useEffect(()=>{
        if(user){
            navigate('/dashboard');
        }
    },[user]);

    const handleSubmit= async(e) =>{
        e.preventDefault()
        console.log('me diste a submit');
        if(email.trim()==''){
          setMensaje('El campo correo es requerido');
          return
        }
        if(password.trim()==''){
          setMensaje('El campo contraseña es requerido');
          return
        }
        try {
            const credential=await login({email, password});
            console.log(credential)
        } catch (error) {
            console.log(error.message)
            if(error.message=='Firebase: Error (auth/user-not-found).'){
              setMensaje('El usuario no existe');
            }
            if(error.message=='Firebase: Error (auth/wrong-password).'){
              setMensaje('Contraseña incorrecta');

            }
        }
    }

    const handleRegister= async(e) =>{
        e.preventDefault()
        console.log('me diste a submit');
        if(nombre.trim()==''){
          setMensaje('El campo nombre es requerido');
          return
        }
        if(grupo.trim()==''){
          setMensaje('El campo grupo es requerido');
          return
        }
        if(escuela.trim()==''){
          setMensaje('El campo escuela es requerido');
          return
        }
        if(carrera.trim()==''){
          setMensaje('El campo carrera es requerido');
          return
        }
        if(email.trim()==''){
          setMensaje('El campo correo es requerido');
          return
        }
        if(password.trim()==''){
          setMensaje('El campo contraseña es requerido');
          return
        }
        if(password2.trim()==''){
          setMensaje('El campo confirmar contraseña es requerido');
          return
        }
        if(password!=password2){
          setMensaje('Las contraseñas no coinciden, intentalo de nuevo');
          return
        }
        try {
            const credential=await registered({email, password});
            console.log(credential, 'paso')
            if(credential){
              await SubmitDataRegister(email, password, nombre, grupo, escuela, carrera, credential.user.uid);
            }
        } catch (error) {
            console.log(error, 'nop paso')
            if(error.message=='Firebase: Password should be at least 6 characters (auth/weak-password).'){
              setMensaje('la contraseña debe ser mayor a 6 caracteres');
              return
            }
            if(error.message=='Firebase: Error (auth/email-already-in-use).'){
              setMensaje('El correo ya se encuentra autenticado');
            }
        }
    }

    const cambiar = ()=>{
        console.log('cambiar vista a registrar');
        setMensaje('');
        setShow(false);
        setRegister(true)

    }

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
        Iniciar sesion
        </Button>

        <Modal 
            show={show} 
            onHide={handleClose} 
            style={{width:'100%'}}
        >
        <Modal.Header  className="modaliniciarletras">
          <Modal.Title>
            <Container>
                <Row>
                    <Col>
                        <img src={logo} alt="" />
                    </Col>
                    <Col className="mt-3" md={12}>
                    <center>
                    <h2>Inicia sesion</h2>
                    </center>
                    </Col>
                    <Col>
                    <center>
                    <div className="d-grid gap-2">    
                        <Button variant="secondary" size="lg" className="iniciarGoogle">
                        <i className="fa-brands fa-google"></i> Iniciar con google
                        </Button>
                    </div>
                    </center>
                    </Col>
                </Row>
            </Container>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modaliniciarletras">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="entrar.Correo">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                style={{backgroundColor:'#a0a8b2'}}
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="entrar.Contraseña">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                style={{backgroundColor:'#a0a8b2'}}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                type="password"
                placeholder="*****"
                autoFocus
              />
            </Form.Group>
            {
              mensaje!=''&&(
                <Alert variant="danger">
                  {mensaje}
                </Alert>
              )
            }
            <Form.Group className="mb-3" controlId="entrar.Submit">
            <div className="d-grid gap-2 mt-5">
              <Button type="submit" size="lg" style={{backgroundColor:'#006884'}}>
                Entrar 
              </Button>
            </div>
            </Form.Group>
          </Form>
            <a style={{fontSize:'small', color:'white'}} className="btn" 
            onClick={cambiar}>¿No tienes cuenta?</a>
            {' '}
            <a style={{fontSize:'small', color:'white'}} className="btn">Olvide mi contraseña</a>
        </Modal.Body>
      </Modal>

      <Modal 
            show={register} 
            onHide={handleClose2} 
            style={{width:'100%'}}
        >
        <Modal.Header  className="modaliniciarletras">
          <Modal.Title>
            <Container>
                <Row>
                    <Col>
                        <img src={logo} alt="" />
                    </Col>
                    <Col className="mt-3" md={12}>
                    <center>
                    <h2>Registrarse</h2>
                    </center>
                    </Col>
                    <Col>
                    <center>
                    <div className="d-grid gap-2">    
                        <Button variant="secondary" size="lg" className="iniciarGoogle">
                        <i className="fa-brands fa-google"></i> Iniciar con google
                        </Button>
                    </div>
                    </center>
                    </Col>
                </Row>
            </Container>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modaliniciarletras">
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="register.Nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                style={{backgroundColor:'#4b5866'}}
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)}
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
                    style={{backgroundColor:'#4b5866'}}
                    value={grupo}
                    onChange={(e)=>setGrupo(e.target.value)}
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
                    style={{backgroundColor:'#4b5866'}}
                    value={escuela}
                    onChange={(e)=>setEscuela(e.target.value)}
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
                style={{backgroundColor:'#4b5866'}}
                value={carrera}
                onChange={(e)=>setCarrera(e.target.value)}
                type="text"
                placeholder="Sistemas computacionales"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="register.Correo">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                style={{backgroundColor:'#a0a8b2'}}
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Row>
                <Col>
                <Form.Group className="mb-3" controlId="register.Contraseña">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    style={{backgroundColor:'#a0a8b2'}}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    type="password"
                    placeholder="*****"
                    autoFocus
                />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3" controlId="register.Contrase2">
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control
                    style={{backgroundColor:'#a0a8b2'}}
                    value={password2}
                    onChange={(e)=>setPassword2(e.target.value)}
                    type="password"
                    placeholder="*****"
                    autoFocus
                />
                </Form.Group>
                </Col>
            </Row>
            {
              mensaje!=''&&(
                <Alert variant="danger">
                  {mensaje}
                </Alert>
              )
            }
            <Form.Group className="mb-3" controlId="register.submit">
            <div className="d-grid gap-2 mt-2">
              <Button type="submit" size="lg" style={{backgroundColor:'#006884'}}>Registrar</Button>
            </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
        </>
    )
};

export default Login;
