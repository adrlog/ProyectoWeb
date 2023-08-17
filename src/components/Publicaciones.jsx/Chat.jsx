import { useContext, useEffect, useRef, useState } from "react";
import Peticiones from "../Postulaciones/Peticiones";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { SaveComent } from "../Postulaciones/SaveComent.jsx";
import { PubsContext } from '../../context/PanelPubsProvider'
import { auth } from '../../config/firebase';
import userDefault from '../../assets/defaultuser.jpg';


const Chat = () => {
    var user = auth.currentUser.uid.toString();

    const {Detalles, foraneo}=useContext(PubsContext);
    const { ConsComentarios,Mensajes}=Peticiones();
    const [mensaje, setMensaje] = useState("");
    const {guardarMensaje}=SaveComent()
  
    const form = useRef(null);

    useEffect(() => {
        ConsComentarios(Detalles);
      }, [Detalles]);
      const refZonaChat = useRef();

    useEffect(() => {
        // console.log(refZonaChat);
        refZonaChat.current.scrollTop = refZonaChat.current.scrollHeight;
    }, [Mensajes]);

    const send = (e) => {

        e.preventDefault();
    
        if (!mensaje.trim()) {
          // console.log("Mensaje vacio");
          return;
        }
        
        const data = new FormData(form.current);
        const dataObject = Object.fromEntries([...data.entries()]);
        guardarMensaje(
          Detalles,
          dataObject.image,
          dataObject.doc,
          mensaje,
        );
        // console.log(dataObject.doc);
        // console.log(dataObject.doc.name);
        form.current.reset();
        setMensaje("");
    };

  return(
  <>
    <Alert variant="info">
        <Row>
            <Col md={4}>
            <img src={foraneo.imagen?foraneo.imagen:userDefault} className="imagenAmigos" />
            </Col>
            <Col>
            <h2>
            {foraneo.nombre}
            </h2>
            </Col>
        </Row>
    </Alert>
    <div className='container Comentarios ComentariosResponsive'
            style={{ overflowY:'scroll'}}
            ref={refZonaChat}>
            { Mensajes ? Mensajes.map((msj, i)=>(

        <div className="container conversacion mt-1" key={i+3}>
        { msj.envia ==user ? 
        (
            
            <div className="d-flex justify-content-end" key={i+msj.envia}>
            {
                msj.imagen!=''?(
                <img src={msj.imagen} className='filesChat' alt="..." />
                ): msj.video!=''?(
                <video src={msj.video} className='filesChat' controls></video>
                ): msj.documento!=''?(
                <a href={msj.documento} target='_blank'
                className='btn btn-primary'>
                    <i className="fa-solid fa-file-pdf"> </i>
                    {msj.documentoNombre}
                </a>
                ) : (
                    <p
                    className="bg-primary 
                        text-white 
                        p-1 
                        rounded 
                        text-break mb-1 fw-light"
                    style={{ maxWidth: "70%" }}
                    >
                    {msj.mensaje}
                    </p>
                )}
            </div>
            ) : (
            <div
                className="d-flex justify-content-start"
                key={i + msj.envia}
            >
                {msj.imagen != "" ? (
                <img
                    src={msj.imagen}
                    className="filesChat"
                    alt="..."
                />
                ) : msj.video != "" ? (
                <video
                    src={msj.video}
                    className="filesChat"
                    controls
                ></video>
                ) : msj.documento != "" ? (
                <a
                    href={msj.documento}
                    target="_blank"
                    className="btn btn-secondary"
                >
                    <i className="fa-solid fa-file-pdf"> </i>
                    {msj.documentoNombre}
                </a>
                ):(
                    <p
                    className="bg-secondary 
                        text-white 
                        p-1 
                        rounded 
                        text-break mb-1 fw-light"
                    style={{ maxWidth: "70%" }}
                    >
                    {msj.mensaje}
                    </p>
                )}
            </div>
        )}   
        </div>
        )) 
    :'cargando....' }
    </div>
  
    <form ref={form}
    className='input-group p-3 bg-light OptionButtons'
    onSubmit={send}>

          <input 
            className="custom-file-input" 
            type="file"
            style={{display:'none'}}
            id='inputGroupFile01'
            name='image'
            />
          <label 
            className='fa-solid fa-image mt-2 p-2 azul'
            htmlFor="inputGroupFile01">
          </label>

          <input 
            className="custom-file-input" 
            type="file"
            id='inputGroupFile02'
            style={{display:'none'}}
            name='doc'
          />
          <label 
            className='fa-solid fa-paperclip mt-2 p-2 azul'
            htmlFor="inputGroupFile02">
          </label>

          {/* <input 
            className="custom-file-input" 
            type=""
            id='emoji'
            style={{display:'none'}}
            name='emoji'
          />
          <label 
            className='fa-solid fa-icons mt-2 p-2 azul'
            htmlFor="emoji">
          </label> */}

          <input type="text" className='form-control formMensajeREsponsive' 
            value={mensaje}
            placeholder='Escribe aqui'
            onChange={e=> setMensaje(e.target.value)} 
            name='mensaje'
          />

          <div className='input-group-append'>
            <button type='submit' className='btn btn-primary btnEnviarResponsive'>Enviar</button>
        </div>
    </form>
  </>
  )
}

export default Chat