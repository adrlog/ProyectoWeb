import React, { useContext, useEffect } from 'react'
import user from '../../assets/defaultuser.jpg';
import { Col, Row, Modal, Dropdown, Container } from 'react-bootstrap';
import Procesamiento from './Procesamiento';
import ReactImageGallery from 'react-image-gallery';
import { PubsContext } from '../../context/PanelPubsProvider'


// import LinearScaleIcon from "@mui/icons-material/LinearScale";

const Muro = () => {

  const {Detalles, setDetalles}=useContext(PubsContext);
  const { Publicaciones, Historial, Perfil, UserInf } = Procesamiento();

  useEffect(()=>{
    console.log('ejecutando')
    Publicaciones();
    Perfil();
  },[])
  
  // console.log(Historial);

    const handleChange = (value, id) => {
    
        if (value == "eliminar") {
          console.log(value);
        }
        if (value == "destacar") {
          console.log("destacado");
        }

    };

    const detailsAside=(tarjeta) =>{
      setDetalles(tarjeta);
    }
      

  return (
    <Row className="me-1 mt-3">
        <Col xs={12} className="bg-light p-2  rounded">
          <Row>
            <Col xs={8} className="fs-4 fw-bold">
              Publicaciones
            </Col>
          </Row>
        </Col>

{
  Historial?Historial.map((item)=>(

    <Container onClick={()=>detailsAside(item)}>
        <Col xs={12} className="mt-2 HeaderPublicaciones2 p-3">
          <div>
            <Row className="">
              <div className="imgModalPerfilContenedor">
                <img
                  src={UserInf.Image?UserInf.Image:user}
                  alt=""
                  className="imgMuroPerfil rounded-circle"
                />
              </div>
      
              <Col xs={7}>
                <Row>
                  <p className="m-0 p-0 fs-6 fw-bolder">
                    {UserInf.nombre}
                  </p>
                </Row>
                <Row>
                  <p
                  
                    className="p-0 m-0"
                    style={{ fontSize: "13px" }}
                  >
                    {item.Vistafecha}
                  </p>
                </Row>
              </Col>
              <Col xs={3} className="ms-auto">
                <p className="text-end m-0 pe-2">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant=""
                      className="btn-outline-secondary border-0 pt-0 pb-0"
                      id="dropdown-basic"
                    >
                      {/* <LinearScaleIcon></LinearScaleIcon> */}
                      ...
                    </Dropdown.Toggle>
      
                    <Dropdown.Menu>
                      <Dropdown.Item
                        href="#"
                        onClick={(e) => handleChange("destacar", item)}
                      >
                        Destacar
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#"
                        onClick={(e) => handleChange("eliminar", item)}
                      >
                        Eliminar
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {/* <span className="badge bg-secondary">
                    {post.privacidad}{" "}
                  </span> */}
                </p>
              </Col>
            </Row>
            <Row className="mt-1">
              <p>
                  {item.descripcion}
              </p>
            </Row>
      
            <Row className="justify-content-center">
              <Col xs={12} className=" ">
                {item.imagenesFormateadas ? (
                  <ReactImageGallery
                    items={item.imagenesFormateadas}
                    showPlayButton={false}
                    showNav={false}
                  />
                ) : (
                  ""
                )}
      
                {/* <img
                  className="img-fluid "
                  src={user}
                  alt=""
                /> */}
              </Col>
            </Row>
          </div>
        </Col>
    </Container>
  )):(
    'Aun no tienes publicaciones'
    )
}
    </Row>
  )
}

export default Muro