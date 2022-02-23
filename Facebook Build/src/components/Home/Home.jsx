import LeftSection from '../Body/LeftSection/LeftSection'
import MiddleSection from '../Body/MiddleSection/MiddleSection'
import RightSection from '../Body/RightSection/RightSection'
import Navbar from '../Navbar/Navbar'
import './Home.css'
const Home = () => {
    return (
        <div className="home__div">
            {/* NAVBAR */}
            <Navbar />

            {/* BODY */}

            <div className="facebook__body">
                <LeftSection />
                <MiddleSection />
                <RightSection />
            </div>



        </div>
    )
}

export default Home