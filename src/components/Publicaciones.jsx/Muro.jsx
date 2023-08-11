import React from 'react'
import user from '../../assets/defaultuser.jpg';
import { Col, Row, Modal, Dropdown } from 'react-bootstrap';


// import LinearScaleIcon from "@mui/icons-material/LinearScale";

const Muro = () => {
    
    const handleChange = (value, id) => {
        //console.log(value);
    
        // setPost(id);
        // if (value == "eliminar") {
        //   handleShow();
        // }
        // if (value == "destacar") {
        //   //console.log("destacado");
        //   destacaPost(id);
        //   setNuevaPublicacion(true);
        // }
      };

      const darlike = async (post) => {
        // await darLikeAPublicacion(post);
        // setNuevaPublicacion(true);
      };

  return (
    <Row className="me-1 ">
        <Col xs={12} className="bg-light p-2  rounded">
          <Row>
            <Col xs={8} className="fs-4 fw-bold">
              Publicaciones
            </Col>

            {/* <Col xs={4} className="ps-0">
              <p className="text-end mb-0">
                <Dropdown className="ms-auto">
                  <Dropdown.Toggle
                    variant=""
                    className="btn-outline-primary btn-sm"
                  >
                    <TuneIcon fontSize="small"></TuneIcon>
                    {"  Filtro"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#" onClick={(e) => setFiltro("Todos")}>
                      Todos
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#"
                      onClick={(e) => setFiltro("Publico")}
                    >
                      Publico
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#"
                      onClick={(e) => setFiltro("Oculto")}
                    >
                      Oculto
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#"
                      onClick={(e) => setFiltro("Destacado")}
                    >
                      Destacado
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </p>
            </Col> */}
          </Row>
        </Col>

          <Col xs={12} className="mt-2 bg-light p-3">
            <div>
              <Row className="">
                <div className="imgModalPerfilContenedor">
                  <img
                    src={user}
                    alt=""
                    className="imgMuroPerfil rounded-circle"
                  />
                </div>

                <Col xs={7}>
                  <Row>
                    <p className="m-0 p-0 fs-6 fw-bolder">
                      {/* {post.nombre} */}
                      nombre
                    </p>
                  </Row>
                  <Row>
                    <p
                    
                      className="p-0 m-0"
                      style={{ fontSize: "13px" }}
                    >
                      {/* {post.fechaDDMMAAAA} */}
                      fecha
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
                          onClick={(e) => handleChange("destacar")}
                        >
                          Destacar
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#"
                          onClick={(e) => handleChange("eliminar")}
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
                    {/* {post.descripcion} */}
                    descripcion
                </p>
              </Row>

              <Row className="justify-content-center">
                <Col xs={12} className=" ">
                  {/* {post.imagenesFormateadas ? (
                    <ImageGallery
                      items={post.imagenesFormateadas}
                      showPlayButton={false}
                      showNav={false}
                    />
                  ) : (
                    ""
                  )} */}

                  <img
                    className="img-fluid "
                    src={user}
                    alt=""
                  />
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <Row className="mt-2">
                    <Col xs={2}>
                      <span className="me-2">
                      </span>
                      {/* <span>{post.Likes ? post.Likes.length : 0}</span> */}
                      5
                    </Col>
                    <Col xs={2}>
                      <span className="me-2">
                      </span>
                      <span>0</span>
                    </Col>
                  </Row>
                  <hr className="mt-2" />
                  <Row className=" justify-content-around">
                    <Col xs={6} sm={4}>
                      <button
                        onClick={(e) => darlike()}
                        style={{ border: "none" }}
                        className="btn btn-outline-secondary btn-sm"
                      >
                        <span className="me-2">
                        </span>
                        <span>Me gusta</span>
                      </button>
                    </Col>
                    <Col xs={6} sm={4}>
                      <span className="me-2">
                      </span>
                      <span>Comentar</span>
                    </Col>
                  </Row>
                </Col>
                <Col xs={12}></Col>
              </Row>
            </div>
          </Col>
      </Row>
  )
}

export default Muro