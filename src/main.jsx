import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Checkout from './components/Checkout/Checkout';
import Home from './components/Home/Home';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import Orders from './components/Orders/Orders';
import AuthProvider from './components/providers/AuthProvider';
import Shop from './components/Shop/Shop';
import SignUp from './components/Signup/Signup';
import './index.css';
import cartProductsLoader from './loaders/CartProductsLoader';
import PrivateRoutes from './routes/PrivateRoutes';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home></Home>,
		children: [
			{
				path: '/',
				element: <Shop></Shop>,
			},
			{
				path: '/orders',
				element: <Orders></Orders>,
				loader: cartProductsLoader,
			},
			{
				path: '/inventory',
				element: (
					<PrivateRoutes>
						<Inventory></Inventory>
					</PrivateRoutes>
				),
			},
			{
				path: '/checkout',
				element: (
					<PrivateRoutes>
						<Checkout></Checkout>
					</PrivateRoutes>
				),
			},
			{
				path: '/login',
				element: <Login></Login>,
			},
			{
				path: 'signup',
				element: <SignUp></SignUp>,
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router}></RouterProvider>
		</AuthProvider>
	</React.StrictMode>
);
