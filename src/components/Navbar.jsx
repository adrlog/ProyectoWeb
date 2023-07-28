import { NavLink } from "react-router-dom";

const Navbar =()=>{

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink to="/" className={"btn btn-outline-primary"}>Home</NavLink>
                <NavLink to="/dashboard" className={"btn btn-outline-primary"}>About</NavLink>
                <NavLink to="/register" className={"btn btn-outline-primary"}>Blog</NavLink>
            </div>
        </nav>
    )
}
export default Navbar;