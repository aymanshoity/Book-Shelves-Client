import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import UseLibrarian from "../Hooks/UseLibrarian";


const Navbar = () => {
    const [isLibrarian] = UseLibrarian()

    const navigate = useNavigate('/')
    const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire(`${user.displayName} logged out!!`)
                navigate('/')
            })
            .catch()
    }
    const link = <>
        <NavLink to='/' className={({ isActive }) => (isActive ? 'text-[#fefae0ff] text-lg mr-4' : 'text-[#783d19ff] text-lg mr-4')}>Home</NavLink>


        {
            user && !isLibrarian && <>

                <NavLink to='/borrowedBooks' className={({ isActive }) => (isActive ? 'text-[#fefae0ff] text-lg mr-4' : 'text-[#783d19ff] text-lg mr-4')}>Borrowed Books</NavLink>
                <NavLink onClick={handleLogOut} className="text-[#783d19ff] text-lg mr-4">Logout</NavLink>

                <div className="flex flex-row items-center gap-2 border p-2 rounded-lg">
                    <h1 className="text-[#783d19ff]">{user.displayName}</h1>
                    <img className="w-[50px] h-[50px] rounded-full" src={user.photoURL} alt="" />


                </div>

            </>

        }
        {
            user && isLibrarian && <>

                <NavLink to='/addBook' className={({ isActive }) => (isActive ? 'text-[#fefae0ff] text-lg mr-4' : 'text-[#783d19ff] text-lg mr-4')}>Add Book</NavLink>
                <NavLink to='/allBooks' className={({ isActive }) => (isActive ? 'text-[#fefae0ff] text-lg mr-4' : 'text-[#783d19ff] text-lg mr-4')}>All Books</NavLink>
                <NavLink to='/allReaders' className={({ isActive }) => (isActive ? 'text-[#fefae0ff] text-lg mr-4' : 'text-[#783d19ff] text-lg mr-4')}>All Readers</NavLink>
                <NavLink onClick={handleLogOut} className="text-[#783d19ff] text-lg mr-4">Logout</NavLink>

                <div className="flex flex-row items-center gap-2 border p-2 rounded-lg">
                    <h1 className="text-[#783d19ff]">{user.displayName}</h1>
                    <img className="w-[50px] h-[50px] rounded-full" src={user.photoURL} alt="" />


                </div>
            </>
        }
        {
            !user && <>

                <NavLink to='/login' className={({ isActive }) => (isActive ? 'text-[#fefae0ff] text-lg mr-4' : 'text-[#783d19ff] text-lg mr-4')}>Login</NavLink>
            </>

        }





    </>
    return (
        <div className="navbar bg-[#90b2ddff] bg-opacity-80 fixed z-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#783d19ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#90b2ddff] rounded-box w-52">
                        {link}
                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    <img className="w-[80px] h-[80px]" src="https://i.ibb.co/5n6pym4/book.png" alt="" />
                    <h3 className="text-[#783d19ff] font-semibold text-2xl">Book Shelves</h3>
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