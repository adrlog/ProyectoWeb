import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
// import ImageIcon from "@mui/icons-material/Image";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const HacerPub = () => {
    
    const [descripcion, setdescripcion] = useState("");
    const [Horas, setHoras]= useState("");
    const [Titulo, setTitulo] = useState("");
    const [Tipo, setTipo]= useState(false);
    const [Materia, setMateria] = useState("");
    const [Departamento, setDepartamento]= useState("");
    const [Dias, setDias]= useState("");
    const [mensaje, setMensaje] = useState('');
    const [Presupuesto , setPresupuesto ] = useState('');
    const [Preferencias , setPreferencias ] = useState('');

    //Imagen
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview();
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile[0]);
    //console.log(objectUrl);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // console.log(e.target.files);
    creaArrelgo(e.target.files);
    setSelectedFile(e.target.files);
  };

  const creaArrelgo = (arregloImagenes) => {
    var arregloAuxilar = [];
    for (var i = 0; i < arregloImagenes.length; i++) {
      const objectUrl = URL.createObjectURL(arregloImagenes[i]);
      var imagen = {
        original: objectUrl,
        thumbnail: objectUrl,
      };
      arregloAuxilar.push(imagen);
    }

    setImagenes(arregloAuxilar);
  };

    const HacerPublicacion =(e)=>{
        e.preventDefault()
        console.log(Materia)
    }

  return (
    <>
        <Row className='bg-light p-3'>
            <Col>
            <Container>
            <h1><i className="fa-solid fa-left-long headerPublic"></i></h1>
            </Container>
            </Col>
            <Col>
            <h1>Crear una publicacion</h1>
            </Col>
            <Col>
            </Col>
        </Row>

        <Row className='mt-3 margen'>
        <Col className='border '>
        <Form onSubmit={HacerPublicacion}>
            <Form.Group className="mb-3" controlId="public.Titulo">
              <Form.Label>
                <h3>Titulo</h3></Form.Label>
              <Form.Control
                style={{backgroundColor:'#a0a8b2'}}
                value={Titulo} 
                onChange={(e) => setTitulo(e.target.value)}
                type="text"
                placeholder="Titulo del trabajo"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="public.Tipo">
                <Form.Label>{Tipo?"Tramite":'Curso'}</Form.Label>
                <Form.Check 
                    style={{fontSize:'30px'}}
                    type="switch"
                    label={Tipo?"Curso":'Tramite'}
                    value={Tipo}
                    onChange={(e)=>setTipo(!Tipo)}
                />
            </Form.Group>
            {Tipo?(
                <Row>
                <Col>
                <Form.Group className="mb-3" controlId="public.Materia2">
                <Form.Label>Materia</Form.Label>
                <Form.Control
                    style={{backgroundColor:'#a0a8b2'}}
                    value={Materia}
                    onChange={(e)=>setMateria(e.target.value)}
                    type="text"
                    placeholder="Sistemas computacionales"
                    autoFocus
                />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3" controlId="public.Contrase">
                <Form.Label>Horas al dia</Form.Label>
                <Form.Control
                    style={{backgroundColor:'#a0a8b2'}}
                    value={Horas}
                    onChange={(e)=>setHoras(e.target.value)}
                    type="number"
                    placeholder="1, 2, 3 ... hrs"
                    autoFocus
                />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3" controlId="public.Contrase2">
                <Form.Label>Dias</Form.Label>
                <Form.Control
                    style={{backgroundColor:'#a0a8b2'}}
                    value={Dias}
                    onChange={(e)=>setDias(e.target.value)}
                    type="text"
                    placeholder="Lunes, martes y jueves"
                    autoFocus
                />
                </Form.Group>
                </Col>
            </Row>

            ):(
            <Form.Group className="mb-3" controlId="public.Carrera">
              <Form.Label>Selecciona un departamento de tramite</Form.Label>
              <Form.Select                 
                value={Departamento}
                onChange={(e)=>setDepartamento(e.target.value)}
              >
                <option></option>
                <option value={'Servicios'}>Servicios escolares</option>
                <option value={'Vinculacion'}>Vinculacion escolar</option>
                <option value={'Finanzas'}>Finanzas</option>
              </Form.Select>
            </Form.Group>
            )}

                  <Col>
                    {imagenes.length > 0 ? (
                      <ImageGallery
                        items={imagenes}
                        showPlayButton={false}
                        showNav={false}
                      />
                    ) : (
                      ""
                    )}
                  </Col>
                  <Col xs={12} className="mb-2">
                    {/* TODO: Se debe agregar evento "al seleccionar imagen se abre el boton EXAMINAR"  */}
                    {/* Agregar Emogis, ubicacion y archivos (videos) */}

                    <span className="ms-2 px-1">
                      <label htmlFor="fileInput" className="btn btn-outline-secondary p-0 border-0">
                        <input
                          id="fileInput"
                          type="file"
                          multiple
                          className="d-none"
                          onChange={onSelectFile}
                        />
                        {/* <ImageIcon/> */} subir foto
                      </label>
                    </span>
                  </Col>
            <Row>
                <Col>
                <Form.Group className="mb-3" controlId="public.Presupuesto">
                <Form.Label>Presupuesto $$</Form.Label>
                <Form.Control
                    style={{backgroundColor:'#a0a8b2'}}
                    value={Presupuesto}
                    onChange={(e)=>setPresupuesto(e.target.value)}
                    type="number"
                    placeholder="$ MXN"
                    autoFocus
                />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3" controlId="public.Contrase2">
                <Form.Label>preferencias del candidato</Form.Label>
                <Form.Control
                    style={{backgroundColor:'#a0a8b2'}}
                    value={Preferencias}
                    onChange={(e)=>setPreferencias(e.target.value)}
                    type="text"
                    placeholder="Preferencias"
                    autoFocus
                />
                </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="public.Correo">
              <Form.Label>Descripcion</Form.Label>
                <Form.Control 
                style={{backgroundColor:'#a0a8b2'}}
                value={descripcion}
                onChange={(e)=>setdescripcion(e.target.value)}
                placeholder='Descripcion ...'
                as="textarea" rows={3} 
                />
            </Form.Group>

            {
              mensaje!=''&&(
                <Alert variant="danger">
                  {mensaje}
                </Alert>
              )
            }
            <Form.Group className="mb-3" controlId="public.submit">
            <div className="d-grid gap-2 mt-2">
              <Button type="submit" size="lg" style={{backgroundColor:'#006884'}}>Registrar</Button>
            </div>
            </Form.Group>
          </Form>
        </Col>
        <Col></Col>
        </Row>
    </>
  )
}

export default HacerPub