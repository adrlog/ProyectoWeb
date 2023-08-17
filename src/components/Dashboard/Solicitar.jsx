import { useState } from 'react'
import { db } from "../../config/firebase";
import { doc, getDoc, onSnapshot, collection, query, where, getDocs } from "firebase/firestore";

const Solicitar = () => {

  const [Publicaciones, setPublicaciones]=useState([]);

  const obtenerPublicaciones =async ()=>{
    var Mostrar = [];
    const q = collection(db, 'Usuarios');
    const users = await getDocs(q);
    
    for(var i=0; i<users.docs.length; i++){
      const snap = collection(db, 'Usuarios', users.docs[i].data()['id'], 'Trabajos');
      const pubs = await getDocs(snap);
      for(var j=0; j<pubs.docs.length; j++){
        if(!pubs.docs[j].data()['Estado']){
          // console.log(pubs.docs[j].data(),'hola desde prueba')
          Mostrar.push([pubs.docs[j].data(),users.docs[i].data()]);
        }
      }
    }
    console.log(Mostrar,'hola desde prueba');
    setPublicaciones(Mostrar);


  }
  return {
    obtenerPublicaciones,
    Publicaciones,
  }
}

export default Solicitar