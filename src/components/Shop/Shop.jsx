import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useLoaderData } from 'react-router-dom';
import {
	addToDb,
	deleteShoppingCart,
	getShoppingCart,
} from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const { totalProducts } = useLoaderData();
	const totalPages = Math.ceil(totalProducts / itemsPerPage);

	const pageNumber = [...Array(totalPages).keys()];

	// useEffect(() => {
	// 	fetch('http://localhost:5000/products')
	// 		.then((res) => res.json())
	// 		.then((data) => setProducts(data));
	// }, []);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(
				`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
			);
			const data = await response.json();
			setProducts(data);
		}
		fetchData();
	}, [currentPage, itemsPerPage]);

	useEffect(() => {
		const storedCart = getShoppingCart();
		const ids = Object.keys(storedCart);

		fetch(`http://localhost:5000/productsByIds`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(ids),
		})
			.then((res) => res.json())
			.then((cartProducts) => {
				const savedCart = [];
				for (const id in storedCart) {
					const addedProduct = cartProducts.find(
						(product) => product._id === id
					);
					if (addedProduct) {
						const quantity = storedCart[id];
						addedProduct.quantity = quantity;
						savedCart.push(addedProduct);
					}
				}
				setCart(savedCart);
			});
	}, []);

	const handleAddToCart = (product) => {
		//  const newCart = [...cart, product]
		let newCart = [];
		const exists = cart.find((pd) => pd._id === product._id);
		if (!exists) {
			product.quantity = 1;
			newCart = [...cart, product];
		} else {
			exists.quantity = exists.quantity + 1;
			const remaining = cart.filter((pd) => pd._id !== product._id);
			newCart = [...remaining, exists];
		}
		setCart(newCart);
		addToDb(product._id);
	};

	const handleClearCart = () => {
		setCart([]);
		deleteShoppingCart();
	};

	const options = [5, 10, 20];
	function handleSelectChange(event) {
		setItemsPerPage(parseInt(event.target.value));
		setCurrentPage(0);
	}

	return (
		<>
			<div className='shop-container'>
				<div className='products-container'>
					{products.map((product) => (
						<Product
							key={product._id}
							product={product}
							handleAddToCart={handleAddToCart}></Product>
					))}
				</div>
				<div>
					<Cart cart={cart} handleClearCart={handleClearCart}>
						<Link className='proceed-link' to='/orders'>
							<button className='btn-proceed'>
								Review Order
								<FontAwesomeIcon icon={faArrowAltCircleRight} />
							</button>
						</Link>
					</Cart>
				</div>
			</div>
			<div className='pagination'>
				<h2>Current page: {currentPage}</h2>
				{pageNumber.map((number) => (
					<button
						key={number}
						className={currentPage === number ? 'selected' : ''}
						onClick={() => setCurrentPage(number)}>
						{number + 1}
					</button>
				))}
				<select onChange={handleSelectChange}>
					{options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
		</>
	);
};

export default Shop;
