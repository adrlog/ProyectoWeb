import HeaderPublic from "./HeaderPublic"
import Targetas from './Targetas'
import { PanelContext } from "../../context/PanelTrabajosProvider";
import { useContext } from "react";

const VistaDashboard = () => {
  
  const { docTrabajo, docUsuario, State } = useContext(PanelContext);



  return (
    <div>
      <HeaderPublic/>
      <Targetas/>
    </div>
  )
}

export default VistaDashboard