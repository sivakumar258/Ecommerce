import React from 'react';
import './Hero.css';
import hand_icon from '../Assets/hand_icon.png'; // or use emoji directly
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png'; // transparent background

const Hero = () => {
    return (
        <div className='hero'>
            <div className='hero-left'>
                <h3>NEW ARRIVALS ONLY</h3>
                <div className='hero-text'>
                    <h1>new <img src={hand_icon} alt="wave" /></h1>
                    <h1>collections</h1>
                    <h1>for everyone</h1>
                </div>
                <button className="hero-latest-btn">
                    Latest Collection <img src={arrow_icon} alt="arrow" />
                </button>
            </div>
            <div className='hero-right'>
                <img src={hero_image} alt="Hero" />
            </div>
        </div>
    );
};

export default Hero;
