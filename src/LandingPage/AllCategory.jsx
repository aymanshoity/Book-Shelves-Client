import { Link } from "react-router-dom";
import SharedHeading from "../SharedComponents/SharedHeading";
import { Slide, Zoom } from "react-awesome-reveal";
import { motion } from "framer-motion"
const AllCategory = () => {
    return (
        <div className="py-24  ">
            <SharedHeading heading={'All categories'}></SharedHeading>
            <div className=" lg:w-[1280px] md:w[600px] w-[250px] mx-auto  grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-6">
                <Link to='/Thriller'>
                    <Slide direction="left">
                        <Zoom>
                            <motion.div
                                className=" w-[200px] h-[450px] bg-[#fefae0ff] shadow-xl"
                                whileHover={{ scale: [null, 1.2, 1.1] }}
                                transition={{ duration: 0.8 }}

                            >
                                <figure>
                                    <img className="w-[200px] h-[350px] " src="https://i.ibb.co/2qpFDNy/Red-Scarf-Girl.jpg" alt="Shoes" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-center">Thriller</h2>

                                </div>
                            </motion.div>

                        </Zoom>
                    </Slide>
                </Link>
                <Link to='/Science & Technology'>
                    <Slide direction="right">
                        <Zoom>
                            <motion.div
                                className=" w-[200px] h-[450px] bg-[#fefae0ff] shadow-xl"
                                whileHover={{ scale: [null, 1.2, 1.1] }}
                                transition={{ duration: 0.8 }}

                            >
                                <figure>

                                    <img className=" w-[200px] h-[350px] " src="https://i.ibb.co/6J3ykhk/Solidworks.jpg" alt="Shoes" />

                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-center">Science & Technology</h2>

                                </div>
                            </motion.div>

                        </Zoom>
                    </Slide>
                </Link>
                <Link to='/Literature & Fiction'>
                    <Slide direction="left">
                        <Zoom>
                            <motion.div
                                className=" w-[200px] h-[450px] bg-[#fefae0ff] shadow-xl"
                                whileHover={{ scale: [null, 1.2, 1.1] }}
                                transition={{ duration: 0.8}}

                            >
                                <figure>

                                    <img className="w-[200px] h-[350px]" src="https://i.ibb.co/xYCPgKm/The-Great-Gatsby.jpg" alt="Shoes" />

                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-center">Literature & Fiction</h2>

                                </div>
                            </motion.div>

                        </Zoom>
                    </Slide>
                </Link>
                <Link to='/History'>
                    <Slide direction="right">
                        <Zoom>
                            <motion.div
                                className=" w-[200px] h-[450px] bg-[#fefae0ff] shadow-xl"
                                whileHover={{ scale: [null, 1.2, 1.1] }}
                                transition={{ duration: 0.8 }}

                            >
                                <figure>

                                    <img className="w-[200px] h-[350px]" src="https://i.ibb.co/bR1r2xp/Live-from-Death-Row.jpg" alt="Shoes" />

                                </figure>
                                <div className="card-body text-center">
                                    <h2 className="card-title text-center">History</h2>

                                </div>
                            </motion.div>

                        </Zoom>
                    </Slide>
                </Link>
            </div>

        </div>
    );
};

export default AllCategory;