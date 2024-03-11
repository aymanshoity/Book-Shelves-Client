import { BiBookReader } from "react-icons/bi";
import Swal from "sweetalert2";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { FaUserGraduate } from "react-icons/fa";


const SingleReader = ({ reader, index, refetch }) => {
    const axiosSecure = UseAxiosSecure()
    const handleDeleteReader = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure you want tot remove the reader?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/readers/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })

            }
        });
    }

    const handleMakeLibrarian = reader => {
        console.log(reader._id)
        // 
        Swal.fire({
            title: `Do you want to make ${reader.name} Librarian?`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.patch(`/readers/librarian/${reader._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                icon: "success",
                                title: `${reader.name} is Librarian now!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch()
                        }
                    })

            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }
    return (
        <tr className="hover:bg-gray-50 border-b transition duration-300">
            <td className="py-4 px-6 border-b text-xl font-medium">{index + 1}</td>
            <td className="py-4 px-6 border-b text-xl font-medium">{reader.name}</td>
            <td className="py-4 px-4 flex justify-start">
                {reader.email}
            </td>

            <td className="py-4 px-6 border-b ">
                {
                    reader.role === 'librarian' ? <>
                        <button className="bg-blue-500 btn text-2xl"><FaUserGraduate /></button>
                    </> : <>
                        <button onClick={() => handleMakeLibrarian(reader)} className="bg-blue-500 btn text-2xl"><BiBookReader /></button>
                    </>
                }
            </td>
            <td className="py-4 px-6 border-b text-end">
                <button onClick={() => handleDeleteReader(reader._id)} className="bg-blue-500 btn">Delete</button>
            </td>
        </tr>

    );
};

export default SingleReader;