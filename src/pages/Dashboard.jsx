import VistaDashboard from "../components/Dashboard/VistaDashboard";
import PanelTrabajosProvider from "../context/PanelTrabajosProvider";

const Dashboard = () => {

    return(
        <>
        <PanelTrabajosProvider>
        <VistaDashboard/>
        </PanelTrabajosProvider>
        </>
    )
};

export default Dashboard;
