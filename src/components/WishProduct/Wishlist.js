import React, { useState, useEffect } from 'react';
import App from '../../App';
import { Link } from 'react-router-dom';
import { Container, Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { getWishProducts, addToWishlist } from '../../api/productapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let userdata;

const Wishlist = () => {
	const [wishlistData, setWishlistData] = useState([]);

	const getWishlist = (userdata) => {
		getWishProducts(userdata).then((data) => {
			console.log('data', data);
			setWishlistData(data.wishlistData);
			console.log('wishlistdata', wishlistData);
		});
	};

	const removeFromCart = (id) => {
		addToWishlist(userdata.user.id, id).then((data) => {
			if (data.error) {
				alert('error : ', data.error);
			} else {
				console.log('wishData', data);
				toast.success(`Remove Successful!`, {
					position: 'top-center',
				});
			}
		});
	};
	let total = 0;
	wishlistData.forEach((element) => {
		total += element.price;
	});

	useEffect(() => {
		console.log('useEffect wwishlist');
		userdata = JSON.parse(localStorage.getItem('jwt'));
		if (userdata) {
			getWishlist(userdata);
		} else {
			console.log('user not get');
		}
	}, []);

	return (
		<App>
			<div className="">
				<Container
					className=" container  overflow-hidden"
					style={{ height: '100%' }}
				>
					{/* {cartProduct.length === 0 ? (
            <div className="text-center m-5"><h1>Oops! Your Cart is Empty </h1>
            <Button variant="outlined" size="large" color="primary" onClick={()=>history.push("/home")} > Buy Products</Button></div>
        ): */}
					{!userdata ? (
						<div className="my-5">
							<Link
								to="/signin"
								className="fs-1 rounded px-4"
								style={{
									color: 'white',
									outline: 'none',
									textDecoration: 'none',
									backgroundColor: '#7971ea',
								}}
							>
								please Login First
							</Link>
						</div>
					) : wishlistData.length === 0 ? (
						<div className="my-5">
							<Link
								to="/shop"
								className="fs-2 rounded px-4 "
								style={{
									color: 'white',
									outline: 'none',
									textDecoration: 'none',
									backgroundColor: '#7971ea',
								}}
							>
								Checkout New Collection
							</Link>
						</div>
					) : (
						<div className="row mb-5 ">
							<form className="col-md-12 ">
								<div className="site-blocks-table table-responsive mt-5">
									<table className="table   table-bordered  text-center align-items-center overflow-hidden ">
										<thead
											style={{ fontSize: '20px' }}
											className=""
										>
											<tr className="">
												<th className="product-thumbnail p-4">
													Image
												</th>
												<th className="product-name p-4">
													Product
												</th>
												<th className="product-price p-4">
													Description
												</th>
												<th className="product-total p-4">
													Price
												</th>
												<th className="product-remove p-4">
													Remove
												</th>
											</tr>
										</thead>
										<tbody
											className="text-center align-item-center fs-5"
											style={{ fontSize: '1rem' }}
										>
											{wishlistData === undefined
												? ''
												: wishlistData.map((item) => (
														<tr
															className=" text-center align-item-center "
															key={item.id}
														>
															<td className=" align-items-center  ">
																<Link
																	to={`/product/${item.id}`}
																>
																	<img
																		style={{
																			height:
																				'140px',
																			width:
																				'150px',
																		}}
																		src={
																			item.image
																		}
																		alt="productImg"
																	/>
																</Link>
															</td>
															<td className=" py-5">
																{item.name}
															</td>
															<td className="py-5 fs-6">
																{
																	item.description
																}
															</td>
															<td className="py-5">
																Rs. {item.price}
															</td>
															{/* <td className="pt-5"></td> */}
															<td className="py-5">
																<Button
																	className=""
																	onClick={() => {
																		removeFromCart(
																			item.id
																		);
																	}}
																	// }
																	// variant="outlined"
																	// size="large"
																>
																	<DeleteForeverIcon
																		className="p-0 m-o fs-1"
																		style={{
																			color:
																				'#7971ea',
																		}}
																	/>
																</Button>
															</td>
														</tr>
												  ))}
										</tbody>
									</table>
								</div>
							</form>
							<div className="d-flex flex-column col-md-12 p-4 py-5 ">
								<div className="row  ">
									<div className="col-md-6 justify-content-start text-start">
										<Link
											to="/shop"
											style={{
												backgroundColor: '#7971ea',
												color: '#ffffff',
											}}
											className="btn text-uppercase btn-block px-4"
											onClick={() => {}}
										>
											Continue Shopping
										</Link>
									</div>
									<div className="col-md-6 justify-content-end taxt-end">
										<div className="row ">
											<div className="col-md-12 text-right border-bottom mb-5">
												<h3 className="text-black h4 text-uppercase">
													Wish Product Totals
												</h3>
											</div>
										</div>
										<div className="row mb-3">
											<div className="col-md-6">
												<span className="text-black">
													Total Products
												</span>
											</div>
											<div className="col-md-6 text-right">
												<strong className="text-black">
													{wishlistData.length}
												</strong>
											</div>
										</div>
										<div className="row mb-5">
											<div className="col-md-6">
												<span className="text-black">
													Total
												</span>
											</div>
											<div className="col-md-6 text-right">
												<strong className="text-black">
													Rs.
													{total}
												</strong>
											</div>
										</div>

										<div className="row">
											<div className="col-md-12">
												<Button
													style={{
														backgroundColor:
															'#7971ea',
														color: '#ffffff',
													}}
													className="  btn-block"
													onClick={() => {}}
												>
													Proceed To Checkout
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</Container>
				<ToastContainer />
			</div>
		</App>
	);
};
export default Wishlist;
