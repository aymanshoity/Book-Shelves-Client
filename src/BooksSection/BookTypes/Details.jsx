import { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form"
import { BiBookReader } from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi";
import { BsCalendarDate } from "react-icons/bs";
import { AuthContext } from "../../Provider/AuthProvider";
const Details = () => {
    const { user } = useContext(AuthContext)
    const [book, setBook] = useState([])
    const axiosSecure = UseAxiosSecure()
    const { id } = useParams()
    useEffect(() => {
        axiosSecure.get(`/books/${id}`)
            .then(res => {
                console.log(res.data)
                setBook(res.data)
            })
    }, [axiosSecure, id])

    const [openModal, setOpenModal] = useState(false)
    // console.log(typeof(book.quantity))
    // console.log(book.quantity,book.quantity-1)


    const handleSubmit = e => {
        e.preventDefault()
        const form = e.target.elements;
        const readerName = form.readerName.value
        const readerEmail = form.readerEmail.value
        const returnedDate = form.returnedDate.value
        console.log(readerName, readerEmail, returnedDate)
        const borrowedBooks={
            readerName:readerName,
            readerEmail:readerEmail,
            returnedDate:returnedDate,
            bookID:book._id,
            category:book.category,
            name:book.name,

        }
        console.log(borrowedBooks)
        Swal.fire({
            title: "Are you Sure you want to borrow the book?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Sure",
            denyButtonText: `Not sure`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                
                axiosSecure.post('/borrowedBooks',borrowedBooks)
                .then(res=>{
                    console.log(res.data)
                    if(res.data.insertedId){
                        const quantity=book.quantity-1;
                        const data={
                            quantity:quantity
                        }
                        axiosSecure.patch(`/books/${id}`,data)
                        .then(res=>{
                            console.log(res.data)
                            if(res.data.modifiedCount > 0){
                                setOpenModal(false)
                                Swal.fire("Successfully Submitted!", "", "success");
                            }
                        })
                    }
                })
                
            } else if (result.isDenied) {
                Swal.fire("The form is not submitted", "", "info");
            }
        });
        // axiosSecure.post()
    }


    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/ns12sKV/Books-featuring-the-book-reading-and-study.jpg)' }}>
            <div className="hero-overlay bg-opacity-40"></div>
            <div className=" glass bg-[#90b2ddff]  shadow-2xl  lg:w-[1000px] md:w-[650px] w-[280px]">

                <div className="flex flex-col lg:flex-row gap-10 p-10 items-center">
                    <div className="lg:w-[1/4]">
                        <img className="w-[200px] h-[350px]" src={book.image} alt="" />
                    </div>
                    <div className=" lg:w-3/4 text-[#783d19ff]">
                        <h2 className="text-3xl font-bold">{book.name}</h2>
                        <p className="text-2xl font-bold">Author Name: {book.authorName}</p>
                        <p className="text-xl font-bold">Category: {book.category}</p>
                        <p className="text-xl font-bold">Ratings: </p>
                        <p className="text-xl font-bold pb-4">Details:{book.description} </p>

                        <button className=" btn glass text-lg mr-4 bg-[#783d19ff] text-[#faf8ea]">Read</button>

                        <button onClick={() => setOpenModal(true)} className="btn glass text-lg bg-[#783d19ff] text-[#faf8ea] ">Borrow</button>
                        <div onClick={() => setOpenModal(false)} className={`fixed flex justify-center items-center z-[100] ${openModal ? 'visible opacity-1' : 'invisible opacity-0'} inset-0 w-full h-full backdrop-blur-sm bg-black/20 duration-100`}>
                            <div onClick={(e_) => e_.stopPropagation()} className={`absolute w-full lg:w-[500px] bg-[#faf8ea] text-[#783d19ff] drop-shadow-2xl rounded-lg ${openModal ? 'opacity-1 duration-300 translate-y-0' : '-translate-y-20 opacity-0 duration-150'}`}>
                                <form onSubmit={handleSubmit} className="p-12">
                                    <svg onClick={() => setOpenModal(false)} className="w-10 mx-auto mr-0 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#000000"></path></g></svg>
                                    <h1 className="backdrop-blur-sm text-4xl pb-8">Fill up the form</h1>
                                    <div className="space-y-5">
                                        <label htmlFor="email" className="block">Reader Name</label>
                                        <div className="relative">

                                            <input id="email" type="text" disabled name="readerName"
                                                placeholder="John Doe" defaultValue={user.displayName} className="p-3 block w-full pl-10 drop-shadow-lg rounded-lg outline-none" />
                                            <span className="absolute top-1/4 left-2 font-bold text-2xl"><BiBookReader /></span>

                                        </div>
                                        <label htmlFor="email" className="block">Reader Email</label>
                                        <div className="relative">

                                            <input disabled defaultValue={user.email} name="readerEmail" id="email" type="email" placeholder="johndoe123@gmail.com" className="p-3 block w-full pl-10 drop-shadow-lg rounded-lg outline-none" />
                                            <span className="absolute top-1/4 left-2 font-bold text-2xl"><TfiEmail /></span>

                                        </div>
                                        <label htmlFor="Date" className="block">Return Date</label>
                                        <div className="relative">
                                            <input name="returnedDate" id="date" type="date" placeholder="8/03/24" className="p-3 block w-full pl-10 drop-shadow-lg rounded-lg outline-none" />
                                            <span className="absolute top-1/4 left-2 font-bold text-2xl"><BsCalendarDate /></span>

                                        </div>
                                    </div>
                                    {/* button type will be submit for handling form submission*/}
                                    <button type="submit" className="btn mt-5 text-[#faf8ea] bg-[#783d19ff]  relative inline-block">Submit</button>
                                </form>
                            </div>
                        </div>



                    </div>
                </div>

            </div>
        </div>
    );
};


export default Details;
// https://i.ibb.co/93zjYPK/Premium-Photo-Front-view-pile-of-books-with-copy-space.jpg
// https://i.ibb.co/7CQPscW/An-Old-Bookcase-In-A-Library-Background-3d-Illustration-Stockfoto-3d-Illustration-Wall-Wooden-Backgr.jpg
// https://i.ibb.co/ns12sKV/Books-featuring-the-book-reading-and-study.jpg