import { useContext } from "react";
import { Fade } from "react-awesome-reveal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

const SignIn = () => {
    const { loginUser, googleSignIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const handleLogin = e => {
        e.preventDefault()
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        const loggedInUser = { email, password }
        console.log(loggedInUser)

        loginUser(email, password)
            .then(result => {
                console.log(result.user)
                Swal.fire({
                    title: "Login Successful!",
                    text: `${result.user.displayName} logged in Successfully!!`,
                    icon: "success"
                });
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error.code)
                if (error.code === "auth/invalid-credential")
                    Swal.fire("Invalid Email/Password!")
            })

    }
    const handleGoogle = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user)
                Swal.fire({
                    title: "Login Successful!",
                    text: `${result.user.displayName} logged in Successfully!!`,
                    icon: "success"
                });
                navigate(from, { replace: true })
            })
            .catch()
    }
    return (
        <div className="py-24">
            <div className="min-h-screen lg:w-[1280px]  mx-auto">
                <div className="flex flex-col items-center  gap-6">
                    <Fade  >
                        <div className="text-center flex flex-col items-center flex-1 text-[#000068]">

                            
                            <h1 className=" text-5xl font-bold">Glad to get you back!!</h1>
                            <p className="py-6">Let's explore the library together!! </p>
                        </div>
                        <div className="flex lg:flex-row flex-col items-center justify-center">
                            <div>
                                <img src="https://i.ibb.co/54SNPvN/login.jpg" alt="" />
                            </div>
                            <div>
                                <div className="shrink-0 flex-1 lg:w-[600px] md:w-[600px] w-[300px]  border-[#000068]  text-[#000068]">

                                    <form onSubmit={handleLogin} className="card-body  ">

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text  text-[#000068]">Your Email</span>
                                            </label>
                                            <input name="email" type="email" placeholder="Your email" className="input input-bordered text-white bg-[#000068]" required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text  text-[#000068]">Password</span>
                                            </label>
                                            <input name="password" type="password" placeholder="password" className="input input-bordered text-white bg-[#000068]" required />
                                            <label className="label">
                                                <span className=" text-[#000068] font-bold">New to this Library? Go to <Link to='/register'>Register</Link></span>
                                            </label>
                                        </div>
                                        <div className="form-control mt-6">
                                            <button className="btn text-white bg-[#000068]">Login</button>
                                        </div>
                                    </form>
                                    <div className="divider  text-[#000068]">OR</div>
                                    <div className="flex flex-col justify-center items-center py-10">
                                        <p>Sign In with</p>
                                        <button onClick={handleGoogle} className="btn bg-[#000068]  text-white mt-5"><FaGoogle /> Google</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default SignIn;