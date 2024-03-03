import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";


const Root = () => {
    return (
        <div className="bg-[#fefae0ff] font">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;