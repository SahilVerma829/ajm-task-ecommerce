import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import App from '../../App';
import { authenticate, isAuthenticated, signin } from '../../api/userapi';
import { ValidateSignInForm } from './ValidateForm';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginInline: theme.spacing(5),
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(8),
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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Signin = () => {
	let history = useHistory();
	const [users, setUsers] = useState();
	const [values, setValues] = useState({
		email: '',
		password: '',

		didRedirect: false,
	});
	const [errors, setErrors] = useState({});

	const { email, password, error, loading, didRedirect } = values;
	const onChange = (e) => {
		setValues({ ...values, error: false, [e.target.name]: e.target.value });
	};

	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-danger"
						style={{ display: error ? '' : 'none' }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};

	const { user } = isAuthenticated();

	const onSubmit = (e) => {
		e.preventDefault();
		setErrors(ValidateSignInForm(values));
		signin({ email, password })
			.then((data) => {
				console.log('data', data);
				if (!data.user) {
					setValues({
						...values,
						error: data.message,
						loading: false,
					});
					console.log('error', data.error);
				} else {
					authenticate(data, () => {
						setUsers(data.user);
						setValues({ ...values, didRedirect: true });
					});
					// setUsers(data.user)
					// setValues({...values,didRedirect:true})
					// localStorage.setItem('user',JSON.stringify(data.user))
					// console.log("Response",data.user)
				}
			})
			// getLocalStorageData()
			// console.log("asdf",getLocalStorageData());

			.then(() => {
				if (isAuthenticated()) {
					history.push('/');
					// return <Redirect to="/" />
					console.log('hereif', user);
				} else {
					console.log('here', user);
				}
			})
			.catch(console.log('signin request failed'));
	};
	const redirectTo = () => {
		if (didRedirect) {
			if (user) console.log('hii');
			history.push('/');
		} else {
			console.log('hii');
		}
	};

	const classes = useStyles();

	return (
		<App>
			{
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className="card my-5 overflow-hidden rounded-3 ">
						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component="h1" variant="h5">
								Sign in
							</Typography>
							<form
								className={classes.form}
								noValidate
								onSubmit={onSubmit}
							>
								<TextField
									margin="normal"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									autoFocus
									value={email}
									onChange={onChange}
								/>
								<FormHelperText error id="component-error-text">
									{errors.email && errors.email}
								</FormHelperText>
								<TextField
									margin="normal"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									value={password}
									onChange={onChange}
								/>
								<FormHelperText error id="component-error-text">
									{errors.password && errors.password}
								</FormHelperText>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									className={classes.submit}
								>
									Sign In
								</Button>
								<Grid container>
									<Grid item xs>
										<Link to="#" variant="body2">
											Forgot password?
										</Link>
									</Grid>
									<Grid item>
										<Link to="/signup" variant="body2">
											{"Don't have an account? Sign Up"}
										</Link>
									</Grid>
								</Grid>
							</form>
						</div>
					</div>
				</Container>
			}
			{/* {redirectTo()} */}
		</App>
	);
};
export default Signin;
