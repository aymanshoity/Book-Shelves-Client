
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const AxiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const UseAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useContext(AuthContext)
    AxiosSecure.interceptors.request.use(function (config) {
        // request interceptor to add authorization header for every secure call to API
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = ` Bearer ${token}`
        return config
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // intercepts 401 and 403 status

    AxiosSecure.interceptors.response.use(function (response) {
        return response
    }, async(error) => {
        const status = error.response.status
        // console.log('status error in the interceptor', status)
        if (status === 401 || status === 403) {
            await logOut()
            navigate('/login')    

        }

        return Promise.reject(error)
    })


    return AxiosSecure
};

export default UseAxiosSecure;