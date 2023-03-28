import React from 'react';
import './Cart.css'

const Cart = ({cart}) => {
    console.log(cart)

    let total = 0;
    let shipping = 0;
    let quantity = 0;
    for (const product of cart) {
        if (product.quantity === 0) {
            product.quantity = 1
        }
        // product.quantity = product.quantity || 1;
        total = total + product.price * product.quantity;
        shipping = shipping + product.shipping;
        quantity= quantity + product.quantity;
    }
    const tax = total * 7 / 100
    const grandTotal = total + shipping + tax;

    return (
        <div className='cart'>
             <h4>Order summary</h4>
            <p>Selected items:{quantity} </p>
            <p>Total: ${total.toFixed(2)} </p>
            <p>Shipping: ${shipping.toFixed(2)}</p>
            <p>Tax:${tax.toFixed(2)}</p>
            <h6>Grand Total:${grandTotal.toFixed(2)} </h6>
        </div>
    );
};

export default Cart;