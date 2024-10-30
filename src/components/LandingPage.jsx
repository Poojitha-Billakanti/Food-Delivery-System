import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image1 from '../../src/assets/images/1.png';
import image2 from '../assets/images/2.png';
import image3 from '../assets/images/3.png';
import image4 from '../assets/images/4.png';
import image5 from '../assets/images/5.png';
import '../style/Landingpage.css'; // Ensure this matches the exact file name

const LandingPage = () => {
    const handleSignIn = () => {
        window.location.href = '/sign-in';
    };

    const handleSignUp = () => {
        window.location.href = '/sign-up';
    };

    return (
        <div className="landing-page">
            <div className="food-delivery-system">
                Food Delivery System
            </div>

            <div className="button-container">
                <button className="auth-button" onClick={handleSignIn}>
                    Sign In
                </button>
                <button className="auth-button" onClick={handleSignUp}>
                    Sign Up
                </button>
            </div>

            <Carousel autoPlay interval={3000} infiniteLoop showThumbs={false}>
                <div>
                    <img src={image1} alt="Slide 1" />
                </div>
                <div>
                    <img src={image2} alt="Slide 2" />
                </div>
                <div>
                    <img src={image3} alt="Slide 3" />
                </div>
                <div>
                    <img src={image4} alt="Slide 4" />
                </div>
                <div>
                    <img src={image5} alt="Slide 5" />
                </div>
            </Carousel>
        </div>
    );
};

export default LandingPage;
