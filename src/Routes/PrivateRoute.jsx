import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";




const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const location=useLocation()
    if(loading){
       return <div className="flex flex-col items-center justify-center">
        <div className="w-10 h-10 my-36 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-white border-[#000068]">
        </div>
       </div>
    }
    if(user){
        return children;
    }

    return <Navigate to='/login' state={{from:location}}></Navigate>
    
};

export default PrivateRoute;