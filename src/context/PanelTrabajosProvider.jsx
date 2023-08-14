import { reload } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react'
import { db } from "../config/firebase";
import { doc, getDoc, onSnapshot, collection, query, where, getDocs } from "firebase/firestore";

export const PanelContext = createContext();

const PanelTrabajosProvider = (props) => {

    const [docUsuario, setdocUsuario]=useState();
    const [docTrabajo, setdocTrabajo]=useState();
    const [State, setState]=useState(false);


  return (
    <PanelContext.Provider 
    value={{docUsuario, setdocUsuario, docTrabajo, setdocTrabajo, State, setState}}>
        {props.children}
    </PanelContext.Provider>
  )
}

export default PanelTrabajosProvider