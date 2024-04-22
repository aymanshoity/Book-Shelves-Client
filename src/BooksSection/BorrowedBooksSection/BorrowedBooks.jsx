import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import SharedHeading from "../../SharedComponents/SharedHeading";
import SingleBorrowedBook from "./SingleBorrowedBook";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";


const BorrowedBooks = () => {
    const {user}=useContext(AuthContext)
    const axiosPublic=UseAxiosPublic()
    const [borrowedBooks,setBorrowedBooks]=useState([])
    
    const { data: borrowBooks = [],refetch } = useQuery({
        queryKey: ['borrowBooks',user?.email],
        queryFn: async () => {
            const res=await axiosPublic.get(`/borrowedBooks/${user?.email}`)
            console.log(res.data)
            setBorrowedBooks(res.data)

        }
    })
    // useEffect(()=>{
    //     const fetchData=async()=>{
    //         try{
    //             const res=await axiosSecure.get(`/borrowedBooks/${user?.email}`)
    //             console.log(res.data)
    //             setBorrowedBooks(res.data)
    //         }
    //         catch(error){
    //             console.error('',error)
    //         }
    //     }
    //     fetchData()
    // },[user,axiosSecure])
    return (
        <div className="py-24 min-h-screen">
            <SharedHeading heading={'Borrowed Books'}></SharedHeading>
            {borrowedBooks.length===0 && <span className="text-red-500 text-2xl text-center font-bold flex justify-center">Nothing Borrowed</span>}
            <div className="">
                {
                    borrowedBooks.map(book=><SingleBorrowedBook refetch={refetch} key={book._id} book={book}></SingleBorrowedBook>)
                }
            </div>
        </div>
    );
};

export default BorrowedBooks;