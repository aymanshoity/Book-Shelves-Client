import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import SharedHeading from "../../SharedComponents/SharedHeading";
import SingleBorrowedBook from "./SingleBorrowedBook";


const BorrowedBooks = () => {
    const {user}=useContext(AuthContext)
    const axiosSecure=UseAxiosSecure();
    const [borrowedBooks,setBorrowedBooks]=useState([])
    useEffect(()=>{
        axiosSecure.get(`/borrowedBooks/${user?.email}`)
        .then(res=>{
            console.log(res.data)
            setBorrowedBooks(res.data)
        })
    },[user,axiosSecure])
    return (
        <div className="py-24">
            <SharedHeading heading={'Borrowed Books'}></SharedHeading>
            <div className="">
                {
                    borrowedBooks.map(book=><SingleBorrowedBook key={book._id} book={book}></SingleBorrowedBook>)
                }
            </div>
        </div>
    );
};

export default BorrowedBooks;