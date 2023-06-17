import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
export default function Home() {
    const [foodCat, setFoodCat] = useState([])
    const [foodItems, setFoodItems] = useState([])
    const [search, setSearch] = useState('')


    return (
        <div >
            <div>
                <Navbar />
            </div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

                    <div className="carousel-inner " id='carousel'>
                        <div class=" carousel-caption  " style={{ zIndex: "9" }}>
                            <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
                            </div>
                        </div>


                        <div className="carousel-item active" >
                            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>

                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>

                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>

                    </div>


                </div>
            </div>
            <Footer />
        </div>
}