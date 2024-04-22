import { Link } from "react-router-dom";
import SharedHeading from "../SharedComponents/SharedHeading";


const ErrorPage = () => {
    return (
       
           
            <div className="py-24 bg-white min-h-screen">
                <div className="flex flex-col items-center">
                    <SharedHeading heading={'404: Error'}></SharedHeading>
                    
                    <img className="w-[200px] h-[200px] " src="https://i.ibb.co/DG4Nxgq/Brown-Sad-GIF-Brown-Sad-Alone-Discover-Share-GIFs.gif" alt="" />
                    <Link to='/'><button className="btn bg-[#000068] text-white">Go back to Home</button></Link>
                </div>
            </div>

        
    );
};

export default ErrorPage;