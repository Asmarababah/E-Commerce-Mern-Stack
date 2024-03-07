import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import ProductDetails from '../Components/ProductDetails/ProductDetails';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  )
}

export default Product
