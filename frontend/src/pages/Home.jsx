import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";


const Home = () => {
    return (
      <div className="min-h-screen flex flex-col">
        <HeroSection />
        <FeatureSection />
      </div>
    )
}

export default Home;