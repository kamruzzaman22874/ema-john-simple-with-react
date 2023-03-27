import React from 'react';
import './Product.css'

const Product = (props) => {
    console.log(props.product)
    const {img ,name, price,ratings,seller,shipping,stock } =props.product
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
                <h6 className='product-name'>{name}</h6>
                <p>${price}</p>
                <p>Manufacturer: {seller}</p>
                <p>Ratting: {ratings}</p>
            </div>
            <button className='btn-cart'>Add to Cart</button>
        </div>
    );
};

export default Product;