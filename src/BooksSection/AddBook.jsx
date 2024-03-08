
import SharedHeading from "../SharedComponents/SharedHeading";
import { useForm } from "react-hook-form"
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const AddBook = () => {
    const axiosSecure = UseAxiosSecure()
    const {
        register, handleSubmit, reset, formState: { errors } } = useForm()


    const onSubmit = (data) => {
        console.log(data)

        const addBook={
            name:data.name,
            image:data.image,
            category:data.category,
            authorName:data.authorName,
            description:data.description,
            ratings:parseFloat(data.ratings),
            quantity:parseInt(data.quantity),
        }
        Swal.fire({
            title: "Do you want to add this book?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Add",
            denyButtonText: `Don't Add`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.post('/books', addBook)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.insertedId) {
                            Swal.fire("Added!", "", "success");
                            reset()
                        }
                    })

            } else if (result.isDenied) {
                Swal.fire("Book is not added", "", "info");
            }
        });


    }
    return (
        <div className="py-28 ">

            <SharedHeading heading={'Add a Book'}></SharedHeading>
            <div className="flex lg:flex-row flex-col gap-8 lg:w-[1280px] md:w-[600px] w-[250px] mx-auto">
                <div className="flex-1">
                    <img className="border border-[#783d19ff]  mx-auto rounded-lg lg:h-[600px]" src="../../public/Going to work.gif" alt="" />
                </div>
                <div className=" flex-1 card shrink-0  md:w-[500px] w-[250px]  shadow-2xl bg-[#b99470ff]  ">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="grid grid-cols-1  gap-6 items-center justify-center">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#fefae0ff]">Book Image URL</span>
                                    </label>
                                    <input {...register("image", { required: true })} type="url" placeholder="Book Image URL" className="input input-bordered text-[#783d19ff]" required />
                                    {errors.image && <span className="text-[#fefae0ff]">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#fefae0ff]">Book Name</span>
                                    </label>
                                    <input {...register("name", { required: true })} type="text" placeholder="Book Name" className="input input-bordered text-[#783d19ff]" required />
                                    {errors.image && <span className="text-[#fefae0ff]">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#fefae0ff]">Author Name</span>
                                    </label>
                                    <input {...register("authorName", { required: true })} type="text" placeholder="Author name.." className="input input-bordered text-[#783d19ff]" required />
                                    {errors.authorName && <span className="text-[#fefae0ff]">This field is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#fefae0ff]">Category</span>
                                    </label>
                                    <select {...register("category", { required: true })} className="input input-bordered text-[#783d19ff]" placeholder="Category">
                                        <option value="Thriller">Thriller</option>
                                        <option value="Literature & Fiction">Literature & Fiction</option>
                                        <option value="Science &Technology">Science &Technology</option>
                                        <option value="History">History</option>
                                    </select>
                                    

                                    {errors.category && <span className="text-[#fefae0ff]">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#fefae0ff]">Quantity</span>
                                    </label>
                                    <input type="number" {...register("quantity", { required: true })}  placeholder="Quantity" className="input input-bordered text-[#783d19ff]"  required />
                                    {errors.quantity && <span className="text-[#fefae0ff]">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#fefae0ff]">Ratings</span>
                                    </label>
                                    <input type="number" {...register("ratings", { required: true, min: 0, max: 5  })}  placeholder="Ratings out of 5" className="input input-bordered text-[#783d19ff]" required />
                                    {errors.ratings && <span className="text-[#fefae0ff]">This field is required</span>}
                                    {errors.ratings?.type === "min" && <span className="text-[#fefae0ff]">Choose between 1 to 5</span>}
                                    {errors.ratings?.type === "max" && <span className="text-[#fefae0ff]">Choose between 1 to 5</span>}
                                </div>
                            </div>




                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-[#fefae0ff]">Short Description</span>
                            </label>
                            <textarea {...register("description", { required: true })} className="textarea text-[#783d19ff]" placeholder="Short Description"></textarea>
                            {errors.description && <span className="text-[#fefae0ff]">This field is required</span>}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-[#783d19ff] text-[#fefae0ff] ">Add a Book</button>
                        </div>
                    </form>
                </div>


            </div>

        </div>
    );
};

export default AddBook;