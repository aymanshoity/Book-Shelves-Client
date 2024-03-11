import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";




const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const location=useLocation()
    if(loading){
        <div className="w-10 h-10 my-36 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-sky-900 border-sky-400"></div>
    }
    if(user){
        return children
    }else{
        return <Navigate to='/login' state={{from:location}}></Navigate>
    }
    
};

export default PrivateRoute;