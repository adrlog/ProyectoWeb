import Carousel from 'react-bootstrap/Carousel';
import { PubsContext } from '../../context/PanelPubsProvider'
import { useContext } from 'react';

const CarouselPanel = () => {
    const {Detalles}=useContext(PubsContext);
    const imgs=Detalles.Imagenes;
  return (
    <Carousel className='ImagenSolicitudesPanel'>

    {
        imgs?imgs.map((img, i)=>(
            <Carousel.Item key={i} className='imgImg imgResponsive'>
                <img
                className="d-block w-100"
                src={img}
                alt="First slide"
                />
            </Carousel.Item>
        )
        ):(         
        <Alert variant='primary'>
            No hay imagenes
        </Alert> 
        )
    }

    </Carousel>
  )
}

export default CarouselPanel