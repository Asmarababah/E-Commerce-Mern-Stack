import React from 'react'
import { Slide } from 'react-slideshow-image';
import './Shop.css'
import bg1 from '../Components/Assets/bg1.png'
import bg2 from "../Components/Assets/bg2.png"
import bg3 from "../Components/Assets/bg3.png"
import Popular from '../Components/Popular/Popular';


const Shop = () => {
    const images = [
        bg1,
        bg2,
        bg3];
    return (
        <div className='slide'>
            <Slide>
                <div className="each-slide-effect">
                    <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                        {/* <span>Welcome To Store Shop</span> */}
                    </div>
                </div>
                <div className="each-slide-effect">
                    <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                        {/* <span>Slide 2</span> */}
                    </div>
                </div>
                <div className="each-slide-effect">
                    <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                        {/* <span>Slide 3</span> */}
                    </div>
                </div>

            </Slide>
            <div className="info">
                <div className='h'>
                    <h1>This is Store Shop</h1>
                    <h5>Easy Jordan Wide Delivery</h5>
                </div>
                <div className='information'>
                    <h5> Our Services </h5>
                    <p> Online shopping and purchasing</p>
                    <p> Payment upon receipt or by visa </p>
                    <p>Fast shipping to all regions of Jordan </p>
                </div>
            </div>

            <Popular />

          
        </div>
    )
}

export default Shop
