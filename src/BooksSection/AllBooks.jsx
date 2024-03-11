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
        <div className="py-24 lg:w-[1280px] md:w-[600px] w-[250px] mx-auto  ">
            <div>
                <img className="w-full h-[400px]" src="../../public/category.jpeg" alt="" />
            </div>
            <SharedHeading heading={'All Books'}></SharedHeading>
            <div className="flex lg:flex-row flex-col gap-6  justify-start items-start ">
                <div className="lg:w-1/4 ">
                    <ul className="menu bg-[#783d19ff] text-[#fefae0ff] rounded-lg ">
                        <li className="p-2 text-center">----Select Category----</li>
                        {
                            categoryNames.map((name, index) =>
                                <li key={index} onClick={() => handleClicked(name)}><a className={clicked === name && 'text-[#783d19ff] bg-[#fefae0ff]'}>{name}</a></li>)
                        }
                    </ul>
                </div>
                <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        displayCategories.map(book => <SingleBook key={book._id} book={book}></SingleBook>)
                    }

                </div>
            </div>
        </div>
    );
};

export default AllBooks;