import axios from "axios";


const AxiosPublic=axios.create({
    baseURL: 'https://book-shelves-server.vercel.app'
    // https://book-shelves-server.vercel.app/
    // http://localhost:5000
})

const UseAxiosPublic = () => {
    return AxiosPublic
};

export default UseAxiosPublic;