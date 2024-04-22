import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useContext} from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
const SignUp = () => {
    const { user, createUser, googleSignIn, logOut } = useContext(AuthContext)
    const axiosPublic = UseAxiosPublic()
    const navigate = useNavigate();
    const {
        register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                console.log(result)
                updateProfile(result.user, {
                    displayName: data.name,
                    photoURL: data.photo,

                })
                    .then(()=> {
                        const readerData = {
                            name: data?.name,
                            email: data?.email,
                            role: 'reader'
                        }

                        axiosPublic.post('/readers', readerData)
                            .then(res => {
                                console.log(res.data)
                                if (res.data.insertedId) {
                                    Swal.fire("User Created Successfully!");
                                    reset()
                                    logOut()
                                        .then(result => console.log(result))
                                        .catch(error => console.log(error))
                                    navigate('/')
                                } else{
                                    Swal.fire("User Already Exists !");
                                    reset()
                                    logOut()
                                        .then(result => console.log(result))
                                        .catch(error => console.log(error))
                                    navigate('/login')
                                }
                            })

                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error.code)
                if (error.code === "auth/email-already-in-use") {
                    Swal.fire("User Already Created !");
                    navigate('/login')
                }

            })
    }
    const handleGoogle = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user)
                const readerData = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    role: 'reader'
                }
                axiosPublic.post('/readers', readerData)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.insertedId) {
                            Swal.fire(`${result.user.displayName} Registered Successfully!`);
                            reset()
                            logOut()
                                .then(result => console.log(result))
                                .catch(error => console.log(error))
                            navigate('/')
                        } else {
                            Swal.fire("User Already Created !");
                            reset()
                            logOut()
                                .then(result => console.log(result))
                                .catch(error => console.log(error))
                            navigate('/login')
                        }
                    })



            })
            .catch(error => {
                console.log(error.code)
                if (error.code === "auth/email-already-in-use") {
                    Swal.fire("User Already Created !");
                    navigate('/login')
                }
            })
    }
    return (
        <div className="py-24">
            <div className="min-h-screen lg:w-[1280px]  mx-auto">
                <div className="flex flex-col items-center  gap-6">

                    <div className="text-center flex flex-col items-center flex-1 text-[#000068]">

                        
                        <h1 className=" text-5xl font-bold">Welcome to Book Shelves!!</h1>
                        <p className="py-6">Join Us today and Explore the world of books </p>
                    </div>


                    <Fade cascade>
                        <div className="flex lg:flex-row flex-col-reverse items-center justify-center">

                            <div className=" shrink-0 flex-1 lg:w-[600px] md:w-[600px] w-[300px] text-[#000068]">
                                <div className="flex flex-col items-center">
                                    <h1 className="text-3xl font-bold py-5">Register now!</h1>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)} className="">
                                    <div className="form-control">
                                        <label className="label ">
                                            <span className="label-text  text-[#000068]">Your Name</span>
                                        </label>
                                        <input {...register("name", { required: true })} type="text" placeholder="Your Name" className="input input-bordered border-[#000068]" required />
                                        {errors.name && <span className="text-red-600">This field is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text  text-[#000068]">Your Photo URL</span>
                                        </label>
                                        <input {...register("photo", { required: true })} type="text" placeholder="Photo URL" className="input input-bordered border-[#000068]" required />
                                        {errors.photo && <span className="text-red-600">This field is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text  text-[#000068]">Your Email</span>
                                        </label>
                                        <input {...register("email", { required: true })} type="email" placeholder="Your email" className="input input-bordered border-[#000068]" required />
                                        {errors.email && <span className="text-red-600">This field is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text  text-[#000068]">Password</span>
                                        </label>
                                        <input {...register("password", { required: true, maxLength: 20, minLength: 6, pattern: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/ })} type="password" placeholder="password" className="input input-bordered border-[#000068]" required />
                                        {errors.password?.type == "required" && <span className="text-red-600">This field is required</span>}
                                        {errors.password?.type == "maxLength" && <span className="text-red-600">Password should be max 20 characters</span>}
                                        {errors.password?.type == "minLength" && <span className="text-red-600">Password should be at least 6 characters</span>}
                                        {errors.password?.type == "pattern" && <span className="text-red-600">Password should contain at least 1 number and one Special character 1 Uppercase and 1 lowercase</span>}
                                        <label className="label">
                                            <span className=" text-[#000068]">Already Registered? Go for <Link to='/login'>Login</Link></span>
                                        </label>
                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="btn text-white bg-[#000068]">Register</button>
                                    </div>
                                </form>
                                <div className="divider  text-[#000068]">OR</div>
                                <div className="flex flex-col justify-center items-center py-10">
                                    <p>Sign up with</p>
                                    <button onClick={handleGoogle} className="btn bg-[#000068]  text-white mt-5"><FaGoogle /> Google</button>
                                </div>
                            </div>
                            <div className="flex-1">
                                <img src="https://i.ibb.co/nQjnDs5/signup.jpg" alt="" />
                            </div>
                        </div>
                    </Fade>

                </div>

            </div>
        </div >

    );
};

export default SignUp;