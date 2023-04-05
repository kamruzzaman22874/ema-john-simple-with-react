import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart , setCart] = useState([])
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const storedCart = getShoppingCart()
        const savedCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id)
            if (addedProduct) {
                const quantity = storedCart[id]
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
           
        }
        setCart(savedCart)
    },[products])


     const handleAddToCart = (product) => {
        //  const newCart = [...cart, product]
         let newCart = [];
         const exists = cart.find(pd => pd.id === product.id);
         if (!exists) {
             product.quantity = 1;
             newCart = [...cart, product];
         }
         else {
             exists.quantity = exists.quantity + 1;
             const remaining = cart.filter(pd => pd.id !== product.id)
             newCart = [...remaining, exists]
         }
         setCart(newCart)
         addToDb(product.id)
    }

    const handleClearCart = () => {
        setCart([])
        deleteShoppingCart()
    }
    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product
                        key={product.id}
                        product = {product}
                        handleAddToCart ={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div>
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to="/orders">
                        <button className='btn-proceed'>
                            Review Order
                            <FontAwesomeIcon icon={faArrowAltCircleRight} />
                        </button>
                    </Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;