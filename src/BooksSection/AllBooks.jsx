import { useEffect, useState } from "react";
import SharedHeading from "../SharedComponents/SharedHeading";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import SingleBook from "./SingleBook";
import { useQuery } from "@tanstack/react-query";


const AllBooks = () => {
    const categoryNames = ['All Books', 'Available Books', 'Thriller', 'Literature & Fiction', 'History', 'Science & Technology']
    const [categories, setCategories] = useState([])
    const [displayCategories, setDisplayCategories] = useState([])
    const [clicked, setClicked] = useState('')
    const axiosSecure = UseAxiosSecure()

    const { data: allBooks = [] } = useQuery({
        queryKey: ['allBooks'],
        queryFn: async () => {
            await axiosSecure.get('/books')
                .then(res => {
                    console.log(res.data)
                    setCategories(res.data)
                    setDisplayCategories(res.data)
                    return {allBooks: res.data}
                })

        }
        
    })
    
    const handleClicked = name => {
        console.log(name)
        setClicked(name)

    }
    // useEffect(() => {
    //     axiosSecure.get('/books')
    //         .then(res => {
    //             console.log(res.data)
    //             setCategories(res.data)
    //             setDisplayCategories(res.data)
    //         })

    // }, [axiosSecure])
    useEffect(() => {
        if (clicked === 'Thriller') {
            const Thriller = categories.filter(item => item.category === "Thriller")
            console.log(Thriller)
            setDisplayCategories(Thriller)
        } else if (clicked === 'Literature & Fiction') {
            const Literature = categories.filter(item => item.category === "Literature & Fiction")
            console.log(Literature)
            setDisplayCategories(Literature)
        } else if (clicked === 'History') {
            const History = categories.filter(item => item.category === "History")
            console.log(History)
            setDisplayCategories(History)
        } else if (clicked === 'Science & Technology') {
            const Science = categories.filter(item => item.category === "Science & Technology")
            console.log(Science)
            setDisplayCategories(Science)
        } else if (clicked === 'Available Books') {
            const available = categories.filter(item => item.quantity > 0)
            console.log(available)
            setDisplayCategories(available)
        } else if (clicked === 'All Books') {

            setDisplayCategories(categories)
        }
    }, [categories, clicked])
    return (
        <div className=" mx-auto  ">
            
            <SharedHeading heading={'All Books'}></SharedHeading>
            <div className="flex  flex-col gap-6  justify-center items-start ">
                <div className="w-full flex flex-col items-center justify-center">
                <h1 className="p-2 md:text-2xl text-xl text-center text-[#000068]">----Select Category----</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 ">
                        {
                            categoryNames.map((name, index) =>
                                <button className={clicked===name ? 'btn px-4 py-2 text-[#000068] bg-[#000068]  bg-opacity-10 border-[#000068] rounded-full w-[180px]':'btn px-4 py-2 bg-[#000068] text-white rounded-full w-[180px]'} key={index} onClick={() => handleClicked(name)}><a className={clicked === name && ''}>{name}</a></button>)
                        }
                    </div>
                </div>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        displayCategories.map(book => <SingleBook key={book._id} book={book}></SingleBook>)
                    }

                </div>
            </div>
        </div>
    );
};

export default AllBooks;