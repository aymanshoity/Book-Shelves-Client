import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SharedHeading from "../../SharedComponents/SharedHeading";
import SingleType from "./SingleType";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";


const AllTypes = () => {
    const { category } = useParams();
    const axiosPublic=UseAxiosPublic()
    const [categories, setCategories] = useState([])
    const { data: allTypeBooks = [] ,refetch} = useQuery({
        queryKey: ['allType '],
        queryFn: async () => {
            await axiosPublic.get(`/books/category/${category}`)
                .then(res => {
                    console.log(res.data)
                    setCategories(res.data)
                    refetch()
                })

        }
    })
    console.log(allTypeBooks)
    
    return (
        <div>
            
            <SharedHeading heading={`${category} Books`}></SharedHeading>
            <div className="lg:w-[800px] md:[600px] w-[250px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    categories.map(book => <SingleType key={book._id} book={book}></SingleType>)
                }
            </div>
        </div>
    );
};

export default AllTypes;