export const ValidateSignUpForm = (values) => {
	let errors = {};
	console.log('values', values);
	//Name
	if (!values.firstName) {
		errors.name = 'Username required';
	}

	//Email
	if (!values.email) {
		errors.email = 'Email required';
	} else if (!/^[A-Z0-9.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = 'Email address is invalid';
	}

	//Password
	if (!values.password) {
		errors.password = 'Password is required';
	} else if (values.password.length < 6) {
		errors.password = 'Password needs to be 6 characters or more';
	}

	return errors;
};

export const ValidateSignInForm = (values) => {
	let errors = {};

	//Email
	if (!values.email) {
		errors.email = 'Email required';
	} else if (!/^[A-Z0-9.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = 'Email address is invalid';
	}

	//Password
	if (!values.password) {
		errors.password = 'Password is required';
	} else if (values.password.length < 6) {
		errors.password = 'Password needs to be characters or more';
	}

	return errors;
};
