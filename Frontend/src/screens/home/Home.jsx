import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import SetFoodItem from "../../components/foodData/SetFoodData";
import Carousel from "../../components/carousel/Carousel";
const React = require("react");

const Home = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      <SetFoodItem />
      <Footer />
    </div>
  );
};

export default Home;
