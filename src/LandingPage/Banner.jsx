

import { Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className=' '>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/0F29MGT/image.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-[#fefae0ff]">
                    <div className="max-w-xl">
                        <Slide direction="up" cascade>
                        <h1 className="mb-5 text-5xl font-bold">Book Shelves</h1>
                        <p className="mb-5">Your Gateway to a World of Books..</p>
                        <Link><button className="btn bg-[#90b2ddff] text-[#783d19ff]">Let's Explore</button></Link>
                        </Slide>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;