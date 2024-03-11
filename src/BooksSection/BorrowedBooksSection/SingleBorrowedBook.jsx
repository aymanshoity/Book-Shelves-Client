import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
const SingleBorrowedBook = ({ book }) => {
    const { returnedDate, _id, bookID, category, name, image } = book;
    const [desiredBook, setDesiredBook] = useState([])
    const axiosPublic=UseAxiosPublic()
    const { data: singleBook = [] ,refetch} = useQuery({
        queryKey: ['singleBook'],
        queryFn: async () => {
            const res=await axiosPublic.get(`/books/${bookID}`)
            console.log(res.data)
            return res.data
        }
    })
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res=await axiosPublic.get(`/books/${bookID}`)
    //             console.log(res.data)
    //             setDesiredBook(res.data)
    //         }
    //         catch(error){
    //             console.error('',error)
    //         }
    //     }
    //     fetchData()
    // }, [axiosPublic, bookID])

    const handleReturn =async (_id, bookID) => {
        console.log(_id, bookID)

        console.log(singleBook)

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
                axiosPublic.delete(`/borrowedBooks/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            
                            const quantity = singleBook?.quantity + 1;
                            console.log(singleBook?.quantity, quantity)
                            const data = {
                                quantity: quantity,
                            }
                            axiosPublic.patch(`/books/${bookID}`, data)
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
                    refetch()

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
        <div className=" text-[#783d19ff] my-5 glass lg:w-[800px] md:w-[500px] w-[250px] mx-auto bg-[#90b2ddff] shadow-xl flex flex-col lg:flex-row md:flex-row gap-10 items-center">
            <div><figure><img className='w-[250px] h-[350px]' src={image} alt="Movie" /></figure></div>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p> Category: {category}</p>
                <p>Returned Date: {returnedDate}</p>
                <div className="card-actions justify-start py-2">
                    <button onClick={() => handleReturn(_id, bookID)} className="btn bg-[#783d19ff] text-[#faf8ea]">Return book</button>
                </div>
            </div>
        </div>
    );
};

export default SingleBorrowedBook;