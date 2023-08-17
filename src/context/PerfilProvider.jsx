import { createContext, useEffect, useState } from 'react'

export const PerfilContext = createContext();

const PerfilProvider = (props) => {
  return (
    <PerfilContext.Provider 
    value={{}}>
        {props.children}
    </PerfilContext.Provider>
  )
}

export default PerfilProvider