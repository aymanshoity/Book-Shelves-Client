import { Link } from "react-router-dom";


const SingleType = ({book}) => {
    const { _id,name, image, authorName, ratings, category } = book;
    return (
        <div className="border border-spacing-1 border-[#783d19ff] bg-[#fefae0ff] shadow-xl">
            <figure className="px-10 pt-10 flex flex-col items-center">
                <img src={image} alt="Shoes" className="rounded-xs h-[250px]" />
            </figure>
            <div className="card-body items-center text-center text-[#783d19ff]">
                <h2 className="card-title font-extrabold h-[80px] ">{name}</h2>
                <p className='font-bold pt-2'>Author Name:{authorName}</p>
                <p>Category: {category}</p>
                <p>Ratings:</p>
                <div className="card-actions">
                    <Link to={`/details/${_id}`}>
                        <button className="btn bg-[#783d19ff] text-[#fefae0ff]">Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SingleType;