import React, { useEffect, useState } from 'react';
import "./ListProduct.css";
import { Link } from 'react-router-dom';
import EditProduct from '../AddProduct/EditProduct';

const ListProduct = () => {
    // Fetch all products from API(BACKEND)
    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch('https://e-commerce-mern-stack-6dgz.onrender.com/allproducts')
            .then((res) => res.json())
            .then((data) => { setAllProducts(data) });
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    // Function to remove product
    const removeProduct = async (id) => {
        await fetch("https://e-commerce-mern-stack-6dgz.onrender.com/removeproduct", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ id: id }),
        });
        await fetchInfo();
    }

    return (
        <div className='list-product'>
            <h1>All Products List</h1>

            <div id='hide' className="listproduct-format-main">
                <p>Count</p>
                <p>Product</p>
                <p>Title</p>
                <p>Old_Price</p>
                <p>New_Price</p>
                <p>Category</p>
                <p>Remove/Edit</p>
            </div>
            <hr style={{ backgroundColor: "black", width: "100%", border: "1px solid black" }} />

            {/* Mapping data (allproducts) */}
            {allproducts.map((product, i) => {
                return (
                    <div key={i} className="listproduct-format-main listproduct-format">
                        {i + 1}
                        <div style={{
                            backgroundImage: `url(${product.image})`,
                            width: "75px",
                            height: "70px",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "100%",
                            border: "1px solid black"
                        }}>
                        </div>
                        <p id='name'>{product.name}</p>
                        <p>{product.old_price}</p>
                        <p>{product.new_price} jd</p>
                        <p>{product.category}</p>
                        <div className='allproduct-btn'>
                            <button style={{ backgroundColor: "red" }} onClick={() => { removeProduct(product.id) }}>X</button>
                             <Link to={`/allproducts/${product._id}`}>
                                <button> Edit </button>

                            </Link> 

                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ListProduct;
