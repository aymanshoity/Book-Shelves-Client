
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { BiBookReader } from 'react-icons/bi';
import { FaUserGraduate, FaUserShield, FaUserTag } from 'react-icons/fa';

const ReadersCard = ({ reader, refetch, index }) => {
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
        console.log(reader?._id)
        // 
        Swal.fire({
            title: `Do you want to make ${reader?.name} Librarian?`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.patch(`/readers/librarian/${reader?._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                icon: "success",
                                title: `${reader?.name} is Librarian now!`,
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
        <div className="w-[300px] mx-auto my-20 p-6 md:p-8 rounded-lg border shadow-lg border-[#000068] text-[#000068] bg-white">
            <div className="space-y-6 ">

                <div className="flex flex-row justify-between"><span className="font-bold">Sl No.</span><span className="text-right">{index+1}</span></div>
                <div className="flex flex-row justify-between"><span className="font-bold">Reader Name</span><span className="text-right">{reader?.name}</span></div>
                <div className="flex flex-row justify-between"><span className="font-bold">Reader Email</span><span>{reader?.email}</span></div>
                <div className="flex flex-row justify-between"><span className="font-bold">Role</span><span>

                    {
                        reader?.role === 'librarian' ? <>
                            <button className="bg-[#000068]  text-white btn text-2xl"><FaUserGraduate /></button>
                        </> : <>
                            <button onClick={() => handleMakeLibrarian(reader)} className="bg-[#000068]  text-white btn text-2xl"><BiBookReader /></button>
                        </>
                    }
                </span></div>

                <div className="flex flex-row justify-between">

                    <span className="font-bold">Action</span>
                    <span><button onClick={() => handleDeleteReader(reader?._id)} className="bg-[#000068]  text-white btn">Delete</button></span>

                </div>
        





            </div>
        </div>

    );
};

export default ReadersCard;