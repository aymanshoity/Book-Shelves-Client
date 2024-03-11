import { Link } from "react-router-dom";
import SharedHeading from "../SharedComponents/SharedHeading";


const ErrorPage = () => {
    return (
       
           
            <div className="py-24 bg-[#faf8ea] min-h-screen">
                <div className="flex flex-col items-center">
                    <SharedHeading heading={'404 Error Page'}></SharedHeading>
                    <Link to='/'><button className="btn pb-5 bg-[#783d19ff] text-[#faf8ea]">Go back to Home</button></Link>
                    <img className="w-[200px] h-[200px] " src="https://i.ibb.co/DG4Nxgq/Brown-Sad-GIF-Brown-Sad-Alone-Discover-Share-GIFs.gif" alt="" />
                </div>
            </div>

        
    );
};

export default ErrorPage;