import React, { useContext, useState } from 'react'
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
} from "firebase/firestore";
import { PanelContext } from '../../context/PanelTrabajosProvider';

const Peticiones = () => {
    
  const {docUsuario, docTrabajo} = useContext(PanelContext);
  const [Mensajes, setMensajes] = useState();
  var user=auth.currentUser.uid.toString();

  console.log(docUsuario, docTrabajo);

    const ConsComentarios = (doc) => {
        var id = doc.idTrabajador;
        const q = collection(db, "Usuarios", user, "Trabajos", docTrabajo.id, "Comentarios", id);
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