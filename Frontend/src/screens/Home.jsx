import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import { useEffect, useState } from "react";
const React = require("react");

const Home = () => {
  //initialising items as an empty
  const [food_it, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  //geting food items from backend
  useEffect(() => {
    fetch("http://localhost:8000/api/foodData", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((value) => {
        setFoodItem(value.data);
        console.log(food_it);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // unique items on category basis array
  var categ = new Set();
  food_it.map((item) => {
    categ.add(item.category);
  });
  const cat = Array.from(categ);
  console.log(cat);

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div>
        <div
          id="carouselExampleFade"
          class="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner" style={{ maxHeight: "500px" }}>
            <div className="carousel-caption" style={{ "z-index": "9" }}>
              <div class="d-flex justify-content-center">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            <div class="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100  "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pastry"
                className="d-block w-100  "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pizza"
                className="d-block w-100  "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        {cat !== [] ? (
          cat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data} className="fs-3 m-3">
                  {data}
                </div>
                <hr />
                {food_it !== [] ? (
                  food_it
                    .filter(
                      (item) =>
                        item.category === data &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((foodItems) => {
                      return (
                        <div
                          key={foodItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            food_all={foodItems}
                            options={foodItems.option}
                          ></Card>
                        </div>
                      );
                    })
                ) : (
                  <div>no data</div>
                )}
              </div>
            );
          })
        ) : (
          <div>No Data</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
