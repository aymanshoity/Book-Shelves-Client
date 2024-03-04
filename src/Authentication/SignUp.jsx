import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
const SignUp = () => {
    const { user, createUser, googleSignIn, logOut } = useContext(AuthContext)
    const navigate = useNavigate();
    const {
        register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                updateProfile(result.user, {
                    displayName: data.name,
                    photoURL: data.photo,

                })
                    .then(result => {
                        console.log(result)
                        Swal.fire("User Created Successfully!");
                        reset()
                        logOut()
                            .then(result => console.log(result))
                            .catch(error => console.log(error))
                        navigate('/')
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
                Swal.fire(`${result.user.displayName} Registered Successfully!`);
                reset()
                logOut()
                    .then(result => console.log(result))
                    .catch(error => console.log(error))
                navigate('/')
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
        <div className="py-40">
            <div className="min-h-screen lg:w-[1280px]  mx-auto">
                <div className="flex flex-col items-center  gap-6">
                    <Fade cascade>
                        <div className="text-center flex flex-col items-center flex-1 text-[#783d19ff]">

                            <img className="w-[80px] h-[80px]" src="../../public/book.png" alt="" />
                            <h1 className=" text-5xl font-bold">Welcome to Book Shelves!!</h1>
                            <p className="py-6">Join Us today and Explore the world of books </p>
                        </div>
                        <div className="card shrink-0 flex-1 lg:w-[600px] md:w-[600px] w-[300px] shadow-2xl bg-[#90b2ddff]  text-[#783d19ff]">
                            <div className="flex flex-col items-center">
                                <h1 className="text-3xl font-bold py-5">Register now!</h1>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body  text-[#783d19ff]">
                                <div className="form-control">
                                    <label className="label ">
                                        <span className="label-text  text-[#783d19ff]">Your Name</span>
                                    </label>
                                    <input {...register("name", { required: true })} type="text" placeholder="Your Name" className="input input-bordered bg-[#fefae0ff]" required />
                                    {errors.name && <span className="text-[#fefae0ff]">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text  text-[#783d19ff]">Your Photo URL</span>
                                    </label>
                                    <input {...register("photo", { required: true })} type="text" placeholder="Photo URL" className="input input-bordered bg-[#fefae0ff]" required />
                                    {errors.photo && <span className="text-[#fefae0ff]">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text  text-[#783d19ff]">Your Email</span>
                                    </label>
                                    <input {...register("email", { required: true })} type="email" placeholder="Your email" className="input input-bordered bg-[#fefae0ff]" required />
                                    {errors.email && <span className="text-[#fefae0ff]">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text  text-[#783d19ff]">Password</span>
                                    </label>
                                    <input {...register("password", { required: true, maxLength: 20, minLength: 6, pattern: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/ })} type="password" placeholder="password" className="input input-bordered bg-[#fefae0ff]" required />
                                    {errors.password?.type == "required" && <span className="text-[#fefae0ff]">This field is required</span>}
                                    {errors.password?.type == "maxLength" && <span className="text-[#fefae0ff]">Password should be max 20 characters</span>}
                                    {errors.password?.type == "minLength" && <span className="text-[#fefae0ff]">Password should be at least 6 characters</span>}
                                    {errors.password?.type == "pattern" && <span className="text-[#fefae0ff]">Password should contain at least 1 number and one Special character 1 Uppercase and 1 lowercase</span>}
                                    <label className="label">
                                        <span className=" text-[#783d19ff]">Already Registered? Go for <Link to='/login'>Login</Link></span>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn text-[#783d19ff] bg-[#fefae0ff]">Register</button>
                                </div>
                            </form>
                            <div className="divider  text-[#783d19ff]">OR</div>
                            <div className="flex flex-col justify-center items-center py-10">
                                <p>Sign up with</p>
                                <button onClick={handleGoogle} className="btn bg-[#783d19ff]  text-[#fefae0ff] mt-5"><FaGoogle /> Google</button>
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default SignUp;