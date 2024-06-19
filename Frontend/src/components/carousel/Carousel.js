import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import image1 from "../../Images/bur.jpg";
import image2 from "../../Images/shreyak-singh-0j4bisyPo3M-unsplash.jpg";
import image3 from "../../Images/davide-cantelli-jpkfc5_d-DI-unsplash.jpg";
import image4 from "../../Images/davide-cantelli-jpkfc5_d-DI-unsplash.jpg"; // Add more images as needed

const Carousel = () => {
  const foodItems = [
    {
      image: image1,
      name: "Delicious Burger",
      description:
        "Juicy beef patty with fresh lettuce, tomato, and melted cheese.",
    },
    {
      image: image2,
      name: "Tasty Pasta",
      description: "Creamy Alfredo pasta with a hint of garlic and basil.",
    },
    {
      image: image3,
      name: "Gourmet Salad",
      description:
        "Fresh greens topped with crunchy nuts and a tangy vinaigrette.",
    },
    {
      image: image4,
      name: "Succulent Steak",
      description:
        "Perfectly grilled steak with a side of mashed potatoes and veggies.",
    },
    // Add more items as needed
  ];

  const settings = {
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 3,
    infinite: true,
    speed: 500,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2500, // Auto-slide every 2.5 seconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Slider {...settings}>
        {foodItems.map((item, index) => (
          <div key={index} className="p-4">
            <div className="bg-white shadow-md rounded-xl overflow-hidden">
              <div className="h-56">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                  <p className="text-gray-700 mb-4">{item.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
