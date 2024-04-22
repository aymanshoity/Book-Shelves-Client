import Footer from "../Footer";
import Banner from "../Banner"
import AboutUs from "../AboutUs"
import Review from "../Review";
import AllCategory from "../AllCategory";
import Sale from "../Sale";

const Home = () => {
    return (
        <div className="">
            
            <Banner></Banner>
            <AboutUs></AboutUs>
            <AllCategory></AllCategory>
            <Sale></Sale>
            <Review></Review>
            <Footer></Footer>
        </div>
    );
};

export default Home;