import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import './Login.css';

const Login = () => {
	const { logIn } = useContext(AuthContext);
	const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
		const email = form.email.value;
		const password = form.password.value;
    console.log(email, password);
    logIn(email, password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        form.reset()
      })
      .catch(err => {
      console.log(err.message);
    })
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
					<input type='password' name='password' id='' required />
				</div>
				<input className='btn-submit' type='submit' value='Login' />
			</form>
			<p className=''>
				New to ema john? <Link to='/signup'>Create new account</Link>
			</p>
		</div>
	);
};

export default Login;
