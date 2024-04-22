import { Link } from "react-router-dom";
import SharedHeading from "../SharedComponents/SharedHeading";
import { motion } from "framer-motion"
const AllCategory = () => {
    return (
        <div className="py-24  ">
            <SharedHeading heading={'Explore Categories'}></SharedHeading>
            <div className=" lg:w-[1280px] px-10 mx-auto  grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-6">

                <div className="  bg-[#000068] bg-opacity-10 shadow-xl flex flex-col items-center justify-center">
                    <motion.figure
                        className="py-10"
                        whileHover={{ scale: [null, 1.2, 1.1] }}
                        transition={{ duration: 0.8 }}
                    >
                        <img className="w-[200px] h-[300px] " src="https://i.ibb.co/2qpFDNy/Red-Scarf-Girl.jpg" alt="Shoes" />
                    </motion.figure>
                    <div className="card-body">
                        <Link to='/dashboard/Thriller'>
                            <h2 className="btn w-[150px] py-2 px-4 rounded-full bg-[#000068] text-white ">Thriller</h2>
                        </Link>

                    </div>
                </div>


                <div className="  bg-[#000068] bg-opacity-10 shadow-xl flex flex-col items-center justify-center">
                    <motion.figure

                        className="py-10"
                        whileHover={{ scale: [null, 1.2, 1.1] }}
                        transition={{ duration: 0.8 }}

                    >

                        <img className=" w-[200px] h-[300px] " src="https://i.ibb.co/6J3ykhk/Solidworks.jpg" alt="Shoes" />

                    </motion.figure>
                    <div className="card-body">
                        <Link to='/dashboard/Science & Technology'>
                            <h2 className="btn w-[150px] py-2 px-4 rounded-full bg-[#000068] text-white ">Science & Technology</h2>
                        </Link>

                    </div>
                </div>



                <div className="  bg-[#000068] bg-opacity-10 shadow-xl flex flex-col items-center justify-center">
                    <motion.figure
                        className="py-10"
                        whileHover={{ scale: [null, 1.2, 1.1] }}
                        transition={{ duration: 0.8 }}

                    >

                        <img className="w-[200px] h-[300px]" src="https://i.ibb.co/xYCPgKm/The-Great-Gatsby.jpg" alt="Shoes" />

                    </motion.figure>
                    <div className="card-body">
                        <Link to='/dashboard/Literature & Fiction'>
                            <h2 className="btn w-[150px] py-2 px-4 rounded-full bg-[#000068] text-white ">Literature & Fiction</h2>
                        </Link>

                    </div>
                </div>



                <div className="  bg-[#000068] bg-opacity-10 shadow-xl flex flex-col items-center justify-center">
                    <motion.figure
                        className="py-10"
                        whileHover={{ scale: [null, 1.2, 1.1] }}
                        transition={{ duration: 0.8 }}

                    >

                        <img className="w-[200px] h-[300px]" src="https://i.ibb.co/bR1r2xp/Live-from-Death-Row.jpg" alt="Shoes" />

                    </motion.figure>
                    <div className="card-body text-center">
                        <Link to='/dashboard/History'>

                            <btn className="btn w-[150px] py-2 px-4 rounded-full bg-[#000068] text-white ">History</btn>
                        </Link>

                    </div>
                </div>



            </div>

        </div>
    );
};

export default AllCategory;