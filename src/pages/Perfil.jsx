import VistaPerfil from '../components/Perfil/VistaPerfil'
import PerfilProvider from '../context/PerfilProvider'

const Perfil = () => {
  return (
    <>
    <PerfilProvider>
        <VistaPerfil/>
    </PerfilProvider>
    </>
  )
}

export default Perfil