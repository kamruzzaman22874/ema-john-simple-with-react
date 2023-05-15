import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import './Login.css';

const Login = () => {
	const [show, setShow] = useState(false);
	const { logIn } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const handleSignIn = (e) => {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value;
		const password = form.password.value;
		console.log(email, password);
		logIn(email, password)
			.then((result) => {
				const loggedUser = result.user;
				console.log(loggedUser);
				form.reset();
				navigate(from, { replace: true });
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	return (
		<div className='form-container'>
			<h2 className='form-title'>Please Login</h2>
			<form onSubmit={handleSignIn}>
				<div className='form-control'>
					<label htmlFor=''>Email</label>
					<input type='email' name='email' id='' required />
				</div>
				<div className='form-control'>
					<label htmlFor=''>Password</label>
					<input
						type={show ? 'text' : 'password'}
						name='password'
						id=''
						required
					/>
				</div>
				<button>
					<p onClick={() => setShow(!show)}>
						<small>
							{show ? <span>Hide</span> : <span>Show</span>}
						</small>
					</p>
				</button>
				<input className='btn-submit' type='submit' value='Login' />
			</form>
			<p className=''>
				New to ema john? <Link to='/signup'>Create new account</Link>
			</p>
		</div>
	);
};

export default Login;
