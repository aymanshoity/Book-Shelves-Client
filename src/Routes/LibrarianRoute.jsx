import { useContext } from "react";
import UseLibrarian from "../Hooks/UseLibrarian";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const LibrarianRoute = ({children}) => {
    const [isLibrarian,isLibrarianLoading]=UseLibrarian()
    const location=useLocation()
    const {user,loading}=useContext(AuthContext)
    if(loading || isLibrarianLoading){
       return  <div className="flex flex-col items-center justify-center">
       <div className="w-10 h-10 my-36 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-white border-[#000068]">
       </div>
      </div>
    }
    if(user && isLibrarian){
        return children
    }else{
        return <Navigate to='/login' state={{from:location}}></Navigate>
    }
};

export default LibrarianRoute;