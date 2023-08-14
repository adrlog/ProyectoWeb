import { useContext, useEffect, useRef, useState } from "react";
import { PanelContext } from '../../context/PanelTrabajosProvider';
// import Peticiones from "./Peticiones";
import { Container } from "react-bootstrap";
import { SaveComent } from "./SaveComent";
import Peticiones from "./Peticiones";

const Comentarios = () => {

//   const { data } = useDataContext();
  const {docUsuario, docTrabajo, setState} = useContext(PanelContext);
  const { ConsComentarios,Mensajes}=Peticiones();
  const [mensaje, setMensaje] = useState("");
  const {guardarMensaje}=SaveComent()

  const form = useRef(null);

  useEffect(() => {
    ConsComentarios(docTrabajo);
  }, [docTrabajo]);
  const refZonaChat = useRef();

  useEffect(() => {
    // console.log(refZonaChat);
    refZonaChat.current.scrollTop = refZonaChat.current.scrollHeight;
  }, [Mensajes]);


  const send = (e) => {
    e.preventDefault();
    if (!mensaje.trim()) {
      console.log("Mensaje vacio");
      return;
    }
    const data = new FormData(form.current);
    const dataObject = Object.fromEntries([...data.entries()]);
    guardarMensaje(
      docTrabajo,
      dataObject.image,
      dataObject.doc,
      mensaje
    );
    // console.log(dataObject.doc);
    // console.log(dataObject.doc.name);
    form.current.reset();
    setMensaje("");
  };
  return (
    <> 
    <Container>

    <div className='container Comentarios'
              style={{ overflowY:'scroll'}}
              ref={refZonaChat}>
             { Mensajes ? Mensajes.map((msj, i)=>(

            <div className="container conversacion mt-1" key={i+3}>
            { msj.envia ==data.id ? 
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
                    <span className="badge bg-primary">
                        {msj.mensaje}
                    </span>
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
                    <span className="badge bg-secondary">
                        {msj.mensaje}
                    </span>
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

                      <input 
                        className="custom-file-input" 
                        type=""
                        id='emoji'
                        style={{display:'none'}}
                        name='emoji'
                      />
                      <label 
                        className='fa-solid fa-icons mt-2 p-2 azul'
                        htmlFor="emoji">
                      </label>

                      <input type="text" className='form-control' 
                        value={mensaje}
                        placeholder='Escribe aqui'
                        onChange={e=> setMensaje(e.target.value)} 
                        name='mensaje'
                      />

                      <div className='input-group-append'>
                        <button type='submit' className='btn btn-primary'>Enviar</button>
                    </div>
                </form>
    </Container>
    </>
  )
}

export default Comentarios