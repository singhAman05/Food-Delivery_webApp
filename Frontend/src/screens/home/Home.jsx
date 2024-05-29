import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import carousel_image1 from "../../Images/bur.jpg";
import carousel_image2 from "../../Images/anna-tukhfatullina-food-photographer-stylist-Mzy-OjtCI70-unsplash.jpg";
import SetFoodItem from "../../components/foodData/SetFoodData";
import Carousel from "../../components/carousel/Carousel";
const React = require("react");

const images = [carousel_image1, carousel_image2, carousel_image1];

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
