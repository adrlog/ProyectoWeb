import React from 'react'
import VistaPublicaciones from '../components/Publicaciones.jsx/VistaPublicaciones'
import PanelPubsProvider from '../context/PanelPubsProvider'

const Publicar = () => {
  return (
    <>
    <PanelPubsProvider>
     <VistaPublicaciones/>
    </PanelPubsProvider>
    </>
  )
}

export default Publicar