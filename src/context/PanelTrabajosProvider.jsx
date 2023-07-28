import { reload } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react'
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export const PanelContext = createContext();

const PanelTrabajosProvider = (props) => {

    const [docUsuario, setdocUsuario]=useState([]);
    // const [docTrabajo, setdocTrabajo]=useState();
    // const [State, setState]=useState(false);
    // const [Recargar, setRecargar]=useState(false);
    // const [docForPay, setdocForPay]=useState('');
    // const [docAcount, setdocAcount]=useState('');
    // const [metodosPago, setMetodosPago]=useState('');
    // const [pagado, setPagado]=useState(false);
    // const [extra, setExtra]=useState(false);


    // const trabajo=async (ref)=>{
    //   const docRef  = doc(db, "Usuarios", ref.idTrabajador, "Trabajos", ref.id);
    //   const docSnap = await getDoc(docRef);

    //   var dataDB=docSnap.data();
    //   setdocTrabajo(dataDB);
    // }

    // useEffect(()=>{
    //   trabajo(docTrabajo);
    // },[extra])


  return (
    <PanelContext.Provider 
    value={{docUsuario, setdocUsuario}}>
        {props.children}
    </PanelContext.Provider>
  )
}

export default PanelTrabajosProvider