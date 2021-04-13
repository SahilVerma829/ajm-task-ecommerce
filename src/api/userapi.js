import { API } from '../backend';

// const header = {
// "Content-Type": "application/x-www-form-urlencoded",
//'Authorization': 'JWT fefege...'
// };
//   var postData = (user) => {
//     name : user.name,
//     email : user.email,
//     password : user.password,
//     confirm_password : user.password
//   };

// export const signup = user => {
//     return (dispatch) => {
//     axios.POST(`${API}/user/signup`,
//     {
//         name : user.name,
//         email : user.email,
//         password : user.password,
//         confirm_password : user.password
//     } )

//     //    { headers : header })
//        .then(response =>{
//         return response.json(),
//         console.log("Response",response),
//         dispatch({
//             type : 'FETCH_USER',
//             payload : user
//         })
//     }).catch(err => console.log("error",err))
//     }
// };

export const signup = (user) => {
	console.log('signup');
	return (
		fetch(`${API}/user/signup`, {
			method: 'POST',
			headers: {
				// Accept : "application/json",
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				name: user.name,
				email: user.email,
				password: user.password,
			}),
		})
			.then((response) => {
				// if (response.ok) {
				return response.json();
				// } else {
				// throw new Error('Something went wrong ...');
				// }
			})
			// .then((result) => {
			// 	return result, console.log('result', result);
			// })
			.catch((error) => alert(error))
	);
	// .then(response => {
	//     return response.json();
	//     console.log(response);
	// })
	// .catch(err => console.log(err))
};

export const signin = (user) => {
	return fetch(`${API}/user/signin`, {
		method: 'POST',
		headers: {
			// Accept : "application/json",
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			email: user.email,
			password: user.password,
		}),
	})
		.then((response) => {
			return response.json();
		})

		.catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('jwt', JSON.stringify(data));
		next();
	}
};

export const isAuthenticated = () => {
	if (typeof window == 'undefined') {
		return false;
	}
	if (localStorage.getItem('jwt')) {
		return JSON.parse(localStorage.getItem('jwt'));
	} else {
		return false;
	}
};
