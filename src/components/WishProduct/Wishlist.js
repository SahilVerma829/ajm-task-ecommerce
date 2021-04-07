import React,{useState,useEffect} from 'react';
import App from '../../App';
import {Container,Button} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { getWishProducts } from '../../api/productapi'

const Wishlist = () => {

    const getWishlist = (id) =>{
        getWishProducts(id)
        .then(data=>{
            console.log("data",data);
        })
    }

    useEffect(()=>{
        const userdata = JSON.parse(localStorage.getItem('user'))
        getWishlist(userdata.id);
    },[])


    return (
        <App>
      <div className="" >
    
    
    <Container  className=" container  overflow-hidden" style={{height:"100%"}}>
        {/* {cartProduct.length === 0 ? (
            <div className="text-center m-5"><h1>Oops! Your Cart is Empty </h1>
            <Button variant="outlined" size="large" color="primary" onClick={()=>history.push("/home")} > Buy Products</Button></div>
        ): */}
        <div className="row mb-5 ">
          <form className="col-md-12 " >
            <div className="site-blocks-table table-responsive mt-5">
              <table className="table   table-bordered border-primary  text-center align-item-center overflow-hidden ">
                <thead style={{fontSize:"20px"}} className="">
                  <tr className="">
                    <th className="product-thumbnail p-4">Image</th>
                    <th className="product-name p-4">Product</th>
                    <th className="product-price p-4">Total</th>
                    <th className="product-total p-4">Price</th>
                    <th className="product-remove p-4">Remove</th>
                  </tr>
                </thead>
                <tbody className="text-center align-item-center fs-3" style={{fontSize:"1rem"}}>
                    {/* {wishProduct.map(item=>(
                    <tr className=" text-center align-item-center " key={item.pro_id}>
                        <td className="text-center align-item-center fs-3" >
                            <img style={{height:"120px", width:"150px"}} src={"http://shreejodhana.com/fashion/"+item.pro_image} alt="productImg"/>
                        </td>
                        <td className=" pt-5">{item.pro_name}</td>
                        <td className="pt-5">Rs. {item.pro_price}</td>
                        <td className="pt-5">
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button onClick={()=>(
                                        value=parseInt(document.querySelector('#quantity').innerText)+1,
                                        console.log("hii",value),
                                        document.getElementById("quantity").innerText=value
                                        
                                        )
                                        
                                }><AddIcon /></Button>
                                <Button id="quantity" disabled>1</Button>
                                <Button  onClick={()=>( value=parseInt(document.querySelector('#quantity').innerText)-1,
                                        console.log("hii",value),
                                        document.getElementById("quantity").innerText=value
                                        )}><RemoveIcon /></Button>
                            </ButtonGroup>
                        </td>
                        <td className="pt-5">{item.pro_price}</td>
                        <td className="pt-5"><Button style={{backgroundColor:"#7971ea", color:"#f9f9f9"}}  onClick={()=>props.removeFromCart(item.pro_id)} variant="outlined" size="large" className="p-3"><DeleteForeverIcon /></Button></td>
                    </tr>
                    ))} */}
        
                </tbody>
                </table>
                </div>
            </form>
            <div className="d-flex flex-column col-md-12 p-5 pb-5 ">
            <div className="row  justify-content-end">
              <div className="col-md-5">
                <div className="row">
                  <div className="col-md-12 text-right border-bottom mb-5">
                    <h3 className="text-black h4 text-uppercase">Wish Product Totals</h3>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <span className="text-black">Subtotal</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <strong className="text-black">Rs. 
                    </strong>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-6">
                    <span className="text-black">Total</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <strong className="text-black">Rs.  </strong>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <Button  style={{backgroundColor:"#7971ea", color:"#ffffff" }} className="  btn-block" 
                    onClick={()=>{}}>Proceed To Checkout</Button>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </div>
        
        
        
        
    </Container>
    

        </div>
        </App>
    )
}
export default Wishlist;