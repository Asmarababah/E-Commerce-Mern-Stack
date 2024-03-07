import React, { useContext } from 'react'
import "./ProductDetails.css"
import staron from "../Assets/star_icon.png"
import staroff from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext'

const ProductDetails = (props) => {
    const { product } = props;
   const {addToCart} = useContext(ShopContext);

    return (
        <div className='productdisplay'>

            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>

            </div>
            <div className="productdisplay-right">
                <h1>
                    {product.name}
                </h1>
                <div className="productdisplay-right-stars">
                    <img src={staron} alt="" />
                    <img src={staron} alt="" />
                    <img src={staron} alt="" />
                    <img src={staron} alt="" />
                    <img src={staroff} alt="" />
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        {product.old_price} 
                    </div>
                    <div className="productdisplay-right-price-new">
                        {product.new_price} jd
                    </div>
                </div>

                <div className="productdisplay-right-discription">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non vitae provident obcaecati 
                </div>

                <div className="productdisplay-right-size">
                    <h1> Select size</h1>

                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>

                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}> Add To Cart</button>
              
            </div>

        </div>
        
    )
}

export default ProductDetails
