import { Link } from "react-router-dom";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
const SingleBook = ({ book }) => {
    const { _id, name, image, authorName, ratings, category, quantity } = book;

    // const secondExample = {
    //     size: 10,
    //     count: 5,
    //     activeColor: "red",
    //     value: ratings,
    //     a11y: true,
    //     isHalf: true,
    //     emptyIcon: <i className="far fa-star" />,
    //     halfIcon: <i className="fa fa-star-half-alt" />,
    //     filledIcon: <i className="fa fa-star" />,
    //     onChange: newValue => {
    //         console.log(`Example 2: new value is ${newValue}`);
    //     }
    // };
    // <ReactStars {...secondExample}/>
    return (
        <div className="border border-spacing-1 border-[#783d19ff] bg-[#fefae0ff] shadow-xl">
            <figure className="px-10 pt-10 flex flex-col items-center">
                <img src={image} alt="Shoes" className="rounded-xs h-[250px]" />
            </figure>
            <div className="card-body items-center text-center text-[#783d19ff]">
                <h2 className="card-title font-extrabold h-[80px] ">{name}</h2>
                <p className='font-bold pt-2'>Author Name:{authorName}</p>
                <p>Category: {category}</p>
                <p>Quantity: {quantity}</p>
                <span className="flex items-center"> <Rating
                   style={{ maxWidth: 180, width: '50%', margin:'auto' }} value={ratings} readOnly /></span>
                <div className="card-actions">
                    <Link to={`/updateBook/${_id}`}>
                        <button className="btn bg-[#783d19ff] text-[#fefae0ff]">Update</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SingleBook;