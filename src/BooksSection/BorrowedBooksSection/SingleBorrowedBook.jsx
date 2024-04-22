
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
const SingleBorrowedBook = ({ book,refetch }) => {
    const { returnedDate, _id, bookID, category, name, image } = book;
    const axiosSecure = UseAxiosSecure()
    const { data: singleBook = [] } = useQuery({
        queryKey: ['singleBook'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books/${bookID}`)
            console.log(res.data)
            return res.data
        }
    })
    

    const handleReturn = async (_id, bookID) => {
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
                axiosSecure.delete(`/borrowedBooks/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {

                            const quantity = singleBook?.quantity + 1;
                            console.log(singleBook?.quantity, quantity)
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
                                        refetch()

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
        <div>
            <div className=" mx-auto my-20 flex flex-col items-center justify-center md:flex-row">
                <div className="group relative  sm:w-[350px]">
                    <img  className="h-[350px] w-[450px] scale-105 transform rounded-lg bg-black/70" src={image}  alt="card navigate ui" />
                    <span className="absolute -bottom-6 left-1/2 z-30 flex h-[40px] w-[40px] -translate-x-1/2 transform items-center  justify-center rounded-full bg-white bg-gradient-to-tr from-[#000068]  to-[#70c4ff] duration-500 group-hover:rotate-180 group-hover:shadow-[0px_0px_30px_2px_#0d87f8]"><svg width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="style=linear"><g id="add"><path id="vector" d="M11.998 5.84424L11.998 18.1604" stroke="#9EE6FD" strokeWidth="2" strokeLinecap="round"></path><path id="vector_2" d="M18.1561 12.002L5.83998 12.0019" stroke="#9EE6FD" strokeWidth="2" strokeLinecap="round"></path></g></g></g></svg></span>
                    <span className="absolute -bottom-6 left-1/2 z-20 h-0 w-0 -translate-x-1/2 transform rounded-full bg-gradient-to-tr from-[#000068]/80 to-[#000068]/80 duration-300 group-hover:h-[50px] group-hover:w-[50px]"></span>
                    <span className="absolute -bottom-6 left-1/2 z-20 h-0 w-0 -translate-x-1/2 transform rounded-full bg-gradient-to-tr from-[#000068]/50 to-[#000068]/50 duration-500 hover:duration-300 group-hover:h-[60px] group-hover:w-[60px] "></span>
                </div>
                <div className="min-w-[250px] max-w-[350px] space-y-12 rounded-br-lg rounded-tr-lg bg-white p-10 text-center shadow-[0px_7px_30px_2px_rgba(100,100,111,0.2)] dark:bg-[#18181B] md:w-[350px] dark:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.8)]">
                    <div className="space-y-1">
                        <h2 className="text-center font-sans text-2xl font-medium text-[#000068] lg:text-xl">{name}</h2>
                        <p className="font-sans text-gray-500 dark:text-white/70">{category}</p>
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        <div className="space-y-1">
                            <p className="font-sans text-sm text-gray-500 dark:text-white/70">Returned Date</p>
                            <p className="text-2xl tracking-wider text-[#000068] dark:text-white/80 lg:text-3xl">{returnedDate}</p>
                        </div>
                       
                    </div>
                    <div><button onClick={() => handleReturn(_id, bookID)} className="rounded-full border border-[#000068] px-4 py-2 text-sm text-[#000068] hover:bg-[#000068] hover:text-white  duration-300 dark:hover:bg-transparent dark:hover:text-[#0d87f8] dark:hover:drop-shadow-[0px_0px_2px_#0d87f8]">Return</button></div>
                </div>
            </div>
           
        </div>

    );
};

export default SingleBorrowedBook;