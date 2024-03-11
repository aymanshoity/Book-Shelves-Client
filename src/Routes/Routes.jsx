import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root/Root";
import Home from "../LandingPage/Home/Home";
import SignIn from "../Authentication/SignIn";
import SignUp from "../Authentication/SignUp";
import AllBooks from "../BooksSection/AllBooks";
import AddBook from "../BooksSection/AddBook";
import ErrorPage from "../ErrorPage/ErrorPage";
import UpdateBook from "../BooksSection/UpdateBook";
import AllTypes from "../BooksSection/BookTypes/AllTypes";
import Details from "../BooksSection/BookTypes/Details";
import BorrowedBooks from "../BooksSection/BorrowedBooksSection/BorrowedBooks";
import PrivateRoute from "./PrivateRoute";
import AllReaders from "../BooksSection/AllReaders";
import LibrarianRoute from "./LibrarianRoute";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {path:'/',element:<Home></Home>},
            {path:'/login',element:<SignIn></SignIn>},
            {path:'/register',element:<SignUp></SignUp>},
            // readers access
            {path:'/:category',element:<PrivateRoute><AllTypes></AllTypes></PrivateRoute>},
            {path:'/details/:id',element:<PrivateRoute><Details></Details></PrivateRoute>},
            {path:'/borrowedBooks',element:<PrivateRoute><BorrowedBooks></BorrowedBooks></PrivateRoute>},
            // librarian access
            {path:'/addBook',element:<LibrarianRoute><AddBook></AddBook></LibrarianRoute>},
            {path:'/updateBook/:id',element:<LibrarianRoute><UpdateBook></UpdateBook></LibrarianRoute>},
            {path:'/allBooks',element:<LibrarianRoute><AllBooks></AllBooks></LibrarianRoute>},
            {path:'/allReaders',element:<LibrarianRoute><PrivateRoute></PrivateRoute></LibrarianRoute>},
        ]
    }
])