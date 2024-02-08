import React from 'react'
import "./Hero.css"
import handIcon from '../assets/hand_icon.png'
import arrowIcon from '../assets/arrow.png'
import heroImage from '../assets/hero_image.png'

export const Hero = () => {
    return (
        <div className='hero'>
            <div className="hero-left">
                <h2>New Arrivals Only</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>new</p>
                        <img src={handIcon} alt='hand image' />
                    </div>
                    <p>collections</p>
                    <p>for everyone</p>
                </div>
                <div className="hero-latest-btn">
                    <div>Latest collections</div>
                    <img src={arrowIcon} alt="arrow icon" />
                </div>
            </div>
            <div className="hero-right">
                <img src={heroImage} alt="hero image" />
            </div>
        </div>
    )
}
