import React from 'react'
import PanelWorks from '../components/Dashboard/PanelWorks'
import PanelTrabajosProvider from "../context/PanelTrabajosProvider";

const Panel = () => {
  return (
    <>
        <PanelTrabajosProvider>
        <PanelWorks/>
        </PanelTrabajosProvider>
    </>
  )
}

export default Panel