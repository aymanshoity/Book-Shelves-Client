
import { useForm } from "react-hook-form"
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const UpdateBook = () => {
    const [book, setBook] = useState([])
    const axiosSecure = UseAxiosSecure()
    const { id } = useParams()
    const { data: updatebook  } = useQuery({
        queryKey: ['updatebook'],
        queryFn: async () => {
            await axiosSecure.get(`/books/${id}`)
            .then(res => {
                console.log(res.data)
                setBook(res.data)
                return res.data 
            })
            
        }
    })
    // useEffect(() => {
    //     axiosSecure.get(`/books/${id}`)
    //         .then(res => {
    //             console.log(res.data)
    //             setBook(res.data)
    //         })
    // }, [axiosSecure, id])
    

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data)
        const updatedBook={
            name:data.name,
            image:data.image,
            category:data.category,
            authorName:data.authorName,
            ratings:parseFloat(data.ratings),
            quantity:parseInt(data.quantity),
        }
        Swal.fire({
            title: "Do you want to update the book?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Update",
            denyButtonText: `Don't update`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.patch(`/books/${id}`, updatedBook)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            Swal.fire("Updated!", "", "success");
                        }
                    })

            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }
    return (
        <div className="my-10 flex flex-col items-center justify-center" >

            <div className=" lg:w-[1000px] md:w-[650px] w-[280px] " >
                {/* <SharedHeading heading={'Update Book'}></SharedHeading> */}
                <div className="hero-overlay bg-opacity-40"></div>
                <div className="flex flex-col lg:flex-row gap-10 p-10 items-center">
                    <div className="lg:w-[1/4]">
                        <img className="w-[200px] h-[350px]" src={book?.image} alt="" />
                    </div>
                    <div className="lg:w-3/4">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#000068]">Book Image URL</span>
                                    </label>
                                    <input {...register("image", { required: true })} type="url" placeholder="Book Image URL" defaultValue={book?.image} className="input input-bordered border-[#000068] text-[#000068]" required />
                                    {errors.image && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#000068]">Book Name</span>
                                    </label>
                                    <input {...register("name", { required: true })} type="text" placeholder="Book Name" defaultValue={book?.name} className="input input-bordered border-[#000068] text-[#000068]" required />
                                    {errors.image && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#000068]">Author Name</span>
                                    </label>
                                    <input {...register("authorName", { required: true })} type="text" defaultValue={book?.authorName} className="input input-bordered border-[#000068] text-[#000068]" required />
                                    {errors.authorName && <span className="text-red-600">This field required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#000068]">Ratings</span>
                                    </label>
                                    <input {...register("ratings", { required: true, max: 5, min: 0 })} type="number" step="0.1" defaultValue={book?.ratings} className="input input-bordered border-[#000068] text-[#000068]" required />
                                    {errors.ratings && <span className="text-red-600">This field is required</span>}
                                    {errors.ratings?.type === 'min' && <span className="text-red-600">Rate between 0 to 5</span>}
                                    {errors.ratings?.type === 'max' && <span className="text-red-600">Rate between 0 to 5</span>}

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#000068]">Quantity</span>
                                    </label>
                                    <input {...register("quantity", { required: true })} type="number" defaultValue={book?.quantity} className="input input-bordered  border-[#000068] text-[#000068]" required />
                                    {errors.authorName && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#000068]">Category</span>
                                    </label>
                                    <select {...register("category", { required: true })}  className="input input-bordered border-[#000068] text-[#000068]">
                                        <option  selected value={book?.category}>{book?.category}</option>
                                        <option value="Thriller">Thriller</option>
                                        <option value="Literature & Fiction">Literature & Fiction</option>
                                        <option value="Science &Technology">Science &Technology</option>
                                        <option value="History">History</option>
                                    </select>
                                </div>

                            </div>


                            <div className="form-control mt-6">
                                <button className="btn bg-[#000068] text-white">Update</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UpdateBook;