import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";


const UseLibrarian = () => {
    const {user}=useContext(AuthContext)
    const axiosSecure=UseAxiosSecure()
    const {data: isLibrarian=[],isPending:isLibrarianLoading}=useQuery({
        queryKey:[user?.email, 'isLibrarian'],
        queryFn: async()=>{
            const res=await axiosSecure.get(`/readers/librarian/${user.email}`)
            console.log(res.data)
            return res.data.librarian
        }
    })
    return [isLibrarian,isLibrarianLoading]
};

export default UseLibrarian;