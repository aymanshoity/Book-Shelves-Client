import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root/Root";
import Home from "../LandingPage/Home/Home";
import SignIn from "../Authentication/SignIn";
import SignUp from "../Authentication/SignUp";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        children:[
            {path:'/',element:<Home></Home>},
            {path:'/addBook',element:<Home></Home>},
            {path:'/allBooks',element:<Home></Home>},
            {path:'/borrowedBooks',element:<Home></Home>},
            {path:'/login',element:<SignIn></SignIn>},
            {path:'/register',element:<SignUp></SignUp>},
        ]
    }
])