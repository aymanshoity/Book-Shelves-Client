import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";


const Root = () => {
    return (
        <div className="bg-[#faf8ea] font">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;