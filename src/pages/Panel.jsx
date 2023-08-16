import React from 'react'
import PanelWorks from '../components/Dashboard/PanelWorks'
import PanelTrabajosProvider from "../context/PanelTrabajosProvider";
import VistaPostulaciones from '../components/Postulaciones/VistaPostulaciones';
import PanelPostuladoProvider from '../context/PanelPostuladoProvider';

const Panel = () => {
  return (
    <>
    <PanelPostuladoProvider>
     <VistaPostulaciones/>
    </PanelPostuladoProvider>
    </>
  )
}

export default Panel