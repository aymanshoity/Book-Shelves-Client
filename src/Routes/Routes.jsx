import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root/Root";
import Home from "../LandingPage/Home/Home";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        children:[
            {path:'/',element:<Home></Home>}
        ]
    }
])