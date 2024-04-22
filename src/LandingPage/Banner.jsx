

import { Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { useRef, } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';



const Banner = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
    return (
        <div className='py-24'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper max-h-screen"
            >
                <SwiperSlide>
                    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/k2QnPbt/library-2684238-1280.jpg)' }}>

                        <div className="hero-content text-center   text-white">
                            <div className="hero-overlay bg-[#000068] bg-opacity-60 rounded-lg">
                                <div className="max-w-xl p-5">
                                    <Slide direction="down" >
                                        <h1 className="mb-5 lg:text-5xl text-3xl font-bold">Book Shelves</h1>
                                        <h1 className="mb-5 lg:text-3xl text-2xl font-bold">Flipping through chapters, unlocking intellects</h1>
                                        <Link to='/register'><button className="btn bg-white text-[#000068]">Let's Explore</button></Link>
                                    </Slide>


                                </div>
                            </div>

                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/cgtVD1Q/books-1842261-1280.jpg)' }}>

                        <div className="hero-content text-center   text-white">
                            <div className="hero-overlay bg-[#000068] bg-opacity-60 rounded-lg">
                                <div className="max-w-xl p-5">
                                    <Slide direction="down" >
                                        <h1 className="mb-5 lg:text-5xl text-3xl font-bold">Book Shelves</h1>
                                        <h1 className="mb-5 lg:text-3xl text-2xl font-bold">Unraveling tales, broadening perspectives... Dive into the digital shelves!</h1>
                                        
                                        <Link to='/register'><button className="btn bg-white text-[#000068]">Let's Explore</button></Link>
                                    </Slide>


                                </div>
                            </div>

                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/bRXf7Ky/book-3312854-1280.jpg)' }}>

                        <div className="hero-content text-center   text-white">
                            <div className="hero-overlay bg-[#000068] bg-opacity-60 rounded-lg">
                                <div className="max-w-xl p-5">
                                    <Slide direction="down" >
                                        <h1 className="mb-5 lg:text-5xl text-3xl font-bold">Book Shelves</h1>
                                        <h1 className="mb-5 lg:text-3xl text-2xl font-bold">Venture into knowledge, with every click and scroll... Your library, reimagined</h1>
                                        <Link to='/register'><button className="btn bg-white text-[#000068]">Let's Explore</button></Link>
                                    </Slide>


                                </div>
                            </div>

                        </div>
                    </div>
                </SwiperSlide>
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 24 24" ref={progressCircle}>
                        {/* <circle cx="24" cy="24" r="20"></circle> */}
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>

        </div>
    );
};

export default Banner;