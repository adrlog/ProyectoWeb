import React from 'react'
import { createContext, useEffect, useState } from 'react'
import Procesamiento from '../components/Publicaciones/Procesamiento';

export const PubsContext = createContext();

const PanelPubsProvider = (props) => {

    const [Publicar, setPublicar]=useState(false);
    const [Detalles, setDetalles]=useState(false);
    const [Funsion, setFunsion]=useState(false);
    const [Vista, setVista] = useState(false);
    const [docUsuario, setdocUsuario] = useState(false);
    const [foraneo, setforaneo] = useState(false);
    const [metodosPago, setmetodosPago]=useState(false);
    const [Pagado, setPagado]=useState(false);


    const {ActualizarPostulados, Perfil, 
      UserInf,tarjetas, Tarjetas,}=Procesamiento();

      useEffect(()=>{
        Tarjetas();
      },[]);
    
      useEffect(()=>{
        if(tarjetas){
          setmetodosPago(tarjetas);
          console.log(tarjetas, 'hola y mis tarjetas?')
        }
      },[tarjetas]);

    useEffect(()=>{
      Perfil();
      if(UserInf){
        setdocUsuario(UserInf)
      }
      if(Funsion){
        ActualizarPostulados(Funsion)
      }
    },[Funsion]);

  return (
    <PubsContext.Provider 
    value={{Publicar, setPublicar, Detalles, setDetalles, setFunsion, Vista, 
    setVista, docUsuario, foraneo, setforaneo, metodosPago, Pagado, setPagado}}>
        {props.children}
    </PubsContext.Provider>
  )
}

export default PanelPubsProvider