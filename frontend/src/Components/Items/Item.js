import React from 'react'
import "./Item.css"
import { Link } from 'react-router-dom'

const Item = (props) => {
    return (

         <div className='item'>
          <Link to={`/product/${props.id}`}> 
           <div style={{
                backgroundImage: `url(${props.image})`,
                width: "100%",
                height: "230px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "100%"
            }} > 
            </div>
        </Link>
        <p style={{ height: "42px" }}> {props.name} </p>

        <div className='item-prices'>
            <div className="item-price-old">
                 {props.old_price}
            </div>
            <div className="item-price-new">
                 {props.new_price} jd
            </div>
        </div>
    </div >
        
    )
}

export default Item
