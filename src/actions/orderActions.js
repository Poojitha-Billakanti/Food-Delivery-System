import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from "../assets/images/image1.jpg"; // Adjust the paths as necessary
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
import image4 from "../assets/images/image4.jpg";
import image5 from "../assets/images/image5.jpg";
import "../style/LandingPage.css"; // Create this CSS file for custom styles

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Carousel autoPlay interval={3000} infiniteLoop showThumbs={false}>
        <div>
          <img src={image1} alt="Slide 1" />
          <p className="legend">Slide 1</p>
        </div>
        <div>
          <img src={image2} alt="Slide 2" />
          <p className="legend">Slide 2</p>
        </div>
        <div>
          <img src={image3} alt="Slide 3" />
          <p className="legend">Slide 3</p>
        </div>
        <div>
          <img src={image4} alt="Slide 4" />
          <p className="legend">Slide 4</p>
        </div>
        <div>
          <img src={image5} alt="Slide 5" />
          <p className="legend">Slide 5</p>
        </div>
      </Carousel>
    </div>
  );
};

export default LandingPage;
