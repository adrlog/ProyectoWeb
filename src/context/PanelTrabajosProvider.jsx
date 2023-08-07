import { reload } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react'
import { db } from "../config/firebase";
import { doc, getDoc, onSnapshot, collection, query, where, getDocs } from "firebase/firestore";

export const PanelContext = createContext();

const PanelTrabajosProvider = (props) => {

    const [docUsuario, setdocUsuario]=useState([]);
    const [Publicaciones, setPublicaciones]=useState([]);
    const [Recargar, setRecargar]=useState(false);

    useEffect(()=>{

      if(Publicaciones.length==0){
        console.log('recargando...')
        setRecargar(!Recargar);
      }

      const obtenerPublicaciones =async ()=>{
        var Mostrar = [];
        const q = collection(db, 'Usuarios');
        const users = await getDocs(q);
        users.forEach(async (doc)=>{
          
          const snap = collection(db, 'Usuarios', doc.id, 'Trabajos');
          const pubs = await getDocs(snap);
          const dataDB = pubs.docs.map((item)=>item.data());
          Mostrar.push([dataDB,doc.data()]);
          console.log(Mostrar)

        })

        setPublicaciones(Mostrar);

      }

      obtenerPublicaciones();

    },[Recargar])


  return (
    <PanelContext.Provider 
    value={{docUsuario, setdocUsuario, Publicaciones}}>
        {props.children}
    </PanelContext.Provider>
  )
}

export default PanelTrabajosProvider