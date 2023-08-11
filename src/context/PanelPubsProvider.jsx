import React from 'react'
import { createContext, useEffect, useState } from 'react'

export const PubsContext = createContext();

const PanelPubsProvider = (props) => {

    const [Publicar, setPublicar]=useState(false);

  return (
    <PubsContext.Provider 
    value={{Publicar, setPublicar}}>
        {props.children}
    </PubsContext.Provider>
  )
}

export default PanelPubsProvider