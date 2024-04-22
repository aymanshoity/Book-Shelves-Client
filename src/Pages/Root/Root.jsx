import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";


const Root = () => {
    const location =useLocation()
    const noHeader=location.pathname.includes('dashboard')
    return (
        <div className="bg-white font">
            {noHeader || <Navbar></Navbar>}
            <Outlet></Outlet>
        </div>
    );
};

export default Root;