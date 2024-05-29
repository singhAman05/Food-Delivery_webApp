import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import image1 from "../../Images/bur.jpg";
import image2 from "../../Images/shreyak-singh-0j4bisyPo3M-unsplash.jpg";
import image3 from "../../Images/davide-cantelli-jpkfc5_d-DI-unsplash.jpg";
const Carousel = () => {
  const card = [
    {
      image: image1,
      name: "Card 1",
      description: "This is Card 1.",
    },
    {
      image: image2,
      name: "Card 2",
      description: "This is Card 2.",
    },
    {
      image: image3,
      name: "Card 3",
      description: "This is Card 3.",
    },
  ];

  const settings = {
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 3,
    infinite: true,
    speed: 500,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 1500, // Auto-slide every 1.5 seconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
    <div className="w-3/4 m-auto">
      <div className="mt-10 mb-10">
        <Slider {...settings}>
          {card.map((data) => (
            <div className="bg-gray-300 h-[325px] text-black rounded-xl">
              <div className="h-56 rounded-t-xl bg-gunmetal felx justify-center items-center">
                <img
                  src={data.image}
                  alt={data.name}
                  className="h-full w-full rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-4 p-4">
                <p className="text-xl font-semibold">{data.name}</p>
                <p>{data.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
