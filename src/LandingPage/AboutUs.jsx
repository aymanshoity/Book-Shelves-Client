import SharedHeading from "../SharedComponents/SharedHeading";
import { Fade } from "react-awesome-reveal";

const AboutUs = () => {
    return (
        <div className="py-20 lg:w-[1000px] mx-auto px-10">
            <SharedHeading heading={'About Us'}></SharedHeading>
            <Fade>
                <div className="head flex flex-col lg:flex-row items-center justify-center   text-[#000068]  lg:text-left text-lg  text-center">
                    <div className="flex-1">
                        <img src="https://i.ibb.co/WgWfYkM/woman-5309387-1280.png" alt="" />
                    </div>
                    <div className="flex-1">
                        <p>Welcome to Book Shelves, where the love for literature finds its digital home. At Book Shelves, we are passionate about connecting readers with the enchanting world of books. Our platform goes beyond being a mere library management website; it's a haven for bibliophiles. With a diverse collection spanning genres and eras, an intuitive interface for seamless exploration, and personalized recommendations, Book Shelves aims to be your trusted companion on your reading journey. Join our vibrant community of book lovers, share your insights, and celebrate the joy of storytelling with us. Book Shelves is more than a website; it's a commitment to fostering a love for reading and creating a space where every reader feels a sense of belonging. Welcome to our literary sanctuary – happy reading!</p>
                    </div>

                </div>
            </Fade>
        </div>
    );
};

export default AboutUs;