import React, { useState } from 'react'
import { db, auth } from "../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  onSnapshot,
  updateDoc,
  doc,
  Timestamp,
  arrayUnion, arrayRemove,
} from "firebase/firestore";

const Peticiones = () => {
    
    const [Mensajes, setMensajes] = useState();


    const ConsComentarios = (doc) => {
        var id = doc.idSolicita;
        const q = collection(db, "Usuarios", id, "Trabajos", doc.id, "Comentarios");
        onSnapshot(q, (query) => {
          const arrayMensajes = query.docs.map((item) => item.data());
          setMensajes(arrayMensajes);
        });
    };

  return {
    ConsComentarios,
    Mensajes,
  }
}

export default Peticiones