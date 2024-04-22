

const Sale = () => {
    return (
        <div className=" h-[800px] " style={{ backgroundImage: 'url(https://i.ibb.co/1rdwzp0/bannercrop.jpg)', backgroundSize: 'contain', // Centers the image horizontally
            backgroundRepeat: 'no-repeat', backgroundPosition: 'center top ',
        }}>
            {/* <div className="hero-overlay bg-opacity-60"></div> */}
            <div className="px-5 py-5 md:py-10 md:px-36 lg:pl-60 lg:pt-20 text-[#000068]">
                <div className="flex flex-col">
                    <p className="mb-5 lg:text-lg">Book Festival</p>
                    <h1 className=" lg:text-5xl md:text-3xl text-2xl font-bold">40% off!!</h1>
                    <p className="mb-5  md:text-lg text-sm">On All Books</p>
                    <button className=" w-fit bg-[#000068] text-white md:px-4 md:py-2 py-1 px-2 md:text-md text-sm rounded-full"><a href="/register">Get Started</a></button>
                </div>

            </div>
        </div>
    );
};

export default Sale;