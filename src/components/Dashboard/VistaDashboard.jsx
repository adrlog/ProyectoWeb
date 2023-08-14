import HeaderPublic from "./HeaderPublic"
import Targetas from './Targetas'
import { PanelContext } from "../../context/PanelTrabajosProvider";
import { useContext } from "react";
import PanelWorks from "./PanelWorks";

const VistaDashboard = () => {
  
  const { State } = useContext(PanelContext);



  return (
    <div>
      {
        State
        ?<PanelWorks/>
        :<>
        <HeaderPublic/>
        <Targetas/>
        </>
      }
    </div>
  )
}

export default VistaDashboard