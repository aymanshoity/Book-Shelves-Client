import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import UseLibrarian from "../Hooks/UseLibrarian";


const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire(`${user.displayName} logged out!!`)
                navigate('/')
            })
            .catch()
    }
    const link = <>
        <NavLink to='/' className={({ isActive }) => (isActive ? 'text-white font-extrabold text-lg mr-4' : 'text-white text-lg mr-4')}>Home</NavLink>

        {user ? <>

            <NavLink onClick={handleLogOut} className='text-white font-bold text-lg mr-4' >Logout</NavLink>
            <NavLink to='/dashboard' className={({ isActive }) => (isActive ? 'text-white font-extrabold text-lg mr-4' : 'text-white text-lg mr-4')}>Dashboard</NavLink>

        </> : <>
            <NavLink to='/login' className={({ isActive }) => (isActive ? 'text-white font-extrabold text-lg mr-4' : 'text-white text-lg mr-4')}>Login</NavLink>

        </>
        }
    </>




    return (
        <div className="navbar bg-[#000068] fixed z-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow text-white bg-[#000068] rounded-box w-52">
                        {link}
                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    <img className="w-[80px] h-[80px]" src="https://i.ibb.co/5n6pym4/book.png" alt="" />
                    <h3 className="text-white font-semibold text-2xl">Book Shelves</h3>
                </div>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 items-center">
                    {link}
                </ul>
            </div>

        </div>
    );
};

export default Navbar;