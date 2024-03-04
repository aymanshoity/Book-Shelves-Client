import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root/Root";
import Home from "../LandingPage/Home/Home";
import SignIn from "../Authentication/SignIn";
import SignUp from "../Authentication/SignUp";
import AllBooks from "../BooksSection/AllBooks";
import AddBook from "../BooksSection/AddBook";
import BorrowedBooks from "../BooksSection/BorrowedBooks";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        children:[
            {path:'/',element:<Home></Home>},
            {path:'/addBook',element:<AddBook></AddBook>},
            {path:'/allBooks',element:<AllBooks></AllBooks>},
            {path:'/borrowedBooks',element:<BorrowedBooks></BorrowedBooks>},
            {path:'/login',element:<SignIn></SignIn>},
            {path:'/register',element:<SignUp></SignUp>},
        ]
    }
])