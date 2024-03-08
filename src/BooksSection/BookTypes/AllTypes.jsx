import { useParams } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useEffect, useState } from "react";
import SharedHeading from "../../SharedComponents/SharedHeading";
import SingleType from "./SingleType";


const AllTypes = () => {
    const {category}=useParams();
    const axiosSecure=UseAxiosSecure()
    const [categories,setCategories]=useState([])
    useEffect(()=>{
        axiosSecure.get(`/books/category/${category}`)
        .then(res=>{
            console.log(res.data)
            setCategories(res.data)
        })
    },[category,axiosSecure])
    return (
        <div>
            <div>
                <img className="w-full lg:h-[600px] h-[400px]" src="https://i.ibb.co/zXHwbQk/pexels-josh-sorenson-990432.jpg" alt="" />
            </div>
            <SharedHeading heading={`${category} Books`}></SharedHeading>
            <div className="lg:w-[1280px] md:[600px] w-[250px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    categories.map(book=><SingleType key={book._id} book={book}></SingleType>)
                }
            </div>
        </div>
    );
};

export default AllTypes;