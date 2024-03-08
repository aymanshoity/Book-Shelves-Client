import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root/Root";
import Home from "../LandingPage/Home/Home";
import SignIn from "../Authentication/SignIn";
import SignUp from "../Authentication/SignUp";
import AllBooks from "../BooksSection/AllBooks";
import AddBook from "../BooksSection/AddBook";
import BorrowedBooks from "../BooksSection/BorrowedBooks";
import ErrorPage from "../ErrorPage/ErrorPage";
import UpdateBook from "../BooksSection/UpdateBook";
import AllTypes from "../BooksSection/BookTypes/AllTypes";
import Details from "../BooksSection/BookTypes/Details";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {path:'/',element:<Home></Home>},
            {path:'/addBook',element:<AddBook></AddBook>},
            {path:'/updateBook/:id',element:<UpdateBook></UpdateBook>},
            {path:'/allBooks',element:<AllBooks></AllBooks>},
            {path:'/borrowedBooks',element:<BorrowedBooks></BorrowedBooks>},
            {path:'/login',element:<SignIn></SignIn>},
            {path:'/register',element:<SignUp></SignUp>},
            {path:'/:category',element:<AllTypes></AllTypes>},
            {path:'/details/:id',element:<Details></Details>},
        ]
    }
])