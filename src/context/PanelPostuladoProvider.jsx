import { createContext, useEffect, useState } from 'react'
import Procesamiento from '../components/Publicaciones.jsx/Procesamiento';
import ProcesarPagos from '../components/Pagos/ProcesarPagos';

export const PostContext = createContext();

const PanelPostuladoProvider = (props) => {

    const { Perfil, UserInf,Postulaciones, PostulacionesInf} = Procesamiento();
    const[user, setuser]=useState();
    const[post, setpost]=useState();
    const[docUsuario, setdocUsuario]=useState();
    const[docTrabajo, setdocTrabajo]=useState();
    const [Actualizar,setActualizar]=useState(false);

    useEffect(()=>{
        Perfil();
        Postulaciones();
    },[Actualizar]);

    useEffect(()=>{
        if(UserInf){
            setuser(UserInf);
        }
        if(PostulacionesInf){
            setpost(PostulacionesInf);
        }
    },[UserInf, PostulacionesInf]);

    console.log('ejecutando provider')

  return (
    <PostContext.Provider 
    value={{setActualizar, post, user, docUsuario, setdocUsuario, docTrabajo, setdocTrabajo}}>
        {props.children}
    </PostContext.Provider>
  )
}

export default PanelPostuladoProvider