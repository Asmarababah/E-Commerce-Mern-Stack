import React, { useState, useEffect } from 'react';
import "./AddProduct.css";
import img from "../../assets/bag.png";
import { useParams } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams(); // Get the product ID from the URL

    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "",
        old_price: "",
        new_price: ""
    });

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/allproducts/${id}`);
                const data = await response.json();
                setProductDetails(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [id]);

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }

    const editProduct = async () => {
        try {
            let editedProduct = { ...productDetails };

            if (image) {
                // Upload image if a new one is selected
                const formData = new FormData();
                formData.append('product', image);

                const imageResponse = await fetch("http://localhost:4000/upload", {
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                    },
                    body: formData,
                });
                const imageData = await imageResponse.json();

                if (imageData.success) {
                    editedProduct = { ...editedProduct, image: imageData.image_url };
                } else {
                    alert("Failed to upload image");
                    return;
                }
            }

            const productResponse = await fetch(`http://localhost:4000/allproducts/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(editedProduct),
            });
            const productData = await productResponse.json();
            if (productData.success) {
                alert("Product updated successfully");
            } else {
                alert("Done!");
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert("Failed to update product3");
        }
    };


    return (
        <div className='add-product'>
            <div className="addproduct-itemfeild">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>

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

            <div className="addproduct-itemfeild">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='addproduct-selector'>
                    <option value="women">Women</option>
                    <option value="men">Mens</option>
                    <option value="kids">Kids</option>
                </select>
            </div>

            <div className='addproduct-itemfeild' >
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : img} alt="" className='addproduct-img' title='click to upload image' />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>

            <button onClick={editProduct} className='addproduct-btn'>Edit</button>
        </div>
    )
}

export default EditProduct;
