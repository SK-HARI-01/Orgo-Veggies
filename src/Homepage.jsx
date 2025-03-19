import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Vegimg1 from "./assets/ovintro2.jpg";
import Vegimg2 from "./assets/ovintro1.jpg";
import Vegimg3 from "./assets/ovintro3.jpg";
import Vegimg4 from "./assets/ovintro4.jpg";
import "./Homepage.css";

function Homepage({ toggleSection }) {
    const images = [Vegimg1, Vegimg2, Vegimg3, Vegimg4];

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
    };

    return (
        <div className="hero-section">
            <h1 className="hero-title">Welcome to Orgo Veggies – Fresh, Organic, and Healthy!</h1>

            <div className="content-container">
                {/* Intro Text */}
                <p className="hero-text">
                    Welcome to <strong>Orgo Veggies</strong> – your trusted source for 
                    <strong> farm-fresh organic products</strong>. We offer a premium selection 
                    of <strong>organic vegetables, fruits, and dry fruits</strong>, sourced 
                    <strong> directly from farmers</strong> who practice sustainable and chemical-free farming. 
                    Each product is <strong>hand-picked with care</strong>, ensuring the highest quality 
                    and freshness. Our produce is <strong>100% natural, free from pesticides</strong>, 
                    and packed with essential nutrients. Experience the 
                    <strong> goodness of nature</strong> with our fresh, healthy, and organic products, 
                    delivered straight to your doorstep.
                </p>

                {/* Image Slider */}
                <div className="image-slider">
                    <Slider {...settings}>
                        {images.map((img, index) => (
                            <div key={index}>
                                <img src={img} alt="Organic Fresh Product" className="slider-img" />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
