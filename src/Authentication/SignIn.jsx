import { useContext } from "react";
import { Fade } from "react-awesome-reveal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

const SignIn = () => {
    const { loginUser, googleSignIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const location=useLocation()
    const from=location.state?.from?.pathname || '/'
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
                navigate(from,{replace:true})
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
                navigate(from,{replace:true})
            })
            .catch()
    }
    return (
        <div className="py-40">
            <div className="min-h-screen lg:w-[1280px]  mx-auto">
                <div className="flex flex-col items-center  gap-6">
                    <Fade  >
                        <div className="text-center flex flex-col items-center flex-1 text-[#783d19ff]">

                            <img className="w-[80px] h-[80px]" src="https://i.ibb.co/5n6pym4/book.png" alt="" />
                            <h1 className=" text-5xl font-bold">Glad to get you back!!</h1>
                            <p className="py-6">Let's explore the library together!! </p>
                        </div>
                        <div className="card shrink-0 flex-1 lg:w-[600px] md:w-[600px] w-[300px] shadow-2xl bg-[#b99470ff]  text-[#fefae0ff]">

                            <form onSubmit={handleLogin} className="card-body  text-[#783d19ff]">

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text  text-[#fefae0ff]">Your Email</span>
                                    </label>
                                    <input name="email" type="email" placeholder="Your email" className="input input-bordered bg-[#fefae0ff]" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text  text-[#fefae0ff]">Password</span>
                                    </label>
                                    <input name="password" type="password" placeholder="password" className="input input-bordered bg-[#fefae0ff]" required />
                                    <label className="label">
                                        <span className=" text-[#fefae0ff] font-bold">New to this Library? Go to <Link to='/register'>Register</Link></span>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn text-[#783d19ff] bg-[#fefae0ff]">Login</button>
                                </div>
                            </form>
                            <div className="divider  text-[#783d19ff]">OR</div>
                            <div className="flex flex-col justify-center items-center py-10">
                                <p>Sign In with</p>
                                <button onClick={handleGoogle} className="btn bg-[#783d19ff]  text-[#fefae0ff] mt-5"><FaGoogle /> Google</button>
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default SignIn;