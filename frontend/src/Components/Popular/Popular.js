import React, { useContext, useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Items/Item'

const Popular = (props) => {
    const [data_product, setData_Product] = useState([]);

    useEffect(() => {
        fetch("https://e-commerce-mern-stack-6dgz.onrender.com/mostpopular").then((response) => response.json()).then((data) => setData_Product(data))
    }, [])

    return (
        <div className='popular'>
            <hr />
            <h1> New Arrived</h1>
            <hr />
            <div className="popular-item">
                {data_product && data_product.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}

            </div>
        </div>
    )
}

export default Popular
