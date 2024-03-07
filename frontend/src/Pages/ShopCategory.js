import React, { useContext } from 'react'
import "./ShopCategory.css"
import "../Components/Items/Item.css"
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Items/Item';

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);

    return (
        <div className='shop-category'>

            <div className="offers">
                <p> Up to 30% off every things!</p>
                <p>With Code : <span>HTU2024</span></p>
            </div>

            <div className='bg' style={{
                backgroundImage: `url(${props.bg})`,
             
            }}>

            </div>

            <h1 style={{margin:"60px"}}> {props.title} </h1>

            <div className="shopcategory-indexSort">
                {/* <article> <span>showing 1-12</span> out of 36 product </article> */}

                <div className="shopcategory-products">
                    {all_product && all_product?.map((item , i) => {
                        if (props.category === item.category) {
                            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                        } else {
                            return null;
                        }

                    })}
                </div>
            </div>
        </div>
    )
}

export default ShopCategory
