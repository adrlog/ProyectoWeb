import React from 'react'
import { createContext, useEffect, useState } from 'react'
import Procesamiento from '../components/Publicaciones/Procesamiento';
import ProcesarPagos from '../components/Pagos/ProcesarPagos';

export const PagosContext = createContext();

const PanelPagosProvider = (props) => {

    const [Pagos, setPagos]=useState(false);
    const [Correo, setCorreo]=useState(false);
    const [Nombre, setNombre]=useState(false);
    const [Estado, setEstado]=useState(false);
    const [Pagado, setPagado]=useState(false);
    const [Actualizar,setActualizar]=useState(false);
    const {Perfil, UserInf}=Procesamiento();
    const { Account, CuentaPagos,} = ProcesarPagos();
    useEffect(()=>{
        console.log('Actualizando');
        Perfil();
        CuentaPagos();
    },[Actualizar]);

    useEffect(()=>{
        if(UserInf){
            if(UserInf.pagos){
                setPagos(true);
                setCorreo(UserInf.email);
                setNombre(UserInf.nombre);
            }else {
                setPagos(false);
                setCorreo(UserInf.email);
                setNombre(UserInf.nombre);
            }
        }
        // if(Account){
        //     setEstado(Account.Estado);
        // }
    },[UserInf]);

    // console.log('ejecutando provider')

  return (
    <PagosContext.Provider 
    value={{Pagos, Correo, setActualizar, Nombre, Estado, Perfil, CuentaPagos, Pagado, setPagado, setEstado, setPagos}}>
        {props.children}
    </PagosContext.Provider>
  )
}

export default PanelPagosProvider