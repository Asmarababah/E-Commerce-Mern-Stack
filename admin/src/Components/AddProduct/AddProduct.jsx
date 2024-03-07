import React, { useState } from 'react'
import "./AddProduct.css"
import img from "../../assets/bag.png"

const AddProduct = () => {
    //state variable for change image
    const [image, setImage] = useState(false);
    //state variable for product details
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        old_price: "",
        new_price: ""
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    //save data on submit
    const changeHandler = async (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })  //by spread operator
    }

    //to upload image on backend
    const Add_Product = async () => {
        console.log(productDetails);
        //save image in mongodb
        let product = productDetails;  //state

        let formData = new FormData();  //new object to upload image by this name
        formData.append('product', image);

        try {
            const response = await fetch("https://e-commerce-mern-stack-6dgz.onrender.com/upload", {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                },
                body: formData,
            });
            const responseData = await response.json();

            if (responseData.success) {
                product.image = responseData.image_url;   //to save image on multer
                console.log(product);

                const addProductResponse = await fetch("https://e-commerce-mern-stack-6dgz.onrender.com/addproduct", {  //save all data on mongodb
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(product),
                });

                const addProductData = await addProductResponse.json();
                if (addProductData.success) {
                    alert("Product Added");
                } else {
                    alert("Failed to Add Product");
                }
            } else {
                alert("Failed to Upload Image");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred while processing your request");
        }
    }

    ////
    
    return (
        <div className='add-product'>
            {/* name */}
            <div className="addproduct-itemfeild">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>

            {/* price */}
            <div className="addproduct-price">
                <div className="addproduct-itemfeild">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='old price' />
                </div>
                <div className="addproduct-itemfeild">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='new price' />
                </div>
            </div>

            {/* category */}
            <div className="addproduct-itemfeild">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='addproduct-selector'>

                    <option value="women">Women</option>
                    <option value="men">Mens</option>
                    <option value="kids">Kids</option>
                </select>
            </div>

            {/* image */}
            <div className='addproduct-itemfeild' >
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : img} alt="" className='addproduct-img' title='click to upload image' />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>

            {/* Submit */}
            <button onClick={() => { Add_Product() }} className='addproduct-btn'>Add </button>
        </div>
    )
}

export default AddProduct
