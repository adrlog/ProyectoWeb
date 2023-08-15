import Carousel from 'react-bootstrap/Carousel';
import { useContext } from 'react';
import { PanelContext } from '../../context/PanelTrabajosProvider';

const CaruzelPanelPublic = () => {

    const {docTrabajo} = useContext(PanelContext);
    const imgs=docTrabajo.Imagenes;

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

export default CaruzelPanelPublic