import { useState } from 'react'
import { db } from "../../config/firebase";
import { doc, getDoc, onSnapshot, collection, query, where, getDocs } from "firebase/firestore";

const Solicitar = () => {

  const [Publicaciones, setPublicaciones]=useState([]);

  const obtenerPublicaciones =async ()=>{
    var Mostrar = [];
    const q = collection(db, 'Usuarios');
    const users = await getDocs(q);
    users.forEach(async (doc)=>{
      
      const snap = collection(db, 'Usuarios', doc.id, 'Trabajos');
      const pubs = await getDocs(snap);
      const dataDB = pubs.docs.map((item)=>item.data());
      if(dataDB[0].Titulo){
        Mostrar.push([dataDB,doc.data()]);
        // console.log(Mostrar)
        setPublicaciones(Mostrar);
      }
    })


  }
  return {
    obtenerPublicaciones,
    Publicaciones,
  }
}

export default Solicitar