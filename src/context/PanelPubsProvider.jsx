import React from 'react'
import { createContext, useEffect, useState } from 'react'
import Procesamiento from '../components/Publicaciones.jsx/Procesamiento';

export const PubsContext = createContext();

const PanelPubsProvider = (props) => {

    const [Publicar, setPublicar]=useState(false);
    const [Detalles, setDetalles]=useState(false);
    const [Funsion, setFunsion]=useState(false);
    const [Vista, setVista] = useState(false);
    const [docUsuario, setdocUsuario] = useState(false);
    const [foraneo, setforaneo] = useState(false);

    const {ActualizarPostulados, Perfil, UserInf,}=Procesamiento();

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
    value={{Publicar, setPublicar, Detalles, setDetalles, setFunsion, Vista, setVista, docUsuario, foraneo, setforaneo}}>
        {props.children}
    </PubsContext.Provider>
  )
}

export default PanelPubsProvider