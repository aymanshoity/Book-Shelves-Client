import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import Swal from "sweetalert2";
import UseLibrarian from "../Hooks/UseLibrarian";


const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext)
    const [isLibrarian] = UseLibrarian()

    const navigate = useNavigate()
    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire(`${user.displayName} logged out!!`)
                navigate('/')
            })
            .catch()
    }

    const dashMenu = <>
            <NavLink to='/' className={({ isActive }) => (isActive ? 'text-[#000068] px-2 py-1 rounded-md bg-white  mb-4' : 'text-white  mb-4')}>Home</NavLink>
        {
            !isLibrarian && <>

                <NavLink to='/dashboard/borrowedBooks' className={({ isActive }) => (isActive ? 'text-[#000068] px-2 py-1 rounded-md bg-white  mb-4' : 'text-white  mb-4')}>Borrowed Books</NavLink>


            </>

        }
        {
            isLibrarian && <>

                <NavLink to='/dashboard/addBook' className={({ isActive }) => (isActive ? 'text-[#000068] px-2 py-1 rounded-md bg-white   mb-4' : 'text-white  mb-4')}>Add Book</NavLink>
                <NavLink to='/dashboard/allBooks' className={({ isActive }) => (isActive ? 'text-[#000068] px-2 py-1 rounded-md bg-white   mb-4' : 'text-white  mb-4')}>All Books</NavLink>
                <NavLink to='/dashboard/allReaders' className={({ isActive }) => (isActive ? 'text-[#000068] px-2 py-1 rounded-md bg-white   mb-4' : 'text-white  mb-4')}>All Readers</NavLink>



            </>
        }

    </>
    return (
        <div className="drawer lg:drawer-open"  >
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content py-10 px-5 bg-white" > 
                {/* Page content here */}
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row gap-2 items-center">
                        <label htmlFor="my-drawer-2" className="btn bg-[#000068] text-white drawer-button lg:hidden"><TiThMenu /></label>
                        <h1 className="md:text-2xl lg:font-bold text-xl text-[#000068]">Welcome {user?.displayName}!!!</h1>
                    </div>
                    <div className="dropdown dropdown-end ">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={user?.imageURL} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#000068] text-white rounded-box w-52">

                            <li><a onClick={handleLogOut}>Logout</a></li>
                        </ul>
                    </div>

                </div>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-[#000068] text-white hero">
                    <div className="flex flex-col justify-center ">

                        <div className="text-center flex flex-col items-center py-10 text-white">
                        <Link to='/'><img className="w-[80px] h-[80px]" src="https://i.ibb.co/5n6pym4/book.png" alt="" /></Link>
                        <h1 className=" text-3xl font-bold">Book Shelves</h1>
                        </div>

                        {dashMenu}
                    </div>
                    {/* Sidebar content here */}
                    
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;