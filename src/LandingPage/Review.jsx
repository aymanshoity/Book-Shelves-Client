
import SharedHeading from '../SharedComponents/SharedHeading';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Slide } from "react-awesome-reveal";
// import required modules
import { Pagination } from 'swiper/modules';
const Review = () => {
    
    return (
        <div className='py-24 mx-auto'>
            <SharedHeading heading={"Client's Reviews"}></SharedHeading>



            <Slide direction='up'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper  "
                    style={{backgroundImage: 'url(https://i.ibb.co/hVbQLDH/pic-16.jpg)',  backgroundRepeat: 'no-repeat',objectFit:"cover", width:"100vw",backgroundSize: '100% 100%'}}
                >
                    <SwiperSlide>
                        <div className='flex flex-col items-center  w-[250px] md:w-[600px] lg:w-[800px] mx-auto my-10 p-10 text-center bg-[#fefae0ff] text-[#783d19ff] rounded-lg'>
                            <img className='w-[80px] h-[80px] rounded-full' src="https://i.ibb.co/x7x8qQr/t5.jpg" alt="" />
                            <h1 className='font-bold text-xl'>Jane Doe</h1>
                            <h1 className='font-semibold text-sm'> Avid Reader</h1>
                            <p>Book Shelves has completely transformed my reading experience. The diverse collection caters to all my moods, and the personalized recommendations have introduced me to hidden literary gems. The community aspect makes me feel connected to fellow readers, adding a delightful social touch to my bookish adventures.</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center w-[250px] md:w-[600px] lg:w-[800px] mx-auto my-10 p-10 text-center bg-[#fefae0ff] text-[#783d19ff] rounded-lg'>
                            <img className='w-[80px] h-[80px] rounded-full' src="https://i.ibb.co/9Gt0CdP/t4.png" alt="" />
                            <h1 className='font-bold text-xl'>John Smith</h1>
                            <h1 className='font-semibold text-sm'>Casual Reader</h1>
                            <p>As someone who enjoys reading but doesn't always know where to start, Book Shelves has become my go-to destination. The intuitive interface makes navigation a breeze, and the curated collection ensures that I always discover something interesting. It's like having a personal guide in the vast world of literature</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center w-[250px] md:w-[600px] lg:w-[800px] mx-auto my-10 p-10 text-center bg-[#fefae0ff] text-[#783d19ff] rounded-lg'>
                            <img className='w-[80px] h-[80px] rounded-full' src="https://i.ibb.co/vw0v2Kv/t3.png" alt="" />
                            <h1 className='font-bold text-xl'>Emily Turnerr</h1>
                            <h1 className='font-semibold text-sm'>Book Club Organizer</h1>
                            <p>Managing our book club has never been easier thanks to Book Shelves. The platform simplifies book tracking, making it seamless for our members to share thoughts and recommendations. The community features have enhanced our discussions, creating a more engaging and enjoyable book club experience.</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center w-[250px] md:w-[600px] lg:w-[800px] mx-auto my-10 p-10 text-center bg-[#fefae0ff] text-[#783d19ff] rounded-lg'>
                            <img className='w-[80px] h-[80px] rounded-full' src="https://i.ibb.co/9Gt0CdP/t4.png" alt="" />
                            <h1 className='font-bold text-xl'>Alex Rodriguez</h1>
                            <h1 className='font-semibold text-sm'>Literature Enthusiast</h1>
                            <p>Book Shelves is a paradise for literature enthusiasts. The platform's commitment to fostering a love for reading is evident in its carefully curated collection and user-friendly interface. Being a part of the Book Shelves community has allowed me to connect with like-minded individuals who share my passion for great stories</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center w-[250px] md:w-[600px] lg:w-[800px] mx-auto my-10 p-10 text-center bg-[#fefae0ff] text-[#783d19ff] rounded-lg'>
                            <img className='w-[80px] h-[80px] rounded-full' src="https://i.ibb.co/jgrzGrg/t2.png" alt="" />
                            <h1 className='font-bold text-xl'>Sophie Chang</h1>
                            <h1 className='font-semibold text-sm'>Busy Professional</h1>
                            <p>Book Shelves is a game-changer for my busy lifestyle. The autoplay feature keeps me engaged during breaks, and the platform's recommendations have broadened my reading horizons. It's my digital escape, offering a diverse selection that caters to my changing reading preferences</p>
                        </div>
                    </SwiperSlide>


                </Swiper>
            </Slide>





        </div>
    );
};

export default Review;