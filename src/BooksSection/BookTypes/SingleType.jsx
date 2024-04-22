import { Link } from "react-router-dom";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const SingleType = ({book}) => {
    const { _id,name, image, authorName, ratings, category } = book;
    return (
        <div className="border border-spacing-1  bg-[#000068] bg-opacity-10 shadow-xl">
            <figure className="px-10 pt-10 flex flex-col items-center">
                <img src={image} alt="Shoes" className="rounded-xs h-[250px]" />
            </figure>
            <div className="card-body items-center text-center text-[#000068]">
                <h2 className="card-title font-extrabold h-[100px] ">{name}</h2>
                <p className='font-bold pt-2 h-[80px]'>Author Name:{authorName}</p>
                <p>Category: {category}</p>
                <span className="flex items-center"> <Rating
                   style={{ maxWidth: 180, width: '50%', margin:'auto' }} value={ratings} readOnly /></span>
                <div className="card-actions">
                    <Link to={`/dashboard/details/${_id}`}>
                        <button className="btn bg-[#000068] text-white">Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SingleType;