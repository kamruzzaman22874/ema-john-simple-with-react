import { useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import './SignUp.css';

const SignUp = () => {
    const { createUser } = useContext(AuthContext)
	const [error, setError] = useState('');
    console.log(createUser)
	const handleSignUp = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;
		const confirm = form.confirm.value;
		console.log(email, password, confirm);
		setError('');

		if (password !== confirm) {
			setError('Please give the confirm password');
			return;
		} else if (password.length < 6) {
			setError('Please give at least 6 characters');
			return;
		}
		createUser(email, password)
			.then((result) => {
				const loggedUser = result.user;
				console.log(loggedUser);
			})
			.catch((err) => {
				console.log(err.message);
				setError(err);
			});
		// form.reset();
	};
	return (
		<div className='form-container'>
			<h2 className='form-title'>Please Sign up</h2>
			<form onSubmit={handleSignUp}>
				<div className='form-control'>
					<label htmlFor=''>Email</label>
					<input type='email' name='email' id='' required />
				</div>
				<div className='form-control'>
					<label htmlFor=''>Password</label>
					<input type='password' name='password' id='' required />
				</div>
				<div className='form-control'>
					<label htmlFor=''>Confirm Password</label>
					<input type='password' name='confirm' id='' required />
				</div>
				<input className='btn-submit' type='submit' value='Sign Up' />
			</form>
			<p>
				<small>
					Already have an account ? <Link to='/login'>Login</Link>
				</small>
			</p>
			<p className='text-error'>{error}</p>
		</div>
	);
};

export default SignUp;
