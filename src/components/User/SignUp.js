import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import App from '../../App';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormHelperText from '@material-ui/core/FormHelperText';

import { signup } from '../../api/userapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ValidateSignUpForm } from './ValidateForm';

const useStyles = makeStyles((theme) => ({
	paper: {
		margin: theme.spacing(3),
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(10),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(2),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignUp = (props) => {
	const classes = useStyles();
	let history = useHistory();

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({});

	//destructure
	const { firstName, lastName, email, password } = formData;

	//onChange method
	const name = firstName + ' ' + lastName;
	const onChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setErrors(ValidateSignUpForm(formData));
		console.log(ValidateSignUpForm(formData));
		if (!errors.name && !errors.email && !errors.password) {
			console.log('signup');
			signup({ name, email, password })
				.then((data) => {
					if (!data.user) {
						console.log('error : ', data);
						toast.error(`${data.message}`, {
							position: 'top-center',
						});
					} else {
						console.log('User Inserted', data);
						toast.success(`Signup Successful! please Login`, {
							position: 'top-center',
						});
						// history.push('/signin');
						//  <Link to= "/signin" component={Signin} />
					}
				})
				.catch(
					(err) => console.log('error in signup', err),
					console.log('error', errors)
				);
		}
	};

	return (
		<App>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className="card my-5 rounded-3 ">
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography
							className="my-2"
							component="h1"
							variant="h5"
						>
							Sign up
						</Typography>
						<form
							className={classes.form}
							noValidate
							onSubmit={onSubmit}
						>
							<Grid container spacing={2}>
								<Grid className="pb-0" item xs={12} sm={6}>
									<TextField
										autoComplete="fname"
										name="firstName"
										required
										fullWidth
										id="firstName"
										label="First Name"
										autoFocus
										value={firstName}
										onChange={onChange}
										{...(errors.name && {
											error: true,
											helperText: errors.name,
										})}
									/>
									{/* <FormHelperText
										error
										id="component-error-text"
									>
										{errors.name && errors.name}
									</FormHelperText> */}
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										fullWidth
										id="lastName"
										label="Last Name"
										name="lastName"
										autoComplete="lname"
										value={lastName}
										onChange={onChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
										value={email}
										onChange={onChange}
										{...(errors.email && {
											error: true,
											helperText: errors.email,
										})}
									/>
									{/* <FormHelperText
										error
										id="component-error-text"
									>
										{errors.email && errors.email}
									</FormHelperText> */}
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										autoComplete="current-password"
										value={password}
										onChange={onChange}
										{...(errors.password && {
											error: true,
											helperText: errors.password,
										})}
									/>
									{/* <FormHelperText
										error
										id="component-error-text"
									>
										{errors.password && errors.password}
									</FormHelperText> */}
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={props.signup}
							>
								Sign Up
							</Button>
							<Grid container justify="flex-end">
								<Grid item>
									<Link
										to="/signin"
										variant="body2"
										onClick={props.signup}
									>
										Already have an account? Sign in
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				</div>
			</Container>
			<ToastContainer />
		</App>
	);
};
export default SignUp;
