
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
            <div className="flex  flex-col gap-8  mx-auto">
                
                <div className=" shrink-0     ">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="grid grid-cols-1  gap-6 items-center justify-center">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#000068]">Book Image URL</span>
                                    </label>
                                    <input {...register("image", { required: true })} type="url" placeholder="Book Image URL" className="input input-border text-[#000068] border-[#000068] border-2" required />
                                    {errors.image && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#000068]">Book Name</span>
                                    </label>
                                    <input {...register("name", { required: true })} type="text" placeholder="Book Name" className="input input-bordered text-[#000068] border-[#000068] border-2" required />
                                    {errors.image && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#000068]">Author Name</span>
                                    </label>
                                    <input {...register("authorName", { required: true })} type="text" placeholder="Author name.." className="input input-bordered text-[#000068]  border-[#000068] border-2" required />
                                    {errors.authorName && <span className="text-red-600">This field is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#000068]">Category</span>
                                    </label>
                                    <select {...register("category", { required: true })} className="input input-bordered border-[#000068] border-2 text-[#000068]" placeholder="Category">
                                        <option value="Thriller">Thriller</option>
                                        <option value="Literature & Fiction">Literature & Fiction</option>
                                        <option value="Science &Technology">Science &Technology</option>
                                        <option value="History">History</option>
                                    </select>
                                    

                                    {errors.category && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#000068]">Quantity</span>
                                    </label>
                                    <input type="number" {...register("quantity", { required: true })}  placeholder="Quantity" className="input input-bordered  border-[#000068] border-2"  required />
                                    {errors.quantity && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-[#000068]">Ratings</span>
                                    </label>
                                    <input type="number" step="0.1" {...register("ratings", { required: true, min: 0, max: 5  })}  placeholder="Ratings out of 5" className="input input-bordered  border-[#000068] text-[#000068] border-2" required />
                                    {errors.ratings && <span className="text-red-600">This field is required</span>}
                                    {errors.ratings?.type === "min" && <span className="text-red-600">Choose between 1 to 5</span>}
                                    {errors.ratings?.type === "max" && <span className="text-red-600">Choose between 1 to 5</span>}
                                </div>
                            </div>




                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-[#000068]">Short Description</span>
                            </label>
                            <textarea {...register("description", { required: true })} className="textarea  border-[#000068] text-[#000068] border-2" placeholder="Short Description"></textarea>
                            {errors.description && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-[#000068] text-white">Add a Book</button>
                        </div>
                    </form>
                </div>


            </div>

        </div>
    );
};

export default AddBook;