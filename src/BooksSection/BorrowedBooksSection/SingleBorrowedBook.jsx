import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
const SingleBorrowedBook = ({ book }) => {
    const { readerName, readerEmail, returnedDate, _id,bookID, category, name, image } = book;
    const [desiredBook, setDesiredBook] = useState([])
    const axiosSecure = UseAxiosSecure()
    useEffect(() => {
        axiosSecure.get(`/books/${bookID}`)
            .then(res => {
                console.log(res.data)
                setDesiredBook(res.data)
            })
    }, [axiosSecure,bookID])
    
    const handleReturn = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure you want to return the book?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Return it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/borrowedBooks/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            const quantity = desiredBook.quantity + 1;
                            console.log(quantity)
                            const data = {
                                quantity: quantity,
                            }
                            axiosSecure.patch(`/books/${bookID}`, data)
                                .then(res => {
                                    console.log(res.data)
                                    if (res.data.modifiedCount > 0) {
                                        swalWithBootstrapButtons.fire({
                                            title: "Returned!",
                                            text: "Your file has been deleted.",
                                            icon: "success"
                                        });
                                    }
                                })
                        }
                    })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your book is still with you!!",
                    icon: "error"
                });
            }
        });
    }
    return (
        <div className=" text-[#783d19ff] my-5 glass lg:w-[800px] md:w-[500px] w-[250px] mx-auto bg-[#90b2ddff] shadow-xl flex flex-col md:flex-row gap-10 items-center">
            <div><figure><img className='w-[250px] h-[350px]' src={image} alt="Movie" /></figure></div>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p> Category: {category}</p>
                <p>Returned Date: {returnedDate}</p>
                <div className="card-actions justify-start py-2">
                    <button onClick={handleReturn} className="btn bg-[#783d19ff] text-[#faf8ea]">Return book</button>
                </div>
            </div>
        </div>
    );
};

export default SingleBorrowedBook;