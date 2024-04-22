import { useContext,  useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { BiBookReader } from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi";
import { BsCalendarDate } from "react-icons/bs";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
const Details = () => {
    const { user } = useContext(AuthContext)
    const [book, setBook] = useState([])
    const axiosPublic=UseAxiosPublic()
    const { id } = useParams()
    const { data: detailsBook = [] } = useQuery({
        queryKey: ['detailsBook'],
        queryFn: async () => {
            await axiosPublic.get(`/books/${id}`)
            .then(res => {
                console.log(res.data)
                setBook(res.data)
                return res.data
            })

        }
        
    })
    

    const [openModal, setOpenModal] = useState(false)
    const [openModalAgain, setOpenModalAgain] = useState(false)
    // console.log(book.quantity-book.quantity)
    // console.log(book.quantity-book.quantity)
    console.log(book.quantity, book.quantity - 1)
    const [count, setCount] = useState(book.quantity)

    const handleSubmit = e => {
        e.preventDefault()
        const form = e.target.elements;
        const readerName = form.readerName.value
        const readerEmail = form.readerEmail.value
        const returnedDate = form.returnedDate.value
        console.log(readerName, readerEmail, returnedDate)
        const borrowedBooks = {
            readerName: readerName,
            readerEmail: readerEmail,
            returnedDate: returnedDate,
            bookID: book._id,
            category: book.category,
            name: book.name,
            image: book.image,

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

                axiosPublic.post('/borrowedBooks', borrowedBooks)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.insertedId) {
                            const quantity = book.quantity - 1
                            setCount(quantity)
                            console.log(quantity, count)

                            const data = {
                                quantity: quantity,
                            }
                            axiosPublic.patch(`/books/${id}`, data)
                                .then(res => {
                                    console.log(res.data)
                                    if (res.data.modifiedCount > 0) {
                                        setOpenModal(false)
                                        Swal.fire("Successfully Borrowed!", "", "success");
                                    }
                                })
                        }
                    })

            } else if (result.isDenied) {
                Swal.fire("The form is not submitted", "", "info");
            }
        });
    }


    return (
        <div className="hero lg:h-screen min-h-screen my-10" style={{ backgroundImage: 'url(https://i.ibb.co/JzTKnjm/books-1614215-1280.jpg)' }}>
            {/* <div className="hero-overlay bg-opacity-40"></div> */}
            <div className=" glass shadow-2xl my-36 lg:w-[800px] md:w-[700px] w-[280px] mx-auto">

                <div className="flex flex-col lg:flex-row gap-10 p-10 items-center">
                    <div className="lg:w-[1/4]">
                        <img className="w-[200px] h-[350px]" src={book?.image} alt="" />
                    </div>
                    <div className=" lg:w-3/4 text-white">
                        <h2 className="text-3xl md:text-2xl font-bold">{book?.name}</h2>
                        <p className="text-2xl md:text-xl font-bold">Author Name: {book?.authorName}</p>
                        <p className="text-xl md:text-lg font-bold">Category: {book?.category}</p>
                        <p className="text-xl md:text-lg font-bold flex">Ratings:<span className=" text-xl"> <Rating
                   style={{ maxWidth: 180, width: '70%',  }} value={book?.ratings} readOnly /></span></p>
                        <p className="text-xl md:text-lg font-bold pb-4">Details:{book?.description?.slice(0,200)}... </p>

                        <button onClick={() => setOpenModalAgain(true)} className=" btn glass text-lg mr-4 bg-[#000068] text-white">Read</button>

                        <button disabled={count === 0} onClick={() => setOpenModal(true)} className="btn glass text-lg bg-[#000068] text-white ">Borrow</button>
                        <div onClick={() => setOpenModal(false)} className={`fixed flex justify-center items-center z-[100] ${openModal ? 'visible opacity-1' : 'invisible opacity-0'} inset-0 w-full h-full backdrop-blur-sm bg-black/20 duration-100`}>
                            <div onClick={(e_) => e_.stopPropagation()} className={`absolute w-full lg:w-[500px] bg-white text-[#000068] drop-shadow-2xl rounded-lg ${openModal ? 'opacity-1 duration-300 translate-y-0' : '-translate-y-20 opacity-0 duration-150'}`}>
                                <form onSubmit={handleSubmit} className="p-12">
                                    <svg onClick={() => setOpenModal(false)} className="w-10 mx-auto mr-0 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#000000"></path></g></svg>
                                    <h1 className="backdrop-blur-sm text-4xl pb-8">Fill up the form</h1>
                                    <div className="space-y-5">
                                        <label htmlFor="email" className="block">Reader Name</label>
                                        <div className="relative">

                                            <input id="email" type="text" disabled name="readerName"
                                                placeholder="John Doe" defaultValue={user?.displayName} className="p-3 block w-full pl-10 drop-shadow-lg rounded-lg outline-none" />
                                            <span className="absolute top-1/4 left-2 font-bold text-2xl"><BiBookReader /></span>

                                        </div>
                                        <label htmlFor="email" className="block">Reader Email</label>
                                        <div className="relative">

                                            <input disabled defaultValue={user?.email} name="readerEmail" id="email" type="email" placeholder="johndoe123@gmail.com" className="p-3 block w-full pl-10 drop-shadow-lg rounded-lg outline-none" />
                                            <span className="absolute top-1/4 left-2 font-bold text-2xl"><TfiEmail /></span>

                                        </div>
                                        <label htmlFor="Date" className="block">Return Date</label>
                                        <div className="relative">
                                            <input name="returnedDate" id="date" type="date" placeholder="8/03/24" className="p-3 block w-full pl-10 drop-shadow-lg rounded-lg outline-none" />
                                            <span className="absolute top-1/4 left-2 font-bold text-2xl"><BsCalendarDate /></span>

                                        </div>
                                    </div>
                                    
                                    <button type="submit" className="btn mt-5 text-white bg-[#000068]  relative inline-block">Submit</button>
                                </form>
                            </div>
                        </div>
                        <div onClick={() => setOpenModalAgain(false)} className={`fixed flex justify-center items-center z-[100] ${openModalAgain ? 'visible opacity-1' : 'invisible opacity-0'} inset-0 w-full h-full backdrop-blur-sm duration-100`}>
                            <div onClick={(e_) => e_.stopPropagation()} className={`absolute w-full lg:w-[500px] bg-white text-[#000068] drop-shadow-2xl rounded-lg ${openModalAgain ? 'opacity-1 duration-300 translate-y-0' : '-translate-y-20 opacity-0 duration-150'}`}>
                                <div className="p-12">
                                    <svg onClick={() => setOpenModalAgain(false)} className="w-10 mx-auto mr-0 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#000000"></path></g></svg>
                                    <h1 className="backdrop-blur-sm text-4xl pb-8">{book?.name}</h1>
                                    <div className="space-y-5">
                                        <p className="text-xl font-bold pb-4">Details:{book?.description} </p>
                                    </div>

                                </div>
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