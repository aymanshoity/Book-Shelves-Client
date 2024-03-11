import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import SharedHeading from "../SharedComponents/SharedHeading";
import SingleReader from "./SingleReader";


const AllReaders = () => {
    const axiosSecure = UseAxiosSecure()
    const { data: readers = [],refetch } = useQuery({
        queryKey: ['readers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/readers')
            console.log(res.data)
            return res.data
        }
    })
    return (
        <div className="py-24">
            <SharedHeading heading={`Total Readers: ${readers.length}`}></SharedHeading>

            {/* table */}
            <div>

            </div>
            <div className="overflow-x-auto ">
                <table className=" min-w-[90%] shadow-md border mx-auto border-gray-100 my-6">
                    <thead>
                        <tr className="bg-[#0095FF] text-white">
                            <th className="py-4 px-6 text-lg text-left border-b">Sl No.</th>
                            <th className="py-4 px-6 text-lg text-left border-b">Reader Name</th>
                            <th className="py-4 px-6 text-lg text-left border-b">Reader Email</th>
                            <th className="py-4 px-6 text-lg text-left border-b">Role</th>
                            <th className="py-4 px-6 text-lg border-b text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            readers.map((reader, index) => <SingleReader refetch={refetch} key={reader._id} index={index} reader={reader}></SingleReader>)
                        }

                    </tbody>
                </table>

            </div>
            

        </div>
    );
};

export default AllReaders;