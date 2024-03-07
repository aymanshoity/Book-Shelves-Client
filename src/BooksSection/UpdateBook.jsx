import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateBook = () => {
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

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data)
        Swal.fire({
            title: "Do you want to update the book?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Update",
            denyButtonText: `Don't update`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.patch(`/books/${id}`, data)
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
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/sPRnRNM/pexels-min-an-775998.jpg)' }}>
            <div className="hero-overlay bg-opacity-40"></div>

            <div className="  bg-[#90b2ddff]  shadow-2xl  lg:w-[1000px] md:w-[650px] w-[280px]">
                {/* <SharedHeading heading={'Update Book'}></SharedHeading> */}
                <div className="flex flex-col lg:flex-row gap-10 p-10 items-center">
                    <div className="lg:w-[1/4]">
                        <img src={book.image} alt="" />
                    </div>
                    <div className="lg:w-3/4">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#fefae0ff]">Book Image URL</span>
                                    </label>
                                    <input {...register("image", { required: true })} type="url" placeholder="Book Image URL" defaultValue={book.image} className="input input-bordered text-[#783d19ff]" required />
                                    {/* {errors.image && <span className="text-[#fefae0ff]">This field is required</span>} */}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#fefae0ff]">Book Name</span>
                                    </label>
                                    <input {...register("name", { required: true })} type="text" placeholder="Book Name" defaultValue={book.name} className="input input-bordered text-[#783d19ff]" required />
                                    {/* {errors.image && <span className="text-[#fefae0ff]">This field is required</span>} */}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#fefae0ff]">Author Name</span>
                                    </label>
                                    <input {...register("authorName", { required: true })} type="text" defaultValue={book.authorName} className="input input-bordered text-[#783d19ff]" required />
                                    {/* {errors.authorName && <span className="text-[#fefae0ff]">This field is required</span>} */}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Ratings</span>
                                    </label>
                                    <input {...register("ratings", { required: true, max: 5, min: 0 })} type="number" defaultValue={book.ratings} className="input input-bordered" required />
                                    {/* {errors.ratings && <span className="text-[#fefae0ff]">This field is required</span>} */}
                                    {errors.ratings?.type === 'min' && <span className="text-[#fefae0ff]">Rate between 0 to 5</span>}
                                    {errors.ratings?.type === 'max' && <span className="text-[#fefae0ff]">Rate between 0 to 5</span>}

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#fefae0ff]">Quantity</span>
                                    </label>
                                    <input {...register("quantity", { required: true })} type="text" defaultValue={book.quantity} className="input input-bordered text-[#783d19ff]" required />
                                    {/* {errors.authorName && <span className="text-[#fefae0ff]">This field is required</span>} */}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Category</span>
                                    </label>
                                    <select {...register("category", { required: true })}  className="input input-bordered">
                                        <option disabled selected value={book.category}>{book.category}</option>
                                        <option value="Thriller">Thriller</option>
                                        <option value="Literature & Fiction">Literature & Fiction</option>
                                        <option value="Science &Technology">Science &Technology</option>
                                        <option value="History">History</option>
                                    </select>
                                </div>

                            </div>


                            <div className="form-control mt-6">
                                <button className="btn ">Update</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UpdateBook;