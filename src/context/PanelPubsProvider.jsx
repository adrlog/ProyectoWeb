import React from 'react'
import { createContext, useEffect, useState } from 'react'

export const PubsContext = createContext();

const PanelPubsProvider = (props) => {

    const [Publicar, setPublicar]=useState(false);
    const [Detalles, setDetalles]=useState(false);

  return (
    <PubsContext.Provider 
    value={{Publicar, setPublicar, Detalles, setDetalles}}>
        {props.children}
    </PubsContext.Provider>
  )
}

export default PanelPubsProvider