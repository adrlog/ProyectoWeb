import React from 'react'
import VistaPagos from '../components/Pagos/VistaPagos'
import PanelPagosProvider from '../context/PanelPagosProvider'

const Pagos = () => {
  return (
    <PanelPagosProvider>
      <VistaPagos/>
    </PanelPagosProvider>
  )
}

export default Pagos